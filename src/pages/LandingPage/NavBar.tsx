import React from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from '../../assets/dark logo new colors.png'
import logo2 from '../../assets/pythiamatch_by_tovtech_logo.jpg'
type Props = {}

const NavBar = (props: Props) => {
  return (
   
    <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              // src="https://dogagingproject.org/_next/image?url=https%3A%2F%2Fcontent.dogagingproject.org%2Fwp-content%2Fuploads%2F2020%2F11%2Fhelena-lopes-S3TPJCOIRoo-unsplash-scaled.jpg&w=3840&q=75"
              src={logo2}
              width="130"
              height="130"
              className=""
              alt="React Bootstrap logo"
              style={{}}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto p-4 ">
              <Nav.Link href="#home">home</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#Features">Features</Nav.Link>
              <Nav.Link href="#Plans">Plans</Nav.Link>
              <Nav.Link href="#Reviews">Reviews</Nav.Link>
              <Nav.Link href="#Team">Team</Nav.Link>
              <Nav.Link href="#Contact">Contact</Nav.Link>
            </Nav>
            <Nav className='d-flex gap-4'>
              <Nav.Link href="#sign in">sign in</Nav.Link>
              <Button href="#sign up" style={{backgroundColor:'#03024e', borderColor:'#03024e'}}>sign up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  )
}

export default NavBar