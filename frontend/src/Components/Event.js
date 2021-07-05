import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Event = ({event}) => {
    return (
        <Card className="my-3 rounded">
            <Link to={`/events/${event._id}`}>
                <Card.Img src={event.image} variant='top'/>
            </Link>
             <Card.Body>
                <Link to={`/events/${event._id}`}>
                    <Card.Title as ='div'>
                        <strong>{event.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as ='div'>
                    <div>
                        <Rating value ={event.rating} text={`${event.numReviews} reviews`}/>
                    </div>
                </Card.Text>
             </Card.Body>
        </Card>
    )
}

export default Event
