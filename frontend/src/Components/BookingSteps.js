import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// import { NavLink } from 'react-router-dom'

const BookingSteps = ({ step1, step2, step3 }) => {
  return (
    <Container>
      <Nav className='justify-content-center mb-4'>
        <Nav.Item>
          {step1 ? (
            <LinkContainer to='/login'>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to='/payment'>
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step3 ? (
            <LinkContainer to='/bookevent'>
              <Nav.Link>Book Event</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Book Event</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </Container>
  )
}

export default BookingSteps
