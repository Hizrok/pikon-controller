import React from 'react'
import Slider from '../../General/Slider' 

function RotateForm(props) {
  return(
    <div>
      <Slider 
        title='X rotation' 
        name='xRotation' 
        handleChange={props.handleChange} 
        value={props.xRotation} 
      />
      <Slider 
        title='Z rotation' 
        name='zRotation' 
        handleChange={props.handleChange} 
        value={props.zRotation} 
      />
      <Slider 
        title='Focus' 
        name='focus' 
        max='100'
        step='1' 
        handleChange={props.handleChange} 
        value={props.focus} 
      />
    </div>
  )
}

export default RotateForm  