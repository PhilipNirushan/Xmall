import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'
// import shops from '../shops'
import Rating from '../Components/Rating'
import axios from 'axios'

const EachShopScreen = ({match}) => {


    const [shop,setShop] = useState({})

    useEffect(()=>{
        const fetchShop = async() => {
            const { data } = await axios.get(`/api/shops/${match.params.id}`)
            setShop(data)
        }

        fetchShop()

    },[match])

    return (
        <div>
           <Container>
               <Link className="btn btn-light my-3" to="/shops">Go Back</Link>
               <Row className="my-5">
                   <Col md={5}>
                        <Image src={shop.image} alt={shop.name} fluid/>
                   </Col>
                   <Col md={4}>
                       <Row className="mb-3">
                           <h3>{shop.name}</h3>
                       </Row>
                       <Row className="mb-3">
                           {shop.description}
                       </Row>
                       <Row className="mb-3">
                            <Rating value={shop.rating} text={`${shop.numReviews} reviews`}/>
                       </Row>
                   </Col>
                   <Col md={3}>
                        <p><i className="fas fa-map-marker-alt"></i>{` ${shop.location}`}</p>
                        <p><i className="fas fa-phone-alt"></i>{` ${shop.telephone}`}</p>
                        <p><i className="far fa-envelope"></i>{` ${shop.mail}`}</p>
                        <p><i className="fas fa-globe"></i>{` ${shop.website}`}</p>
                   </Col>
               </Row>
           </Container>
        </div>
    )
}

export default EachShopScreen
