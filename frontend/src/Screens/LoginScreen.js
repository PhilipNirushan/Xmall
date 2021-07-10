import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

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
        <Row className='justify-content-md-center'>
          {/* <Col md='5'>
            <Image src='/Images/interface.png' alt='login' fluid />
          </Col> */}
          <Col xs={12} md={7} className='px-5 pt-5'>
            <h4>Sign into your account</h4>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Row>
                <Col lg='7'>
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
                <Col lg='7'>
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
                  <Button type='submit' variant='primary' className='btn1'>
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
