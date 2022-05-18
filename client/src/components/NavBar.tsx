import { FC } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { ConnectButton } from "web3uikit";
import { NavLink } from "react-router-dom";
import { useMoralis } from "react-moralis";
const NavBar: FC = () => {
  const { isInitialized, isAuthenticated } = useMoralis();
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      style={{ zIndex: "10" }}
    >
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }} fill>
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/write">
              Write
            </Nav.Link>
            {isInitialized && isAuthenticated && (
              <Nav.Link as={NavLink} to="/myBlogs">
                MyBlogs
              </Nav.Link>
            )}
            <ConnectButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
