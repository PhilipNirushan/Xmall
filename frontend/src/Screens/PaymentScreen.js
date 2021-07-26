import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import BookingSteps from '../Components/BookingSteps'
import styled from 'styled-components'

const Heading = styled.h1`
  font-weight: 400;
  text-transform: uppercase;
`

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/makebooking')
  }

  return (
    <Container className='my-5'>
      <Row className='justify-content-md-center'>
        <Col md={6} xs={12}>
          <BookingSteps step1 step2 />
          <Heading className='py-3'>Payment Method</Heading>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend' className='pb-2'>
                Select Method
              </Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={e => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Form.Row className='my-4'>
              <Col>
                <Button type='submit' className='btn1'>
                  Continue
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentScreen
