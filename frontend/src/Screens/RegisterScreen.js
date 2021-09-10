import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { register } from '../actions/userActions'

/* Styling Begins */

const RegisterTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  @media only screen and (max-width: 576px) {
    text-align: center;
  }
  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
  @media (min-width: 992px) {
    font-size: 2.7rem;
  }
`
const UserDetails = styled.div`
  @media only screen and (max-width: 576px) {
    height: 300px;
    overflow: scroll;
    padding: 0px 15px;
  }
`
const RegisterButton = styled.div`
  @media only screen and (max-width: 576px) {
    padding: 0px 15px;
  }
`

const AccountLink = styled.div`
  @media only screen and (max-width: 576px) {
    text-align: center;
  }
`

/* Styling  Ends*/

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <div>
      <Container>
        <Row className='my-5'>
          <Col lg='2'></Col>
          <Col lg='8'>
            <RegisterTitle className='animate__animated animate__pulse'>
              Registration
            </RegisterTitle>
            <div>
              {message && <Message variant='danger'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
              <Form className='mt-4' onSubmit={submitHandler}>
                <UserDetails>
                  <Form.Row className='mb-1'>
                    <Col>
                      <Form.Group controlId='name'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type='name'
                          placeholder='Enter your Name'
                          value={name}
                          onChange={e => {
                            setName(e.target.value)
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row className='mb-1'>
                    <Col>
                      <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Enter your Email'
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value)
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row className='mb-1'>
                    <Col>
                      <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Enter your Password'
                          value={password}
                          onChange={e => {
                            setPassword(e.target.value)
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Confirm your Password'
                          value={confirmPassword}
                          onChange={e => {
                            setConfirmPassword(e.target.value)
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                </UserDetails>
                <Form.Row className='my-3'>
                  <Col>
                    <RegisterButton>
                      <Button type='submit' className='btn1'>
                        Register
                      </Button>
                    </RegisterButton>
                  </Col>
                </Form.Row>
              </Form>
            </div>
            <Row className='py-3'>
              <Col>
                <AccountLink>
                  Have an Account?{' '}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  >
                    Login
                  </Link>
                </AccountLink>
              </Col>
            </Row>
          </Col>
          <Col lg='2'></Col>
        </Row>
      </Container>
    </div>
  )
}

export default RegisterScreen
