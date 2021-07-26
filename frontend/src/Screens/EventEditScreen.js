import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listEventDetails, updateEvent } from '../actions/eventActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { EVENT_UPDATE_RESET } from '../constants/eventConstants'
import styled from 'styled-components'

const Heading = styled.h1`
  font-weight: 600;
`

const EventEditScreen = ({ match, history }) => {
  const eventId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')
  const [host, setHost] = useState('')
  const [time, setTime] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const eventDetails = useSelector(state => state.eventDetails)
  const { loading, error, event } = eventDetails

  const eventUpdate = useSelector(state => state.eventUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eventUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EVENT_UPDATE_RESET })
      history.push('/admin/eventlist')
    } else {
      if (!event.name || event._id !== eventId) {
        dispatch(listEventDetails(eventId))
      } else {
        setName(event.name)
        setPrice(event.price)
        setImage(event.image)
        setCategory(event.category)
        setDescription(event.description)
        setCountInStock(event.countInStock)
        setHost(event.host)
        setTime(event.time)
        setStartDate(event.startDate)
        setEndDate(event.endDate)
      }
    }
  }, [dispatch, history, eventId, event, successUpdate])

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateEvent({
        _id: eventId,
        name,
        price,
        image,
        category,
        description,
        countInStock,
        host,
        time,
        startDate,
        endDate,
      })
    )
  }

  return (
    <>
      <Container>
        <Link to='/admin/eventlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <Heading className='mb-3'>Edit Event</Heading>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={e => {
                      setName(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Price'
                    value={price}
                    onChange={e => {
                      setPrice(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Image url'
                    value={image}
                    onChange={e => {
                      setImage(e.target.value)
                    }}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>CountInStock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter CountInStock'
                    value={countInStock}
                    onChange={e => {
                      setCountInStock(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Category'
                    value={category}
                    onChange={e => {
                      setCategory(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter Description'
                    value={description}
                    onChange={e => {
                      setDescription(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='host'>
                  <Form.Label>Host</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Host'
                    value={host}
                    onChange={e => {
                      setHost(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='time'>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Time'
                    value={time}
                    onChange={e => {
                      setTime(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='startdate'>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Start Date'
                    value={startDate}
                    onChange={e => {
                      setStartDate(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='enddate'>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Category'
                    value={endDate}
                    onChange={e => {
                      setEndDate(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Row className='my-5'>
                  <Col>
                    <Button type='submit' className='btn1'>
                      Update
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EventEditScreen
