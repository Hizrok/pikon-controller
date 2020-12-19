import React, {useState} from 'react'
import TaskSelection from './ScheduleForm/TaskSelection'
import RotateForm from './ScheduleForm/RotateForm'
import PhotoForm from './ScheduleForm/PhotoForm'
import LivestreamForm from './ScheduleForm/LivestreamForm'
import ConfirmPage from './ScheduleForm/ConfirmPage'
import {Button} from 'react-bootstrap'

function ScheduleForm() {
  const [state, setState] = useState({
    step: 1,
    task: 'rotate',
    xRotation: 0,
    zRotation: 0,
    focus: 0,
    photoTime: '',
    livestreamStartTime: '',
    livestreamEndTime: ''
  })

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
  function sliderChange(event) {
    const {name, value} = event.target
    if (name === 'focus') {
      setState(prevState => {
        return {...prevState, [name]: value}
      })
    } else {
      setState(prevState => {
        return {...prevState, [name]: value}
      })
    }
  }
  function confirm() {
    console.log('wow')
  }

  let formParts = [<TaskSelection onSelect={onSelect} task={state.task} />]
  switch (state.task) {
    case 'rotate':   
      formParts = [
        <TaskSelection onSelect={onSelect} task={state.task} />,
        <RotateForm 
          handleChange={sliderChange} 
          xRotation={state.xRotation}
          zRotation={state.zRotation}
          focus={state.focus} 
        />,
        <ConfirmPage 
          names={['Task', 'X rotation', 'Z rotation', 'focus']}
          values={['Rotate', state.xRotation, state.zRotation, state.focus]}
        />
      ]   
      break
    case 'photo':
      formParts = [
        <TaskSelection onSelect={onSelect} task={state.task} />,
        <PhotoForm 
          handleChange={handleChange}
          value={state.photoTime}        
        />,
        <ConfirmPage />
      ] 
      break
    case 'rotateAndPhoto':
      formParts = [
        <TaskSelection onSelect={onSelect} task={state.task} />,
        <RotateForm 
          handleChange={sliderChange} 
          xRotation={state.xRotation}
          zRotation={state.zRotation}
          focus={state.focus} 
        />,
        <PhotoForm 
          handleChange={handleChange}
          value={state.photoTime}        
        />,
        <ConfirmPage />
      ] 
      break
    case 'livestream':
      formParts = [
        <TaskSelection onSelect={onSelect} task={state.task} />,
        <LivestreamForm 
          startTime={state.livestreamStartTime}
          endTime={state.livestreamEndTime}
          handleChange={handleChange}
        />,
        <ConfirmPage />
      ] 
      break
    default:
      break
  }

  return (    
    <div>
      <p className='mb-1'>step: {state.step}</p> 
      <p className='mb-1'>task: {state.task}</p>  
      {formParts[state.step-1]}  
      <Button className='mr-3' disabled={state.step === 1} onClick={prevStep}>Back</Button>
      {
        formParts.length > 1 && state.step === formParts.length ?
        <Button onClick={confirm}>Confirm</Button> :
        <Button onClick={nextStep}>Continue</Button>
      }      
    </div>    
  )
}

export default ScheduleForm  