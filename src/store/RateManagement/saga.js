import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects"
import { GET_FCL_SURCHARGE_TABLE_DATA } from "./actiontype"
import { getFclSurchargeDataFail, getFclSurchargeDataSuccess } from "./actions"
import { getFCLSurcharge } from "../../helpers/fakebackend_helper"

function* getFclSurchargeData(){
    try {
        const response = yield call(getFCLSurcharge)
        yield put(getFclSurchargeDataSuccess(response))
    } catch (error) {
        yield put(getFclSurchargeDataFail(error))
    }
}


export function* watchGetRateManagementData(){
    yield takeLatest(GET_FCL_SURCHARGE_TABLE_DATA, getFclSurchargeData)
}

function* rateManagementSaga() {
    yield all([fork(watchGetRateManagementData)]);
}

export default rateManagementSaga;