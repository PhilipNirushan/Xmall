import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Form,
  Button,
} from 'react-bootstrap'
import { listEventDetails } from '../actions/eventActions'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import styled from 'styled-components'

const EventDetails = styled.div`
  padding: 0 10px;
  @media (min-width: 768px) {
    padding: 0;
  }
  @media (min-width: 992px) {
    padding: 24px 25px;
  }
`
const EventName = styled.h1`
  text-transform: uppercase;
  font-weight: 300;
  @media (max-width: 575px) {
    font-size: 24px;
  }
  @media (min-width: 576px) {
    font-size: 30px;
  }
`
const FontBold = styled.span`
  font-weight: 700;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 992px) {
    font-size: 18px;
  }
`
const FontRegular = styled.span`
  font-weight: 400;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 992px) {
    font-size: 18px;
  }
`

const EachEventScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const eventDetails = useSelector(state => state.eventDetails)
  const { loading, error, event } = eventDetails

  useEffect(() => {
    dispatch(listEventDetails(match.params.id))
  }, [dispatch, match])

  const addTOCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <Container className='my-5'>
      <>
        <Link to='/' style={{ color: 'black' }}>
          <span className='text-mainlink text-link'>Home</span>
        </Link>
        <span className='text-link'>{` >>`}</span>
        <Link to='/events' style={{ color: 'black' }}>
          <span className='text-mainlink text-link'>Events</span>
        </Link>
        <span className='text-link'>{` >> ${event.name}`}</span>
      </>

      <Link
        className='btn btn2 btn-hide'
        to='/events'
        style={{ float: 'right' }}
      >
        {`<<Back To Events`}
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row className='my-5 '>
          <Col md={6}>
            <Image src={event.image} alt={event.name} fluid />
          </Col>

          <Col md={6}>
            <Card>
              <Card.Body>
                <EventDetails>
                  <p className='mb-3'>
                    <EventName>{event.name}</EventName>
                  </p>
                  <p className='mb-3'>
                    <Rating
                      value={event.rating}
                      text={`${event.numReviews} reviews`}
                    />
                  </p>

                  <p className='mb-3'>
                    <FontRegular>{event.description}</FontRegular>
                  </p>

                  <p className='mb-3'>
                    <FontBold>Host:</FontBold>
                    <span>&nbsp;&nbsp;</span>
                    <FontRegular>{event.host}</FontRegular>
                  </p>

                  <p className='mb-3'>
                    <FontBold>Date:</FontBold>
                    <span>&nbsp;&nbsp;</span>
                    <FontRegular>{`${event.startDate} - ${event.endDate} 2021`}</FontRegular>
                  </p>

                  <p className='mb-3'>
                    <FontBold>Time:</FontBold>
                    <span>&nbsp;&nbsp;</span>
                    <FontRegular>{event.time}</FontRegular>
                  </p>

                  <p className='mb-3'>
                    <FontBold>Price:</FontBold>
                    <span>&nbsp;&nbsp;</span>
                    <FontRegular>{event.price}</FontRegular>
                  </p>

                  <p className='mb-3'>
                    <FontBold>Status:</FontBold>
                    <span>&nbsp;&nbsp;</span>
                    <FontRegular>
                      {event.countInStock > 0 ? 'Available' : 'Not Available'}
                    </FontRegular>
                  </p>

                  {/* <Card.Text as='div'>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Tickets:</Col>
                          <Col>
                            {event.countInStock > 0
                              ? 'In Stock'
                              : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Text> */}
                  {event.countInStock > 0 && (
                    <Card.Text as='div' className='mb-4'>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <FontBold style={{ maxWidth: '100px' }}>
                              Qty:
                            </FontBold>
                            <Col>
                              <Form.Control
                                as='select'
                                value={qty}
                                onChange={e => setQty(e.target.value)}
                              >
                                {[...Array(event.countInStock).keys()].map(
                                  x => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Text>
                  )}
                  <Card.Text as='div'>
                    <Row>
                      <Col>
                        <Button
                          onClick={addTOCartHandler}
                          type='button'
                          className='btn1'
                          disabled={event.countInStock === 0}
                        >
                          Buy Tickets
                        </Button>
                      </Col>
                    </Row>
                  </Card.Text>
                </EventDetails>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default EachEventScreen
