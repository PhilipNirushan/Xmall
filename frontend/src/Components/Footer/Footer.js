import React from 'react'
import './Footer.css'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const ImgSect = styled.div`
    margin-bottom: 20px;
    @media (min-width:992px){
        margin-left: 30px;
    }
`;

const Sect1 = styled.div`
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    @media (min-width:992px){
        margin-left: 30px;
    } 
    @media (min-width:768px){
        padding: 0;
    }
`;

const Text = styled.p`
    color: #b6b6b6 !important;
    text-align: left !important;
    @media (min-width: 992px){
        padding-right: 60px;
    }
    @media (min-width: 768px){
        padding-left: 20px;
    }
`;

const Icon = styled.div`
    margin-top: 20px;
    @media (min-width: 768px){
        padding-left: 20px;
    }
`;

const Sect2 = styled.div`
    margin-top: 20px;
    @media (min-width: 768px){
        margin-top: 50px;
    }
`;

const Sect3 = styled.div`
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    @media (min-width: 992px){
        /* padding-left: 50px; */
    }
`;

const Sect4 = styled.div`
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    @media (min-width: 992px){
        padding-left: 80px;
    }
`;

const TextHead = styled.span`
    font-weight: 400;
    font-style: normal;
    font-family: 'Montserrat', sans-serif;
    color: #959595;
    font-size: 12px;
    line-height: 1.9;
    letter-spacing: 0px;
    text-transform: uppercase;
    @media (min-width: 992px){
        font-size: 14px;
    }
`;

const ListText = styled.span`
    font-weight: 400;
    font-style: normal;
    font-family: 'Montserrat', sans-serif;
    color: #959595;
    font-size: 12px;
    line-height: 1.9;
    letter-spacing: 0px;
    text-transform: uppercase;
`;

const ListHead = styled.div`
    padding-top: 20px;
    @media (min-width: 768px){
        margin-top: 45px;
        padding-top: 0;
    }
`;

const ListHead2 = styled.div`
    padding-top: 20px;
    @media (min-width: 992px){
        margin-top: 45px;
        padding-top: 0;
    }
`;

const List = styled.p`
    font-weight: 400;
    font-style: normal;
    font-family: 'Open Sans', sans-serif;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0px;
    margin-bottom: 20px;
    @media (min-width: 768px){
        margin-bottom: 45px;
    }
    /* @media (max-width: 992px){
        margin-bottom: 20px;
    } */
`;

const List2 = styled.p`
    font-weight: 400;
    font-style: normal;
    font-family: 'Open Sans', sans-serif;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0px;
    @media (max-width: 992px){
        margin-bottom: 20px;
    }
`;

const Special = styled.p`
    margin: 0;
    padding: 0;
`;

const Copy = styled.div`
    padding-left: 28px;
    color: #959595;
    @media (min-width: 768px){
        margin-left: 10px;
    }
    @media (min-width:992px){
        margin-left: 40px;
    }
`;


const Footer = () => {
    return (
        <Container className="Box pt-5" fluid>
            <Row className="mainsection">
                <Col xs={12} md="5">
                    <ImgSect>
                        <img src="/Images/logo.png" className="d-inline-block align-top" alt="Logo" style={{ height: "6em" }} fluid />
                    </ImgSect>
                    <Sect1>
                        <Text>Audrey Mail is a four-story shopping and entertainment center located in the heart of downtown San Diego in the thriving Yerba Buena Neighborhood. Shop at the City Target on the second level and visit a 16-screen AMC Theater with the largest IMAX in North America.</Text>
                    </Sect1>
                    <Sect1>
                        <Icon>
                            <ul className="list-unstyled list-inline">
                                <li className="list-inline-item">
                                    <a href="#a" className="btn-floating btn-sm text-white">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#a" className="btn-floating btn-sm text-white">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#a" className="btn-floating btn-sm text-white">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#a" className="btn-floating btn-sm text-white">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#a" className="btn-floating btn-sm text-white">
                                        <i className="fab fa-google-plus"></i>
                                    </a>
                                </li>
                            </ul>
                        </Icon>
                    </Sect1>
                </Col>
                <Col md="2" xs={6} >
                    <Sect2>
                        <Sect3>
                            <TextHead>Navigation</TextHead>
                            <ListHead>
                                <List><a href="#a" className="navigation">Shopping</a></List>
                                <List><a href="#a" className="navigation">Dinning</a></List>
                                <List><a href="#a" className="navigation">Entertainment</a></List>
                                <List><a href="#a" className="navigation">Parking</a></List>
                            </ListHead>
                        </Sect3>
                    </Sect2>
                </Col>
                <Col md="2" xs={6} >
                    <Sect2>
                        <Sect3>
                            <TextHead>Customer Service</TextHead>
                            <ListHead2>
                                <List><a href="#a" className="navigation">About Us</a></List>
                                <List><a href="#a" className="navigation">Contacts</a></List>
                                <List><a href="#a" className="navigation">Services</a></List>
                                <List><a href="#a" className="navigation">Events</a></List>
                            </ListHead2>
                        </Sect3>
                    </Sect2>
                </Col>
                <Col md="3" xs={12}>
                    <Sect2>
                        <Sect4>
                            <TextHead>Working Hours</TextHead>
                            <ListHead>
                                <List2>
                                    <Special>Shopping</Special>
                                    <ListText>10:00 am - 22:00 pm</ListText>
                                </List2>
                                <List2>
                                    <Special>Entertainment Zone</Special>
                                    <ListText>10:00 am - 22:00 pm</ListText>
                                </List2>
                                <List2>
                                    <Special>Cinema</Special>
                                    <ListText>10:00 am - 22:00 pm</ListText>
                                </List2>
                                <List2>
                                    <Special>Parking</Special>
                                    <ListText>10:00 am - 22:00 pm</ListText>
                                </List2>
                            </ListHead>
                        </Sect4>
                    </Sect2>
                </Col>
            </Row>
            <Row>
                <Copy>
                    <p>© 2021 <span>All Rights Reserved</span></p>
                </Copy>
            </Row>
        </Container>
    )
}

export default Footer
