import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
// import Rating from './Rating'
import styled from 'styled-components'

const EventBox = styled.div`
  padding: 0 30px;
  text-align: center;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 30px;
`

const Heading4 = styled.h4`
  font-size: 28px;
  margin-bottom: 14px;
  font-weight: 300;
`

const Event = ({ event }) => {
  return (
    <EventBox>
      <Wrapper>
        <Image src={event.image} alt={event.name} fluid />
      </Wrapper>
      <Heading4>{event.name}</Heading4>
      <Link to={`/events/${event._id}`} className='btn btn-white mx-auto'>
        Read More <span>{`>>`}</span>
      </Link>
    </EventBox>

    // <Card className="my-3 rounded">
    //     <Link to={`/events/${event._id}`}>
    //         <Card.Img src={event.image} variant='top'/>
    //     </Link>
    //      <Card.Body>
    //         <Link to={`/events/${event._id}`}>
    //             <Card.Title as ='div'>
    //                 <strong>{event.name}</strong>
    //             </Card.Title>
    //         </Link>

    //         <Card.Text as ='div'>
    //             <div>
    //                 <Rating value ={event.rating} text={`${event.numReviews} reviews`}/>
    //             </div>
    //         </Card.Text>
    //      </Card.Body>
    // </Card>
  )
}

export default Event
