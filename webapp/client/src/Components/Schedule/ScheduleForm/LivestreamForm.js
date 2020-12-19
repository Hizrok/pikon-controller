import React from 'react'
import {Form} from 'react-bootstrap'

function LivestreamForm(props) {
  return(
    <div className='mb-3'>
      <div>
        <Form.Label>Start time</Form.Label>
        <Form.Control 
          name='livestreamStartTime'
          type='text'
          placeholder='21:00 20.12.2020'
          value={props.startTime} 
          onChange={props.handleChange} 
        />   
      </div>
      <div className='mt-2'>
        <Form.Label>End time</Form.Label>
        <Form.Control 
          name='livestreamEndTime'
          type='text'
          placeholder='22:00 20.12.2020'
          value={props.endTime} 
          onChange={props.handleChange} 
        />
      </div>          
    </div>
  )
}

export default LivestreamForm