import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image } from 'react-bootstrap'
// import axios from 'axios'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import Event from '../Components/Event'
import { listEvents } from '../actions/eventActions'
import styled from 'styled-components'

const Heading = styled.h1`
  text-align: center;
  font-weight: 300;
  /* font-size: 30px; */
  text-transform: uppercase;
`

const EventScreen = () => {
  // const [events, setEvents] = useState([])

  const dispatch = useDispatch()
  const eventList = useSelector(state => state.eventList)
  const { loading, error, events } = eventList

  useEffect(() => {
    // const fetchEvents = async () => {
    //   const { data } = await axios.get('/api/events')
    //   setEvents(data)
    // }
    // fetchEvents()
    dispatch(listEvents())
  }, [dispatch])

  return (
    <>
      <Row>
        <Col>
          <Image src='Images/event.jpg' alt='events' fluid />
        </Col>
      </Row>
      <Container className='my-5'>
        <Heading className='my-5'>Events</Heading>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {events.map(event => (
              <Col key={event._id} md={6}>
                <Event event={event} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default EventScreen
