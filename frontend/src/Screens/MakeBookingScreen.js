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
import { createBooking } from '../actions/bookingActions'
import Message from '../Components/Message'
import BookingSteps from '../Components/BookingSteps'
import styled from 'styled-components'

const Heading = styled.h1`
  text-transform: uppercase;
  font-weight: 400;
`
const Heading2 = styled.h2`
  font-weight: 300;
`
const Test = styled.span`
  font-size: 20px;
  font-weight: 700;
`
const Heading21 = styled.h2`
  text-transform: uppercase;
  font-weight: 400;
  @media only screen and (max-width: 991px) {
    font-size: 30px;
  }
`

const MakeBookingScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const userLogin = useSelector(state => state.userLogin)

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // Calculate Prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.totalPrice = Number(cart.itemsPrice).toFixed(2)

  const bookingCreate = useSelector(state => state.bookingCreate)
  const { booking, success, error } = bookingCreate

  useEffect(() => {
    if (success) {
      history.push(`/booking/${booking._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const bookEventHandler = () => {
    dispatch(
      createBooking({
        bookingItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <Container className='my-5'>
      <BookingSteps step1 step2 step3 />
      <Row className='py-3'>
        <Col lg={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Heading className='pb-4'>Event Booking</Heading>
              <Test>Ref No: </Test>
              {userLogin.userInfo._id}
            </ListGroup.Item>

            <ListGroup.Item>
              <Heading2 className='py-3'>Payment Method</Heading2>
              <Test>Method: </Test>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <Heading2 className='pt-3'>Booking Items</Heading2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is emapty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className='mt-3'>
                        <Col lg={2} className='cart-col'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col className='cart-col'>
                          <Link to={`/events/${item.event}`}>{item.name}</Link>
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
        <Col lg={4} className='py-5'>
          <Card className='makecenter'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Heading21>Booking Summary</Heading21>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block btn1'
                  disabled={cart.cartItems === 0}
                  onClick={bookEventHandler}
                >
                  Book Now
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MakeBookingScreen
