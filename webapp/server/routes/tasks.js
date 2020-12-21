const express = require('express')
const router = express.Router()
const pool = require('../db')

// get in-progress tasks
router.get('/', (req, res, next) => {
  // query for all tasks or return an error
  pool
    .query('SELECT * FROM tasks')
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

// create new task
router.post('/', (req, res, next) => {
  // create newTask for debug, query INSERT command, return error if it fails
  const {task, taskData, taskDate} = req.body
  const newTask = {task, taskData, taskDate, status: 'IN_PROGRESS'}
  pool
    .query(
      'INSERT INTO tasks (task, task_data, task_date, status) VALUES ($1, $2, $3, $4);',
      [task, taskData, taskDate, 'IN_PROGRESS']
    )
    .then(response => {
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
  const {task, taskData, taskDate, status} = req.body
  const updatedTask = {id, task, taskData, taskDate, status}
  pool
    .query(
      'UPDATE tasks SET task=$1, task_data=$2, task_date=$3, status=$4 WHERE id=$5;',
      [task, taskData, taskDate, status, id]
    )
    .then(response => {
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

module.exports = router