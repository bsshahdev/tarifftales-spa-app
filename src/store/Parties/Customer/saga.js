import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { showErrorToast, showSuccessToast } from "../../../components/Common/CustomToast";
import { getCustomerDataByIdSer, getCustomerDataSer, getCustomerListSer, postCustomerCompanySer, postCustomerContactSer, postCustomerDocSer } from "../../../helpers/services/PartiesService";
import { GET_CUSTOMERS_ID, GET_CUSTOMER_BY_ID, GET_CUSTOMER_BY_ID_SUCCESS, GET_CUSTOMER_LOADER, GET_PARTIES_CUSTOMER_DETAILS_TYPE, GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS, UPLOAD_CUSTOMER_COMPANYDATA_TYPE, UPLOAD_CUSTOMER_CONTACT_TYPE, UPLOAD_CUSTOMER_DOCUMENT_TYPE } from "./actiontype";
import axios from "axios";
import { Get_File_URL } from "../../../helpers/url_helper";

function* fetchPartiesCustomerSaga({ payload}) {
    yield put({type: GET_CUSTOMER_LOADER, payload: true});
    try {
        if(payload){
            const response = yield call(getCustomerDataSer, payload);   
            if (response && response.content && response.content) {
                response?.content?.forEach(element => {
                    let imageData = element.logoPath;
                    const base64Encoded = window.btoa(imageData);
                    element.logo =(!!(imageData)? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`:'');
                    element.documents?.forEach(doc=>{
                        let imageData = doc.documentPath;
                        const base64Encoded = window.btoa(imageData);
                        doc.logo =(!!(imageData)? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`:'');
                    })
                });
            }
            yield put({ type: GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS, payload: response });
            yield put({type: GET_CUSTOMER_LOADER, payload: false});                     
        } else {
            const response = yield call(getCustomerListSer);
            if (response && response.content && response.content) {
                response?.content?.forEach(element => {
                    let imageData = element.logoPath;
                    const base64Encoded = window.btoa(imageData);
                    element.logo =(!!(imageData)? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`:'');
                    element.documents?.forEach(doc=>{
                        let imageData = doc.documentPath;
                        const base64Encoded = window.btoa(imageData);
                        doc.logo =(!!(imageData)? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`:'');
                    })
                });
            }
            yield put({ type: GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS, payload: response });
            yield put({type: GET_CUSTOMER_LOADER, payload: false});
        }
    } catch (error) {
        console.log(error, "saga customer api error");
        yield put({type: GET_CUSTOMER_LOADER, payload: false});
    }
}
function* fetchCustomerById({ payload: { id } }) {
    try {
        const response = yield call(getCustomerDataByIdSer, id);
        let imageData = response.logoPath;
        const base64Encoded = window.btoa(imageData);
        response.logo =(!!(imageData)? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`:'');
        yield put({type: GET_CUSTOMER_BY_ID_SUCCESS, payload: response});
    } catch (error) {
        console.log("error surcharge", error);
    }
}

function* postCustomerCompanySaga({ payload: { data } }) {
    try {
        console.log("payload getPartiesCustomerAddDetailsData", data);
        const response = yield call(postCustomerCompanySer, data);
        console.log(response, "response of getCompanyDetailsData");
        yield put({ type: GET_CUSTOMERS_ID, payload: { id: response?.id, version: response?.version } });
        showSuccessToast("Customer Details Added Successfully");
    } catch (error) {
        showErrorToast(error?.message);
        console.log(error, "saga login api error");
    }
}
function* postCustomerContactSaga({ payload: { data } }) {
    console.log(data, "data saga customer")
    try {
        const response = yield call(postCustomerContactSer, data);
        console.log(response, "response customer contact");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}
function* postCustomerDocumentSaga({ payload: { data } }) {
    console.log(data, "data saga customer document")
    try {
        // const response = yield all(
        //     data?.documents?.map((formData) => call(postCustomerDocSer, formData))
        // );
        const response = yield call(postCustomerDocSer, data?.documents[data?.documents?.length - 1]);
        console.log(response, "response customer document");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}

function* watchPartiesCustomerSaga() {
    yield takeLatest(GET_PARTIES_CUSTOMER_DETAILS_TYPE, fetchPartiesCustomerSaga);
    yield takeLatest(UPLOAD_CUSTOMER_COMPANYDATA_TYPE, postCustomerCompanySaga);
    yield takeLatest(UPLOAD_CUSTOMER_CONTACT_TYPE, postCustomerContactSaga);
    yield takeEvery(UPLOAD_CUSTOMER_DOCUMENT_TYPE, postCustomerDocumentSaga);
    yield takeLatest(GET_CUSTOMER_BY_ID, fetchCustomerById)
}

function* partiesCustomerSaga() {
    yield all([fork(watchPartiesCustomerSaga)]);
}

export default partiesCustomerSaga;