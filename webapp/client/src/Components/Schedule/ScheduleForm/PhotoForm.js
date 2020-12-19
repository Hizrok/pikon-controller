import React from 'react'
import {Form} from 'react-bootstrap'

function PhotoForm(props) {
  return(
    <div className='mb-3'>
      <Form.Label>Time</Form.Label>
      <Form.Control 
        name='photoTime'
        type='text'
        placeholder='21:00 20.12.2020'
        value={props.value} 
        onChange={props.handleChange} 
      />      
    </div>
  )
}

export default PhotoForm