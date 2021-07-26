import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import styled from 'styled-components'

const Heading = styled.h1`
  font-weight: 600;
`

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <Heading className='mb-3'>Edit User</Heading>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>FullName</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={e => {
                      setName(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter  Email'
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin'>
                  <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={e => {
                      setIsAdmin(e.target.checked)
                    }}
                  ></Form.Check>
                </Form.Group>

                <Form.Row className='my-3'>
                  <Col>
                    <Button type='submit' className='btn1'>
                      Update
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserEditScreen
