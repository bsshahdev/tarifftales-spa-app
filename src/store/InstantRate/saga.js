// saga.js
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { showErrorToast } from "../../components/Common/CustomToast";
import { getAirLocation, getAllIncoTerms, getInstantRateLocation } from "../../helpers/services/GlobalService";
import { filterInstantRateSer, postAirInstantRateSer, postInstantRateSer } from "../../helpers/services/InstantRateService";
import {
  FILTER_INSTANT_SEARCH_DATA_TYPE,
  GET_AIR_LOCATION_TYPE,
  GET_AIR_LOCATION_TYPE_SUCCESS,
  GET_ALL_INCOTERM,
  GET_ALL_INCOTERM_SUCCESS,
  GET_INSTANT_RATE_LOCATION,
  GET_INSTANT_RATE_LOCATION_FAILURE,
  GET_INSTANT_RATE_LOCATION_SUCCESS,
  GET_INSTANT_SEARCH_RESULT_ID,
  GET_INSTANT_SEARCH_RESULT_TYPE,
  POST_INSTANT_AIR_SEARCH_DATA,
  POST_INSTANT_AIR_SEARCH_DATA_SUCCESS,
  POST_INSTANT_SEARCH_DATA_TYPE,
  POST_INSTANT_SEARCH_LOADER,
} from "./actionType";

function* fetchInstantRateLocation() {
  try {
    const response = yield call(getInstantRateLocation);
    yield put({ type: GET_INSTANT_RATE_LOCATION_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "location error-----------");
    yield put({ type: GET_INSTANT_RATE_LOCATION_FAILURE, payload: error.message });
  }
}
function* fetchAirLocation() {
  try {
    const response = yield call(getAirLocation);
    yield put({ type: GET_AIR_LOCATION_TYPE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "Air location error-----------");
  }
}

function* fetchAllIncoterm() {
  try {
    const response = yield call(getAllIncoTerms);
    yield put({ type: GET_ALL_INCOTERM_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "location error-----------");
  }
}
function* postInstantSearchSaga({payload: { data }}) {  
  yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: true });
  try {
    const response = yield call(postInstantRateSer, data);
    yield put({ type: GET_INSTANT_SEARCH_RESULT_TYPE, payload: response});
    yield put({ type: GET_INSTANT_SEARCH_RESULT_ID, payload: response?.id });
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
  } catch (error) {
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
    showErrorToast(error?.response?.data?.message);
  }
}
function* filterInstantSearchSaga({payload: { url }}) {  
  yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: true });
  try {
    const response = yield call(filterInstantRateSer, url);
    yield put({ type: GET_INSTANT_SEARCH_RESULT_TYPE, payload: response});
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
  } catch (error) {
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
    showErrorToast(error?.response?.data?.message);
  }
}

function* postAirInstantSearchDataSaga({payload: { data }}) {  
  yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: true });
  try {
    const response = yield call(postAirInstantRateSer, data);
    yield put({ type: POST_INSTANT_AIR_SEARCH_DATA_SUCCESS, payload: response});
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
  } catch (error) {
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
    showErrorToast(error?.response?.data?.message);
  }
}
function* watchGetInstantRate() {
  yield takeEvery(GET_INSTANT_RATE_LOCATION, fetchInstantRateLocation);
  yield takeEvery(GET_AIR_LOCATION_TYPE, fetchAirLocation);
  yield takeEvery(GET_ALL_INCOTERM, fetchAllIncoterm)
  yield takeEvery(POST_INSTANT_SEARCH_DATA_TYPE, postInstantSearchSaga);
  yield takeEvery(FILTER_INSTANT_SEARCH_DATA_TYPE, filterInstantSearchSaga);
  yield takeEvery(POST_INSTANT_AIR_SEARCH_DATA, postAirInstantSearchDataSaga)
}

function* instantRateSaga() {
  yield all([fork(watchGetInstantRate)]);
}

export default instantRateSaga;
