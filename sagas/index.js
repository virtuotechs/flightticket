import { fork } from 'redux-saga/effects';
import flightIndex from './flightIndex';

const saga = function* saga() {
  yield fork(flightIndex);
};

export default saga;
