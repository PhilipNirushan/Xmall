import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { listShops } from '../actions/shopActions'
import Shop from '../Components/Shop'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import styled from 'styled-components'

const Heading = styled.h1`
  text-align: center;
  font-weight: 300;
`

const ShopScreen = () => {
  const dispatch = useDispatch()
  const shopList = useSelector(state => state.shopList)
  const { loading, error, shops } = shopList

  useEffect(() => {
    dispatch(listShops())
  }, [dispatch])

  return (
    <Container className='my-5'>
      <Heading className='mb-5'>THE SHOPS AT XMALL</Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {shops.map(shop => (
            <Col key={shop._id} lg={4} md={6} sm={12}>
              <Shop shop={shop} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default ShopScreen
