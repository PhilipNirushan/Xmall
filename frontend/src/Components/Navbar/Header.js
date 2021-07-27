import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import './Header.css'
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar
        bg='myNav'
        variant='dark'
        expand='lg'
        sticky='top'
        collapseOnSelect
      >
        <Container className='navContainer' fluid>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image
                src='/Images/logo.png'
                className='d-inline-block align-top imgLogo'
                alt='Logo'
                fluid
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/about' exact>
                <Nav.Link className='nav-text'>About</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/shops' exact>
                <Nav.Link className='nav-text'>Shopping</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/events' exact>
                <Nav.Link className='nav-text'>Events</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/register'>
                <Nav.Link className='nav-text'>Sign Up</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  className='nav-text'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='nav-text'>Sign In</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' className='nav-text'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/shoplist'>
                    <NavDropdown.Item>Shops</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/eventlist'>
                    <NavDropdown.Item>Events</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/bookinglist'>
                    <NavDropdown.Item>Bookings</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
