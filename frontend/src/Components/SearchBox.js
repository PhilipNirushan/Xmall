import React, { useState } from 'react'
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
// import styled from 'styled-components'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Row className='justify-content-md-center my-4'>
      <Col sm={11} md={6} lg={6}>
        <Form onSubmit={submitHandler}>
          <InputGroup className='mb-3' size='lg'>
            <Form.Control
              type='text'
              name='q'
              onChange={e => setKeyword(e.target.value)}
              placeholder='Search Shops...'
              autoComplete='off'
            ></Form.Control>
            <Button
              type='submit'
              variant='outline-secondary'
              className='p-2 px-3'
            >
              Search
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  )
}

export default SearchBox
