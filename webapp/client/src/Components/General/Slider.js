import React from 'react'
import {Form} from 'react-bootstrap'

function Slider (props) {
  // props: title, name, max, step, value, handleChange 
  return (
    <div className='slider-container'>
      <p className="mt-2 mb-0">{props.title}</p>
      <div className="d-flex align-items-center">
        <input 
          name={props.name} 
          type='range' 
          className='slider' 
          min='0' 
          max={props.max || '360'} 
          step={props.step || '0.01'} 
          value={props.value} 
          onChange={props.handleChange} 
        />
        <Form.Control 
          name={props.name}
          className='number-form form-control' 
          type='number' 
          min='0' 
          max={props.max || '360'} 
          step={props.step || '0.01'} 
          value={props.value} 
          onChange={props.handleChange} 
        />
      </div>
    </div>       
  )
}

export default Slider 