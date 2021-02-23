import React from "react"
import {Card, Button} from "react-bootstrap"

function ConfirmForm(props) {
  // props variables
  const {names, values, prevStep, confirm, loading} = props

  let array = []
  for (let i = 0; i < names.length; i++) {
    array.push(
      <Card className="mb-2" key={i}>        
        <Card.Body>
          <Card.Title>{names[i]}</Card.Title>
          <Card.Text>{values[i]}</Card.Text>
        </Card.Body>
      </Card>
    );    
  }
  
  return (
    <div>
      <h3 className="mb-3" style={{textAlign: "center"}}>Confirmation</h3> 
      <div>
        {array}
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Button onClick={prevStep} disabled={loading} className="mr-2">Back</Button>
        <Button onClick={confirm} disabled={loading}>Confirm</Button>
      </div>
    </div>
  )
}

export default ConfirmForm