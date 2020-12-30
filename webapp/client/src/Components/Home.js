import React from 'react'
import Container from 'react-bootstrap/Container';
import ManualControl from './Home/ManualControl'
import Scheduler from './Home/Scheduler'

function Home() {
  return (
    <Container className='mt-3'>
      <h4>Home</h4>
      <ManualControl />
      <Scheduler />
    </Container>
  )
}

export default Home