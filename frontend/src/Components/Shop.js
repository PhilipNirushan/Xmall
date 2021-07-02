import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Shop = ({shop}) => {
    return (
        <Card className="py-3 p-3 rounded my-3">
            <Link to={`/shops/${shop._id}`}>
                <Card.Img variant="top" src={shop.image} alt="shops"/>
            </Link>
            <Card.Body>
                <Link to={`/shops/${shop._id}`}>
                    <Card.Title>
                        {shop.name}
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={shop.rating} text={`${shop.numReviews} reviews`}/>
                    </div>
                </Card.Text>

                <Card.Text>
                    <strong>{shop.time}</strong>
                </Card.Text>
            </Card.Body>

        </Card>
    )
}

export default Shop
