import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBookingDetails, payBooking } from '../actions/bookingActions'
import { BOOKING_PAY_RESET } from '../constants/bookingConstants'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import axios from 'axios'
import styled from 'styled-components'

const Heading = styled.h1`
  text-transform: uppercase;
  font-weight: 400;
  font-size: 30px;
`

const Test = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const TestHead = styled.span`
  font-weight: 600;
  @media only screen and (min-width: 768px) {
    font-size: 35px !important;
  }
  @media only screen and (min-width: 576px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 576px) {
    font-size: 20px;
  }
`

const Heading2 = styled.h2`
  text-transform: uppercase;
  font-weight: 400;
`

const BookingScreen = ({ match, history }) => {
  const bookingId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const bookingDetails = useSelector(state => state.bookingDetails)
  const { booking, loading, error } = bookingDetails

  const bookingPay = useSelector(state => state.bookingPay)
  const { loading: loadingPay, success: successPay } = bookingPay

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
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!booking || successPay) {
      dispatch({ type: BOOKING_PAY_RESET })
      dispatch(getBookingDetails(bookingId))
    } else if (!booking.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, bookingId, successPay, booking, history, userInfo])

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult)
    dispatch(payBooking(bookingId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Container className='my-5'>
        <TestHead>Booking {booking._id}</TestHead>
        <Row>
          <Col lg={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Heading className='py-4'>Booking</Heading>
                <p>
                  <Test>Name: </Test> {booking.user.name}
                </p>
                <p>
                  <Test>Email: </Test>
                  <a href={`mailto:${booking.user.email}`}>
                    {booking.user.email}
                  </a>
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <Heading className='py-4'>Payment Method</Heading>
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
                <Heading className='py-4'>Booking Events</Heading>
                {booking.bookingItems.length === 0 ? (
                  <Message>Booking is emapty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {booking.bookingItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col lg={2} className='cart-col'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col className='cart-col'>
                            <Link to={`/events/${item.event}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col lg={4} className='cart-col'>
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
          <Col lg={4} className='my-5'>
            <Card className='makecenter'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Heading2>Booking Summary</Heading2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${booking.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!booking.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={booking.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BookingScreen
