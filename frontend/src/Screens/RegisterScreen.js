import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { register } from '../actions/userActions'

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    background: #9b59b5;
  }
`

const UserDetails = styled.div`
  @media only screen and (max-width: 576px) {
    height: 300px;
    overflow: scroll;
  }
`

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
            <Title>Registration</Title>
            <div>
              {message && <Message variant='danger'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
              <Form className='mt-4' onSubmit={submitHandler}>
                <UserDetails>
                  <Form.Row className='mb-1'>
                    <Col>
                      <Form.Group controlId='name'>
                        <Form.Label>FullName</Form.Label>
                        <Form.Control
                          type='text'
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
                {/* <fieldset>
                  <Form.Row className='mb-1' style={{ 'margin-left': '1px' }}>
                    <Form.Label>Gender</Form.Label>
                  </Form.Row>
                  <Form.Group as={Row}>
                    <Col sm='3' xs='2'>
                      <Form.Check
                        inline
                        type='radio'
                        label='Male'
                        name='formHorizontalRadios'
                        id='formHorizontalRadios1'
                      />
                    </Col>
                    <Col sm='3' xs='2'>
                      <Form.Check
                        inline
                        type='radio'
                        label='Female'
                        name='formHorizontalRadios'
                        id='formHorizontalRadios2'
                      />
                    </Col>
                    <Col sm='4' xs='8'>
                      <Form.Check
                        inline
                        type='radio'
                        label='Prefer not to say'
                        name='formHorizontalRadios'
                        id='formHorizontalRadios3'
                        className='radioOther'
                      />
                    </Col>
                  </Form.Group>
                </fieldset> */}
                <Form.Row className='my-3'>
                  <Col>
                    <Button variant='primary' type='submit' className='btn1'>
                      Register
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </div>
            <Row className='py-3'>
              <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Login
                </Link>
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
