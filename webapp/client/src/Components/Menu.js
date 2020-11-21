import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap';

function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to='/'>
          <Navbar.Brand href="/">Pikon controller</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to='/'>
              <Nav.Link href='/'>Home</Nav.Link>
            </Link>
            <Link to='/photos'>
              <Nav.Link href='/photos'>Photos</Nav.Link>
            </Link>
            <Link to='/schedule'>
              <Nav.Link href='/schedule'>Schedule</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>        
    </Navbar>
  )
}

export default Menu