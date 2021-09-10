import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { v4 as uuid } from 'uuid'
import Messages from './Messages'
import Cards from './Cards'
import QuickReplies from './QuickReplies'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
// import './Bot.css'

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`
// cookies
const cookies = new Cookies()

class Chatbot extends Component {
  messagesEnd

  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this)
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this)

    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.state = {
      messages: [],
      showBot: true,
      shopWelcomeSent: false,
      eventWelcomeSent: false,
    }

    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), { path: '/' })
    }
  }

  // text message response
  async textQuery(queryText) {
    let says = {
      speaks: 'User',
      msg: {
        text: {
          text: queryText,
        },
      },
    }
    this.setState({ messages: [...this.state.messages, says] })
    const res = await axios.post('/api/dialogflow/textQuery', {
      text: queryText,
      userID: cookies.get('userID'),
    })

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'Bot',
        msg: msg,
      }
      this.setState({ messages: [...this.state.messages, says] })
    }
  }

  // event message response
  async eventQuery(eventName) {
    const res = await axios.post('/api/dialogflow/eventQuery', {
      event: eventName,
      userID: cookies.get('userID'),
    })

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'Bot',
        msg: msg,
      }

      this.setState({ messages: [...this.state.messages, says] })
    }
  }

  // a pause between messages
  resolveAfterXSeconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x)
      }, x * 1000)
    })
  }

  async componentDidMount() {
    this.eventQuery('Welcome') // welcome message

    // welcome on shop
    if (window.location.pathname === '/shops' && !this.state.shopWelcomeSent) {
      await this.resolveAfterXSeconds(1) // time setup
      this.eventQuery('WELCOME_SHOPPING')
      this.setState({ shopWelcomeSent: true, showBot: true })
    }
    this.props.history.listen(() => {
      if (
        this.props.history.location.pathname === '/shops' &&
        !this.state.shopWelcomeSent
      ) {
        this.eventQuery('WELCOME_SHOPPING')
        this.setState({ shopWelcomeSent: true, showBot: true })
      }
    })

    // welcome on events
    if (window.location.pathname === '/events' && !this.state.shopWelcomeSent) {
      await this.resolveAfterXSeconds(1) // time setup
      this.eventQuery('WELCOME_EVENT_BOOKING')
      this.setState({ eventWelcomeSent: true, showBot: true })
    }

    this.props.history.listen(() => {
      if (
        this.props.history.location.pathname === '/events' &&
        !this.state.eventWelcomeSent
      ) {
        this.eventQuery('WELCOME_EVENT_BOOKING')
        this.setState({ eventWelcomeSent: true, showBot: true })
      }
    })
  }

  // scroll to last message rendered
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  //show bot method
  show(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ showBot: true })
  }

  // hide bot method
  hide(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ showBot: false })
  }

  // quick replies
  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault()
    event.stopPropagation()

    switch (payload) {
      case 'recommend_yes':
        this.eventQuery('SHOP_CATEGORY')
        break
      case 'recommend_menfashion':
        this.eventQuery('SHOP_CATEGORY_MENFASHION')
        break
      case 'info_boss':
        this.eventQuery('SHOP_CATEGORY_MENFASHION_BOSS')
        break
      case 'info_jcrewshop':
        this.eventQuery('SHOP_CATEGORY_MENFASHION_JCREWMENSHOP')
        break
      case 'info_robert_graham':
        this.eventQuery('SHOP_CATEGORY_MENFASHION_ROBERTGRAHAM')
        break
      case 'info_vineyard_vines':
        this.eventQuery('SHOP_CATEGORY_MENFASHION_VINEYARDVINES')
        break
      case 'recommend_womanfashion':
        this.eventQuery('SHOP_CATEGORY_WOMANFASHION')
        break
      case 'info_eilen_fisher':
        this.eventQuery('SHOP_CATEGORY_WOMANFASHION_EILENFISHER')
        break
      case 'info_hm':
        this.eventQuery('SHOP_CATEGORY_WOMANFASHION_HM')
        break
      case 'info_womanshop':
        this.eventQuery('SHOP_CATEGORY_WOMANFASHION_WOMANSHOP')
        break
      case 'info_stuart_weitzman':
        this.eventQuery('SHOP_CATEGORY_WOMANFASHION_STUARTWEITZMAN')
        break
      case 'recommend_cosmetics':
        this.eventQuery('SHOP_CATEGORY_COSMETICS')
        break
      case 'info_aveda':
        this.eventQuery('SHOP_CATEGORY_COSMETICS_AVEDA')
        break
      case 'info_bond':
        this.eventQuery('SHOP_CATEGORY_COSMETICS_BOND')
        break
      case 'info_diptyque':
        this.eventQuery('SHOP_CATEGORY_COSMETICS_DIPTYQUE')
        break
      case 'info_makeup_art':
        this.eventQuery('SHOP_CATEGORY_COSMETICS_MAKEUPART')
        break
      case 'recommend_shoes':
        this.eventQuery('SHOP_CATEGORY_SHOES')
        break
      case 'info_castaner':
        this.eventQuery('SHOP_CATEGORY_SHOES_CASTANER')
        break
      case 'info_jackrabbit':
        this.eventQuery('SHOP_CATEGORY_SHOES_JACKRABBIT')
        break
      case 'info_jimmy_choo':
        this.eventQuery('SHOP_CATEGORY_SHOES_JIMMYCHOO')
        break
      case 'info_michelelopriore':
        this.eventQuery('SHOP_CATEGORY_SHOES_MICHELELOPRIORE')
        break
      case 'recommend_electronics':
        this.eventQuery('SHOP_CATEGORY_ELECTRONICS')
        break
      case 'info_apple':
        this.eventQuery('SHOP_CATEGORY_ELECTRONICS_APPLE')
        break
      case 'info_devialet':
        this.eventQuery('SHOP_CATEGORY_ELECTRONICS_DEVIALET')
        break
      case 'recommend_event_yes':
        this.eventQuery('EVENT_CATEGORY')
        break
      case 'recommend_music_entertainment':
        this.eventQuery('EVENT_CATEGORY_MUSIC_ENTERTAINMENT')
        break
      case 'info_sessionatthecircle':
        this.eventQuery('EVENT_CATEGORY_MUSIC_ENTERTAINMENT_SESSIONATTHECIRCLE')
        break
      case 'info_liveweekendentertainment':
        this.eventQuery('EVENT_CATEGORY_MUSIC_ENTERTAINMENT_LIVEWEEKEND')
        break
      case 'info_barw12andfilmclub':
        this.eventQuery('EVENT_CATEGORY_MUSIC_ENTERTAINMENT_BARW12')
        break
      case 'recommend_kids':
        this.eventQuery('EVENT_CATEGORY_KIDSEVENT')
        break
      case 'info_jointhecoolestkidsclub':
        this.eventQuery('EVENT_CATEGORY_KIDSEVENT_COOLESTKIDSCLUB')
        break
      case 'info_joinusatkidsclub':
        this.eventQuery('EVENT_CATEGORY_KIDSEVENT_JOINKIDSCLUB')
        break
      case 'info_storytimeonthegreenwithbarnesandnoble':
        this.eventQuery('EVENT_CATEGORY_KIDSEVENT_STORYTIME')
        break
      case 'recommend_food_drink':
        this.eventQuery('EVENT_CATEGORY_FOOD_DRINK')
        break
      case 'info_afternoontea':
        this.eventQuery('EVENT_CATEGORY_FOOD_DRINK_AFTERNOONTEA')
        break
      case 'info_allstarlaneshopgardenbrunch':
        this.eventQuery('EVENT_CATEGORY_FOOD_DRINK_HOPGARDENBRUNCH')
        break
      case 'info_chefstasting':
        this.eventQuery('EVENT_CATEGORY_FOOD_DRINK_CHEFSTATSTING')
        break
      case 'info_coffeebeweringmasterclass':
        this.eventQuery('EVENT_CATEGORY_FOOD_DRINK_COFFEE_MASTERCLASS')
        break
      case 'info_xmallcafesevening':
        this.eventQuery('EVENT_CATEGORY_FOOD_DRINK_XMALLCAFE')
        break
      case 'training_masterclass':
        this.eventQuery('MASTERCLASS')
        break
      default:
        this.textQuery(text)
        break
    }
  }

  /**card messages **/
  renderCards(cards) {
    return cards.map((card, i) => <Cards key={i} payload={card.structValue} />)
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Messages
          key={i}
          speaks={message.speaks}
          text={message.msg.text.text}
        />
      )
    } else if (message.msg && message.msg.payload.fields.cards) {
      //message.msg.payload.fields.cards.listValue.values

      // cards design
      return (
        <div key={i}>
          <div style={{ overflow: 'hidden' }}>
            <Col xs={2}>
              <div style={{ height: '100%', display: 'grid' }}>
                <span
                  style={{
                    margin: 'auto',
                  }}
                >
                  {message.speaks}
                </span>
              </div>
            </Col>
            <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
              <div
                style={{
                  width:
                    message.msg.payload.fields.cards.listValue.values.length *
                    270,
                }}
              >
                {this.renderCards(
                  message.msg.payload.fields.cards.listValue.values
                )}
              </div>
            </div>
          </div>
        </div>
      )
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      )
    }
  }

  // rendering card messages
  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i)
      })
    } else {
      return null
    }
  }

  // quick replies
  _handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.textQuery(e.target.value)
      e.target.value = ''
    }
  }

  /** Chatbot design **/
  render() {
    if (this.state.showBot) {
      return (
        <div
          style={{
            height: 500,
            width: 400,
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: '1',
          }}
        >
          {/** chatbot header **/}
          <div
            style={{ color: 'white', background: 'black', fontSize: '20px' }}
            className='px-3 py-2'
          >
            <span>Chatbot</span>
            <ul
              style={{
                listStyle: 'none',
                display: 'inline-block',
                float: 'right',
                marginBottom: '0',
              }}
            >
              <li>
                <StyledLink
                  to='/'
                  onClick={this.hide}
                  style={{ color: 'white' }}
                >
                  Close
                </StyledLink>
              </li>
            </ul>
          </div>

          {/** Chatbot Message Grid **/}

          {/** Chatbot Messages **/}
          <div
            id='chatbot'
            style={{
              height: '416px',
              width: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
              background: 'white',
              border: '1px solid lightgrey',
            }}
          >
            {this.renderMessages(this.state.messages)}
            {/** refering the last message **/}
            <div
              ref={el => {
                this.messagesEnd = el
              }}
              style={{ float: 'left', clear: 'both' }}
            ></div>
          </div>

          {/** Input **/}
          <div>
            <Row>
              <Col>
                <input
                  id='user_says'
                  type='text'
                  onKeyPress={this._handleInputKeyPress}
                  placeholder='Type a message:'
                  className='form-control'
                  style={{
                    margin: 0,
                    width: '100%',
                  }}
                  autoComplete='off'
                />
              </Col>
            </Row>
          </div>
        </div>
      )
    } else {
      return (
        <div
          style={{
            height: 40,
            width: 400,
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <div
            style={{ color: 'white', background: 'black', fontSize: '20px' }}
            className='px-3 py-2'
          >
            <span>Chatbot</span>
            <ul
              style={{
                listStyle: 'none',
                display: 'inline-block',
                float: 'right',
                marginBottom: '0',
              }}
            >
              <li>
                <StyledLink
                  to='/'
                  onClick={this.show}
                  style={{ color: 'white' }}
                >
                  Show
                </StyledLink>
              </li>
            </ul>
          </div>
          <div
            ref={el => {
              this.messagesEnd = el
            }}
            style={{ float: 'left', clear: 'both' }}
          ></div>
        </div>
      )
    }
  }
}

export default withRouter(Chatbot)
