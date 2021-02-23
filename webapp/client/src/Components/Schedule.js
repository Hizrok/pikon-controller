import React, {useState, useEffect} from 'react'
import ScheduleForm from './Schedule/ScheduleForm'
import Container from 'react-bootstrap/Container'

function Schedule({match}) {
  return (
    <Container className='mt-5'>
      <div className="card" style={{width: "800px", margin: "0 auto"}}>
        <div className="card-body">
          <ScheduleForm id={match.params.id} />
        </div>
      </div>      
    </Container>
  )
}

export default Schedule