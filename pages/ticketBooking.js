import React, { Component } from 'react';
import Layout from '../components/layout';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import sortJsonArray from 'sort-json-array';
import ReactTooltip from 'react-tooltip';
import dateFormat from 'dateformat';
import LoaderIcon from '../components/loaderspinner.js';
import getSymbolFromCurrency from 'currency-symbol-map'
// import { TimelineLite, TweenLite } from 'gsap';
import datetimeDifference from "datetime-difference";

class TicketBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            startDate: new Date(),
            endDate: new Date(),
            sourcePlace: 'London,United Kingdom',
            destinationPlace: 'Newyork, United States of America',
            popularitySort: false,
            priceSort: false,
            durationSort: false,
            popularityIcon: 0,
            priceIcon: 1,
            durationIcon: 0,
            nonstop: false,
            loader: false,
            sortToggler: false,
            filterToggler: false,
            sortOption:'Best'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.changePlace = this.changePlace.bind(this);
        this.changeMonthDate = this.changeMonthDate.bind(this);
        this.nonStopFlights = this.nonStopFlights.bind(this);
        this.TimeSplit = this.TimeSplit.bind(this);
        this.handlesortToggler = this.handlesortToggler.bind(this);
        this.handleFilterToggler = this.handleFilterToggler.bind(this);
        this.calculateDuration = this.calculateDuration.bind(this);
        this.handleSortOption = this.handleSortOption.bind(this);
        // this.myTween = new TimelineLite({ paused: true });
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    handleChange1(date) {
        this.setState({
            endDate: date
        });
    }
    changePlace(e) {
        this.setState({
            sourcePlace: this.state.destinationPlace,
            destinationPlace: this.state.sourcePlace
        })
    }


    changeMonthDate(dt) {
        var date1 = dt.split('-')
        var newDate = date1[1] + '-' + date1[0] + '-' + date1[2];
        var date = new Date(newDate);
        return (date);
    }

    nonStopFlights() {
        this.setState({ nonstop: !this.state.nonstop });
        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        console.log(data);
        data = data.filter(item => {
            return item.flightLeg[0].flightDetails.isDirect == true;
        });
        console.log(data);
    }

    TimeSplit(time) {
        time = time.replace(/(..?)/g, '$1:').slice(0, -1)
        return (time);
    }

    handlesortToggler() {
        this.setState({ sortToggler: true, filterToggler: false })
    }

    handleFilterToggler() {
        this.setState({ filterToggler: true, sortToggler: false })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollToElement);
    }

    handleScrollToElement(event) {
        $(window).scroll(function () {
            var sticky = $('.filtering-row.row'),
                scroll = $(window).scrollTop();

            if (scroll >= 400) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        });
    }

    calculateDuration(dt1, dt2, tm1, tm2) {
        var date1 = dt1.split('-')
        var date1 = date1[1] + '-' + date1[0] + '-' + date1[2];
        tm1 = tm1.replace(/(..?)/g, '$1:').slice(0, -1);
        dt1 = date1 + ", " + tm1;
        var date2 = dt2.split('-')
        var date2 = date2[1] + '-' + date2[0] + '-' + date2[2];
        tm2 = tm2.replace(/(..?)/g, '$1:').slice(0, -1);
        dt2 = date2 + ", " + tm2;
        var duration = datetimeDifference(new Date(dt1), new Date(dt2));
        var hours = duration.hours;
        var minutes = duration.minutes;
        if (minutes != 0) {
            var duration_time = hours + "hrs " + minutes + "min";
        }
        else {
            var duration_time = hours + "hrs ";
        }
        return (duration_time);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScrollToElement);

        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        data = data.sort(function (obj1, obj2) {
            return obj1.totalFare - obj2.totalFare;
        });
    }
    handleSortOption(e)
    {
        console.log(e.target.value);
        if(e.target.value =="best")
        {
        this.setState({loader:true});
        setTimeout(() => {
                this.setState({loader: false,sortOption: 'Best'})
            },500);
        var data = require('../data/AW_Response.json');
        data = sortJsonArray(data.recommendation,"marketingAirlineNames","asc"); 
        }
        else if(e.target.value =="cheapest")
        {
        this.setState({loader:true});
        setTimeout(() => {
                this.setState({loader: false,sortOption: 'Cheapest First'})
            },500);
        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        data = data.sort(function(obj1, obj2) {
            return obj1.totalFare - obj2.totalFare;
        });
        var cheapest_top_price = data[0].totalFare;
        }
        else if(e.target.value =="fastest")
        {
        this.setState({loader:true});
        setTimeout(() => {
                this.setState({loader: false,sortOption: 'Fastest First'})
            },500);
        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        data = data.sort(function(obj1, obj2) {
            return obj1.totalFare - obj2.totalFare;
        });
        }
        else if(e.target.value =="outbound")
        {
        this.setState({loader:true});
        setTimeout(() => {
                    this.setState({loader: false,sortOption: 'Outbound: Departue Time'})
                },500);
        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        data = data.sort(function(obj1, obj2) {
            return obj1.totalFare - obj2.totalFare;
        });
        }
        else if(e.target.value =="airline")
        {
        this.setState({loader:true});
        setTimeout(() => {
                    this.setState({loader: false,sortOption: 'Airline'})
                },500);
        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        data = data.sort(function(obj1, obj2) {
            return obj1.totalFare - obj2.totalFare;
        });
        }
        else if(e.target.value =="stops")
        {
        this.setState({loader:true});
        setTimeout(() => {
                this.setState({loader: false,sortOption: 'Stops'})
            },500);
        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        data = data.sort(function(obj1, obj2) {
            return obj1.totalFare - obj2.totalFare;
        });
        }
    }
    render() {
        var fulldata = require('../data/AW_Response.json');
        var data = require('../data/AW_Response.json');
        data = data.recommendation;
        console.log(data.length);
        var cheapest_price = Math.min.apply(Math, data.map(function (o) { return o.totalFare; }))

        return (
            <Layout>
                <div className="container-fluid">
                    <div className="bg-img">
                        <Row className="margin-0">
                            <Col sm={12} style={{ padding: '0' }}>
                                <div className="passanger-details">
                                    <Row>
                                        <Col xl={3} lg={4} md={6} sm={8} xs={9} className='pad-6'>
                                            <Row>
                                                <Col sm={5} xs={5}>
                                                    <div className='passanger-class'>
                                                        <small className="pink-text absl-text">TRIP TYPE</small>
                                                        <Form.Control className='trip_select' as="select">
                                                            <option value="1">One Way</option>
                                                            <option value="2">Round Trip</option>
                                                            <option value="3">Multi-city</option>
                                                        </Form.Control>
                                                        <i className="fa fa-sort-desc" aria-hidden="true"></i>
                                                    </div>
                                                </Col>
                                                <Col sm={7} xs={7}>
                                                    <div className="passanger-class">
                                                        <small className="pink-text absl-text">Passanger & Class</small>
                                                        <p>1 Adult, Economy{this.props.userAgent}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={9} lg={8} md={6} sm={4} xs={3} className='pad-6'>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={12} lg={6}>
                                            <Row>
                                                <Col md={6} sm={6} xs={12} className='pad-6'>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend" className="bluebg-igroup"><i className="fa fa-map-marker" aria-hidden="true"></i></InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Source City"
                                                                aria-describedby="inputGroupPrepend"
                                                                value={this.state.sourcePlace}
                                                                readOnly="yes"
                                                                className="blubg-control"
                                                                name="sourcePlace" />
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <i className="fa fa-exchange" aria-hidden="true" onClick={this.changePlace}></i>
                                                </Col>
                                                <Col md={6} sm={6} xs={12} className='pad-6'>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend" className="bluebg-igroup"><i className="fa fa-map-marker" aria-hidden="true"></i></InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Destination City"
                                                                aria-describedby="inputGroupPrepend"
                                                                value={this.state.destinationPlace}
                                                                readOnly="yes"
                                                                className="blubg-control"
                                                                name="destinationPlace" />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={12} lg={6} className="padding-col">
                                            <Row>
                                                <Col lg={8} md={8} sm={9} xs={12} className='pad-6'>
                                                    <div className='dis_flex'>
                                                        <div className="calendar">
                                                            <img className="img_calendar" src="static/images/calendar.svg" width='25'></img>
                                                            <DatePicker
                                                                name="departureDate"
                                                                className="form-control"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dateFormat="eee, MMM d"
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChange} />
                                                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>&nbsp;
                                                            <span className='separt'> | </span>
                                                        </div>
                                                        <div className='calendar'>
                                                            <DatePicker
                                                                name="departureDate"
                                                                className="form-control"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dateFormat="eee, MMM d"
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChange1} />
                                                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={4} md={4} sm={3} xs={12} className='pad-6'>
                                                    <button className="btn-search">SEARCH</button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Filtering component */}
                    <div className="mobile-filterscreen">
                        <div className="visible-xs filter-mobile">
                            <Row className="filtering-row">
                                {/* <Col sm={6} xs={6} lg={6} style={{ borderRight: '1px solid #FF4057' }}>
                                    <span onClick={this.handlesortToggler} className="mob-togglehead">Sort </span>
                                </Col> */}
                                <Col sm={12} xs={12} lg={12}>
                                    <span onClick={this.handleFilterToggler} className="mob-togglehead">Filter </span>
                                </Col>
                            </Row>
                            <div style={{ position: 'relative' }} hidden={!this.state.sortToggler}>
                                <Row className='sort'>
                                    <Col md={12} xs={12}>
                                        <p>
                                            <span className="bold-text" style={{ fontSize: '13px' }}>Sort by:</span>
                                            <Button variant="outline-danger" style={{ float: 'right' }} onClick={() => this.setState({ sortToggler: false, filterToggler: false })}>Close</Button>
                                        </p>
                                        <ul className="mobile-sortlist">
                                            <li>
                                                <p onClick={this.sortPopularity}>
                                                    <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Popularity" /><span> Popularity</span>
                                                </p>
                                            </li>
                                            <li>
                                                <p onClick={this.sortDuration}>
                                                    <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Duration" /><span> Duration</span>
                                                </p>
                                            </li>
                                            <li>
                                                <p onClick={this.sortPrice}>
                                                    <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Price" /><span> Price</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        {this.state.filterToggler ?
                        <div className="datas">
                            <Row>
                                <Col xs={12}>
                                    <p>
                                        <span className="bold-text">Filter by:</span>
                                        <Button variant="outline-danger" style={{ float: 'right' }} onClick={() => this.setState({ sortToggler: false, filterToggler: false })}>Done</Button>
                                    </p>

                                    <br />
                                    <Row>
                                        <Col xs={12}>
                                            <p className='small_txt'>
                                                <b>Stops</b>
                                                {/* <small className="pink-text" style={{ float: 'right' }}>Reset</small> */}
                                            </p>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className='checkbox-custom'>
                                                        <Form.Check type="checkbox" label="Non-stop" name="stop1" value="Non-stop" />
                                                        <Form.Check type="checkbox" label="1stop" name="stop2" value="1stop" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={12}>
                                            <p className='small_txt'>
                                                <b>Departure from London</b> 
                                                {/* <small className="pink-text" style={{ float: 'right' }}>Reset</small> */}
                                            </p>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className='checkbox-custom'>
                                                        <Form.Check type="checkbox" label="6AM - 12 Noon" />
                                                        <Form.Check type="checkbox" label="After 6PM" />
                                                        <Form.Check type="checkbox" label="12 Noon - 6PM" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={12}>
                                            <p className='small_txt'>
                                                <b>Departure from Newyork</b>
                                                {/* <small className="pink-text" style={{ float: 'right' }}>Reset</small> */}
                                            </p>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className='checkbox-custom'>
                                                        <Form.Check type="checkbox" label="6AM - 12 Noon" />
                                                        <Form.Check type="checkbox" label="After 6PM" />
                                                        <Form.Check type="checkbox" label="12 Noon - 6PM" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <Row>
                                        <Col xs={12}>
                                            <p className='small_txt'>
                                                <b>Airlines</b>
                                            </p>
                                        </Col>
                                        <Col xs={12}>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className='checkbox-custom'>
                                                        <Form.Check type="checkbox" label="Aer Lingus(2) 103,931" />
                                                        <Form.Check type="checkbox" label="Alitalia(6) 86,227" />
                                                        <Form.Check type="checkbox" label="Aer Finance(2) 103,931" />
                                                        <Form.Check type="checkbox" label="American Airlines,102,750" />
                                                    </div>
                                                </Col>
                                                {/* <Col xs={12}>
                                                    <small className="pink-text" style={{ float: 'left', marginTop: '20px' }}>More Filters</small>
                                                </Col> */}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div> : null}
                    </div>
                    {/* ---------------- end for mobile ---------------- */}

                    {/* ----------- Desktop Filters, Datas and Ad.. -----------  */}
                    {/* ---------------- Desktop Filter Datas ---------------- */}
                    <div className='filter-data'>
                        <div className = 'container-fluid'>
                            <Row>
                                <Col sm={12} md={12} lg={10} xl={10}>
                                    <Row>
                                        {/* Filter Datas */}
                                        <Col sm={12} md={3} className="hidden-xs">
                                            <div className='filter_Set'>
                                                <p className='small_txt'>
                                                    <b>Stops</b>
                                                    <small className="pink-text" style={{ float: 'right' }}>
                                                        {/* <i className="fa fa-angle-down" aria-hidden="true" ></i> */}

                                                    </small>
                                                </p>
                                                <Row>
                                                    <Col xs={12}>
                                                        <div className='checkbox-custom'>
                                                            <Form.Check type="checkbox" label="Non-stop" name="nonstop" value="Non-stop" />
                                                            <Form.Check type="checkbox" label="1 Stop" name="stop1" value="1stop" />
                                                            <Form.Check type="checkbox" label="2 Stop" name="stop2" value="1stop" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className='filter_Set'>
                                                <p className='small_txt'>
                                                    <b>Departure from London</b> 
                                                    <small className="pink-text" style={{ float: 'right' }}>
                                                    {/* <i className="fa fa-angle-down" aria-hidden="true" ></i> */}
                                                    </small>
                                                </p>
                                                <Row>
                                                    <Col xs={12}>
                                                        <div className='checkbox-custom'>
                                                            <Form.Check type="checkbox" label="6 AM - 12 Noon" />
                                                            <Form.Check type="checkbox" label="After 6 PM" />
                                                            <Form.Check type="checkbox" label="12 Noon - 6 PM" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className='filter_Set'>
                                                <p className='small_txt'>
                                                    <b>Departure from Newyork</b>
                                                    <small className="pink-text" style={{ float: 'right' }}>
                                                    {/* <i className="fa fa-angle-down" aria-hidden="true" ></i> */}
                                                    </small>
                                                </p>
                                                <Row>
                                                    <Col xs={12}>
                                                        <div className='checkbox-custom'>
                                                            <Form.Check type="checkbox" label="6 AM - 12 Noon" />
                                                            <Form.Check type="checkbox" label="After 6 PM" />
                                                            <Form.Check type="checkbox" label="12 Noon - 6 PM" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className='filter_Set'>
                                                <p className='small_txt'>
                                                    <b>Airlines</b>
                                                    <small className="pink-text" style={{ float: 'right' }}>
                                                    {/* <i className="fa fa-angle-down" aria-hidden="true" ></i> */}
                                                    </small>
                                                </p>
                                                <Row>
                                                    <Col xs={12}>
                                                        <div className='checkbox-custom'>
                                                            <Form.Check type="checkbox" label="Aer Lingus(2) 103,931" />
                                                            <Form.Check type="checkbox" label="Alitalia(6) 86,227" />
                                                            <Form.Check type="checkbox" label="Aer Finance(2) 103,931" />
                                                            <Form.Check type="checkbox" label="American Airlines,102,750" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={9}>
                                            {/* Sorting Title */}
                                            <Row>
                                                <Col lg={7} md={7} sm={6} xs={6}>
                                                    <p>{data.length} results sorted by <b>{this.state.sortOption}</b></p>
                                                </Col>
                                                <Col lg={5} md={5} sm={6} xs={6} className='text-right'>
                                                    {/* <span className='hidden-xs'>Sort by : </span> */}
                                                        <div className="select_box outline"  style={{ float: 'right' }}>
                                                            <Form.Control as="select" name="sortOption" onChange={this.handleSortOption}>
                                                                <option value="0" hidden>Sort by</option>
                                                                <option value="best">Best</option>
                                                                <option value="cheapest">Cheapest First</option>
                                                                <option value="fastest">Fastest First</option>
                                                                <option value="outbound">Outbound: Departure Time</option>
                                                                <option value="airline">Airline</option>
                                                                <option value="stops">Stops</option>
                                                            </Form.Control>
                                                        </div>
                                                </Col>
                                            </Row>

                                            {/* Filter Sorting Best, Cheapest, Fastest */}
                                            <div className='filter_sort'>
                                                <Row>
                                                    <Col xs={4} sm={4} className={this.state.sortOption == 'Best' ? 'filter_tab text-center active' : 'filter_tab text-center'} data-tip data-for='best'>
                                                        <p>Best<br></br>
                                                        <b>{getSymbolFromCurrency(fulldata.currencyCode)} 5000</b>
                                                        <br></br>3h 50</p>
                                                    </Col>
                                                    <ReactTooltip id='best' place="top" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                        <p>We think these flights offer the best combination of <br></br><b>price</b> and <b>speed</b>. We may also consider factors like <br></br>number of stops and mount of hassle.</p>
                                                    </ReactTooltip>
                                                    <Col xs={4} sm={4} className={this.state.sortOption == 'Cheapest First' ? 'filter_tab text-center active' : 'filter_tab text-center'} data-tip data-for='cheapest'>
                                                        <p>Cheapest<br></br>
                                                        <b>{getSymbolFromCurrency(fulldata.currencyCode)} 5000</b>
                                                        <br></br>3h 50</p>
                                                    </Col>
                                                    <ReactTooltip id='cheapest' place="top" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                        <p>Sort by Cheatpest Price.</p>
                                                    </ReactTooltip>
                                                    <Col xs={4} sm={4} className={this.state.sortOption == 'Fastest First' ? 'filter_tab text-center active' : 'filter_tab text-center'} data-tip data-for='fastest'>
                                                        <p>Fastest<br></br>
                                                        <b>{getSymbolFromCurrency(fulldata.currencyCode)} 5000</b>
                                                        <br></br>3h 50</p>
                                                    </Col>
                                                    <ReactTooltip id='fastest' place="top" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                        <p>Sort by Shortest Duration.</p>
                                                    </ReactTooltip>
                                                </Row>
                                            </div>

                                            {/* Common for sorting datas */}
                                            <div className='custom-container'>
                                                <div className='' style={{padding: '0'}}>
                                                    <div className="sort-title d_flex">
                                                        <Row>
                                                            <Col xs={8} sm={8}>
                                                                <h3 className="bold-text">Smart value Flights</h3>
                                                                <p>Popularity based on customer preference, duration & price</p>
                                                            </Col>
                                                            <Col xs={4} sm={4} className="text-right" style={{borderLeft: '1px solid #d5cece'}}>
                                                                <div className="topright-price">
                                                                    <big><span className="pink-text">Chepeast Starting at</span></big>
                                                                    <br />
                                                                    <span className="top-currency">
                                                                        {getSymbolFromCurrency(fulldata.currencyCode)}
                                                                        &nbsp;{cheapest_price}
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End common title */}


                                            {/* Sorting Area */}
                                            {this.state.loader ? <LoaderIcon /> :
                                            <div>
                                            {data.map((resultData, i = 1) => (
                                                <Row className="sort-box" key={resultData.recommendationRefNo}>
                                                    <Col sm={9} style = {{ padding: '10px', borderRight: '1px dashed #03A9F4' }}>
                                                        {resultData.totalFare == cheapest_price ? <button className="pink-button cheap">CHEAPEST</button> : <button className="pink-button cheap">VALUE FOR MONEY</button>}
                                                        <Row className="travel-timing" style={{ marginTop: '6px' }}>
                                                            <Col md={12} sm={12}>
                                                                <b>Departure</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.departureDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={3} sm={4} className = ''>
                                                                <p className="sort-countryname">{resultData.marketingAirlineNames}</p>
                                                            </Col>
                                                            <Col xs={9} sm={8} className="flight-details">
                                                                <Row>
                                                                    {/* <Col xs={1}>
                                                                        <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                                    </Col> */}
                                                                    <Col xs={4}>
                                                                        <div className="start-time text-right" htmlFor={`test` + i}>
                                                                            {this.TimeSplit(resultData.flightLeg[0].flightDetails.departureTime)}
                                                                            <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationCode}</p>
                                                                            {/* <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationName}</p> */}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4} className='text-center'>
                                                                        <div className='hrs'>
                                                                            <span className="mini-text" style = {{ borderBottom: '1px solid #909090'}}>{this.calculateDuration(resultData.flightLeg[0].flightDetails.departureDate, resultData.flightLeg[0].flightDetails.arrivalDate, resultData.flightLeg[0].flightDetails.departureTime, resultData.flightLeg[0].flightDetails.arrivalTime)}</span>
                                                                            <span className="mini-text sky-text">Non stop</span>
                                                                            <img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <div className="start-time">
                                                                            {this.TimeSplit(resultData.flightLeg[0].flightDetails.arrivalTime)}
                                                                            {/* <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationName}</p> */}
                                                                            <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationCode}</p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row className="travel-timing">
                                                            <Col md={12} sm={12}>
                                                                <b>Return</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.arrivalDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={3} sm={4} className = ''>
                                                                <p className="sort-countryname">{resultData.marketingAirlineNames}</p>
                                                            </Col>
                                                            <Col xs={9} sm={8} className="flight-details">
                                                                <Row>
                                                                    {/* <Col xs={1}>
                                                                        <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                                    </Col> */}
                                                                    <Col xs={4}>
                                                                        <div className="start-time text-right" htmlFor={`test` + i}>
                                                                            17:05
                                                                            <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationCode}</p>
                                                                            {/* <ReactTooltip id='place_1' place="bottom" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                                                <p width="6em" style={{whiteSpace: 'normal'}}><img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" /> {resultData.flightLeg[0].flightDetails.arrivalLocationName}</p>
                                                                            </ReactTooltip> */}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4} className='text-center'>
                                                                        <div className='hrs'>
                                                                            <span className="mini-text" style = {{ borderBottom: '1px solid #909090'}}>08 hrs</span>
                                                                            <img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" />
                                                                            <span className="mini-text sky-text">Non Stop</span>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <div className="start-time">
                                                                            20:05
                                                                            <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationCode}</p>

                                                                            {/* <img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" /> */}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col sm={3} className='text-center set_bg'>
                                                        
                                                        <span className="sort-currency">
                                                            <span className='deals_no'>
                                                                8 deals<br></br>
                                                            </span>
                                                            {getSymbolFromCurrency(fulldata.currencyCode)}
                                                            &nbsp;{resultData.totalFare}
                                                        </span>
                                                        <a href='/ticketdetails'>
                                                            <button className='bpk-button'>
                                                                Select <i className='fa fa-arrow-right'></i>
                                                            </button>
                                                        </a>
                                                        {/* <a href={resultData.Deeplink} target="_blank">
                                                            <button className="pink-button negative-margin">BOOK NOW</button>
                                                        </a> */}
                                                    </Col>
                                                    <Row className="flight-details">
                                                        <Col sm={12} className="text-center grey">
                                                            <span>Cabin Baggage Only Flights</span>
                                                        </Col>
                                                    </Row>
                                                    <Row className="flight-details bottom">
                                                        <Col sm={8} xs={7}>
                                                            <p>
                                                                <i className="fa fa-star"></i>
                                                                <b className='green-text'>8.5<small>/10</small></b>
                                                                <span className=""> Non-refundable</span>
                                                                <i className="fa fa-angle-down hidden-xs" aria-hidden="true" ></i>
                                                                <span className="hidden-xs"> | Seat varies by flight segment</span>
                                                            </p>
                                                        </Col>
                                                        <Col sm={4} xs={5} className="text-right">
                                                            <p className="sky-text">Flight Details &nbsp;<i className="fa fa-angle-down" aria-hidden="true"></i></p>
                                                        </Col>
                                                    </Row>
                                                    {/* <Col xl={8} lg={8} sm={6} xs={6}> */}
                                                        {/* {resultData.totalFare == cheapest_price ? <button className="pink-button cheap">CHEAPEST</button> : <button className="pink-button cheap">VALUE FOR MONEY</button>} */}
                                                        {/* <p className="sort-countryname">{resultData.marketingAirlineNames}</p> */}
                                                    {/* </Col>
                                                    <Col xl={4} lg={4} sm={6} xs={6}>
                                                        <Row>
                                                            <Col xs={6}>
                                                                <span className="sort-currency text-right">
                                                                    {getSymbolFromCurrency(fulldata.currencyCode)}
                                                                    &nbsp;{resultData.totalFare}
                                                                </span>
                                                            </Col>
                                                            <Col xs={6}>
                                                                <a href={resultData.Deeplink} target="_blank"><button className="pink-button negative-margin">BOOK NOW</button></a>
                                                            </Col>
                                                        </Row>
                                                    </Col> */}
                                                    {/* <Row className="travel-timing">
                                                        <Col md={6} sm={6}>
                                                            <b>Departure</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.departureDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                        </Col>
                                                        <Col md={6} sm={6}>
                                                            <b>Return</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.arrivalDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                        </Col>
                                                    </Row> */}
                                                    {/* <Row className="flight-details">
                                                        <Col md={12} sm={12}>
                                                            <Row>
                                                                <Col xs={1}>
                                                                    <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <div className="start-time" htmlFor={`test` + i}>
                                                                        {this.TimeSplit(resultData.flightLeg[0].flightDetails.departureTime)}
                                                                        <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationName}</p>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3} className='text-center hrs'>
                                                                    {this.calculateDuration(resultData.flightLeg[0].flightDetails.departureDate, resultData.flightLeg[0].flightDetails.arrivalDate, resultData.flightLeg[0].flightDetails.departureTime, resultData.flightLeg[0].flightDetails.arrivalTime)}<hr />
                                                                    <span className="mini-text sky-text">Non stop</span>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <div className="start-time">
                                                                        {this.TimeSplit(resultData.flightLeg[0].flightDetails.arrivalTime)}
                                                                        <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationName}</p>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={12} sm={12}>
                                                            <Row>
                                                                <Col xs={1}>
                                                                    <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <div className="start-time" htmlFor={`test` + i}>
                                                                        17:05
                                                                        <p className="mini-text">London - Gatewick</p>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3} className='text-center hrs'>
                                                                    08hrs<hr />
                                                                    <span className="mini-text sky-text">Non stop</span>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <div className="start-time">
                                                                        20:05
                                                                        <p className="mini-text">Newyork</p>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col sm={12} className="text-center grey">
                                                            <span>Cabin Baggage Only Flights</span>
                                                        </Col>
                                                    </Row> */}
                                                    {/* <Row className="flight-details bottom">
                                                        <Col sm={6} xs={8}>
                                                            <p>
                                                                <i className="fa fa-star"></i>
                                                                <b className='green-text'>8.5<small>/10</small></b>
                                                                <span className=""> Non-refundable</span>
                                                                <i className="fa fa-angle-down" aria-hidden="true" ></i> | 
                                                                <span>Seat varies by flight segment</span>
                                                            </p>
                                                        </Col>
                                                        <Col sm={6} xs={4} className="text-right">
                                                            <p className="sky-text">Flight Details &nbsp;<i className="fa fa-angle-down" aria-hidden="true"></i></p>
                                                        </Col>
                                                    </Row> */}

                                                </Row>
                                            ))} </div> }
                                            {/* Ending Sorting Area */}

                                        </Col>
                                    </Row>
                                </Col>

                                {/* Ad */}
                                <Col sm={12} md={12} lg={2} xl={2} className='text-center'>
                                    <Row>
                                        <Col md={4} lg={12}>
                                            <div className="ad-block">
                                                <p>Place for ad</p>
                                            </div>
                                        </Col>
                                        <Col md={4} lg={12}>
                                            <div className="ad-block">
                                                <p>Place for ad</p>
                                            </div>
                                        </Col>
                                        <Col md={4} lg={12}>
                                            <div className="ad-block">
                                                <p>Place for ad</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    {/* <div className="desktop-filterscreen">
                        <div className="datas">
                            <Row>
                                <Col md={12} lg={12} xl={6}>
                                    <Row>
                                        <Col sm={2} xs={4} className='set_border' style={{ padding: '0 4px' }}>
                                            <p className='small_txt'>
                                                <b>Stops</b>
                                                <small className="pink-text" style={{ float: 'right' }}>Reset</small>
                                            </p>
                                            <Row>
                                                <Col xs={12}>
                                                    <Form.Check className='small_checkbox' type="checkbox" label="Non-stop" name="stop1" value="Non-stop" />
                                                    <Form.Check className='small_checkbox' type="checkbox" label="1stop" name="stop2" value="1stop" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={5} xs={4} className='set_border'>
                                            <p className='small_txt'><b>Departure from London</b> <small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                            <Row>
                                                <Col xs={12} sm={6}>
                                                    <Form.Check className='small_checkbox' type="checkbox" label="6AM - 12 Noon" />
                                                    <Form.Check className='small_checkbox' type="checkbox" label="After 6PM" />
                                                </Col>
                                                <Col xs={12} sm={6}>
                                                    <Form.Check className='small_checkbox' type="checkbox" label="12 Noon - 6PM" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={5} xs={4} className='set_border'>
                                            <p className='small_txt'><b>Departure from Newyork</b><small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                            <Row>
                                                <Col xs={12} sm={6}>
                                                    <Form.Check className='small_checkbox' type="checkbox" label="6AM - 12 Noon" />
                                                    <Form.Check className='small_checkbox' type="checkbox" label="After 6PM" />
                                                </Col>
                                                <Col xs={12} sm={6}>
                                                    <Form.Check className='small_checkbox' type="checkbox" label="12 Noon - 6PM" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12} lg={12} xl={6}>
                                    <Row>
                                        <Col xs={12} style={{ padding: '0 4px' }}>
                                            <p className='small_txt'><b>Airlines</b></p>
                                        </Col>
                                        <Col md={9} sm={12} style={{ padding: '0 4px' }}>
                                            <Row>
                                                <Col xs={5}>
                                                    <Form.Check className='small_checkbox' type="checkbox" label="Aer Lingus(2) 103,931" />
                                                    <Form.Check className='small_checkbox' type="checkbox" label="Alitalia(6) 86,227" />
                                                </Col>
                                                <Col xs={5}>
                                                    <Form.Check className='small_checkbox' type="checkbox" label="Aer Finance(2) 103,931" />
                                                    <Form.Check className='small_checkbox' type="checkbox" label="American Airlines,102,750" />
                                                </Col>
                                                <Col xs={2}>
                                                    <small className="pink-text">More Filters</small>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={3} sm={12} className='pad-6'>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div className='custom-container'>
                            <div className='filter-datas container'>
                                <Row>
                                    <Col sm={10}>
                                        <Row className='sort'>
                                            <Col md={2} xs={3}>
                                                <span className="bold-text">Sort by:</span>
                                            </Col>
                                            <Col md={3} xs={3}>
                                                <span className="bold-text" onClick={this.sortPopularity}>Popularity&nbsp;&nbsp; {this.state.popularityIcon == 0 ?
                                                    <span className="text-muted">
                                                        <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img>
                                                        <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                                    </span> : null}
                                                    {this.state.popularityIcon == 2 ?
                                                        <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                                        : null}
                                                    {this.state.popularityIcon == 1 ?
                                                        <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img> : null}
                                                </span>
                                            </Col>
                                            <Col md={3} xs={3}>
                                                <span className="bold-text" onClick={this.sortDuration}>Duration&nbsp;&nbsp; {this.state.durationIcon == 0 ?
                                                    <span className="text-muted">
                                                        <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img>
                                                        <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                                    </span> : null}
                                                    {this.state.durationIcon == 2 ?
                                                        <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img> : null}
                                                    {this.state.durationIcon == 1 ?
                                                        <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img> : null}
                                                </span>
                                            </Col>
                                            <Col md={2} xs={3}>
                                                <span className="bold-text" onClick={this.sortPrice}>Price&nbsp;&nbsp; {this.state.priceIcon == 0 ?
                                                    <span className="text-muted">
                                                        <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img>
                                                        <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                                    </span> : null}
                                                    {this.state.priceIcon == 2 ?
                                                        <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img> : null}
                                                    {this.state.priceIcon == 1 ?
                                                        <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img> : null}
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div> */}

                    {/* End Filtering component */}
                    {/* <div className=''>
                        {this.state.loader ? <LoaderIcon /> : <div>
                            <div className='container'>

                                <Row>
                                    <Col md={10} sm={12} xs={12}>
                                        <div className="sort-title">
                                            <Row>
                                                <Col sm={9}>
                                                    <h3 className="bold-text">Smart value Flights</h3>
                                                    <p>Popularity based on customer preference, duration & price</p>
                                                </Col>
                                                <Col sm={3} className="text-right">
                                                    <div className="topright-price">
                                                        <big><span className="pink-text">Chepeast Starting at</span></big>
                                                        <br />
                                                        <span className="top-currency">
                                                            {getSymbolFromCurrency(fulldata.currencyCode)}
                                                            &nbsp;{cheapest_price}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        {data.map((resultData, i = 1) => (
                                            <Row className="sort-box" key={resultData.recommendationRefNo}>
                                                <Col xl={8} lg={8} sm={6} xs={6}>
                                                    {resultData.totalFare == cheapest_price ? <button className="pink-button cheap">CHEAPEST</button> : <button className="pink-button cheap">VALUE FOR MONEY</button>}
                                                    <p className="sort-countryname">{resultData.marketingAirlineNames}</p>
                                                </Col>
                                                <Col xl={4} lg={4} sm={6} xs={6}>
                                                    <Row>
                                                        <Col xs={6}>
                                                            <span className="sort-currency text-right">
                                                                {getSymbolFromCurrency(fulldata.currencyCode)}
                                                                &nbsp;{resultData.totalFare}
                                                            </span>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <a href={resultData.Deeplink} target="_blank"><button className="pink-button negative-margin">BOOK NOW</button></a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Row className="travel-timing">
                                                    <Col md={6} sm={6}>
                                                        <b>Departure</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.departureDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                    </Col>
                                                    <Col md={6} sm={6}>
                                                        <b>Return</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.arrivalDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                    </Col>
                                                </Row>
                                                <Row className="flight-details">
                                                    <Col lg={6} md={12} sm={12}>
                                                        <Row>
                                                            <Col xs={1}>
                                                                <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className="start-time" htmlFor={`test` + i}>
                                                                    {this.TimeSplit(resultData.flightLeg[0].flightDetails.departureTime)}
                                                                    <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationName}</p>
                                                                </div>
                                                            </Col>
                                                            <Col xs={3} className='text-center hrs'>
                                                                {this.calculateDuration(resultData.flightLeg[0].flightDetails.departureDate, resultData.flightLeg[0].flightDetails.arrivalDate, resultData.flightLeg[0].flightDetails.departureTime, resultData.flightLeg[0].flightDetails.arrivalTime)}<hr />
                                                                <span className="mini-text sky-text">Non stop</span>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className="start-time">
                                                                    {this.TimeSplit(resultData.flightLeg[0].flightDetails.arrivalTime)}
                                                                    <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationName}</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={6} md={12} sm={12}>
                                                        <Row>
                                                            <Col xs={1}>
                                                                <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className="start-time" htmlFor={`test` + i}>
                                                                    17:05
                                                                    <p className="mini-text">London - Gatewick</p>
                                                                </div>
                                                            </Col>
                                                            <Col xs={3} className='text-center hrs'>
                                                                08hrs<hr />
                                                                <span className="mini-text sky-text">Non stop</span>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className="start-time">
                                                                    20:05
                                                                    <p className="mini-text">Newyork</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col sm={12} className="text-center grey">
                                                        <span>Cabin Baggage Only Flights</span>
                                                    </Col>
                                                </Row>
                                                <Row className="flight-details bottom">
                                                    <Col sm={6} xs={8}>
                                                        <p>
                                                            <i className="fa fa-star"></i>
                                                            <b className='green-text'>8.5<small>/10</small></b>
                                                            <span className=""> Non-refundable</span>
                                                            <i className="fa fa-angle-down" aria-hidden="true" ></i> | 
                                                            <span>Seat varies by flight segment</span>
                                                        </p>
                                                    </Col>
                                                    <Col sm={6} xs={4} className="text-right">
                                                        <p className="sky-text">Flight Details &nbsp;<i className="fa fa-angle-down" aria-hidden="true"></i></p>
                                                    </Col>
                                                </Row>

                                            </Row>
                                        ))}

                                    </Col>
                                    <Col md={2} sm={12} xs={12} className='text-center'>
                                        <div className="ad-block">
                                            <p>Place for ad</p>
                                        </div>
                                        <div className="ad-block">
                                            <p>Place for ad</p>
                                        </div>
                                        <div className="ad-block">
                                            <p>Place for ad</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>}
                    </div> */}

                </div>
            </Layout>
        )
    }
}

export default TicketBooking;