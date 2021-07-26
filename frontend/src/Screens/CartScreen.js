import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import styled from 'styled-components'

const Heading = styled.h1`
  font-weight: 400;
  text-transform: uppercase;
`

const CartScreen = ({ match, location, history }) => {
  const eventId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    if (eventId) {
      dispatch(addToCart(eventId, qty))
    }
  }, [dispatch, eventId, qty])

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=payment')
  }

  return (
    <Container className='my-5'>
      <Row>
        <Col md={8}>
          <Heading className='mb-5'>Bookings</Heading>
          {cartItems.length === 0 ? (
            <Message>
              No Bookings have been made
              <Link to='/' className='mx-5'>
                Go Back
              </Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.event}>
                  <Row>
                    <Col md={2} className='cart-col'>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='cart-col'>
                      <Link to={`/events/${item.event}`}>{item.name}</Link>
                    </Col>
                    <Col md={2} className='cart-col'>
                      ${item.price}
                    </Col>
                    <Col md={2} className='cart-col'>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={e =>
                          dispatch(
                            addToCart(item.event, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} className='cart-col mb-4'>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.event)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} className='my-5'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='py-2'>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                <span>Total Price:</span>
                <span>&nbsp;&nbsp;</span>$
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block btn1'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen
