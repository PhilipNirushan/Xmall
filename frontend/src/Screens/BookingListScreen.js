import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { listBookings } from '../actions/bookingActions'
import styled from 'styled-components'

const Heading = styled.h1`
  font-weight: 300;
  text-transform: uppercase;
`

const BookingListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const bookingList = useSelector(state => state.bookingList)
  const { loading, error, bookings } = bookingList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBookings())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <Container className='my-5'>
      <Heading className='pb-4'>Bookings</Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                <td>{booking.user && booking.user.name}</td>
                <td>{booking.createdAt.substring(0, 10)}</td>
                <td>${booking.totalPrice}</td>
                <td>
                  {booking.isPaid ? (
                    booking.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/booking/${booking._id}`}>
                    <Button variant='dark' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default BookingListScreen
