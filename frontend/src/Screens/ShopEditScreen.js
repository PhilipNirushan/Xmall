import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listShopDetails, updateShop } from '../actions/shopActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { SHOP_UPDATE_RESET } from '../constants/shopConstants'

const ShopEditScreen = ({ match, history }) => {
  const shopId = match.params.id

  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

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
      }
    }
  }, [dispatch, history, shopId, shop, successUpdate])

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
      })
    )
  }

  return (
    <>
      <Link to='/admin/shoplist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h1>Edit Shop</h1>
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

                <Form.Row className='my-3'>
                  <Col>
                    <Button variant='primary' type='submit' className='btn1'>
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
