import * as types from './actionTypes';
const flightIndexSucceeded = ({ flight }) => ({
  type: types.FLIGHT_INDEX_SUCCEEDED,
  payload: { flight },
});

export default flightIndexSucceeded;