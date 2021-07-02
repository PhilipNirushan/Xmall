import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'


const Title = styled.div`
    font-size: 25px;
    font-weight: 500;
    position: relative;
    ::before{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 3px;
        width: 30px;
        background: #9b59b5;
    }
`;

const UserDetails = styled.div`
    @media only screen and (max-width: 576px) {
        height: 300px;
        overflow: scroll;
}
`;

const RegisterScreen = () => {
    return (
        <div>
            <Container>
                <Row className="my-5">
                    <Col lg="2"></Col>
                    <Col lg="8">
                        <Title>
                            Registration
                        </Title>
                        <div>
                        <Form className="mt-4">
                            <UserDetails>
                                <Form.Row className="mb-1">
                                    <Col md="6">
                                        <Form.Group controlId="formBasicFullName">
                                            <Form.Label>FullName</Form.Label>
                                            <Form.Control type="text" placeholder="Enter your Name"/>
                                        </Form.Group>
                                    </Col>
                                    <Col md="6">
                                        <Form.Group controlId="formBasicUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Enter your Username" />
                                        </Form.Group>
                                    </Col> 
                                </Form.Row>
                                <Form.Row className="mb-1">
                                    <Col md="6">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter your Email" />
                                        </Form.Group>
                                    </Col>
                                    <Col md="6">
                                        <Form.Group controlId="formBasicPhoneNumber">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter your Number" />
                                        </Form.Group>
                                    </Col> 
                                </Form.Row>
                                <Form.Row className="mb-1">
                                    <Col md="6">
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter your Password" />
                                        </Form.Group>
                                    </Col>
                                    <Col md="6">
                                        <Form.Group controlId="formBasicConfirmPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Confirm your Password" />
                                        </Form.Group>
                                    </Col> 
                                </Form.Row>
                            </UserDetails>
                            <fieldset>
                                <Form.Row className="mb-1" style={{"margin-left": "1px"}} >
                                    <Form.Label>
                                        Gender
                                    </Form.Label>
                                </Form.Row>
                                <Form.Group as={Row}>
                                    <Col sm="3" xs="2">
                                        <Form.Check inline type="radio" label="Male" name="formHorizontalRadios" id="formHorizontalRadios1"/>
                                    </Col>
                                    <Col sm="3" xs="2">
                                        <Form.Check inline type="radio" label="Female" name="formHorizontalRadios" id="formHorizontalRadios2"/>
                                    </Col>
                                    <Col sm="4" xs="8">
                                        <Form.Check inline type="radio" label="Prefer not to say" name="formHorizontalRadios" id="formHorizontalRadios3" className="radioOther"/>
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Form.Row className="my-3">
                                <Col>
                                    <Button variant="primary" type="submit" className="btn1">
                                        Register
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                        </div>
                    </Col>
                    <Col lg="2"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterScreen
