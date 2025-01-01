import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { GET_INQUIRY_CUSTOMER_SUMMARY_DATA, GET_INQUIRY_CUSTOMER_SUMMARY_DATA_SUCCESS, GET_INQUIRY_DATA, GET_INQUIRY_DATA_FAIL, GET_INQUIRY_DATA_LOADER, GET_INQUIRY_DATA_SUCCESS, GET_INQUIRY_EXPORT_SUMMARY_DATA, GET_INQUIRY_EXPORT_SUMMARY_DATA_SUCCESS, GET_INQUIRY_IMPORT_SUMMARY_DATA, GET_INQUIRY_IMPORT_SUMMARY__DATA_SUCCESS, GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA, GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA_SUCCESS, GET_INQUIRY_SUMMARY_DATA, GET_INQUIRY_SUMMARY_DATA_SUCCESS, GET_QUOTATION_DATA, GET_QUOTATION_RESULT_DATA, GET_QUOTATION_RESULT_DATA1, GET_QUOTATION_RESULT_DATA2, GET_QUOTATION_RESULT_DATA3, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS } from "./actiontype";
import { getExchangeRate, getSalesInquiryTableData, getSalesQuotTableData, getSearchResultData, getSearchResultData1, getSearchResultData2, getSearchResultData3 } from "../../helpers/fakebackend_helper";
import { getSalesQuotationDataFail, getSalesQuotationDataSuccess } from "./actions";
import { GET_CURRENCY_EXCHANGE_RATE, GET_CURRENCY_EXCHANGE_RATE_SUCCESS } from "./Quotation/actiontype";
import { getInquiryCustomerSummary, getInquiryExportSummary, getInquiryImportSummary, getInquirySalesCustomerSummary, getInquirySummary } from "../../helpers/services/InstantRateService";
function* fetchSalesQuotationData(){
    try {
        const response = yield call(getSalesQuotTableData);
        yield put(getSalesQuotationDataSuccess(response));
    } catch (error) {
        yield put(getSalesQuotationDataFail(error));
    }
}
function* fetchCurrencyExchangeData(){
    try {
        const response = yield call(getExchangeRate);
        yield put({type: GET_CURRENCY_EXCHANGE_RATE_SUCCESS, payload: response})
    } catch (error) {
        console.log(error,"error")
    }
}

function* fetchSalesInquiryData({payload}){
    yield put({type:GET_INQUIRY_DATA_LOADER , payload:true})
    try {
        const response = yield call(getSalesInquiryTableData,payload);
        yield put({type: GET_INQUIRY_DATA_SUCCESS, payload: response});
        yield put({type:GET_INQUIRY_DATA_LOADER , payload:false})
    } catch (error) {
        yield put({type: GET_INQUIRY_DATA_FAIL, payload: error});
        yield put({type:GET_INQUIRY_DATA_LOADER , payload:false})
    }
}

function* fetchInquiryCustomerSummery(){
    try {
        const response = yield call(getInquiryCustomerSummary);
        yield put({type: GET_INQUIRY_CUSTOMER_SUMMARY_DATA_SUCCESS, payload: response});
    } catch (error) {
            console.log(error,"error")
    }
}

function* fetchInquirySalesCustomerSummery(){
    try {
        const response = yield call(getInquirySalesCustomerSummary);
        yield put({type: GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA_SUCCESS, payload: response});
    } catch (error) {
            console.log(error,"error")
    }
}
function* fetchInquirySummery(){
    try {
        const response = yield call(getInquirySummary);
        yield put({type: GET_INQUIRY_SUMMARY_DATA_SUCCESS, payload: response});
    } catch (error) {
            console.log(error,"error")
    }
}

function* fetchInquiryImportSummery(){
    try {
        const response = yield call(getInquiryImportSummary);
        yield put({type: GET_INQUIRY_IMPORT_SUMMARY__DATA_SUCCESS, payload: response});
    } catch (error) {
            console.log(error,"error")
    }
}

function* fetchInquiryExportSummery(){
    try {
        const response = yield call(getInquiryExportSummary);
        yield put({type: GET_INQUIRY_EXPORT_SUMMARY_DATA_SUCCESS, payload: response});
    } catch (error) {
        console.log(error,"error")
    }
}

export function* watchGetSalesData (){
    yield takeEvery(GET_QUOTATION_DATA, fetchSalesQuotationData);
    yield takeEvery(GET_CURRENCY_EXCHANGE_RATE, fetchCurrencyExchangeData);
    yield takeEvery(GET_INQUIRY_DATA, fetchSalesInquiryData);
    yield takeEvery(GET_INQUIRY_CUSTOMER_SUMMARY_DATA, fetchInquiryCustomerSummery);
    yield takeEvery(GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA, fetchInquirySalesCustomerSummery);
    yield takeEvery(GET_INQUIRY_SUMMARY_DATA, fetchInquirySummery);
    yield takeEvery(GET_INQUIRY_IMPORT_SUMMARY_DATA, fetchInquiryImportSummery);
    yield takeEvery(GET_INQUIRY_EXPORT_SUMMARY_DATA, fetchInquiryExportSummery);
}

function* salesSaga () {
    yield all([fork(watchGetSalesData)]);
}

export default salesSaga;