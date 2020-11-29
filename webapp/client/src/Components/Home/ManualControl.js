import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Slider from './ManualControl/Slider'

function ManualControl() {
  const [state, setState] = useState({
    xRotation: 0,
    zRotation: 0,
    focus: 0,
    canRotate: true,
    canFocus: true
  })

  function handleChange(event) {
    const {name, value} = event.target
    if (name === 'focus') {
      setState(prevState => {
        return {...prevState, [name]: value, canFocus: true}
      }
    )
    } else {
      setState(prevState => {
        return {...prevState, [name]: value, canRotate: true}
      }
    )
    }
  }

  function handleClick(event) {
    const {name} = event.target
    setState(prevState => {
        return {...prevState, [name]: false}
      }
    )
  }

  return (
    <div>
      <h4>Manual control</h4>
      <div>
        <Slider 
          title='X rotation' 
          name='xRotation' 
          handleChange={handleChange} 
          value={state.xRotation} 
        />    
        <Slider 
          title='Z rotation' 
          name='zRotation' 
          handleChange={handleChange} 
          value={state.zRotation} 
        /> 
        <Slider 
          title='Focus' 
          name='focus'
          max='100'
          step='1' 
          handleChange={handleChange} 
          value={state.focus} 
        />
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <Button name='canRotate' className='mr-1 ml-1' disabled={!state.canRotate} onClick={handleClick}>Rotate</Button>
        <Button name='canFocus' className='mr-1 ml-1' disabled={!state.canFocus} onClick={handleClick}>Focus</Button>
        <Button className='mr-1 ml-1'>Take photo</Button>
        <Button className='mr-1 ml-1'>Start streaming</Button>
      </div>
    </div>    
  )
}

export default ManualControl