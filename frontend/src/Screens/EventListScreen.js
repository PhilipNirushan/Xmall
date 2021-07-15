import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { listEvents, deleteEvent } from '../actions/eventActions'

const EventListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const eventList = useSelector(state => state.eventList)
  const { loading, error, events } = eventList

  const eventDelete = useSelector(state => state.eventDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listEvents())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEvent(id))
    }
  }

  const createEventHandler = event => {
    // CREATE Event
  }

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1>Events</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createEventHandler}>
            <i className='fas fa-plus'></i> Create Event
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>{event._id}</td>
                <td>{event.name}</td>
                <td>${event.price}</td>
                <td>{event.category}</td>
                <td>
                  <LinkContainer to={`/admin/event/${event._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(event._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default EventListScreen
