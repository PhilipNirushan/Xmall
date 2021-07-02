import React from 'react'
import { Row, Col, Button, Jumbotron} from 'react-bootstrap'
import styled from 'styled-components'



const HeadText = styled.h3`
    text-align: center;
    font-size: 28px;
    line-height: 1.2;
    color: #474749;

    @media (min-width: 768px){
        font-size: 34px;
    }
    @media (min-width: 992px){
        text-align: left !important;
        font-size: 40px ;
        line-height: 1.25;
    }
`;

const Text = styled.p`
    color: #7D7D7D;
    letter-spacing: 2px;
    text-align: justify;
`;


const SectionA = styled.div`
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 60px;
`;


const SectionB = styled.div`
    margin-top: 25px;
    @media (min-width: 768px){
    margin-top: 30px;
}
`;

const Line = styled.hr`
    background: #79d5ca;
    margin-top: 15px;
    width: 30px;
    height: 3px;
    padding: 0;
    margin: 5px auto;
    box-sizing: content-box;
    overflow: visible;
`;

const SectionHead = styled.h6`
    color: #474749;
    font-weight: 700;
    font-family: "Montserrat", Georgia, "Times New Roman", Times, serif;
    font-size: 17px;
    line-height: 1.5;
    text-align: center;
    @media (min-width: 992px){
    line-height: 1.22222;
    font-size: 18px;
    
}
`;

const SectionText = styled.p`
color: #7D7D7D;
letter-spacing: 1px;
text-align: center;
margin-top: 15px;
@media (min-width: 768px){
    margin-top: 25px;
}

`; 

const AboutSection = () => {
    return (
            <Jumbotron className="px-5 pt-5">
                <Row>
                    <Col lg={4}>
                        <div>
                            <HeadText>A Few Words About</HeadText>
                            <HeadText>XMall</HeadText>
                        </div>
                        <div className="mt-4">
                            <Text>XMall is a four-story vertical shopping and entertainment center located in the heart of downtown San Diego in the thriving Yerba Buena Neighborhood. Shop at the City Target on the second level and visit a 16-screen AMC Theater with the largest IMAX in North America.</Text>
                        </div>
                        <Button className="py-2 px-4 " style={{width: "175px", margin: "0 0 60px 0"}}>Learn More</Button>
                    </Col>
                    <Col lg={8}>
                        <Row lg={3} md={3} xs={1}>
                            <Col>
                                <SectionA>
                                    <img src="/Images/wifi.png" alt="WiFi" className="mx-auto d-block"/>
                                    <SectionB>
                                        <SectionHead>Free Wi-Fi</SectionHead>
                                        <Line></Line>
                                        <SectionText>
                                            We have a network accessible for free across the entire common mall area.
                                        </SectionText>
                                    </SectionB>
                                </SectionA>
                            </Col>
                            <Col>
                                <SectionA>
                                    <img src="/Images/gift.png" alt="Gifts" className="mx-auto d-block"/>
                                    <SectionB>
                                        <SectionHead>Mall Gift Cards</SectionHead>
                                        <Line></Line>
                                        <SectionText>
                                            The best gift solution is available at your favorite shopping mall.
                                        </SectionText>
                                    </SectionB>
                                </SectionA>   
                            </Col>
                            <Col>
                                <SectionA>
                                    <img src="/Images/suitcase.png" alt="Suitcase" className="mx-auto d-block"/>
                                    <SectionB>
                                        <SectionHead>Lost and Found</SectionHead>
                                        <Line></Line>
                                        <SectionText>
                                        Did you lose an item while visiting the mall? Call now 1-800-1234-456.
                                        </SectionText>
                                    </SectionB>
                                </SectionA>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Jumbotron>
    )
}

export default AboutSection
