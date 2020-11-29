import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap';

function Menu() {

  const [active, setActive] = useState(0)

  function handleClick(event) {
    switch (event.target.getAttribute('name')) {
      case 'home':
        setActive(0)
        break;
      case 'photos':
        setActive(1)
        break;
      case 'schedule':
        setActive(2)
      break;
      default:
        break;
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to='/'>
          <li className='navbar-brand' name='home' onClick={handleClick}>Pikon controller</li>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to='/'>
              <li className={active === 0 ? 'nav-link active' : 'nav-link'} name='home' onClick={handleClick}>Home</li>
            </Link>
            <Link to='/photos'>
              <li className={active === 1 ? 'nav-link active' : 'nav-link'} name='photos' onClick={handleClick}>Photos</li>
            </Link>
            <Link to='/schedule'>
              <li className={active === 2 ? 'nav-link active' : 'nav-link'} name='schedule' onClick={handleClick}>Schedule</li>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>        
    </Navbar>
  )
}

export default Menu