const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const mqttClient = require('./mqtt/mqttClient')

const tasks = require('./routes/tasks')
const photos = require('./routes/photos')

const app = express()
const PORT = 3001

// mqtt
mqttClient.connect();
// express
app.use(express.json())
// logger
app.use(morgan('dev'))
// static image folder
app.use('/images', express.static('images'))
// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS error handeling (cross-origin-resource-sharing)
app.use((req, res, next) => {
  // give acces to any origin
  res.header('Access-Control-Allow-Origin', '*')  
  // all these headers can be appended to incoming requests
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  // what requests are allowed
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// routes
app.use('/api/tasks', tasks)
app.use('/api/photos', photos)

// error handeling
app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
    
  })
})

app.listen(PORT)