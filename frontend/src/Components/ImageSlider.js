import React from 'react'
import '../index.css'
import { Carousel, Image } from 'react-bootstrap'

const ImageSlider = () => {
  return (
    <Carousel controls={true} fade={true}>
      <Carousel.Item interval={2000}>
        <Image
          className='d-block w-100'
          src='/Images/Carousel/img1.jpg'
          alt='First slide'
          fluid
        />
        <Carousel.Caption className='carousel-text'>
          <h3>First slide </h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <Image
          className='d-block w-100'
          src='Images/Carousel/img2.jpg'
          alt='Second slide'
          fluid
        />

        <Carousel.Caption className='carousel-text'>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <Image
          className='d-block w-100'
          src='/Images/Carousel/img3.jpg'
          alt='Third slide'
          fluid
        />

        <Carousel.Caption className='carousel-text'>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default ImageSlider
