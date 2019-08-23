import React, { Component,useState,useEffect } from 'react';
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
import { connect } from 'react-redux'
import { flightIndexRequested } from '../actions';
//Auto complete imports
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

// Auto complete component
function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
	const escapedValue = escapeRegexCharacters(value.trim());
	
	if (escapedValue === '') {0
	  return [];
	}
  
	const regex = new RegExp('\\b' + escapedValue, 'i');
	var person = require('../data/autocomplete.json');   
	return person.filter(person => regex.test(getSuggestionValue(person)));
	// axios
    // .get(`http://localhost:4000/countries?query=${escapedValue}`)
    // .then(response => { return response.data })
    // .catch(error => this.setState({ error, isLoading: false }));
  }
  
  function getSuggestionValue(suggestion) {
	return `${suggestion.CityName}`;
  }
  
  function renderSuggestion(suggestion, { query }) {
	
  	const suggestionText = `${suggestion.CityName} (${suggestion.CityId})`;
	const suggestionCountry = `${suggestion.CountryName}`;
	const matches = AutosuggestHighlightMatch(suggestionText,query);
	const parts = AutosuggestHighlightParse(suggestionText, matches);
	return (
		<span className={'suggestion-content ' + suggestion.twitter}>
		  <span className="autocomplete-name">
		  <img className='fa fa-fighter-jet autocomplete-flight-img' alt="Flight" src='static/images/flight.png' width='25px'></img>
			{
			  parts.map((part, index) => {
				const className = part.highlight ? 'highlight' : null;
	
				return (
				  <span className={className} key={index}>{part.text}</span>
				);
			  })
			}
			<br/><small className="country-name">{suggestionCountry}</small>
		  </span>
		</span>
	  );
  }  

const MyAutosuggest = () => {
	const [value,setValue] = useState('');
	const [suggestions,setSuggestions] = useState([]);
	const [id,setId] = useState('');

	const onChange = (event, { newValue, method }) => {
		setValue(newValue);
		console.log(newValue);
	  };
	  
	  const onSuggestionsFetchRequested = ({ value }) => {
		  setSuggestions(getSuggestions(value));
	  };
	
	  const onSuggestionsClearRequested = () => {
		setSuggestions([]);
	  };
    const inputProps = {
      placeholder: "Country name",
      value,
      onChange: onChange
	};
	return (
		<Autosuggest 
		  id={id}
		  suggestions={suggestions}
		  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
		  onSuggestionsClearRequested={onSuggestionsClearRequested}
		  getSuggestionValue={getSuggestionValue}
		  renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
		/>);
}

// End Autocomplete component


const TicketBooking = ({flight}) => {
           
            var jsondata = flight.flightIndex[0];
            const currencyCode = jsondata.currencyCode;
            const [data,setData] = useState([]);
            const [startDate,setStartDate] =useState(new Date());
            const [endDate,setEndDate] = useState(new Date());
            const [sourcePlace,setSourcePlace]=useState('London,United Kingdom');
            const [destinationPlace,setDestinationPlace]=useState('Newyork, United States of America');
            const [popularityIcon,setPopularityIcon]=useState(0);
            const [priceIcon,setPriceIcon]=useState(1);
            const [durationIcon,setDurationIcon]=useState(0);
            const [loader,setLoader]=useState(false);
            const [sortToggler,setSortToggler]=useState(false);
            const [filterToggler,setFilterToggler]=useState(false);
            const [sortOption,setSortOption]=useState('');

            // this.myTween = new TimelineLite({ paused: true });
            // static async getInitialProps = ({ isServer, store }) => {
            // // Fetch today NASA APOD
            // await store.execSagaTasks(isServer, dispatch => {
            //   dispatch(getFlights());
            // })

    const handleChange = (date) => {
        setStartDate(date);
    }
    const handleChange1 = (date) => {
        setEndDate(date);
    }
    const changePlace = (e) => {
       setSourcePlace(destinationPlace);
       setDestinationPlace(sourcePlace);
    }

    const changeMonthDate = (dt) => {
        var date1 = dt.split('-')
        var newDate = date1[1] + '-' + date1[0] + '-' + date1[2];
        var date = new Date(newDate);
        return (date);
    }

    const TimeSplit = (time) => {
        time = time.replace(/(..?)/g, '$1:').slice(0, -1)
        return (time);
    }

    const handlesortToggler = () => {
        setSortToggler(true);
        setFilterToggler(false);
    }

    const handleFilterToggler = () => {
        setFilterToggler(true);
        setSortToggler(false);
    }

    const handleScrollToElement = (event) => {        
        $(window).scroll(function () {
            var sticky = $('.filtering-row.row'),
                scroll = $(window).scrollTop();

            if (scroll >= 400) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        });
    }

    const calculateDuration = (dt1, dt2, tm1, tm2) => {
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

   useEffect(() => {
        window.addEventListener('scroll', handleScrollToElement);
    });

    const handleSortOptions = (e) => {
        console.log(e.target.value);    
        setSortOption(e.target.value);
        console.log(sortOption);
        if(sortOption == "Best")
        {
            jsondata = sortJsonArray(jsondata.recommendation, "marketingAirlineNames", "asc");
        }
    }
    //const cheapest_price = Math.min.apply(Math, jsondata.recommendation.map(function (o) { return o.totalFare; }))

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
                                                        <p>1 Adult, Economy
                                                        {/* {this.props.userAgent} */}
                                                        </p>
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
                                                                value={sourcePlace}
                                                                readOnly="yes"
                                                                className="blubg-control"
                                                                name="sourcePlace" />
                                                                {/* <MyAutosuggest
                                                                    id="countries1"
                                                                /> */}
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <i className="fa fa-exchange" aria-hidden="true" onClick={changePlace}></i>
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
                                                                value={destinationPlace}
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
                                                                selected={startDate}
                                                                onChange={handleChange} />
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
                                                                selected={endDate}
                                                                onChange={handleChange1} />
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
                                <Col sm={6} xs={6} lg={6} style={{ borderRight: '1px solid #FF4057' }}>
                                    <span onClick={handlesortToggler} className="mob-togglehead">Sort </span>
                                </Col>
                                <Col sm={6} xs={6} lg={6}>
                                    <span onClick={handleFilterToggler} className="mob-togglehead">Filter </span>
                                </Col>
                            </Row>
                            <div style={{ position: 'relative' }} hidden={!sortToggler}>
                                <Row className='sort'>
                                    <Col md={12} xs={12}>
                                        <p>
                                            <span className="bold-text" style={{ fontSize: '13px' }}>Sort by:</span>
                                            <Button variant="outline-danger" style={{ float: 'right' }} onClick={() => this.setState({ sortToggler: false, filterToggler: false })}>Close</Button>
                                        </p>
                                        <ul className="mobile-sortlist">
                                            <li>
                                                <span>
                                                    <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Popularity" /> Popularity
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Duration" /> Duration
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Price" /> Price
                                                </span>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        {filterToggler ?
                        <div className="datas">
                            <Row>
                                <Col xs={12}>
                                    <p>
                                        <span className="bold-text">Filter by:</span>
                                        <Button variant="outline-danger" style={{ float: 'right' }} onClick={() => this.setState({ sortToggler: false, filterToggler: false })}>Done</Button>
                                    </p>
                                    <br/>
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
                                                            <Form.Check type="checkbox" label="Non-stop" name="stop1" value="Non-stop" />
                                                            <Form.Check type="checkbox" label="1 Stop" name="stop2" value="1stop" />
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
                                                <Col lg={7} md={6} sm={5} xs={6}>
                                                    <p>51 results sorted by <b>Best</b></p>
                                                </Col>
                                                <Col lg={5} md={6} sm={7} xs={6} className='text-right'>
                                                    <span className='hidden-xs'>Sort by : </span>
                                                        <div className="select_box outline"  style={{ float: 'right' }}>
                                                            <Form.Control as="select" name="sortoptions" onChange={handleSortOptions}>
                                                                <option value="0" hidden>Select</option>
                                                                <option value="Best">Best</option>
                                                                <option value="Cheapest">Cheapest First</option>
                                                                <option value="Fastest">Fastest First</option>
                                                                <option value="Outbound">Outbound: Departure Time</option>
                                                                <option value="Airline">Airline</option>
                                                                <option value="Stops">Stops</option>
                                                            </Form.Control>
                                                        </div>
                                                </Col>
                                            </Row>

                                            {/* Filter Sorting Best, Cheapest, Fastest */}
                                            <div className='filter_sort'>
                                                <Row>
                                                    <Col xs={4} sm={4} className='filter_tab text-center active' data-tip data-for='best'>
                                                        <p>Best<br></br>
                                                        <b>{getSymbolFromCurrency(currencyCode)} 5000</b>
                                                        <br></br>3h 50</p>
                                                    </Col>
                                                    <ReactTooltip id='best' place="top" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                        <p>We think these flights offer the best combination of <br></br><b>price</b> and <b>speed</b>. We may also consider factors like <br></br>number of stops and mount of hassle.</p>
                                                    </ReactTooltip>
                                                    <Col xs={4} sm={4} className='filter_tab text-center' data-tip data-for='cheapest'>
                                                        <p>Cheapest<br></br>
                                                        <b>{getSymbolFromCurrency(currencyCode)} 5000</b>
                                                        <br></br>3h 50</p>
                                                    </Col>
                                                    <ReactTooltip id='cheapest' place="top" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                        <p>Sort by Cheatpest Price.</p>
                                                    </ReactTooltip>
                                                    <Col xs={4} sm={4} className='filter_tab text-center' data-tip data-for='fastest'>
                                                        <p>Fastest<br></br>
                                                        <b>{getSymbolFromCurrency(currencyCode)} 5000</b>
                                                        <br></br>3h 50</p>
                                                    </Col>
                                                    <ReactTooltip id='fastest' place="top" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                        <p>Sort by Shortest Duration.</p>
                                                    </ReactTooltip>
                                                </Row>
                                            </div>

                                            {/* Common for sorting datas */}
                                            <div className='custom-container'>
                                                <div className='container' style={{padding: '0'}}>
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
                                                                        {getSymbolFromCurrency(jsondata.currencyCode)}
                                                                         &nbsp;{Math.min.apply(Math, jsondata.recommendation.map(function (o) { return o.totalFare; }))} 
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End common title */}

                                            {/* Sorting Area */}
                                            {jsondata.recommendation.map((resultData, i = 1) => (
                                                <Row className="sort-box" key={resultData.recommendationRefNo}>
                                                    <Col sm={9} style = {{ padding: '10px', borderRight: '1px dashed #03A9F4' }}>
                                                        {resultData.totalFare == Math.min.apply(Math, jsondata.recommendation.map(function (o) { return o.totalFare; })) ? <button className="pink-button cheap">CHEAPEST</button> : <button className="pink-button cheap">VALUE FOR MONEY</button>}
                                                        <Row className="travel-timing" style={{ marginTop: '6px' }}>
                                                            <Col md={12} sm={12}>
                                                                <b>Departure</b> | {dateFormat(changeMonthDate(resultData.flightLeg[0].flightDetails.departureDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
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
                                                                        <div className="start-time" htmlFor={`test` + i}>
                                                                            {TimeSplit(resultData.flightLeg[0].flightDetails.departureTime)}
                                                                            <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationCode}</p>
                                                                            {/* <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationName}</p> */}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4} className='text-center'>
                                                                        <div className='hrs'>
                                                                            <span className="mini-text" style = {{ borderBottom: '1px solid #909090'}}>{calculateDuration(resultData.flightLeg[0].flightDetails.departureDate, resultData.flightLeg[0].flightDetails.arrivalDate, resultData.flightLeg[0].flightDetails.departureTime, resultData.flightLeg[0].flightDetails.arrivalTime)}</span>
                                                                            <span className="mini-text sky-text">Non stop</span>
                                                                            <img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <div className="start-time">
                                                                            {TimeSplit(resultData.flightLeg[0].flightDetails.arrivalTime)}
                                                                            {/* <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationName}</p> */}
                                                                            <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationCode}</p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row className="travel-timing">
                                                            <Col md={12} sm={12}>
                                                                <b>Return</b> | {dateFormat(changeMonthDate(resultData.flightLeg[0].flightDetails.arrivalDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
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
                                                                        <div className="start-time" htmlFor={`test` + i}>
                                                                            17:05
                                                                            <p className="mini-text" data-tip data-for='place_1'>{resultData.flightLeg[0].flightDetails.arrivalLocationCode}</p>
                                                                            <ReactTooltip id='place_1' place="top" type="light" effect="solid" aria-haspopup='true' role='example' className='tool'>
                                                                                <p width="6em" style={{whiteSpace: 'normal'}}><img className="fa fa-fighter-jet autocomplete-flight-img" alt="Flight" src="static/images/flight.png" width="16px" /> {resultData.flightLeg[0].flightDetails.arrivalLocationName}</p>
                                                                            </ReactTooltip>
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
                                                            {getSymbolFromCurrency(jsondata.currencyCode)}
                                                            &nbsp;{resultData.totalFare}
                                                        </span>
                                                        <a href={resultData.Deeplink} target="_blank">
                                                            <button className="pink-button negative-margin">BOOK NOW</button>
                                                        </a>
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
                                                                <i className="fa fa-angle-down" aria-hidden="true" ></i> | 
                                                                <span>Seat varies by flight segment</span>
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
                                            ))}
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

TicketBooking.getInitialProps = async ({ store }) => {
   store.dispatch(flightIndexRequested());
}

const mapStateToProps = (state) => ({
    flight: state
})

export default connect(mapStateToProps)(TicketBooking);
