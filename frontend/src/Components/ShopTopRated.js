import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopShops } from '../actions/shopActions'
import styled from 'styled-components'

const Heading1 = styled.h1`
  font-size: 40px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
`

const Heading4 = styled.h4`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
`
const ShopLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`
const ButtonDiv = styled.div`
  margin: 0 auto;
`

const ShopTopRated = () => {
  const dispatch = useDispatch()

  const shopTopRated = useSelector(state => state.shopTopRated)
  const { loading, error, shops } = shopTopRated

  useEffect(() => {
    dispatch(listTopShops())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container className='my-5'>
      <Heading1 className='mb-3'>Top Rated Shops</Heading1>
      <Row>
        {shops.map(shop => (
          <Col key={shop._id} lg={4}>
            <Card className='my-3 p-3 rounded'>
              <Link to={`/shops/${shop._id}`}>
                <Card.Img src={shop.image} variant='top' />
              </Link>
              <Card.Body>
                <ShopLink to={`/shops/${shop._id}`}>
                  <Heading4>{shop.name}</Heading4>
                </ShopLink>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className='mt-3'>
        <ButtonDiv>
          <ShopLink to='/shops'>
            <Button type='button' className='btn2'>
              View All Shops
            </Button>
          </ShopLink>
        </ButtonDiv>
      </Row>
    </Container>
  )
}

export default ShopTopRated
