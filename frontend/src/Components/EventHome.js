import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import styled from 'styled-components'
import { listHomeEvents } from '../actions/eventActions'

const Heading1 = styled.h1`
  font-size: 40px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
`

const Heading4 = styled.h4`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
`
const ShopLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`
const ButtonDiv = styled.div`
  margin: 0 auto;
`

const EventHome = () => {
  const dispatch = useDispatch()

  const eventHome = useSelector(state => state.eventHome)
  const { loading, error, events } = eventHome
  useEffect(() => {
    dispatch(listHomeEvents())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container className='my-5'>
      <Heading1 className='mb-3'>Events</Heading1>
      <Row>
        {events.map(event => (
          <Col key={event._id} md={6}>
            <Card className='my-3 p-3 rounded'>
              <Link to={`/events/${event._id}`}>
                <Card.Img src={event.image} variant='top' />
              </Link>
              <Card.Body>
                <ShopLink to={`/events/${event._id}`}>
                  <Heading4>{event.name}</Heading4>
                </ShopLink>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className='mt-3'>
        <ButtonDiv>
          <ShopLink to='/events'>
            <Button type='button' className='btn2'>
              View All Events
            </Button>
          </ShopLink>
        </ButtonDiv>
      </Row>
    </Container>
  )
}

export default EventHome
