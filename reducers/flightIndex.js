import * as types from '../actions/actionTypes';

const initState = [];

const flightIndexReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FLIGHT_INDEX_SUCCEEDED: {
      const { flight } = action.payload;
      return flight;
    }
    default:
      return state;
  }
};

export default flightIndexReducer;
