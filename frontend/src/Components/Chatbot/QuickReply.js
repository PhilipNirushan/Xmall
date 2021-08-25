import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const QuickReply = props => {
  if (props.reply.structValue.fields.payload) {
    return (
      <Link to='/'>
        <Button
          style={{ margin: 3 }}
          onClick={event =>
            props.click(
              event,
              props.reply.structValue.fields.payload.stringValue,
              props.reply.structValue.fields.text.stringValue
            )
          }
        >
          {props.reply.structValue.fields.text.stringValue}
        </Button>
      </Link>
    )
  } else {
    return (
      <Link to={props.reply.structValue.fields.link.stringValue}>
        <Button style={{ margin: 3 }}>
          {props.reply.structValue.fields.text.stringValue}
        </Button>
      </Link>
    )
  }
}

export default QuickReply
