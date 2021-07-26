import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap'
import { listMyBookings } from '../actions/bookingActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import styled from 'styled-components'

const Heading2 = styled.h2`
  text-transform: uppercase;
  font-weight: 400;
  font-size: 30px;
`

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const bookingListMy = useSelector(state => state.bookingListMy)
  const {
    loading: loadingBookings,
    error: errorBookings,
    bookings,
  } = bookingListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyBookings())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Container className='my-5'>
      <Row>
        <Col lg={3}>
          <Heading2 className='makecenter pb-3'>User Profile</Heading2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated!</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Row className='mt-4 mb-5'>
              <Col>
                <Button type='submit' className='btn1'>
                  Update
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
        <Col lg={9}>
          <Heading2 className='makecenter profile-row pb-5'>
            My Bookings
          </Heading2>
          {loadingBookings ? (
            <Loader />
          ) : errorBookings ? (
            <Message variant='danger'>{errorBookings}</Message>
          ) : (
            <Table striped borderd hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.createdAt.substring(0, 10)}</td>
                    <td>{booking.totalPrice}</td>
                    <td>
                      {booking.isPaid ? (
                        booking.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/booking/${booking._id}`}>
                        <Button className='btn-sm' variant='dark'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
