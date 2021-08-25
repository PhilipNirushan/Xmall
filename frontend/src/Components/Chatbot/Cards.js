import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const Cards = props => {
  return (
    <div style={{ float: 'left', width: 270, paddingRight: 30 }}>
      <Card>
        <Card.Img
          variant='top'
          alt={props.payload.fields.header.stringValue}
          src={props.payload.fields.image.stringValue}
          style={{ width: 240 }}
        />
        <Card.Body>
          <Card.Title>{props.payload.fields.header.stringValue}</Card.Title>
          <Link
            target='_blank'
            rel='noopener noreferrer'
            to={props.payload.fields.link.stringValue}
          >
            <Button variant='primary'>View Shop</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Cards
