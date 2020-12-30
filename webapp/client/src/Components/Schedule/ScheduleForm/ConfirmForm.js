import React from 'react'
import {Card, Button} from 'react-bootstrap'

function ConfirmForm(props) {
  // props variables
  const {names, values, prevStep, confirm, loading} = props

  let array = []
  for (let i = 0; i < names.length; i++) {
    array.push(
      <Card key={i}>        
        <Card.Body>
          <Card.Title>{names[i]}</Card.Title>
          <Card.Text>{values[i]}</Card.Text>
        </Card.Body>
      </Card>
    );    
  }
  
  return (
    <div>
      <div>
        {array}
      </div>
      <div className='mt-3'>
        <Button onClick={prevStep} disabled={loading} className='mr-2'>Back</Button>
        <Button onClick={confirm} disabled={loading}>Confirm</Button>
      </div>
    </div>
  )
}

export default ConfirmForm