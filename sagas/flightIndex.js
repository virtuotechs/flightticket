import { call, put, takeLatest } from 'redux-saga/effects';
import { flightIndexFailed, flightIndexSucceeded } from '../actions';
import * as types from '../actions/actionTypes';
import { flightIndexRequestedApiCall } from '../api';

const flightIndexRequested = function* flightIndexRequested() {
  try {
    const flight = yield call(flightIndexRequestedApiCall);
    yield put(flightIndexSucceeded({ flight }));
  } catch (e) {
    yield put(flightIndexFailed());
  }
};

const flightIndexRequestedSaga = function* flightIndexRequestedSaga() {
  yield takeLatest(types.FLIGHT_INDEX_REQUESTED, flightIndexRequested);
};

export default flightIndexRequestedSaga;
