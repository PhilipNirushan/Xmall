import React from 'react'
import { Container } from 'react-bootstrap'
import EventHome from '../../Components/EventHome'
import ImageSlider from '../../Components/ImageSlider'
import ShopTopRated from '../../Components/ShopTopRated'
import ShopRecommend from '../../Components/ShopRecommend'

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <ShopRecommend />
      <ShopTopRated />
      <Container>
        <hr />
      </Container>
      <EventHome />
    </div>
  )
}

export default Home
