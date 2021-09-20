import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listShops } from '../actions/shopActions'
import styled from 'styled-components'
import axios from 'axios'

const Heading1 = styled.h1`
  font-size: 40px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
`

const Heading4 = styled.h4`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
`
const ShopLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

const ShopRecommend = () => {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(5)
  const [shopName, setShopName] = useState('Apple')
  const [recommended, setRecommended] = useState([])

  const shopList = useSelector(state => state.shopList)
  const { loading, error, shops } = shopList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [userInfo2, setuserInfo2] = useState()
  useEffect(() => {
    let userReview = []
    let reviews = []
    if (userInfo) {
      console.log('display user id', userInfo._id)
      let s = shops
      if (shops.length === 0) {
        s = [
          {
            rating: 3,
            numReviews: 1,
            _id: '6101800d6ffaa7204ca010f8',
            name: 'Eileen Fisher',
            image: '/Images/shops/img1.jpg',
            description:
              'Eileen Fisher has been creating effortlessly chic clothes for the past 30 years. Designed with pure shapes and fine fabrics, the collections offer sophistication, comfort and style that lasts. As a socially conscious company, Eileen Fisher is a pioneer in eco-friendly fashion and in supporting global initiatives that empower women and girls.',
            time: 'Monday-Saturday: 10:00am-8:00pm',
            phone: '212-823-9575',
            category: 'Woman Fashion',
            location: '2nd Floor',
            website: 'www.eileenfisher.com/',
            user: '6101800d6ffaa7204ca010e4',
            reviews: [
              {
                _id: '613cf8fad8945b0824727780',
                name: 'Emma Doe',
                rating: 3,
                comment: 'This shop has very expensive clothes',
                user: '613cf695d8945b0824727778',
                createdAt: '2021-09-11T18:44:10.769Z',
                updatedAt: '2021-09-11T18:44:10.769Z',
              },
            ],
            __v: 1,
            createdAt: '2021-07-28T16:04:29.898Z',
            updatedAt: '2021-09-11T18:44:10.769Z',
          },
        ]
        s.map(shop1 => {
          shop1.reviews.map(review => {
            userReview.push(shop1)
            reviews.push(review)
          })
        })
      } else {
        s.map(shop1 => {
          shop1.reviews.map(review => {
            if (review.user === userInfo._id) {
              userReview.push(shop1)
              reviews.push(review)
            }
          })
        })
      }

      console.log('display the shop reviews', userReview)
      console.log('shop da that praticular user da review', reviews)
      // const randomNumber = Math.random(0, 3)
      setRating(reviews[0]?.rating ? reviews[0].rating : 0)
      setShopName(userReview[0]?.name ? userReview[0].name : '')
      console.log('rating', rating)
      console.log('shopnames', shopName)
      console.log('shops', JSON.stringify(shops[2]))

      console.log('userinfo:' + userInfo)

      recommendShops(userInfo)
    }
    dispatch(listShops())
  }, [dispatch])

  useEffect(() => {
    let userReview = []
    let reviews = []
    if (userInfo) {
      console.log(userInfo._id)
      let s = shops
      s.map(shop1 => {
        shop1.reviews.map(review => {
          if (review.user === userInfo._id) {
            userReview.push(shop1)
            reviews.push(review)
          }
        })
      })
      recommendShops(userInfo)
      console.log(userReview)
      console.log(reviews)
      // setRating(reviews[0].rating)
      // setShopName(userReview[0].name)
      console.log('rating', rating)
      console.log('shopnames', shopName)
      console.log('shops', shops)
      console.log(userInfo)
    }
    dispatch(listShops())
  }, [rating])

  function search(arr, name) {
    const { length } = arr
    const id = length + 1
    let output = []
    console.log('passing ', name)

    for (var i = 0; i < length; i++) {
      if (arr[i].name === name) {
        console.log(
          'Searching through ' + arr[i].name + ' match found for ' + name
        )
        output.id = arr[i]._id
        output.image = arr[i].image
        output.name = arr[i].name

        return output
      }
    }
  }

  const RecommendView = function () {
    return (
      <Row>
        {shopName ? (
          recommended.recommendShops &&
          recommended.recommendShops.map(function (el, index) {
            let results = search(shops, el)
            return (
              <>
                <Col key={index} lg={4}>
                  <Card className='my-3 p-3 rounded'>
                    <Link to={`/shops/${results.id}`}>
                      <Card.Img src={results.image} variant='top' />
                    </Link>
                    <Card.Body>
                      <ShopLink to={`/shops/${results.id}`}>
                        <Heading4>{results.name}</Heading4>
                      </ShopLink>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            )
          })
        ) : (
          <Col>
            <br />
            <br />
            <Card className='my-3 p-3 rounded' style={{ textAlign: 'center' }}>
              <span className='lead'>
                Rate our shops to get recommendations
              </span>
            </Card>
          </Col>
        )}
      </Row>
    )
  }

  async function recommendShops(newUser) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newUser.token}`,
      },
    }
    try {
      const { data } = await axios.post(
        `http://localhost:5001/recms`,
        {
          shop: shopName,
          rating: rating,
        },
        config
      )

      setRecommended(data)
      console.log('Recommended', data.recommendShops[0])
      console.log('1', data)
    } catch (error) {
      console.log('error Recommended')
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container className='my-5'>
      {userInfo ? <Heading1 className='mb-3'>Recommended Shops</Heading1> : ''}

      <RecommendView />
    </Container>
  )
}

export default ShopRecommend
