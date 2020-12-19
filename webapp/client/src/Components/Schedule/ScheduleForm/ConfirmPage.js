import React from 'react'
import {Card} from 'react-bootstrap'


function ConfirmPage(props) {

  let array = []
  for (let i = 0; i < props.names.length; i++) {
    array.push(
      <Card key={i}>        
        <Card.Body>
          <Card.Title>{props.names[i]}</Card.Title>
          <Card.Text>{props.values[i]}</Card.Text>
        </Card.Body>
      </Card>
    );
    
  }

  return(
    <div className='mb-3'>
      {array}
    </div>
  )
}

export default ConfirmPage