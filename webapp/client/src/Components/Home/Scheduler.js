import React, {useState, useEffect} from 'react'
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Scheduler() {
  // state for tasks
  const [tasks, setTasks] = useState([])
  // useEfect - get tasks from db
  useEffect(() => {
    async function fetchData() {
      const data = await fetch('/api/tasks')
      const json = await data.json()
      json.tasks.forEach(task => {
        const date = new Date(task.task_date)        
        task.task_date = dateString(date)
      });
      setTasks(json.tasks)
    }
    fetchData()
  }, [])

  // functions
  function handleDelete(e) {
    async function deleteItem(id) {
      const data = await fetch(`/api/tasks/${id}`, {method:'DELETE'})
      const json = await data.json()
      console.log(json.message)
      setTasks(prevTasks => {
        return (
          prevTasks.filter(task => {
            return task.id !== id
          })
        )
      })
    }
    deleteItem(e.target.name)
  }
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

  return (
    <div>
      <h4>Scheduler</h4>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Task</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.map(task => {
            return ( 
              <tr key={task.id}>
                <td>{task.task_date}</td>
                <td>{task.task}</td>
                <td><Button variant='warning'><Link to={`/schedule/${task.id}`} className='link'>Edit</Link></Button></td>
                <td><Button variant='danger' onClick={handleDelete} name={task.id}>Delete</Button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Scheduler