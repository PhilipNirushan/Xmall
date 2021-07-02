import React from 'react'
import { Carousel } from 'react-bootstrap'

const ImageSlider = () => {
      
    return (
            <Carousel controls={false} fade={true}>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="/Images/Carousel/img1.jpg"
                        alt="First slide"
                        height="600"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="Images/Carousel/img2.jpg"
                        alt="Second slide"
                        height="600"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="/Images/Carousel/img3.jpg"
                        alt="Third slide"
                        height="600"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    )
}

export default ImageSlider
