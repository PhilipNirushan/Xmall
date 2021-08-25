import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import QuickReply from './QuickReply'

class QuickReplies extends Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(event, payload, text) {
    this.props.replyClick(event, payload, text)
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this._handleClick} reply={reply} />
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i)
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <div className='container'>
        <Row className='px-2'>
          <Col xs={2}>
            <div style={{ height: '100%', display: 'grid' }}>
              <span
                style={{
                  margin: 'auto',
                }}
              >
                {this.props.speaks}
              </span>
            </div>
          </Col>
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
            <div id='quick-replies'>
              {this.props.text && <p>{this.props.text.stringValue}</p>}
              {this.renderQuickReplies(this.props.payload)}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default QuickReplies
