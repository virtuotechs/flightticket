import { combineReducers } from 'redux';
import flightIndex from './flightIndex';
import flightIndexCall from './flightIndexCall';

const reducer = combineReducers({
  flightIndex,
  flightIndexCall,
});

export default reducer;
