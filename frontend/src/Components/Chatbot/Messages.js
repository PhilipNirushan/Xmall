import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Messages = props => {
  return (
    <div className='container'>
      <Row className='px-2'>
        {props.speaks === 'Bot' && (
          <Col xs={2}>
            <div style={{ height: '100%', display: 'grid' }}>
              <span
                style={{
                  margin: 'auto',
                }}
              >
                {props.speaks}
              </span>
            </div>
          </Col>
        )}
        <Col
          xs={10}
          style={{
            border: '2px solid #dedede',
            backgroundColor: '#f1f1f1',
            borderRadius: '5px',
            padding: '10px',
            margin: '10px 0',
          }}
        >
          <span>{props.text}</span>
        </Col>
        {props.speaks === 'User' && (
          <Col xs={2}>
            <div style={{ height: '100%', display: 'grid' }}>
              <span
                style={{
                  margin: 'auto',
                }}
              >
                {props.speaks}
              </span>
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Messages
