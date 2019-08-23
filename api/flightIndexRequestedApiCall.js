import 'isomorphic-fetch';

const flightIndexRequestedApiCall = () =>
  fetch('http://localhost:4002/flights?limit=10')
    .then(response => response.json())
    .then(response => response);

export default flightIndexRequestedApiCall;
