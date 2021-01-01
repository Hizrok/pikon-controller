const mqtt = require('mqtt');
const fs = require('fs');
const pool = require('../db')

class MqttHandler {
  constructor() {
    this.mqttClient = null
  }

  connect() {
    this.mqttClient = mqtt.connect([{host: 'localhost', port: 1883, keepalive: 60}])

    this.mqttClient.on('connect', () => {
      console.log('[SERVER]: mqtt client connected')
      this.mqttClient.subscribe('messages')
      this.mqttClient.subscribe('photos')
    })

    this.mqttClient.on('message', (topic, message) => {
      switch (topic) {
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
              console.log('failed to delete')
            })
          // inform user
          break;
        case 'photos':
          // give image a name and save it on the server
          fs.writeFile('./images/photo.jpg', message, function (err) {
            if (err) throw err;
          })
          // store path in the database
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