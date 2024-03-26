import React, { useContext } from "react";
import { Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import styled from 'styled-components';
import AuthContext from "./AuthContext";

const StyledNavbar = styled(Navbar)`
  background-color: #fff; // Adjust the background color as needed
  border: 1px solid #ddd; // Adds a border around the Navbar
  border-bottom-left-radius: 25%; // Noticeable curve on the bottom left
  border-bottom-right-radius: 25%; // Noticeable curve on the bottom right
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px; // Adjust based on your max content width
  margin: 0 auto;
  padding: 0 15px;
  align-items: center; // Ensures vertical centering of the content
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; // Adds space between "Explore" and "Load" links
`;

const StyledNavLink = styled(Nav.Link)`
  color: black;
  font-size: 1.2rem; // Uniform font size for all links
  &:hover {
    color: grey; // Adjust hover color as needed
  }
`;

const CenterBrand = styled(Navbar.Brand)`
  font: Arial, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: black;
  margin: 0 auto; // Centers the brand in the flex container
`;

const StyledNavDropdown = styled(NavDropdown)`
  .nav-link {
    color: black;
  }
  .dropdown-toggle {
    font-size: 1.2rem; // Ensures the dropdown has the same font size as other links
    align-self: center; // Centers the dropdown vertically
  }
  .dropdown-menu {
    width: 100%;
  }
`;
const logoutUser = () => {
    
}

function CustomNavbar() {
  //const { user, logoutUser } = useContext(AuthContext);

  return (
    <StyledNavbar expand="lg" fixed="top">
      <NavigationContainer>
        <LeftNav>
          <StyledNavLink href="/explore">Explore</StyledNavLink>
          <StyledNavLink href="/loadSaves">Load</StyledNavLink>
        </LeftNav>
        <CenterBrand href="/">VFiT Technologies</CenterBrand>
        <StyledNavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="/createmodel">Create Model</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Contact</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <Button onClick={logoutUser} style={{ width: "100%" }}>
              Logout
            </Button>
          </NavDropdown.Item>
        </StyledNavDropdown>
      </NavigationContainer>
    </StyledNavbar>
  );
}

export default CustomNavbar;
