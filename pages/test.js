import React,{useEffect,useState,useContext} from 'react';
//Auto complete imports
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
	const escapedValue = escapeRegexCharacters(value.trim());
	
	if (escapedValue === '') {0
	  return [];
	}
  
	const regex = new RegExp('\\b' + escapedValue, 'i');
	// var person = require('../data/autocomplete.json');        
    // return person.filter(person => regex.test(getSuggestionValue(person)));
    
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

const Test = () => {
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

export default Test;