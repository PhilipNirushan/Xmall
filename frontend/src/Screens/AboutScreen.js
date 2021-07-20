import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import mallInfos from '../mallInfo'
import styled from 'styled-components'

const RowTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  @media only screen and (max-width: 576px) {
    margin-top: 15px;
    font-size: 20px;
    padding: 0 10px;
    text-align: center;
  }
`
const Text = styled.p`
  font-weight: 100;
  font-size: 18px;
  @media only screen and (max-width: 576px) {
    font-size: 16px;
    text-align: justify;
    padding: 0 30px;
  }
`

const AboutScreen = () => {
  return (
    <>
      <Row>
        <Col>
          <Image src='/Images/About/pic.jpg' alt='Mall' fluid />
        </Col>
      </Row>
      <Container className='py-5 my-5'>
        <Link to='/' style={{ color: 'black' }}>
          <span className='text-mainlink text-link'>Home</span>
        </Link>
        <span className='text-link'>{` >> About`}</span>

        <h1 className='maintext my-5'>ABOUT US</h1>
        <>
          {mallInfos.map(mall => (
            <>
              <Row className='py-3'>
                <Col sm={4} md={3}>
                  <Image
                    src={mall.image}
                    alt={mall.name}
                    className='mx-auto d-block'
                    fluid
                  />
                </Col>
                <Col sm={8} md={9}>
                  <RowTitle>{mall.name}</RowTitle>
                  <Text>{mall.description}</Text>
                </Col>
              </Row>
              <hr />
            </>
          ))}
        </>
      </Container>
    </>
  )
}

export default AboutScreen
