import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { showErrorToast, showSuccessToast } from "../../../components/Common/CustomToast";
import { getVendorDataByIdSer, getVendorDataSer, getVendorList, postVenderCompanySer, postVenderDocumentSer, postVendorContactSer } from "../../../helpers/services/PartiesService";
import { Get_File_URL } from "../../../helpers/url_helper";
import { GET_VENDOR_BY_ID, GET_VENDOR_BY_ID_SUCCESS, GET_VENDOR_CARRIER_DETAILS, GET_VENDOR_CARRIER_DETAILS_SUCCESS, GET_VENDOR_DATA_LIST, GET_VENDOR_DATA_LIST_SUCCESS, GET_VENDOR_DETAILS_ID, GET_VENDOR_LIST_SUCCESS, GET_VENDOR_LIST_TYPE, UPLOAD_VENDOR_CONTACT_TYPE, UPLOAD_VENDOR_DETAILS_TYPE, UPLOAD_VENDOR_DOCUMENT_TYPE, VENDOR_LOADER_TYPE, VENDOR_TAB_ACTIVE_TYPE } from "./actiontype";
import { getVendorCarrierData } from "../../../helpers/services/GlobalService";


function* fetchVendorListSaga({ payload }) {
    yield put({ type: VENDOR_LOADER_TYPE, payload: true });
    try {
        const response = yield call(getVendorDataSer, payload);
        if (response && response.content && response.content) {
            response?.content?.forEach(element => {
                let imageData = element.logoPath;
                const base64Encoded = window.btoa(imageData);
                element.logo = (!!(imageData) ? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}` : '');
                element.documents?.forEach(doc => {
                    let imageData = doc.documentPath;
                    const base64Encoded = window.btoa(imageData);
                    doc.logo = (!!(imageData) ? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}` : '');
                })
            });
        }
        yield put({ type: GET_VENDOR_LIST_SUCCESS, payload: response });
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
    } catch (error) {
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
        console.log(error, "saga Vendor error");
    }
}

function* fetchVendorById({ payload: { id } }) {
    try {
        const response = yield call(getVendorDataByIdSer, id);
        let imageData = response.logoPath;
        const base64Encoded = window.btoa(imageData);
        response.logo = (!!(imageData) ? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}` : '');
        yield put({ type: GET_VENDOR_BY_ID_SUCCESS, payload: response });
    } catch (error) {
        console.log("error surcharge", error);
    }
}
function* postVenderDataSaga({ payload: { formData } }) {

    try {
        const response = yield call(postVenderCompanySer, formData);
        console.log(response, "response vender data");
        yield put({ type: GET_VENDOR_DETAILS_ID, payload: { id: response?.id, version: response?.version } });
        yield put({ type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 2, details: 'success', contact: 'pending', document: 'pending' } });
        showSuccessToast("Add Vender Successfully");
    } catch (error) {
        yield put({ type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 1, details: 'error', contact: 'pending', document: 'pending' } });
        console.log(error, "saga add vender api error");
        showErrorToast(error?.message);
    }
}

function* postVenderContactSaga({ payload: { data } }) {
    console.log(data, "data saga vendor")
    try {
        const response = yield call(postVendorContactSer, data);
        console.log(response, "response vendor contact details")
        yield put({ type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 3, details: 'success', contact: 'success', document: 'pending' } });
        showSuccessToast("Update Contacts Successfully");
    } catch (error) {
        console.log(error, "error");
        yield put({ type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 2, details: 'success', contact: 'error', document: 'pending' } });
        showErrorToast(error?.message);
    }
}
function* postVenderDocumentSaga({ payload: { data } }) {
    console.log(data, "data saga Vendor document")
    try {
        const response = yield call(postVenderDocumentSer, data?.documents[data?.documents?.length - 1]);
        console.log(response, "results Vendor document");
        yield put({ type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 1, details: 'success', contact: 'success', document: 'success' } });
        showSuccessToast("Update Document Successfully");
    } catch (error) {
        console.log(error, "error");
        yield put({ type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 3, details: 'success', contact: 'success', document: 'error' } });
        showErrorToast(error?.message);
    }
}

function* fetchVendorCarrierData({ payload: { data } }) {
    console.log(data);
    yield put({ type: VENDOR_LOADER_TYPE, payload: true });

    try {
        const response = yield call(getVendorCarrierData,data);
        if (response.content && response.content.length > 0) {
            response.content?.forEach(element => {
                let imageData = element.logoPath;
                const base64Encoded = window.btoa(imageData);
                if (element.tenantVendor != null)
                    element.tenantVendor.logo = (!!(imageData) ? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}` : '');
                element.tenantVendor?.documents?.forEach(doc => {
                    let imageData = doc.documentPath;
                    const base64Encoded = window.btoa(imageData);
                    doc.logo = (!!(imageData) ? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}` : '');
                })
            });
        }
        yield put({ type: GET_VENDOR_CARRIER_DETAILS_SUCCESS, payload: response });
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
    } catch (error) {
        console.log(error, "vendor error-----------");
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
    }
}

function* fetchVendorDataListSaga({ payload }) {
    yield put({ type: VENDOR_LOADER_TYPE, payload: true });
    try {
        const response = yield call(getVendorList, payload);
        if (response && response.content && response.content) {
            response?.content?.forEach(element => {
                let imageData = element.logoPath;
                const base64Encoded = window.btoa(imageData);
                element.logo = (!!(imageData) ? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}` : '');
                element.documents?.forEach(doc => {
                    let imageData = doc.documentPath;
                    const base64Encoded = window.btoa(imageData);
                    doc.logo = (!!(imageData) ? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}` : '');
                })
            });
        }
        yield put({ type: GET_VENDOR_DATA_LIST_SUCCESS, payload: response });
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
    } catch (error) {
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
        console.log(error, "saga Vendor error");
    }
}

function* watchPartiesVendorSaga() {
    yield takeLatest(GET_VENDOR_LIST_TYPE, fetchVendorListSaga);
    yield takeLatest(UPLOAD_VENDOR_DETAILS_TYPE, postVenderDataSaga);
    yield takeLatest(UPLOAD_VENDOR_CONTACT_TYPE, postVenderContactSaga);
    yield takeLatest(UPLOAD_VENDOR_DOCUMENT_TYPE, postVenderDocumentSaga);
    yield takeLatest(GET_VENDOR_BY_ID, fetchVendorById);
    yield takeLatest(GET_VENDOR_CARRIER_DETAILS, fetchVendorCarrierData);
    yield takeLatest(GET_VENDOR_DATA_LIST, fetchVendorDataListSaga);
}

function* partiesVendorSaga() {
    yield all([fork(watchPartiesVendorSaga)]);
}

export default partiesVendorSaga;