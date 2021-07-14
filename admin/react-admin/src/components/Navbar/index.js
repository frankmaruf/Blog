import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {FaShoppingCart, FaUser} from "react-icons/fa"
import {FiLogOut} from "react-icons/fi"
import {NavLink,Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { AuthenticateUserDetail, logout } from "../actions/userAction";
import { Button } from "@material-ui/core";
const MyNavbar = () => {
  const userLogin = useSelector(state => state.userLogin)
    const {user,isAuthenticated} = userLogin
    console.log("from Navbar",isAuthenticated);
    const dispatch = useDispatch()
    const logoutHandler = async() =>{
        dispatch(logout())
    }
    useEffect(() => {
      if (isAuthenticated) {
        window.location.reload(false);
      }
    } , [isAuthenticated])
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
              </NavDropdown>
             {user ? (
        <NavDropdown title={user.first_name} id='username'>
            <LinkContainer to="/profile">
                <NavDropdown.Item>
                  Profile
                </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <LinkContainer to="/login">
        <Nav.Link><FaUser/>Login</Nav.Link>
        </LinkContainer>
      )}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
