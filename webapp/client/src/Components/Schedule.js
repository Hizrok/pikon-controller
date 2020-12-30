import React, {useState, useEffect} from 'react'
import ScheduleForm from './Schedule/ScheduleForm'
import Container from 'react-bootstrap/Container'

function Schedule({match}) {
  return (
    <Container className='mt-3'>
      <h4>Schedule</h4>
      <ScheduleForm id={match.params.id} />
    </Container>
  )
}

export default Schedule