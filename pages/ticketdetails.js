import React, { Component } from 'react';
import Layout from '../components/layout';
import { Row, Col, Form, InputGroup, Button, Accordion, Card } from 'react-bootstrap';
import { Rating } from 'react-rating';
import DatePicker from 'react-datepicker';
import sortJsonArray from 'sort-json-array';
import ReactTooltip from 'react-tooltip';
import dateFormat from 'dateformat';
import LoaderIcon from '../components/loaderspinner.js';
import getSymbolFromCurrency from 'currency-symbol-map'
// import { TimelineLite, TweenLite } from 'gsap';
import datetimeDifference from "datetime-difference";

class TicketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <div className='t_detail'>
                        <div className='top'>
                            <Row>
                                <Col xs={4}>
                                    <div className='arrowLeft'>
                                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                                        <span> Back to results</span>
                                    </div>
                                </Col>
                                <Col xs={4} className='text-center'>
                                    <div className='arrowLeft Center'>
                                        Details
                                    </div>
                                </Col>
                                <Col xs={4} className='text-right'>
                                    <div className='arrowLeft'>
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* Next Section */}
                        <div className='next_section'>
                            <div className='container'>
                                <Row>
                                    <Col sm={12} md={7} style={{ borderRight: '1.5px solid #dedede' }}>
                                        {/* Accordion */}
                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Card.Header>
                                                    <p className='outbound'><b>Outbound, </b>Tues 1 Oct 2019</p>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                        <Row className='airlines'>
                                                            <Col xs={12} sm={3} className=''>
                                                                <p className="sort-countryname">
                                                                    <img className='' alt='Flight Name' src='https://www.skyscanner.net/images/airlines/small/0S.png'></img>
                                                                </p>
                                                            </Col>
                                                            <Col xs={12} sm={8} className="flight-details pad-0">
                                                                <Row>
                                                                    <Col xs={4}>
                                                                        <div className="start-time text-right">
                                                                            08:25
                                                                            <p className="mini-text">IXM</p>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4} className='text-center'>
                                                                        <div className='hrs'>
                                                                            <span className="mini-text" style={{ borderBottom: '1px solid #909090' }}>2hrs 25mins</span>
                                                                            <span className="mini-text sky-text">Non stop</span>
                                                                            <img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <div className="start-time">
                                                                            18:15
                                                                            <p className="mini-text">BOM</p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xs={12} sm={1} className='text-center'>
                                                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                                            </Col>
                                                        </Row>

                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Row className='Detailssss'>
                                                            <Col xs={2}>

                                                            </Col>
                                                            <Col xs={10}>
                                                                <div className='name'>
                                                                    <img className='jet_img' height='24' width='24' src='https://www.skyscanner.net/images/airlines/favicon/0S.png' alt='Flight Name' />
                                                                    <span>SpiceJet SG6379</span>
                                                                </div>
                                                            </Col>
                                                            <Col sm={2}>
                                                                <p className='flight_hrs'>2hrs 25</p>
                                                            </Col>
                                                            <Col xs={12} sm={10}>
                                                                <Row className='track'>
                                                                    <Col xs={1}>
                                                                        <div className="circles">
                                                                            <div className="timeline-trackline"></div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={3}>
                                                                        <div className="ttime">
                                                                            15.50
                                                                        </div>
                                                                        <div className="ttime">
                                                                            18.50
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={8}>
                                                                        <div className="ttime">
                                                                            BOM Mumbai
                                                                        </div>
                                                                        <div className="ttime">
                                                                            LHR London Heathrow
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xs={12}>
                                                                <p><b>Arrives:</b> Tue, 1 Oct 2019 | <b>Journey duration:</b> 2h 25</p>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Card.Header>
                                                    <p className='outbound'><b>Return, </b>Thurs 31 Oct 2019</p>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                        <Row className='airlines'>
                                                            <Col xs={12} sm={3} className=''>
                                                                <p className="sort-countryname">Airlines</p>
                                                            </Col>
                                                            <Col xs={12} sm={8} className="flight-details">
                                                                <Row>
                                                                    <Col xs={4}>
                                                                        <div className="start-time text-right">
                                                                            08:25
                                                                            <p className="mini-text">IXM</p>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4} className='text-center'>
                                                                        <div className='hrs'>
                                                                            <span className="mini-text" style={{ borderBottom: '1px solid #909090' }}>2hrs 25mins</span>
                                                                            <span className="mini-text sky-text">Non stop</span>
                                                                            <img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <div className="start-time">
                                                                            18:15
                                                                            <p className="mini-text">BOM</p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xs={12} sm={1} className='text-center'>
                                                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="1">
                                                    <Card.Body>
                                                        <Row className='Detailssss'>
                                                            <Col xs={2}>

                                                            </Col>
                                                            <Col xs={10}>
                                                                <div className='name'>
                                                                    <img className='jet_img' height='24' width='24' src='https://www.skyscanner.net/images/airlines/favicon/0S.png' alt='Flight Name' />
                                                                    <span>SpiceJet SG6379</span>
                                                                </div>
                                                            </Col>
                                                            <Col sm={2}>
                                                                <p className='flight_hrs'>2hrs 25</p>
                                                            </Col>
                                                            <Col xs={12} sm={10}>
                                                                <Row className='track'>
                                                                    <Col xs={1}>
                                                                        <div className="circles">
                                                                            <div className="timeline-trackline"></div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={3}>
                                                                        <div className="ttime">
                                                                            15.50
                                                                        </div>
                                                                        <div className="ttime">
                                                                            18.50
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={8}>
                                                                        <div className="ttime">
                                                                            BOM Mumbai
                                                                        </div>
                                                                        <div className="ttime">
                                                                            LHR London Heathrow
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xs={12}>
                                                                <p><b>Arrives:</b> Tue, 1 Oct 2019 | <b>Journey duration:</b> 2h 25</p>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <div className='next-section'>
                                            <h3 className='book-your-ticket-header'>Book your ticket</h3>
                                            <p className='book-subtitle'>Economy class, 1 adult</p>
                                            <Accordion className='read_before_booking' defaultActiveKey="0">
                                                <Card>
                                                    <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="new" eventKey="0">
                                                            Read before booking
                                                        </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body>
                                                            <p className='read-text' style={{ whiteSpace: 'normal' }}>Prices shown always include an estimate of all mandatory taxes and charges, but remember to <b>check ALL ticket details, final prices and terms and conditions</b> on the booking website before you book.</p>
                                                            <ul>
                                                                <li className='read-text'>
                                                                    <b>Check for extra fees</b><br></br>
                                                                    Some airlines / agents charge extra for <b>baggage, insurance</b> or use of <b>credit cards</b>. View airlines fees.
                                                                </li>
                                                                <li className='read-text'>
                                                                    <b>Check T&Cs for travellers aged 12-16</b><br></br>
                                                                    Restrictions may apply to young passengers travelling alone.
                                                                </li>
                                                            </ul>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>

                                            <Row className='tripdotcom'>
                                                <Col xs={6}>
                                                    <div className='trip-1st'>
                                                        <p>EaseMyTrip.com</p>
                                                        <div className='star_rating'>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                            <div className='comment_number'>
                                                                5555
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={6} className='text-right'>
                                                    <div className='trip-2st'>
                                                        <h4>₹ 9,959</h4>
                                                        <a href='https://www.lycafly.com' target="_blank">
                                                            <button className='bpk-button'>
                                                                Select <i className='fa fa-arrow-right'></i>
                                                            </button>
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col s={12}>
                                                    {/* <div className='info'>
                                                        <img src='static/images/info.svg'></img>
                                                        <p>All-inclusive price. No additional charges.</p>
                                                    </div>
                                                    <div className='info'>
                                                        <img src='static/images/flight.svg'></img>
                                                        <p>Skyscanner Exclusive: Use coupon CTSKYSCANNER to get up to INR 3,000 Cashback on domestic flights*.</p>
                                                    </div>
                                                    <div className='info comment'>
                                                        <img src='static/images/comment.svg'></img>
                                                        <p>*Refer to Terms and Conditions at bit.ly/CT_SKYSCANNER</p>
                                                    </div> */}
                                                </Col>
                                            </Row>

                                            <Row className='tripdotcom'>
                                                <Col xs={6}>
                                                    <div className='trip-1st'>
                                                        <p>Happy easy go</p>
                                                        <div className='star_rating'>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                            <div className='comment_number'>
                                                                5555
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={6} className='text-right'>
                                                    <div className='trip-2st'>
                                                        <h4>₹ 9,959</h4>
                                                        <button className='bpk-button'>
                                                            Select <i className='fa fa-arrow-right'></i>
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col s={12}>
                                                    <div className='info'>
                                                        <img src='static/images/info.svg'></img>
                                                        <p>All-inclusive price. No additional charges.</p>
                                                    </div>
                                                    <div className='info'>
                                                        <img src='static/images/flight.svg'></img>
                                                        <p>Skyscanner Exclusive: Use coupon CTSKYSCANNER to get up to INR 3,000 Cashback on domestic flights*.</p>
                                                    </div>
                                                    <div className='info comment'>
                                                        <img src='static/images/comment.svg'></img>
                                                        <p>*Refer to Terms and Conditions at bit.ly/CT_SKYSCANNER</p>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className='tripdotcom'>
                                                <Col xs={6}>
                                                    <div className='trip-1st'>
                                                        <p>Cleartrip</p>
                                                        <div className='star_rating'>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                            <div className='comment_number'>
                                                                5555
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={6} className='text-right'>
                                                    <div className='trip-2st'>
                                                        <h4>₹ 9,959</h4>
                                                        <button className='bpk-button'>
                                                            Select <i className='fa fa-arrow-right'></i>
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col s={12}>
                                                    {/* <div className='info'>
                                                        <img src='static/images/info.svg'></img>
                                                        <p>All-inclusive price. No additional charges.</p>
                                                    </div>
                                                    <div className='info'>
                                                        <img src='static/images/flight.svg'></img>
                                                        <p>Skyscanner Exclusive: Use coupon CTSKYSCANNER to get up to INR 3,000 Cashback on domestic flights*.</p>
                                                    </div>
                                                    <div className='info comment'>
                                                        <img src='static/images/comment.svg'></img>
                                                        <p>*Refer to Terms and Conditions at bit.ly/CT_SKYSCANNER</p>
                                                    </div> */}
                                                </Col>
                                            </Row>

                                            <Row className='tripdotcom'>
                                                <Col xs={6}>
                                                    <div className='trip-1st'>
                                                        <p>Cheapticket.in</p>
                                                        <div className='star_rating'>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                            <div className='comment_number'>
                                                                5555
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={6} className='text-right'>
                                                    <div className='trip-2st'>
                                                        <h4>₹ 9,959</h4>
                                                        <button className='bpk-button'>
                                                            Select <i className='fa fa-arrow-right'></i>
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col s={12}>
                                                    <div className='info'>
                                                        <img src='static/images/info.svg'></img>
                                                        <p>All-inclusive price. No additional charges.</p>
                                                    </div>
                                                    <div className='info'>
                                                        <img src='static/images/flight.svg'></img>
                                                        <p>Skyscanner Exclusive: Use coupon CTSKYSCANNER to get up to INR 3,000 Cashback on domestic flights*.</p>
                                                    </div>
                                                    <div className='info comment'>
                                                        <img src='static/images/comment.svg'></img>
                                                        <p>*Refer to Terms and Conditions at bit.ly/CT_SKYSCANNER</p>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className='tripdotcom'>
                                                <Col xs={6}>
                                                    <div className='trip-1st'>
                                                        <p>SpiceJet</p>
                                                        <div className='star_rating'>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                            <div className='comment_number'>
                                                                5555
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={6} className='text-right'>
                                                    <div className='trip-2st'>
                                                        <h4>₹ 9,959</h4>
                                                        <button className='bpk-button'>
                                                            Select <i className='fa fa-arrow-right'></i>
                                                        </button>
                                                    </div>
                                                </Col>
                                                {/* <Col s={12}>
                                                    <div className='info'>
                                                        <img src='static/images/info.svg'></img>
                                                        <p>All-inclusive price. No additional charges.</p>
                                                    </div>
                                                    <div className='info'>
                                                        <img src='static/images/flight.svg'></img>
                                                        <p>Skyscanner Exclusive: Use coupon CTSKYSCANNER to get up to INR 3,000 Cashback on domestic flights*.</p>
                                                    </div>
                                                    <div className='info comment'>
                                                        <img src='static/images/comment.svg'></img>
                                                        <p>*Refer to Terms and Conditions at bit.ly/CT_SKYSCANNER</p>
                                                    </div>
                                                </Col> */}
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default TicketDetails;