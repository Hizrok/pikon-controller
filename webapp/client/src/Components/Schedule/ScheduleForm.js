import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import RotateForm from './ScheduleForm/RotateForm'
import TaskForm from './ScheduleForm/TaskForm'
import TimeForm from './ScheduleForm/TimeForm'
import ConfirmForm from './ScheduleForm/ConfirmForm'

function ScheduleForm() {
  // state
  const [state, setState] = useState({
    step: 1,
    task: 'rotate',
    xRot: 0,
    zRot: 0,
    focus: 0,
    time: '',
    loading: false
  })
  // history (for redirecting)
  const history = useHistory();

  // functions
  function nextStep() {
    setState(prevState => {
      return {...prevState, step: prevState.step + 1}
    })
  }
  function prevStep() {
    setState(prevState => {
      return {...prevState, step: prevState.step - 1}
    })
  }
  function onSelect(e) {
    setState(prevState => {
      return {...prevState, task: e.target.name}
    })
  }
  function handleChange(event) {
    const {name, value} = event.target
    setState(prevState => {
      return {...prevState, [name]: value}
    })
  }
  function confirm(){
    // disable confirm button (loading)
    setState(prevState => {
      return {...prevState, loading: true}
    })

    const {task, xRot, zRot, focus, time} = state
    let tasks = []
    let names = []
    let values = []
    switch(task){
      case "rotate":
        names = ["task", "xRotation", "zRotation", "focus"]
        values = [task, xRot, zRot, focus]
        tasks.push({
          task: "rotate", 
          taskData: formatData(names, values), 
          taskDate: time
        })
        break;
      case "photo":
        tasks.push({
          task: "photo", 
          taskData: "task_photo", 
          taskDate: time
        })
        break;
      case "rotateAndPhoto":
        // rotate 1 minute before time
        let r = new Date(time)
        r.setMinutes(r.getMinutes() - 1)
        const rotateTimeString = dateString(r)
        names = ["task", "xRotation", "zRotation", "focus"]
        values = [task, xRot, zRot, focus]
        tasks.push({
          task: "rotate", 
          taskData: formatData(names, values), 
          taskDate: rotateTimeString
        })
        tasks.push({
          task: "photo", 
          taskData: "task_photo", 
          taskDate: time
        })
        break;
      /*case "livestream":
        tasks.push({
          task: "livestreamStart", 
          taskData: "task_livestreamStart", 
          taskDate: livestreamStartTime
        })
        tasks.push({
          task: "livestreamEnd", 
          taskData: "task_livestreamEnd", 
          taskDate: livestreamEndTime
        })
        break;*/
      default:
        break;
    }
    sendTasks(tasks)
  }
  function sendTasks(tasks) {
    async function post(tasks) {
      for (let i = 0; i < tasks.length; i++) {
        const data = await fetch('/api/tasks', {
          method:'POST',
          body: JSON.stringify(tasks[i]), 
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        const json = await data.json()
        console.log(json.message)
        if (i === tasks.length - 1) {
          // redirect home
          history.push('/')
        }         
      }      
    }
    post(tasks)
  }
  function formatData (a, b) {
    let c = []
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] + "_" + b[i]
    }
    return c.join()
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

  // dynamic form parts
  let formParts = [<TaskForm task={state.task} onSelect={onSelect} nextStep={nextStep} />]

  // switch
  switch (state.task) {
    case 'rotate':
      formParts = [
        <TaskForm task={state.task} onSelect={onSelect} nextStep={nextStep} />,
        <RotateForm xRot={state.xRot} zRot={state.zRot} focus={state.focus} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
        <TimeForm value={state.time} handleChange={handleChange} title='Time' nextStep={nextStep} prevStep={prevStep} />,
        <ConfirmForm 
          names={['X rotation', 'Z rotation', 'Focus', 'Time']}
          values={[state.xRot, state.zRot, state.focus, state.time]}
          prevStep={prevStep} confirm={confirm} loading={state.loading}
        />
      ]
      break;
    case 'photo':
      formParts = [
        <TaskForm task={state.task} onSelect={onSelect} nextStep={nextStep} />,
        <TimeForm value={state.time} handleChange={handleChange} title='Photo time' nextStep={nextStep} prevStep={prevStep} />,
        <ConfirmForm 
          names={['Time']}
          values={[state.time]}
          prevStep={prevStep} confirm={confirm} loading={state.loading}
        />
      ]
      break;
    case 'rotateAndPhoto':
      formParts = [
        <TaskForm task={state.task} onSelect={onSelect} nextStep={nextStep} />,
        <RotateForm xRot={state.xRot} zRot={state.zRot} focus={state.focus} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
        <TimeForm value={state.time} handleChange={handleChange} title='Photo time' nextStep={nextStep} prevStep={prevStep} />,
        <ConfirmForm 
          names={['X rotation', 'Z rotation', 'Focus', 'Time']}
          values={[state.xRot, state.zRot, state.focus, state.time]}
          prevStep={prevStep} confirm={confirm} loading={state.loading}
        />
      ]
      break;
    // livestream
  
    default:
      break;
  }
  
  return (
    <div>
      {formParts[state.step-1]}
    </div>
  )
}

export default ScheduleForm