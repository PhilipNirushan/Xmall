import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listShopDetails, updateShop } from '../actions/shopActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { SHOP_UPDATE_RESET } from '../constants/shopConstants'
import styled from 'styled-components'

const Heading = styled.h1`
  font-weight: 600;
`

const ShopEditScreen = ({ match, history }) => {
  const shopId = match.params.id

  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [offerName, setOfferName] = useState('')
  const [offerDescription, setOfferDescription] = useState('')
  const [offerStartDate, setOfferStartDate] = useState('')
  const [offerEndDate, setOfferEndDate] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const shopDetails = useSelector(state => state.shopDetails)
  const { loading, error, shop } = shopDetails

  const shopUpdate = useSelector(state => state.shopUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SHOP_UPDATE_RESET })
      history.push('/admin/shoplist')
    } else {
      if (!shop.name || shop._id !== shopId) {
        dispatch(listShopDetails(shopId))
      } else {
        setName(shop.name)
        setTime(shop.time)
        setImage(shop.image)
        setCategory(shop.category)
        setDescription(shop.description)
        setLocation(shop.location)
        setPhone(shop.phone)
        setWebsite(shop.website)
        setOfferName(shop.offerName)
        setOfferDescription(shop.offerDescription)
        setOfferStartDate(shop.offerStartDate)
        setOfferEndDate(shop.offerEndDate)
      }
    }
  }, [dispatch, history, shopId, shop, successUpdate])

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
      updateShop({
        _id: shopId,
        name,
        time,
        image,
        category,
        description,
        location,
        phone,
        website,
        offerName,
        offerDescription,
        offerStartDate,
        offerEndDate,
      })
    )
  }

  return (
    <>
      <Container className='my-5'>
        <Link to='/admin/shoplist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <Heading className='mb-3'>Edit Shop</Heading>
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

                <Form.Group controlId='time'>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter  Time'
                    value={time}
                    onChange={e => {
                      setTime(e.target.value)
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

                <Form.Group controlId='location'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Location'
                    value={location}
                    onChange={e => {
                      setLocation(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Phone'
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='website'>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Website URL'
                    value={website}
                    onChange={e => {
                      setWebsite(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='offername'>
                  <Form.Label>Offer Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Offer Name'
                    value={offerName}
                    onChange={e => {
                      setOfferName(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='offerdescription'>
                  <Form.Label>Offer Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Offer Description'
                    value={offerDescription}
                    onChange={e => {
                      setOfferDescription(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='offerstartdate'>
                  <Form.Label>Offer Start Time</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Offer Start Date'
                    value={offerStartDate}
                    onChange={e => {
                      setOfferStartDate(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='offerenddate'>
                  <Form.Label>Offer End Date</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Offer End Date'
                    value={offerEndDate}
                    onChange={e => {
                      setOfferEndDate(e.target.value)
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

export default ShopEditScreen
