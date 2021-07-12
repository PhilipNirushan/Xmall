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

const BookScreen = ({ history }) => {
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
    <Container>
      <BookingSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>Booking</h1>
              <strong>Ref No: </strong>
              {userLogin.userInfo._id}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Booking Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is emapty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                          <Link to={`/events/${item.event}`}>{item.name}</Link>
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
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

export default BookScreen
