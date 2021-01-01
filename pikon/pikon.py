import paho.mqtt.client as mqtt
import yaml
import time
import threading

tasks = []
data = {}
f_stop = threading.Event()
f_stop.set()

class Task:
    def __init__(self, id, task, task_data, task_date):
        self.id = id
        self.task = task
        self.task_data = task_data
        self.task_date = task_date
    def __str__(self):
        return 'id: '+str(self.id)+', '+'task: '+self.task+', '+'data: '+self.task_data+', '+'date: '+time.strftime('%Y-%m-%d %H:%M:%S', self.task_date)

def get_data():
    data = load_yaml('tasks.yml')
    if (data != {}):
        for key, values in data.items():
            task = Task(key, values[0], values[1], time.strptime(values[2], '%Y-%m-%d %H:%M:%S'))
            tasks.append(task)
        sort_tasks()
    
def sort_tasks():
    print('[PIKON]: sorting tasks')
    tasks.sort(key=lambda task: task.task_date)
    schedule()

def schedule():
    print('[PIKON]: scheduled ' + str(tasks[0].task) + ' task for ' + time.strftime('%Y-%m-%d %H:%M:%S', tasks[0].task_date))
    if f_stop.isSet():
        f_stop.clear()
        f(f_stop)

def f(f_stop):
    if len(tasks) > 0:
        if tasks[0].task_date <= time.localtime():
            do_task(tasks[0])
            tasks.pop(0)
            save_data()        
            # stop timer if there are no tasks left
            if len(tasks) == 0:
                f_stop.set()
        if not f_stop.is_set():
        # start 1 second timer, thread f, f_stop is variable
            threading.Timer(1, f, [f_stop]).start()
    else:
        f_stop.set()

def do_task(task):
    if task.task == 'rotate':
        rotate(task)
    elif task.task == 'photo':
        take_photo(task)

def rotate(task):
    data = task.task_data.split(',')
    x_rot = data[1].split('_')[1]
    z_rot = data[2].split('_')[1]
    focus = data[3].split('_')[1]
    task_time = time.strftime('%Y-%m-%d %H:%M:%S', task.task_date)
    print('[PIKON]: rotating to '+x_rot+', '+z_rot+', '+focus+' at '+task_time)
    # rotate
    # publish to messages
    message = 'COMPLETED,id_'+str(task.id)
    client.publish('messages', message, 0)   

def take_photo(task):
    task_time = time.strftime('%Y-%m-%d %H:%M:%S', task.task_date)
    print('[PIKON]: taking a photo at '+task_time)
    # take the photo
    # publish to messages
    message = 'COMPLETED,id_'+str(task.id)
    client.publish('messages', message, 0)
    # publish to photos
    f = open('moon.jpg', 'rb')
    file_content = f.read()
    byte_array = bytearray(file_content)
    client.publish('photos', byte_array, 0)

def create_new_task(data):
    # array of data after first split
    id = int(data[1].split('_')[1])
    task = data[2].split('_')[1]
    # date formating
    task_date = time.strptime(data[len(data)-1].split('_')[1], '%Y-%m-%d %H:%M:%S')
    # remove NEW, id and date
    data.pop(0)
    data.pop(0)
    data.pop(len(data)-1)
    task_data = ','.join(data)
    task = Task(id, task, task_data, task_date)
    tasks.append(task)
    # sort and save after creating new task
    sort_tasks()
    save_data()

def edit_task(data):
    # array of data after first split
    id = int(data[1].split('_')[1])
    task = data[2].split('_')[1]
    # date formating
    task_date = time.strptime(data[len(data)-1].split('_')[1], '%Y-%m-%d %H:%M:%S')
    # remove EDIT, id and date
    data.pop(0)
    data.pop(0)
    data.pop(len(data)-1)
    task_data = ','.join(data)
    task = Task(id, task, task_data, task_date)
    # find task in the array
    task_to_edit = next((task for task in tasks if task.id == id), None)
    index = tasks.index(task_to_edit)
    tasks[index] = task
    # sort and save after editing
    sort_tasks()
    save_data()

def delete_task(data):
    # array of data after first split
    id = int(data[1].split('_')[1])
    # find task in the array
    task_to_delete = next((task for task in tasks if task.id == id), None)
    index = tasks.index(task_to_delete)
    tasks.pop(index)
    if len(tasks) > 0:
        sort_tasks()
    save_data()

def save_data():
    if (data != None):
        data.clear()
    for task in tasks:
        data[task.id] = [task.task, task.task_data, time.strftime('%Y-%m-%d %H:%M:%S', task.task_date)]
    write_yaml('tasks.yml', data)

def load_yaml(file_path):
    with open(file_path) as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
        return data

def write_yaml(file_path, items):
    with open(file_path, 'w') as f:
        yaml.dump(items, f)

def on_connect(client, userdata, flags, rc):
    print('[PIKON]: mqtt client connected')
    get_data()
    client.subscribe('tasks')

def on_message(client, userdata, msg):
    message = str(msg.payload.decode('utf-8'))
    topic = msg.topic
    print('[MQTT]: ' + topic + ': ' + message)
    if topic == 'tasks':        
        firstSplit = message.split(',')
        if firstSplit[0] == 'NEW':
            print('[PIKON]: creating a new task')
            create_new_task(firstSplit)
        elif firstSplit[0] == 'EDIT':
            print('[PIKON]: editing existing task')
            edit_task(firstSplit)
        elif firstSplit[0] == 'DELETE':
            print('[PIKON]: deleting existing task')
            delete_task(firstSplit)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect('localhost', port=1883, keepalive=60)

client.loop_forever()