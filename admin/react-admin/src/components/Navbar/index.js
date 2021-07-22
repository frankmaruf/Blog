import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {FaShoppingCart, FaSignOutAlt, FaTags, FaUser} from "react-icons/fa"
import {GrBlog} from "react-icons/gr"
import {FiUsers} from "react-icons/fi"
import {BiBorderAll} from "react-icons/bi"
import {NavLink,Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { logout } from "../actions/userAction";
const MyNavbar = () => {
  const userLogin = useSelector(state => state.userLogin)
    const {user} = userLogin
    const dispatch = useDispatch()
    const logoutHandler = async() =>{
        dispatch(logout())
    }
  return (
    <div>
      <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
      <NavLink to="/">
      <Navbar.Brand><GrBlog style={{background:"#03fce3",width:"45px",borderRadius:"5px"}}/>Maruf's Blog</Navbar.Brand>
      </NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <LinkContainer to="/category">
      <Nav.Link><BiBorderAll/>Category</Nav.Link></LinkContainer>
      <LinkContainer to="/tag">
      <Nav.Link><FaTags/>Tag</Nav.Link></LinkContainer>
      {user && (
        <LinkContainer to="/users">
      <Nav.Link><FiUsers/>Users</Nav.Link></LinkContainer>
        )
      }

      {user ? (
        <NavDropdown title={user.last_name} id='username'>
            <LinkContainer to="/user">
                <NavDropdown.Item>
                  <FaUser/>
                  Profile
                </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}><FaSignOutAlt/> Logout</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <LinkContainer to="/login">
        <Nav.Link><FaUser/>Login</Nav.Link>
        </LinkContainer>
      )}
    </Nav>
    
  </Navbar.Collapse>
  </Container>
</Navbar>
            </header>
    </div>
  );
};

export default MyNavbar;
