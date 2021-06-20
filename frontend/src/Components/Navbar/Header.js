import React from 'react'
import logo from '../Images/logo.png'
import './Header.css'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <header >
            <Navbar bg="myNav" variant="dark" expand="lg" sticky="top" collapseOnSelect>     
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} className="d-inline-block align-top imgLogo"  alt="Logo" fluid/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" className="text-white"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                        <Nav.Link href="#link" className="text-white"><i className="fas fa-user"></i> Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>

        </Navbar>
    </header>
    )
}

export default Header
