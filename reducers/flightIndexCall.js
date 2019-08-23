import * as types from '../actions/actionTypes';

const initState = {
  loading: false,
  error: false,
};

const flightIndexCallReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FLIGHT_INDEX_REQUESTED: {
      return { loading: true, error: false };
    }
    case types.FLIGHT_INDEX_FAILED: {
      return { loading: false, error: true };
    }
    case types.FLIGHT_INDEX_SUCCEEDED: {
      return { loading: false, error: false };
    }
    default:
      return state;
  }
};

export default flightIndexCallReducer;
