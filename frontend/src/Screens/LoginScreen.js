import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import styled from 'styled-components'

/* Styling Begins */
const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
  @media (min-width: 992px) {
    font-size: 2.7rem;
  }
`
/* Styling Ends */

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='my-4 my-5'>
      <Container>
        <Row className='justify-content-md-center '>
          <Col xs={12} md={7} lg={5} className='px-5 pt-5 mb-3'>
            <div>
              <LoginTitle className='animate__animated animate__pulse'>{`Welcome Back :)`}</LoginTitle>
              <span>
                To keep connected with us please login with your personal
                information by email address and password{' '}
              </span>
            </div>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Row>
                <Col>
                  <Form.Group controlId='email'>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className='my-3 p-4'
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId='password'>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className='my-3 p-4'
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row className='mt-3'>
                <Col lg='7'>
                  <Button type='submit' className='btn1'>
                    Sign In
                  </Button>
                </Col>
              </Form.Row>
            </Form>
            <Row className='py-3'>
              <Col>
                New Customer?{' '}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginScreen
