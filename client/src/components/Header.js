import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Image,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
// import logo from '../logo512.png';
import Logo from '../img/logo192.png';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userInfo = {
  //   name: 'Patrick Gaffney',
  //   isAdmin: false,
  // };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to={`/`}>
            <Navbar.Brand>
              <Image src={Logo} width="60" fluid />
              Master Catalog
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {userInfo && (
                <LinkContainer to={`/create-catalog/`}>
                  <Button>
                    <i className="fas fa-plus"></i> &nbsp; New Catalog
                  </Button>
                </LinkContainer>
              )}
              &nbsp;
              {/* userInfo.name.split(' ')[0] */}
              {userInfo ? (
                <NavDropdown
                  title={userInfo?.user?.name?.split(' ')[0].toUpperCase()}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
