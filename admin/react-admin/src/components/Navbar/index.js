import React from "react";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {FaShoppingCart, FaUser} from "react-icons/fa"
import {NavLink} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import axios from 'axios';
import { logout } from "../actions/userAction";
const MyNavbar = () => {
  const userLogin = useSelector(state => state.userLogin)
    const {userJWT} = userLogin
    const dispatch = useDispatch()
    const logoutHandler = async() =>{
      await axios.post('logout', {});
        dispatch(logout())
    }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavLink to="/">
          <Navbar.Brand>Maruf's Blog</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/category">
              <Nav.Link>Category</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tag">
              <Nav.Link>Tag</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown
              className="navbar-right"
              title="Get More"
              id="collasible-nav-dropdown"
            >
              <NavLink to="/feedback">
                <NavDropdown.Item>Feedback</NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="/contact_us">
                <NavDropdown.Item>Contact us</NavDropdown.Item>
              </NavLink>
              {userJWT ? ( <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              ):<a href="/login">Login</a>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
