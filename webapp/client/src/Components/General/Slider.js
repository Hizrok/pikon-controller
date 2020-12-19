import React from 'react'
import {Form} from 'react-bootstrap'

function Slider (props) {
  return (
    <div className='mt-2' style={{width: '60%', margin: '0 auto'}}>
      <p style={{textAlign: 'center'}}>{props.title}</p>
      <div className='d-flex'>
        <div className='slider-container'>
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
        </div>
        <div style={{width:'20%'}}>
          <Form.Control 
            name={props.name}
            className='form-control col-xs-2 ml-3' 
            type='number' 
            min='0' 
            max={props.max || '360'} 
            step={props.step || '0.01'} 
            value={props.value} 
            onChange={props.handleChange} 
          />
        </div>        
      </div>
    </div>    
  )
}

export default Slider 