import React from "react"
import Container from "react-bootstrap/Container";
import ManualControl from "./Home/ManualControl"
import Scheduler from "./Home/Scheduler"

function Home() {
  return (
    <Container>
      <ManualControl />
      <Scheduler />
    </Container>
  )
}

export default Home