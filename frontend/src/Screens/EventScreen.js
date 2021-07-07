import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
// import axios from 'axios'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import Event from '../Components/Event'
import { listEvents } from '../actions/eventActions'

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
    <Container>
      <h1>Events</h1>
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
  )
}

export default EventScreen
