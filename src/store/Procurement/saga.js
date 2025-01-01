import axios from "axios";
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";
import { getLCLTableData } from "../../helpers/fakebackend_helper";
import { fetcAirConsoleTableData, fetcAirConsoledetails, fetcAirFreighConsoletData, fetchAirMawbdetails, getAirFreightData, getAirLineTableData, getAirLineTableDataById, getAirMWBData, getAirPortLocalChargesTableData, getAirPortLocalChargesTableDataById, getTenantCargoModeSer, postAirConsoleData, postAirConsoleUploadService, postAirLineUploadSer, postAirMawbSer, postAirPortLocalUploadSer, postAirUploadService, uploadAirRateData, uploadConsoleAirRateData } from "../../helpers/services/AirService";
import { getFCLDestinationData, getFCLFilterSer, getFCLFreightViewData, getFCLInlandFilterSer, getFCLInlandFreightSer, getFCLInlandSurchargeSer, getFCLInlandTableData, getFCLSurchargeViewData, getFCLTableData, getFCLVersionSer, getFclOceanSurchrgesSer, getOceanFilterSer, getOceanTableDataSer, getPortLocalChargesFilterSer, getPortLocalChargesTableData, postFclFreightUploadSer, postFclFreightUploadServ1, postFclInlandFreightUploadSer, postFclInlandSurchargeUploadSer, postFclInlandUploadSer, postFclOceanDetailsSer, postFclOceanSurchargesDetailsSer, postFclOceanSurchargesSer, postFclPLUploadSer, postFclSurchargeUploadSer, postFclUploadSer } from "../../helpers/services/FCLService";
import { getUploadStatus } from "../../helpers/services/GlobalService";
import { Get_File_URL } from "../../helpers/url_helper";
import { getAirConsoleDataFail, getAirConsoleDataSuccess, getAirConsoleDataSuccessById, getAirwaybillDataByIdResponse, getAirwaybillDataFail, getAirwaybillDataSuccess, getFclDataFail, getFclDataSuccess, getInLandDataFail, getInLandDataSuccess, getLclDataFail, getLclDataSuccess, getPortLocalChargesDataFail, getPortLocalChargesDataSuccess } from "./actions";
import { CONSOLE_FRIGHT_FAILD_DATA_TYPE, CONSOLE_FRIGHT_FAILD_POPUP_TYPE, FCL_FREIGHT_FAILD_DATA_TYPE, FCL_FREIGHT_FAILD_POPUP_TYPE, FCL_FREIGHT_TABLE_DATA_SUCCESS, FCL_INLAND_FAILD_DATA_TYPE, FCL_INLAND_FAILD_POPUP_TYPE, GET_AIR_LINE_CHARGES_BY_ID, GET_AIR_LINE_CHARGES_BY_ID_SUCCESS, GET_AIR_LINE_CHARGES_DATA, GET_AIR_LINE_CHARGES_LOADER, GET_AIR_LINE_CHARGES_SUCCESS, GET_AIR_PORT_LOCAL_CHARGES_BY_ID, GET_AIR_PORT_LOCAL_CHARGES_BY_ID_SUCCESS, GET_AIR_PORT_LOCAL_CHARGES_DATA, GET_AIR_PORT_LOCAL_CHARGES_LOADER, GET_AIR_PORT_LOCAL_CHARGES_SUCCESS, GET_ALL_CONSOLE_FRIGHT_DETAILS, GET_ALL_CONSOLE_FRIGHT_DETAILS_LOADER, GET_ALL_CONSOLE_FRIGHT_DETAILS_SUCCESS, GET_ALL_MAWB_FRIGHT_DETAILS, GET_ALL_MAWB_FRIGHT_DETAILS_LOADER, GET_ALL_MAWB_FRIGHT_DETAILS_SUCCESS, GET_ALL_TENANT_CARGO_MODE, GET_ALL_TENANT_CARGO_MODE_SUCCESS, GET_CONSOLE_TABLE_DATA, GET_CONSOLE_TABLE_DATA_BY_ID, GET_CONSOLE_TABLE_DATA_LOADER, GET_FCL_CHARGE_ID, GET_FCL_CURRENT_VERSION_TYPE, GET_FCL_DESTINATION_DATA, GET_FCL_DESTINATION_DATA_SUCCESS, GET_FCL_FREIGHT_DETAILS_SUCCESS, GET_FCL_FREIGHT_VIEW_DATA, GET_FCL_FREIGHT_VIEW_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_LOADER, GET_FCL_INLAND_CHARGE_ID, GET_FCL_INLAND_FREIGHT_ACTION, GET_FCL_INLAND_FREIGHT_ACTION_SUCCESS, GET_FCL_INLAND_FREIGHT_LOADER, GET_FCL_INLAND_LOADER, GET_FCL_INLAND_SURCHARGE_ACTION, GET_FCL_INLAND_SURCHARGE_ACTION_SUCCESS, GET_FCL_INLAND_SURCHARGE_LOADER, GET_FCL_INLAND_TABLE_DATA, GET_FCL_LOADER, GET_FCL_OCEAN_SURCHARGES_DETAILS, GET_FCL_PLCHARGES_LOADER, GET_FCL_PLCHARGES_RESPONCE, GET_FCL_SURCHARGE_VIEW_DATA, GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, GET_FCL_SURCHARGE_VIEW_LOADER, GET_FCL_TABLE_DATA, GET_LCL_TABLE_DATA, GET_OCEAN_FRIGHT_DETAILS, GET_OCEAN_FRIGHT_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA, GET_UPLOAD_STATUS, GET_UPLOAD_STATUS_SUCCESS, GET_WAYBILL_TABLE_DATA, GET_WAYBILL_TABLE_DATA_BY_ID, GET_WAYBILL_TABLE_DATA_LOADER, MAWB_FRIGHT_FAILD_DATA_TYPE, MAWB_FRIGHT_FAILD_POPUP_TYPE, POST_CARRIER_DATA, POST_CARRIER_DATA_CONSOLE, POST_FCL_OCEAN_SURCHARGES, POST_OCEAN_FCL_SURCHARGE_DETAILS, POST_OCEAN_FRIGHT_DETAILS, POST_OCEAN_FRIGHT_DETAILS_SUCCESS, SAVE_CONSOLE_FRIGHT_RP_DATA, SAVE_CONSOLE_FRIGHT_RP_DATA_SUCCESS, SAVE_MAWB_FRIGHT_RP_DATA, SAVE_MAWB_FRIGHT_RP_DATA_SUCCESS, UPDATE_FCL_ACTIVE_TAB, UPDATE_INLAND_ACTIVE_TAB, UPLOAD_AIR_LINE_DATA, UPLOAD_AIR_PORT_LOCAL_DATA, UPLOAD_FCL_CARRIER_DATA, UPLOAD_FCL_FREIGHT, UPLOAD_FCL_FREIGHT_V2, UPLOAD_FCL_INLAND_CARRIER_DATA, UPLOAD_FCL_INLAND_FREIGHT_DATA, UPLOAD_FCL_INLAND_SURCHARGE_DATA, UPLOAD_FCL_PORTLOCALCHARGES, UPLOAD_FCL_SURCHARGE } from "./actiontype";
import UploadAirPortLocalChargesData from "../../pages/Procurement/FreightForwarding/Air/AirPortLocal/partials/UploadAirPortLocalChargesData";

function* fetchFclData({ payload }) {
    yield put({ type: GET_FCL_LOADER, payload: true });
    try {
        if (payload) {
            const response = yield call(getFCLFilterSer, payload);
            yield put(getFclDataSuccess(response));
        } else {
            const response = yield call(getFCLTableData);
            yield put(getFclDataSuccess(response));
        }
        yield put({ type: GET_FCL_LOADER, payload: false });
    } catch (error) {
        yield put({ type: GET_FCL_LOADER, payload: false });
        yield put(getFclDataFail(error))
    }
}
function* fetchFclFreightViewData({ payload }) {
    yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: true });
    try {
        const response = yield call(getFCLFreightViewData, payload);
        yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false });
        yield put({ type: GET_FCL_FREIGHT_VIEW_DATA_SUCCESS, payload: response })
    } catch (error) {
        yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false });
        console.log("error", error);
    }
}

function* fetchFclFreightDetails({ payload: { data } }) {
    yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: true });
    try {
        const response = yield call(getOceanFilterSer, data);
        yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false });
        yield put({ type: GET_FCL_FREIGHT_DETAILS_SUCCESS, payload: response })
    } catch (error) {
        yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false });
        console.log("error", error);
    }
}

function* fetchFclFreightDetailsTableData() {
    yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: true });
    try {
        const response = yield call(getOceanTableDataSer);
        yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false });
        yield put({ type: FCL_FREIGHT_TABLE_DATA_SUCCESS, payload: response })
    } catch (error) {
        yield put({ type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false });
        console.log("error", error);
    }
}

function* fetchFclSurchargeViewData({ payload }) {
    yield put({ type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: true });
    try {
        const response = yield call(getFCLSurchargeViewData, payload);
        yield put({ type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: false });
        yield put({ type: GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, payload: response })
    } catch (error) {
        yield put({ type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: false });
        console.log("error", error);
    }
}
function* fetchFclDestinationData({ payload: { data } }) {
    try {
        const response = yield call(getFCLDestinationData, data);
        console.log(response, "response destination data");
        yield put({ type: GET_FCL_DESTINATION_DATA_SUCCESS, payload: response })
    } catch (error) {
        console.log("error", error);
    }
}
function* postFclUploadSaga({ payload: { dataObj } }) {
    try {
        const response = yield call(postFclUploadSer, dataObj);
        showSuccessToast("Update Successfully");
        yield put({ type: GET_FCL_CHARGE_ID, payload: { id: response?.id, version: response?.version } });
        yield put({ type: UPDATE_FCL_ACTIVE_TAB, payload: { tab: 2 } });
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}
// mawb
function* postAirUploadSaga({ payload: { dataObj } }) {
    try {
        console.log("postAirUploadSaga");
        console.log(dataObj);
        let formData = dataObj.newData.formData;
        const fileUpload = yield call(uploadAirRateData, { formData });
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.description || error?.response?.data?.message || error?.response?.data?.detail);
        if (error?.response?.status === 400) {
            const downloadFile = error?.response?.data?.filePath;
            if (downloadFile !== undefined && downloadFile !== '') {
                var rest = downloadFile?.substring(0, downloadFile.lastIndexOf("/") + 1);
                var last = downloadFile?.substring(downloadFile.lastIndexOf("/") + 1, downloadFile.length);
                const base64Encoded = window.btoa(last);
                yield put({ type: MAWB_FRIGHT_FAILD_DATA_TYPE, payload: { data: error?.response?.data, url: `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`, filename: last } });
                yield put({ type: MAWB_FRIGHT_FAILD_POPUP_TYPE, payload: true });
            }
        }
    }
}

function* postAirMawbData({ payload: { data } }) {
    try {
        const response = yield call(postAirMawbSer, data);
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
        yield put({ type: SAVE_MAWB_FRIGHT_RP_DATA_SUCCESS, payload: response });
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}

function* fetchAllMawbDetails({ payload: { data } }) {
    yield put({ type: GET_ALL_MAWB_FRIGHT_DETAILS_LOADER, payload: true })
    try {
        const response = yield call(fetchAirMawbdetails, data);
        yield put({ type: GET_ALL_MAWB_FRIGHT_DETAILS_SUCCESS, payload: response });
        yield put({ type: GET_ALL_MAWB_FRIGHT_DETAILS_LOADER, payload: false })
    } catch (error) {
        yield put({ type: GET_ALL_MAWB_FRIGHT_DETAILS_LOADER, payload: false })
        showErrorToast(error?.response?.data?.message);
    }
}

//console
function* postFclFreightUploadSaga({ payload: { formData, id } }) {
    try {
        const response = yield call(postFclFreightUploadSer, { formData, id });
        console.log(response, "response fcl surcharge");
        showSuccessToast(response?.description);
        console.log(id, "saga id");
        const destRes = yield call(getFCLDestinationData, id);
        yield put({ type: GET_FCL_DESTINATION_DATA_SUCCESS, payload: destRes });
        yield put({ type: UPDATE_FCL_ACTIVE_TAB, payload: { tab: 3 } });
    } catch (error) {
        console.log(error, "saga error");
        showErrorToast(error?.response?.data?.description || error?.response?.data?.message || error?.response?.data?.detail);
        if (error?.response?.status === 400) {
            const downloadFile = error?.response?.data?.filePath;
            if (downloadFile !== undefined && downloadFile !== '') {
                var rest = downloadFile?.substring(0, downloadFile.lastIndexOf("/") + 1);
                var last = downloadFile?.substring(downloadFile.lastIndexOf("/") + 1, downloadFile.length);
                const base64Encoded = window.btoa(last);
                yield put({ type: FCL_FREIGHT_FAILD_DATA_TYPE, payload: { data: error?.response?.data, url: `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`, filename: last } });
                yield put({ type: FCL_FREIGHT_FAILD_POPUP_TYPE, payload: true });
            }
        }
    }
}

function* postFclFreightUploadSagaV2({ payload: { formData } }) {
    try {
        const response = yield call(postFclFreightUploadServ1, { formData });
        console.log(response, "response fcl surcharge");
        showSuccessToast(response?.description);
    } catch (error) {
        console.log(error, "saga error");
        showErrorToast(error?.response?.data?.description || error?.response?.data?.message || error?.response?.data?.detail);
        if (error?.response?.status === 400) {
            const downloadFile = error?.response?.data?.filePath;
            if (downloadFile !== undefined && downloadFile !== '') {
                var rest = downloadFile?.substring(0, downloadFile.lastIndexOf("/") + 1);
                var last = downloadFile?.substring(downloadFile.lastIndexOf("/") + 1, downloadFile.length);
                const base64Encoded = window.btoa(last);
                yield put({ type: FCL_FREIGHT_FAILD_DATA_TYPE, payload: { data: error?.response?.data, url: `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`, filename: last } });
                yield put({ type: FCL_FREIGHT_FAILD_POPUP_TYPE, payload: true });
            }
        }
    }
}

function* postFclOceanDetails({ payload: { data } }) {
    try {
        console.log(data);
        const response = yield call(postFclOceanDetailsSer, data);
        console.log(response, "response surcharge");
        yield put({ type: POST_OCEAN_FRIGHT_DETAILS_SUCCESS, payload: data })
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}

function* postFclOceanSurcharges({ payload: { data } }) {
    try {
        const response = yield call(postFclOceanSurchargesSer, data);
        console.log(response, "response surcharge");
        yield put({ type: POST_OCEAN_FRIGHT_DETAILS_SUCCESS, payload: response })
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}
function* postFclOceanSurchargesDetails({ payload: { data } }) {
    try {
        const response = yield call(postFclOceanSurchargesDetailsSer, data);
        console.log(response, "response surcharge");
        yield put({ type: POST_OCEAN_FRIGHT_DETAILS_SUCCESS, payload: data })
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}

function* fetchFclOceanSurcharges({ payload: { data } }) {
    yield put({ type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: true });
    try {
        const response = yield call(getFclOceanSurchrgesSer, data);
        yield put({ type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: false });
        yield put({ type: GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, payload: response })
    } catch (error) {
        yield put({ type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: false });
        console.log("error", error);
    }
}

function* saveConsoledata({ payload: { data } }) {
    try {
        const response = yield call(postAirConsoleData, data);
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
        yield put({ type: SAVE_CONSOLE_FRIGHT_RP_DATA_SUCCESS, payload: response });
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}



function* fetchAllConsoleDetails({ payload: { data } }) {
    yield put({ type: GET_ALL_CONSOLE_FRIGHT_DETAILS_LOADER, payload: true })
    try {
        const response = yield call(fetcAirConsoledetails, data);
        yield put({ type: GET_ALL_CONSOLE_FRIGHT_DETAILS_SUCCESS, payload: response });
        yield put({ type: GET_ALL_CONSOLE_FRIGHT_DETAILS_LOADER, payload: false })
    } catch (error) {
        yield put({ type: GET_ALL_CONSOLE_FRIGHT_DETAILS_LOADER, payload: false })
        showErrorToast(error?.response?.data?.message);
    }
}
function* postFclSurchargeUploadSaga({ payload: { data, id } }) {
    try {
        const response = yield call(postFclSurchargeUploadSer, { data, id });
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
        yield put({ type: UPDATE_FCL_ACTIVE_TAB, payload: { tab: 1 } });
        yield put({ type: GET_FCL_CHARGE_ID, payload: '' });
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}
function* fetchFclVersionSaga({ payload }) {
    try {
        if (payload) {
            const response = yield call(getFCLVersionSer, payload);
            yield put({ type: GET_FCL_CHARGE_ID, payload: { id: response?.id, version: response?.version } });
            console.log(response, "response version");
        }
    } catch (error) {
        console.log(error, "error");
    }
}

// ------------------ FCL Port & Local Charges ------------------
function* fetchPLChargesData({ payload }) {
    yield put({ type: GET_FCL_PLCHARGES_LOADER, payload: true });
    try {
        if (payload) {
            const response = yield call(getPortLocalChargesFilterSer, payload);
            yield put(getPortLocalChargesDataSuccess(response));
        } else {
            const response = yield call(getPortLocalChargesTableData);
            yield put(getPortLocalChargesDataSuccess(response));
        }
        yield put({ type: GET_FCL_PLCHARGES_LOADER, payload: false });
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
        yield put({ type: GET_FCL_PLCHARGES_LOADER, payload: false });
    }
}
function* postPLChargesData({ payload: { dataObj } }) {
    try {
        const response = yield call(postFclPLUploadSer, dataObj);
        console.log(response, "response port local");
        yield put({type: GET_FCL_PLCHARGES_RESPONCE, payload: response});
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}


// ------------------Air port local Charges ------------------
function* fetchAirPortLocalChargesData({ payload }) {
    yield put({ type: GET_AIR_PORT_LOCAL_CHARGES_LOADER, payload: true });
    try {
        const response = yield call(getAirPortLocalChargesTableData);
        yield put({ type: GET_AIR_PORT_LOCAL_CHARGES_SUCCESS, payload: response });
        yield put({ type: GET_AIR_PORT_LOCAL_CHARGES_LOADER, payload: false });
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
        yield put({ type: GET_AIR_PORT_LOCAL_CHARGES_LOADER, payload: false });
    }
}
function* postAirPortLocalChargesData({ payload: { dataObj } }) {
    try {
        const response = yield call(postAirPortLocalUploadSer, dataObj);
        console.log(response, "response port local");
        if (dataObj?.id)
            yield put({ type: GET_AIR_PORT_LOCAL_CHARGES_BY_ID_SUCCESS, payload: response });
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}

// tenant cargo mode

function* fetchAllTenantCargomode() {
    try {
        const response = yield call(getTenantCargoModeSer);
        yield put({ type: GET_ALL_TENANT_CARGO_MODE_SUCCESS, payload: response });
    } catch (error) {
        console.log(error);
    }
}

function* fetchAirPortLocalChargesDataById({ payload: { id } }) {
    try {
        const response = yield call(getAirPortLocalChargesTableDataById, id);
        yield put({ type: GET_AIR_PORT_LOCAL_CHARGES_BY_ID_SUCCESS, payload: response });
    } catch (error) {
        console.log(error);
    }
}


// air line charges
function* fetchAirLineChargesData({ payload }) {
    yield put({ type: GET_AIR_LINE_CHARGES_LOADER, payload: true });
    try {
        const response = yield call(getAirLineTableData);
        yield put({ type: GET_AIR_LINE_CHARGES_SUCCESS, payload: response });
        yield put({ type: GET_AIR_LINE_CHARGES_LOADER, payload: false });
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
        yield put({ type: GET_AIR_LINE_CHARGES_LOADER, payload: false });
    }
}

function* fetchAirLineChargesDataById({ payload: { id } }) {
    try {
        const response = yield call(getAirLineTableDataById, id);
        yield put({ type: GET_AIR_LINE_CHARGES_BY_ID_SUCCESS, payload: response });
    } catch (error) {
        console.log(error);
    }
}
function* postAirLineChargesData({ payload: { dataObj } }) {
    try {
        const response = yield call(postAirLineUploadSer, dataObj);
        console.log(response, "response port local");
        if (dataObj?.id)
            yield put({ type: GET_AIR_LINE_CHARGES_BY_ID_SUCCESS, payload: response });
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}

// FCL Inland charges
function* fetchFCLInLandData({ payload }) {
    console.log(payload, "saga payload");
    yield put({ type: GET_FCL_INLAND_LOADER, payload: true });
    try {
        if (payload) {
            const response = yield call(getFCLInlandFilterSer, payload);
            yield put(getInLandDataSuccess(response));
        } else {
            const response = yield call(getFCLInlandTableData);
            yield put(getInLandDataSuccess(response));
        }
        yield put({ type: GET_FCL_INLAND_LOADER, payload: false });
    } catch (error) {
        yield put({ type: GET_FCL_INLAND_LOADER, payload: false });
        yield put(getInLandDataFail(error));
    }
}
function* fetchFCLInLandFreightSaga({ payload: { id } }) {
    yield put({ type: GET_FCL_INLAND_FREIGHT_LOADER, payload: true });
    try {
        const response = yield call(getFCLInlandFreightSer, id);
        yield put({ type: GET_FCL_INLAND_FREIGHT_LOADER, payload: false });
        yield put({ type: GET_FCL_INLAND_FREIGHT_ACTION_SUCCESS, payload: response });
    } catch (error) {
        console.log("error freight", error);
        yield put({ type: GET_FCL_INLAND_FREIGHT_LOADER, payload: false });
    }
}
function* fetchFCLInLandSurchargeSaga({ payload: { id } }) {
    yield put({ type: GET_FCL_INLAND_SURCHARGE_LOADER, payload: true });
    try {
        const response = yield call(getFCLInlandSurchargeSer, id);
        yield put({ type: GET_FCL_INLAND_SURCHARGE_LOADER, payload: false });
        yield put({ type: GET_FCL_INLAND_SURCHARGE_ACTION_SUCCESS, payload: response });
    } catch (error) {
        console.log("error surcharge", error);
        yield put({ type: GET_FCL_INLAND_SURCHARGE_LOADER, payload: false });
    }
}
function* postFCLInLandSaga({ payload: { dataObj } }) {
    try {
        const response = yield call(postFclInlandUploadSer, dataObj);
        console.log(response, "response inland");
        yield put({ type: GET_FCL_INLAND_CHARGE_ID, payload: { id: response?.id, version: response?.version } });
        yield put({ type: UPDATE_INLAND_ACTIVE_TAB, payload: { tab: 2 } });
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.response?.data?.message);
    }
}
function* postFCLInLandFreightSaga({ payload: { formData, id } }) {
    try {
        const response = yield call(postFclInlandFreightUploadSer, { formData, id });
        showSuccessToast(response?.description);
        yield put({ type: UPDATE_INLAND_ACTIVE_TAB, payload: { tab: 3 } });
    } catch (error) {
        showErrorToast(error?.response?.data?.description || error?.response?.data?.message || error?.response?.data?.detail);
        if (error?.response?.status === 400) {
            const downloadFile = error?.response?.data?.filePath;
            var rest = downloadFile.substring(0, downloadFile.lastIndexOf("/") + 1);
            var last = downloadFile.substring(downloadFile.lastIndexOf("/") + 1, downloadFile.length);
            const base64Encoded = window.btoa(last);
            if (downloadFile !== undefined && downloadFile !== '') {
                yield put({ type: FCL_INLAND_FAILD_DATA_TYPE, payload: { data: error?.response?.data, url: `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`, filename: last } });
            }
            yield put({ type: FCL_INLAND_FAILD_POPUP_TYPE, payload: true });
        }
    }
}
function* postFCLInLandSurchargeSaga({ payload: { data } }) {
    try {
        const response = yield call(postFclInlandSurchargeUploadSer, data);
        console.log(response, "response inland");
        showSuccessToast("Update Successfully");
        yield put({ type: UPDATE_INLAND_ACTIVE_TAB, payload: { tab: 1 } });
        yield put({ type: GET_FCL_INLAND_CHARGE_ID, payload: '' });
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.response?.data?.message);
    }
}


// --------------------------------- Air -------------------------------------------------------------

function* postAirConsoleUploadSaga({ payload: { dataObj } }) {
    try {
        // const response = yield call(postAirConsoleUploadService, dataObj.newData.consoleCarrierDetails);     
        let formData = dataObj.newData.formData;
        const fileUpload = yield call(uploadConsoleAirRateData, { formData });
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.description || error?.response?.data?.message || error?.response?.data?.detail);
        if (error?.response?.status === 400) {
            const downloadFile = error?.response?.data?.filePath;
            if (downloadFile !== undefined && downloadFile !== '') {
                var rest = downloadFile?.substring(0, downloadFile.lastIndexOf("/") + 1);
                var last = downloadFile?.substring(downloadFile.lastIndexOf("/") + 1, downloadFile.length);
                const base64Encoded = window.btoa(last);
                yield put({ type: CONSOLE_FRIGHT_FAILD_DATA_TYPE, payload: { data: error?.response?.data, url: `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`, filename: last } });
                yield put({ type: CONSOLE_FRIGHT_FAILD_POPUP_TYPE, payload: true });
            }
        }
    }
}

function* fetchLclData() {
    try {
        const response = yield call(getLCLTableData);
        yield put(getLclDataSuccess(response));
    } catch (error) {
        yield put(getLclDataFail(error));
    }
}

function* fetchWaybillData() {
    yield put({ type: GET_WAYBILL_TABLE_DATA_LOADER, payload: true })
    try {
        const response = yield call(getAirMWBData);
        yield put(getAirwaybillDataSuccess(response));
        yield put({ type: GET_WAYBILL_TABLE_DATA_LOADER, payload: false })

    } catch (error) {
        yield put(getAirwaybillDataFail(error));
        yield put({ type: GET_WAYBILL_TABLE_DATA_LOADER, payload: false })

    }
}

function* fetchAirConsoleData() {
    yield put({ type: GET_CONSOLE_TABLE_DATA_LOADER, payload: true })
    try {
        const response = yield call(fetcAirConsoleTableData);
        yield put(getAirConsoleDataSuccess(response));
        yield put({ type: GET_CONSOLE_TABLE_DATA_LOADER, payload: false })
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
        yield put({ type: GET_CONSOLE_TABLE_DATA_LOADER, payload: false })

    }
}



function* fetchAirConsoleDataById({ payload: { id } }) {
    try {
        const response = yield call(fetcAirFreighConsoletData, id);
        yield put(getAirConsoleDataSuccessById(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}

function* fetchAirFreightData({ payload: { id } }) {
    try {
        const response = yield call(getAirFreightData, id);
        yield put(getAirwaybillDataByIdResponse(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}

function* fetchUploadStatusData() {
    try {
        const response = yield call(getUploadStatus);
        console.log(response, "response destination data");
        yield put({ type: GET_UPLOAD_STATUS_SUCCESS, payload: response })
    } catch (error) {
        console.log("error", error);
    }
}




export function* watchGetProcureData() {
    yield takeEvery(GET_FCL_TABLE_DATA, fetchFclData);
    yield takeEvery(GET_FCL_FREIGHT_VIEW_DATA, fetchFclFreightViewData);
    yield takeEvery(GET_FCL_SURCHARGE_VIEW_DATA, fetchFclSurchargeViewData);
    yield takeEvery(GET_FCL_DESTINATION_DATA, fetchFclDestinationData);
    yield takeLatest(UPLOAD_FCL_CARRIER_DATA, postFclUploadSaga);
    yield takeLatest(UPLOAD_FCL_FREIGHT, postFclFreightUploadSaga);
    yield takeLatest(UPLOAD_FCL_SURCHARGE, postFclSurchargeUploadSaga);
    yield takeLatest(GET_FCL_CURRENT_VERSION_TYPE, fetchFclVersionSaga);

    yield takeEvery(UPLOAD_FCL_PORTLOCALCHARGES, postPLChargesData);
    yield takeEvery(GET_PORTLOCALCHARGES_TABLE_DATA, fetchPLChargesData);

    yield takeEvery(GET_FCL_INLAND_TABLE_DATA, fetchFCLInLandData);
    yield takeEvery(GET_FCL_INLAND_FREIGHT_ACTION, fetchFCLInLandFreightSaga);
    yield takeEvery(GET_FCL_INLAND_SURCHARGE_ACTION, fetchFCLInLandSurchargeSaga);
    yield takeEvery(UPLOAD_FCL_INLAND_CARRIER_DATA, postFCLInLandSaga);
    yield takeEvery(UPLOAD_FCL_INLAND_FREIGHT_DATA, postFCLInLandFreightSaga);
    yield takeEvery(UPLOAD_FCL_INLAND_SURCHARGE_DATA, postFCLInLandSurchargeSaga);


    yield takeEvery(GET_LCL_TABLE_DATA, fetchLclData)
    yield takeEvery(GET_WAYBILL_TABLE_DATA, fetchWaybillData);
    yield takeEvery(GET_CONSOLE_TABLE_DATA, fetchAirConsoleData);
    yield takeEvery(GET_CONSOLE_TABLE_DATA_BY_ID, fetchAirConsoleDataById);

    yield takeEvery(GET_WAYBILL_TABLE_DATA_BY_ID, fetchAirFreightData)

    yield takeEvery(POST_CARRIER_DATA, postAirUploadSaga);

    yield takeEvery(GET_UPLOAD_STATUS, fetchUploadStatusData);

    yield takeEvery(POST_CARRIER_DATA_CONSOLE, postAirConsoleUploadSaga);
    yield takeEvery(GET_AIR_PORT_LOCAL_CHARGES_DATA, fetchAirPortLocalChargesData);
    yield takeEvery(UPLOAD_AIR_PORT_LOCAL_DATA, postAirPortLocalChargesData);

    yield takeEvery(GET_AIR_LINE_CHARGES_DATA, fetchAirLineChargesData);
    yield takeEvery(UPLOAD_AIR_LINE_DATA, postAirLineChargesData);
    yield takeEvery(GET_AIR_PORT_LOCAL_CHARGES_BY_ID, fetchAirPortLocalChargesDataById)
    yield takeEvery(GET_AIR_LINE_CHARGES_BY_ID, fetchAirLineChargesDataById)
    yield takeEvery(GET_ALL_CONSOLE_FRIGHT_DETAILS, fetchAllConsoleDetails)
    yield takeEvery(GET_ALL_MAWB_FRIGHT_DETAILS, fetchAllMawbDetails)
    yield takeEvery(GET_ALL_TENANT_CARGO_MODE, fetchAllTenantCargomode)
    yield takeEvery(SAVE_MAWB_FRIGHT_RP_DATA, postAirMawbData)
    yield takeEvery(SAVE_CONSOLE_FRIGHT_RP_DATA, saveConsoledata)
    yield takeEvery(UPLOAD_FCL_FREIGHT_V2, postFclFreightUploadSagaV2)
    yield takeEvery(GET_OCEAN_FRIGHT_DETAILS, fetchFclFreightDetails)
    yield takeEvery(GET_OCEAN_FRIGHT_TABLE_DATA, fetchFclFreightDetailsTableData)
    yield takeEvery(POST_OCEAN_FRIGHT_DETAILS, postFclOceanDetails)
    yield takeEvery(POST_FCL_OCEAN_SURCHARGES, postFclOceanSurcharges)
    yield takeEvery(GET_FCL_OCEAN_SURCHARGES_DETAILS, fetchFclOceanSurcharges)
    yield takeEvery(POST_OCEAN_FCL_SURCHARGE_DETAILS, postFclOceanSurchargesDetails)
}

function* procurementSaga() {
    yield all([fork(watchGetProcureData)]);
}

export default procurementSaga;