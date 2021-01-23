const mqtt = require('mqtt')
const fs = require('fs')
const pool = require('../db')

const WebSocket = require('ws')
const ws = new WebSocket('http://localhost:3001')

class MqttHandler {
  constructor() {
    this.mqttClient = null
  }

  connect() {
    // ws
    ws.on('message', (data) => {
      this.sendMessage('tasks', data)
    })

    // if you are working with rpi - change this
    //this.mqttClient = mqtt.connect([{host: '<IP>', port: 1883, keepalive: 60}])
    this.mqttClient = mqtt.connect([{host: 'localhost', port: 1883, keepalive: 60}])

    this.mqttClient.on('connect', () => {
      console.log('[SERVER]: mqtt client connected')
      this.mqttClient.subscribe('messages')
      this.mqttClient.subscribe('photos/+')
    })

    this.mqttClient.on('message', (topic, message) => {
      const topicSplit = topic.split('/')
      switch (topicSplit[0]) {
        case 'messages':
          console.log(`[SERVER]: ${topic}: ${message}`)  
          // delete or edit task in the database
          const id = parseInt(message.toString().split(',')[1].split('_')[1])
          pool
            .query('DELETE FROM tasks WHERE id=$1;', [id])
            .then(response => {
              console.log('task completed and deleted')
            })
            .catch(e => {
              console.log(e.stack)
              console.log('failed to delete task')
            })
          // inform user
          ws.send(message.toString());
          break;
        case 'photos':
          // give the photo a name and save it on the server
          const date = new Date(topicSplit[1])
          const photoPath = `./images/${Date.parse(date)}.jpg`
          fs.appendFile(photoPath, message, function (err) {
            if (err) throw err;
            console.log(`[SERVER]: image ${Date.parse(date)}.jpg saved`)
          })
          // save to db
          pool
            .query(
              'INSERT INTO photos (photo_date, photo_path) VALUES ($1, $2);',
              [topicSplit[1], photoPath.slice(1, photoPath.length)]
            )
            .then(response => {
              console.log('new photo created')
            })
            .catch(e => {
              console.log(e.stack)
              console.log('failed to create new photo')
          })
          // inform user
          break;
        default:
          break;
      }
    })
  }

  sendMessage(topic, message) {
    console.log('[SERVER]: message sent')  
    this.mqttClient.publish(topic, message);
  }
}

module.exports = MqttHandler;