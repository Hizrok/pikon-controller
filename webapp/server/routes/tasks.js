const express = require('express')
const router = express.Router()
const pool = require('../db')
const mqttClient = require('../mqtt/mqttClient')

// get in-progress tasks
router.get('/', (req, res, next) => {
  // query for all tasks or return an error
  pool
    .query("SELECT * FROM tasks WHERE status='IN_PROGRESS' ORDER BY task_date;")
    .then(response => {
      res.status(200).json({
        message: 'Tasks returned from the database',
        tasks: response.rows
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to return tasks from the database',
        error: e
      })
    })
})

// validate date
router.post('/validate', (req, res, next) => {
  // get the date from body and create another 2 dates for validation
  const time = req.body.time
  const inputTime = new Date(time)
  // left time border
  inputTime.setMinutes(inputTime.getMinutes() - 1)
  const leftBorder = dateString(inputTime)
  // right time border
  inputTime.setMinutes(inputTime.getMinutes() + 2)
  const rightBorder = dateString(inputTime)
  // find tasks between or nothing, if fail return an error
  pool
    .query("SELECT * FROM tasks WHERE task_date BETWEEN $1 AND $2;", [leftBorder, rightBorder])
    .then(response => {
      if (response.rows.length === 0) {
        res.status(200).json({
          message: 'Time validated - no tasks found at this time',
          valid: true
        }) 
      } else {
        res.status(200).json({
          message: 'Time validated - found tasks at this time',
          valid: false
        })
      }      
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to validate',
        error: e
      })
    })
})

// create new task
router.post('/', (req, res, next) => {
  // create newTask for debug, query INSERT command, return error if it fails
  const {task, taskData, taskDate} = req.body
  const newTask = {task, taskData, taskDate, status: 'IN_PROGRESS'}
  pool
    .query(
      'INSERT INTO tasks (task, task_data, task_date, status) VALUES ($1, $2, $3, $4) RETURNING id;',
      [task, taskData, taskDate, 'IN_PROGRESS']
    )
    .then(response => {
      // mqtt
      const mqtt = `NEW,id_${response.rows[0].id},${taskData},time_${taskDate}`
      mqttClient.sendMessage('tasks', mqtt)
      res.status(201).json({
        message: 'Task created',
        task: newTask
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to create a task',
        error: e
      })
    })
})

// get task by id
router.get('/:taskId', (req, res, next) => {
  // get id from request parameters, query db, return err if it fails
  const id = req.params.taskId
  pool
    .query('SELECT * FROM tasks WHERE id=$1', [id])
    .then(response => {
      res.status(200).json({
        message: 'Task returned from the database',
        task: response.rows[0]
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to return task from the database',
        error: e
      })
    })
})

// update task 
router.put('/:taskId', (req, res, next) => {
  // create updatedTask for debug, query UPDATE SET command, return error if it fails
  const id = req.params.taskId
  const {task, taskData, taskDate} = req.body
  const updatedTask = {id, task, taskData, taskDate}
  pool
    .query(
      'UPDATE tasks SET task=$1, task_data=$2, task_date=$3 WHERE id=$4;',
      [task, taskData, taskDate, id]
    )
    .then(response => {
      // mqtt
      const mqtt = `EDIT,id_${id},${updatedTask.taskData},time_${updatedTask.taskDate}`
      mqttClient.sendMessage('tasks', mqtt)
      res.status(200).json({
        message: 'Task updated in the database',
        updatedTask
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to update the task',
        error: e
      })
    })
})

// delete task 
router.delete('/:taskId', (req, res, next) => {
  // get id from request params, DELETE from db, return error if it fails
  const id = req.params.taskId
  pool
    .query('DELETE FROM tasks WHERE id=$1;', [id])
    .then(response => {
      // mqtt
      const mqtt = `DELETE,id_${id}`
      mqttClient.sendMessage('tasks', mqtt)
      res.status(200).json({
        message: 'Task deleted from the database',
        id
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to delete the task',
        error: e
      })
    })
})

function dateString(d) {
  let yyyy = d.getFullYear()
  let month = parseInt(d.getMonth()) + 1
  let mm = month < 10 ? "0" + month : month
  let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
  let HH = d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
  let MM = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
  let SS = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()

  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`
}

module.exports = router