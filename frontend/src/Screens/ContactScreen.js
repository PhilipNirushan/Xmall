import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const Line  = styled.hr`
    width:  50px;
    height: 3px;
    padding: 0;
    margin: 5px auto;
    border:none;
    background: #79d5ca;
    margin-left: 0;
`;

const Title = styled.h3`
    font-size: 28px;
    line-height: 1.2;
    @media(min-width: 992px){
        font-size: 40px;
        line-height: 1.25;
    }
    @media(min-width: 768px){
        font-size: 34px;
    }
    margin-top: 20px;
`;

const Head5 = styled.h5`
    margin-top: 15px;
    font-size: 18.5px;
    line-height: 1.5;
    @media (min-width: 992px){
        line-height: 1.09091;
        font-size: 22px;
    }

`;

const List = styled.ul`
    margin-top: 20px;
    margin-left: -5px;
    margin-right: -5px;
`;

const FirstList = styled.li`
    padding-left: 0;
`;

const Socials = styled(Link)`
    color: #b6b6b6 !important;
`

const Sect = styled.div`
    margin-top: 60px;
    @media(min-width: 992px){
        margin-top: 85px;
    }
`;
const Icon = styled.i`
    color:#764ebe !important;
    margin-left: -30px;
`;

const Info = styled.span`
    color: #7d7d7d !important;
    font-size: 16px;
`;

const ContactScreen = () => {
    return (
        <Container className="my-5">
            <Row >
                <Col lg={8} md={11}>
                <div>
                    <Line></Line>
                    <Title>Get in Touch</Title>
                    <p className="lead">You can contact us any way that is convenient for you. We are available 24/7 via fax or email. You can also use a quick contact form below or visit us personally. We would be happy to answer your questions.</p>
                    <Form className="my-5">
                        <Form.Row>
                            <Col lg={6}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control size="lg" type="text" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control size="lg" type="text" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control size="lg" type="email"/>
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control size="lg" type="text" />
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Form.Group controlId="formMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={5} />
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={3} xs={6} className="mt-3">
                                <Button type="submit" className="btn1">Submit</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
                </Col>
                <Col lg={4} md={10}>
                    <Line/>
                    <Head5>Socials</Head5>
                    <List className="list-unstyled list-inline" >
                        <li className="list-inline-item">
                            <Socials to="https://www.facebook.com/" className="btn-sm ">
                                <FirstList className="fab fa-facebook-f"></FirstList>
                            </Socials>
                        </li>
                        <li className="list-inline-item">
                            <Socials to="https://twitter.com/" className="btn-sm ">
                                <i className="fab fa-twitter"></i>
                            </Socials>
                        </li>
                        <li className="list-inline-item">
                            <Socials to="https://www.instagram.com/" className="btn-sm ">
                                <i className="fab fa-instagram"></i>
                            </Socials>
                        </li>
                        <li className="list-inline-item">
                            <Socials to="https://www.pinterest.com/" className="btn-sm ">
                                <i className="fab fa-pinterest-p"></i>
                            </Socials>
                        </li>
                        <li className="list-inline-item">
                            <Socials to="https://www.youtube.com/" className="btn-sm">
                                <i className="fab fa-youtube"></i>
                            </Socials>
                        </li>
                        <li className="list-inline-item">
                            <Socials to="https://myaccount.google.com/" className="btn-sm">
                                <i className="fab fa-google-plus-g"></i>
                            </Socials>
                        </li>
                    </List>
                    <Sect>
                        <Line/>
                        <Head5>Phones</Head5>
                        <List>
                            <li className="list-unstyled list-inline lead">
                                <Icon className="fas fa-phone-alt"></Icon> 
                                <Info> 1-800-1234-567, 1-800-9514-654</Info>
                            </li>
                        </List>
                    </Sect>
                    <Sect>
                        <Line/>
                        <Head5>E-mail</Head5>
                        <List>
                            <li className="list-unstyled list-inline lead">
                                <Icon className="fas fa-envelope"></Icon> <Info> info@xmall.org</Info>
                            </li>
                        </List>
                    </Sect>
                    <Sect>
                        <Line/>
                        <Head5>Address</Head5>
                        <List>
                            <li className="list-unstyled list-inline">
                                <Icon className="fas fa-map-marker-alt"></Icon> <Info> 2130 Fulton Street, San Diego, CA 94117-1080 USA</Info>
                            </li>
                        </List>
                    </Sect>
                </Col>
            </Row> 
        </Container>
    )
}

export default ContactScreen
