import React, {useState,useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import shops from '../shops'
import Shop from '../Components/Shop'
import axios from 'axios'


const ShopScreen = () => {

    const [shops,setShops] = useState([])

    useEffect(()=>{
        const fetchShops = async() => {
            const {data} = await axios.get('/api/shops')
            setShops(data)
        }

        fetchShops()

    },[])

    return (
        <Container>
            <h1>Shops</h1>
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
