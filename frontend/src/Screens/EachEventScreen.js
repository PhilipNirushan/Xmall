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
    <Container className='my-3'>
      <Link className='btn btn-light my-3' to='/events'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={7}>
            <Image src={event.image} alt={event.name} fluid />
          </Col>
          <Col md={5}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <strong>{event.name}</strong>
                </Card.Title>
                <Card.Text>
                  <Rating
                    value={event.rating}
                    text={`${event.numReviews} reviews`}
                  />
                </Card.Text>
                <Card.Text as='div'>{event.description}</Card.Text>
                <Card.Text as='div'>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>{event.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
                <Card.Text as='div'>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {event.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
                {event.countInStock > 0 && (
                  <Card.Text as='div'>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={e => setQty(e.target.value)}
                            >
                              {[...Array(event.countInStock).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default EachEventScreen
