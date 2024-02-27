import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './CustomNavbar.css'

function CustomNavbar() {
  return (
    <Navbar expand="lg" fixed="top" className="CustomNavbar-MainContainer">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="CustomNavbar-ItemsContainer">
            <div style={{display: "flex", border: "hidden"}}>
              <Nav.Link href="#home" style={{color: "black", fontSize: "1.2rem"}}>Explore</Nav.Link>
              <Nav.Link href="#link" style={{color: "black", fontSize: "1.2rem"}}>Load</Nav.Link>
            </div>
            <Navbar.Brand 
                href="/" 
                className="Navbar-CenterBrand" 
                style={{font: "arial", 
                        fontWeight: "700", 
                        fontSize: "2rem",
                        }}
            >
              VFiT Technologies
            </Navbar.Brand>
            <NavDropdown title="Account" id="basic-nav-dropdown" style={{color: "black", border: "hidden", paddingTop: "5px"}}>
              <NavDropdown.Item href="/createmodel">Create Model</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Saves</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Contact
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;