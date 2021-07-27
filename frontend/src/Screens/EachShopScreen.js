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
import { listShopDetails, createShopReview } from '../actions/shopActions'
import Rating from '../Components/Rating'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import styled from 'styled-components'
import { SHOP_CREATE_REVIEW_RESET } from '../constants/shopConstants'

const ShoppingDetails = styled.div`
  padding: 0 25px;
  @media (min-width: 768px) {
    padding: 0;
  }
  @media (min-width: 992px) {
    padding: 24px 25px;
  }
`
const FontBold = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 992px) {
    font-size: 18px;
  }
`

const FontRegular = styled.p`
  font-weight: 100;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 992px) {
    font-size: 18px;
  }
`
const Heading2 = styled.h2`
  font-weight: 400;
  @media (max-width: 767px) {
    font-size: 24px;
  }
`

const EachShopScreen = ({ match }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const shopDetails = useSelector(state => state.shopDetails)
  const { loading, error, shop } = shopDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const shopReviewCreate = useSelector(state => state.shopReviewCreate)
  const { success: successShopReview, error: errorShopReview } =
    shopReviewCreate

  useEffect(() => {
    if (successShopReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: SHOP_CREATE_REVIEW_RESET })
    }

    dispatch(listShopDetails(match.params.id))
  }, [dispatch, match, successShopReview])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createShopReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Container className='my-5'>
        <>
          <Link to='/' style={{ color: 'black' }}>
            <span className='text-mainlink text-link'>Home</span>
          </Link>
          <span className='text-link'>{` >>`}</span>
          <Link to='/shops' style={{ color: 'black' }}>
            <span className='text-mainlink text-link'>shopping</span>
          </Link>
          <span className='text-link'>{` >> ${shop.name}`}</span>
        </>
        <Link
          className='btn btn2 btn-hide'
          to='/shops'
          style={{ float: 'right' }}
        >
          {`<<Back To Shops`}
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row className='my-5'>
              <Col md={6} sm={12} xs={12}>
                <Image src={shop.image} alt={shop.name} fluid />
              </Col>
              <Col md={6} sm={12} xs={12}>
                <Card>
                  <Card.Body>
                    <ShoppingDetails>
                      <p className='mb-2'>
                        <h2>{shop.name}</h2>
                      </p>
                      <p className='mb-2'>
                        <Rating
                          value={shop.rating}
                          text={`${shop.numReviews} reviews`}
                        />
                      </p>
                      <FontRegular className='mb-2'>
                        {shop.description}
                      </FontRegular>
                      <FontBold className='mb-2'>hours:</FontBold>
                      <FontRegular className='mb-2'>{shop.time}</FontRegular>
                      <FontBold className='mb-2'>phone:</FontBold>
                      <FontRegular className='mb-2'>{shop.phone}</FontRegular>
                      <FontBold className='mb-2'>location:</FontBold>
                      <FontRegular className='mb-2'>
                        {shop.location}
                      </FontRegular>
                      <FontBold className='mb-2'>website:</FontBold>
                      <FontRegular className='mb-2'>{shop.website}</FontRegular>
                    </ShoppingDetails>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={8}>
                <h2>Reviews</h2>
                {shop.reviews.length === 0 && <Message> No Reviews </Message>}
                <ListGroup variant='flush'>
                  {shop.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <Heading2>Write a Customer Review</Heading2>
                    {errorShopReview && (
                      <Message variant='danger'>{errorShopReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' className='btn2'>
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default EachShopScreen
