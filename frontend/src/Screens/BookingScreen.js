import React, { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBookingDetails } from '../actions/bookingActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const BookingScreen = ({ match }) => {
  const bookingId = match.params.id
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const bookingDetails = useSelector(state => state.bookingDetails)
  const { booking, loading, error } = bookingDetails

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  if (!loading) {
    // Calculate Prices
    booking.itemsPrice = addDecimals(
      booking.bookingItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    dispatch(getBookingDetails(bookingId))
  }, [dispatch, bookingId])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Container>
        <h1>Booking {booking._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h1>Booking</h1>
                <p>
                  <strong>Name: </strong> {booking.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${booking.user.email}`}>
                    {booking.user.email}
                  </a>
                </p>
                <strong>Ref No: </strong>
                {userLogin.userInfo._id}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  {' '}
                  <strong>Method: </strong>
                  {booking.paymentMethod}
                </p>
                {booking.isPaid ? (
                  <Message variant='success'>Paid on {booking.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Booking Items</h2>
                {booking.bookingItems.length === 0 ? (
                  <Message>Booking is emapty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {booking.bookingItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/events/${item.event}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} =$
                            {addDecimals(item.qty * item.price)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Booking Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Events</Col>
                    <Col>${booking.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${booking.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BookingScreen
