import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import './Header.css'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <header >
            <Navbar bg="myNav" variant="dark" expand="lg" sticky="top" collapseOnSelect>
                <Container fluid>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src="/Images/logo.png" className="d-inline-block align-top imgLogo" alt="Logo" fluid />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/' exact>
                                <Nav.Link className="text-white">Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/shops' exact>
                                <Nav.Link className="text-white">Shops</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/contact'>
                                <Nav.Link className="text-white">Contact</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link className="text-white"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link className="text-white"><i className="fas fa-user"></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
