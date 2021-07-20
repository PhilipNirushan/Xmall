import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../index.css'
import Rating from './Rating'

const Shop = ({ shop }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/shops/${shop._id}`}>
        <Card.Img src={shop.image} alt='shops' fluid />
      </Link>

      <Card.Body>
        <Link to={`/shops/${shop._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title
            style={{ color: 'black', textTransform: 'uppercase' }}
            className='font-text'
          >
            {shop.name}
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <>
            <Rating value={shop.rating} text={`${shop.numReviews} reviews`} />
          </>
        </Card.Text>
        {/* <Card.Text as='div'>
          <Button className='btn1'>Details</Button>
        </Card.Text> */}
      </Card.Body>
    </Card>
  )
}

export default Shop
