import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import BookingSteps from '../Components/BookingSteps'

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/bookevent')
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={6} xs={12}>
          <BookingSteps step1 step2 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
            </Form.Group>
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
            <Form.Row className='my-3'>
              <Col>
                <Button variant='primary' type='submit' className='btn1'>
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
