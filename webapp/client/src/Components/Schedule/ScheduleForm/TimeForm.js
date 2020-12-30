import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'

function TimeForm(props) {
  // variables
  const {title, value, handleChange, nextStep, prevStep} = props
  const [error, setError] = useState({
    invalid: false,
    message: ''
  })

  useEffect(() => {
    if (value.length === 0) {
      setError({invalid: true, message: 'invalid date'})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // validation
  function validate(e) {
    const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/
    const input = e.target.value

    if (input.match(regex)) {
      const timestamp = new Date(input)
      const now = new Date()
      if (timestamp < now) {
        setError({invalid: true, message: 'past date'})
      } else {
        async function post(time) {
          const data = await fetch('/api/tasks/validate', {
            method:'POST',
            body: JSON.stringify({time}), 
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          const json = await data.json()
          if (json.valid) {
            setError({invalid: false})
          } else {
            setError({invalid: true, message: 'date already in the database'})            
          }
        }
        post(input)
      }
    } else {
      setError({invalid: true, message: 'invalid date'})
    }

    handleChange(e)
  }

  return (
    <div>
      <div>
        <Form.Label>{title}</Form.Label>
        <Form.Control 
          name='time'
          type='text'
          placeholder='2021-01-01 00:00:00'
          value={value}
          onChange={validate}
          isInvalid={error.invalid}
        />
        <Form.Control.Feedback type='invalid'>
          {error.message}
        </Form.Control.Feedback>
      </div>
      <div className='mt-3'>
        <Button onClick={prevStep} className='mr-2'>Back</Button>
        <Button onClick={nextStep} disabled={error.invalid}>Continue</Button>
      </div>
    </div>    
  )
}

export default TimeForm