import React, {useState, useEffect} from "react"
import {Table, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

function Scheduler() {
  // state for tasks
  const [tasks, setTasks] = useState([])
  // useEfect - get tasks from db
  useEffect(() => {
    async function fetchData() {
      const data = await fetch("/api/tasks")
      const json = await data.json()
      json.tasks.forEach(task => {
        const date = new Date(task.task_date)        
        task.task_date = dateString(date)
      });
      setTasks(json.tasks)
    }
    fetchData()
    // ws
    const ws = new WebSocket("ws://localhost:3001")
    ws.onmessage = (event) => {
      if (event.data.split(",")[0] !== "MANUAL") {
        const id = event.data.split(",")[1].split("_")[1]
        filterOut(id)
      }      
    }
    return () => {
      ws.close()
    }
  }, [])

  // functions
  function handleDelete(e) {
    async function deleteItem(id) {
      const data = await fetch(`/api/tasks/${id}`, {method:"DELETE"})
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
  function filterOut(id) {
    setTasks(prevTasks => {
      return (
        prevTasks.filter(task => {
          return task.id !== id
        })
      )
    })  
  }

  return (
    <div className="mt-5">
      <h3>Scheduled events</h3>
      <ul className="list-group mt-3">
        <li className="list-group-item list-item">
          <div className="row">
            <div className="col-2 d-flex align-items-center"><b>Time</b></div>
            <div className="col-4 d-flex align-items-center"><b>Action</b></div>
            <div className="col-4 d-flex align-items-center"><b>Details</b></div>
            <div className="col-2 d-flex align-items-center hover"><b>Controls</b></div>
          </div>          
        </li>
        {tasks && tasks.map(task => {
          return ( 
            <li className="list-group-item list-item" key={task.id}>
              <div className="row">
                <div className="col-2 d-flex align-items-center">{task.task_date}</div>
                <div className="col-4 d-flex align-items-center">{task.task}</div>
                <div className="col-4 d-flex align-items-center">Details</div>
                <div className="col-2 d-flex align-items-center hover">
                  <Button variant="primary" className="mr-2"><Link to={`/schedule/${task.id}`} className="link">Edit</Link></Button>
                  <Button variant="danger" onClick={handleDelete} name={task.id}>Delete</Button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Scheduler