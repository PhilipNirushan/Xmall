import React from 'react'
import { Container } from 'react-bootstrap'
import EventHome from '../../Components/EventHome'
import ImageSlider from '../../Components/ImageSlider'
// import AboutSection from './AboutSection'
import ShopTopRated from '../../Components/ShopTopRated'
// import Rough from './Rough'

const Home = () => {
  return (
    <div>
      <ImageSlider />
      {/* <Rough /> */}
      {/* <AboutSection /> */}
      <ShopTopRated />
      <Container>
        <hr />
      </Container>
      <EventHome />
    </div>
  )
}

export default Home
