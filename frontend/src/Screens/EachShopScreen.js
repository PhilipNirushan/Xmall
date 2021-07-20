import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import { listShopDetails } from '../actions/shopActions'
import Rating from '../Components/Rating'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import styled from 'styled-components'

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

const EachShopScreen = ({ match }) => {
  const dispatch = useDispatch()
  const shopDetails = useSelector(state => state.shopDetails)
  const { loading, error, shop } = shopDetails

  useEffect(() => {
    dispatch(listShopDetails(match.params.id))
  }, [dispatch, match])

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
                    <FontRegular className='mb-2'>{shop.location}</FontRegular>
                    <FontBold className='mb-2'>website:</FontBold>
                    <FontRegular className='mb-2'>{shop.website}</FontRegular>
                  </ShoppingDetails>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col md={3}>
              <p>
                <i className='fas fa-map-marker-alt'></i>
                {` ${shop.location}`}
              </p>
              <p>
                <i className='fas fa-phone-alt'></i>
                {` ${shop.telephone}`}
              </p>
              <p>
                <i className='far fa-envelope'></i>
                {` ${shop.mail}`}
              </p>
              <p>
                <i className='fas fa-globe'></i>
                {` ${shop.website}`}
              </p>
            </Col> */}
          </Row>
        )}
      </Container>
    </>
  )
}

export default EachShopScreen
