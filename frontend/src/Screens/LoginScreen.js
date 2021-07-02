import React from 'react'
import { Container, Row, Col, Form, Button, Image} from 'react-bootstrap'


const LoginScreen = () => {
    return (
        <div className="my-4 my-5">
            <Container>
                <Row className="no-gutters form-row">
                    <Col md="5">
                        <Image src="/Images/interface.png" alt="login" fluid/>
                    </Col>
                    <Col md="7" className="px-5 pt-5">
                        <h4>Sign into your account</h4>
                        <Form>
                            <Form.Row>
                                <Col lg="7">
                                <Form.Control type="email" placeholder="Enter email"  className="my-3 p-4"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col lg="7">
                                    <Form.Control type="password" placeholder="Password" className="my-3 p-4"/>
                                </Col>
                            </Form.Row>
                            <Form.Row className="mt-3">
                                <Col lg="7">
                                    <Button variant="primary" type="button" className="btn1">
                                        Login
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default LoginScreen
