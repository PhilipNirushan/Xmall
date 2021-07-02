import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import shops from '../shops'
import Shop from '../Components/Shop'


const ShopScreen = () => {
    return (
        <Container>
            <Row>
                {
                    shops.map((shop)=>(
                        <Col lg={4} md={6} sm={12}>
                            <Shop shop={shop}/>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default ShopScreen
