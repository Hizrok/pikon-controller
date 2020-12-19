import React from 'react'
import ScheduleForm from './Schedule/ScheduleForm'
import Container from 'react-bootstrap/Container'

function Schedule() {
  return (
    <Container className='mt-3'>
      <h4>Schedule</h4>
      <ScheduleForm />
    </Container>
  )
}

export default Schedule