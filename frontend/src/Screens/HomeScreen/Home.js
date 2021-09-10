import React from 'react'
import { Container } from 'react-bootstrap'
import EventHome from '../../Components/EventHome'
import ImageSlider from '../../Components/ImageSlider'
import ShopTopRated from '../../Components/ShopTopRated'

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <ShopTopRated />
      <Container>
        <hr />
      </Container>
      <EventHome />
    </div>
  )
}

export default Home
