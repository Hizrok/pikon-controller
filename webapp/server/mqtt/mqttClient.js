const MqttHandler = require('./mqttHandler');

const mqttClient = new MqttHandler();

module.exports = mqttClient;