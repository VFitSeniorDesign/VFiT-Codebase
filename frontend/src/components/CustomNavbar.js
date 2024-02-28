import React , { useContext }from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './CustomNavbar.css'
import { Button } from "react-bootstrap";
import AuthContext from "./AuthContext";

function CustomNavbar() {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <Navbar expand="lg" fixed="top" className="CustomNavbar-MainContainer">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="CustomNavbar-ItemsContainer">
            <div style={{display: "flex", border: "hidden"}}>
              <Nav.Link href="/explore" style={{color: "black", fontSize: "1.2rem"}}>Explore</Nav.Link>
              <Nav.Link href="/loadSaves" style={{color: "black", fontSize: "1.2rem"}}>Load</Nav.Link>
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
              <NavDropdown.Item href="#action/3.3">Contact</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <Button style={{width: "100%", height: "100%", border: "hidden"}} onClick={logoutUser}>
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;