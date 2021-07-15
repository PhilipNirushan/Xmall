import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { listShops, deleteShop } from '../actions/shopActions'

const ShopListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const shopList = useSelector(state => state.shopList)
  const { loading, error, shops } = shopList

  const shopDelete = useSelector(state => state.shopDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = shopDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listShops())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteShop(id))
    }
  }

  const createShopHandler = shop => {
    // CREATE SHOP
  }

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1>Shops</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createShopHandler}>
            <i className='fas fa-plus'></i> Create Shop
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {shops.map(shop => (
              <tr key={shop._id}>
                <td>{shop._id}</td>
                <td>{shop.name}</td>
                <td>{shop.category}</td>
                <td>
                  <LinkContainer to={`/admin/shop/${shop._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(shop._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default ShopListScreen
