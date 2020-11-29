import React from 'react'
import Container from 'react-bootstrap/Container';
import ManualControl from './Home/ManualControl'

function Home() {
  return (
    <Container className='mt-3'>
      <h4>Home</h4>
      <ManualControl />
    </Container>
  )
}

export default Home