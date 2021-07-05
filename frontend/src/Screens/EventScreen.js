import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Event from '../Components/Event'

const EventScreen = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/api/events')
      setEvents(data)
    }

    fetchEvents()
  }, [])

  return (
    <Container>
      <h1>Events</h1>
      <Row>
        {events.map(event => (
          <Col key={event._id} md={6}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default EventScreen
