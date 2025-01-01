import axios from "axios";
import {
  all,
  call,
  fork,
  put,
  takeLatest
} from "redux-saga/effects";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/Common/CustomToast";
import {
  getFCLSurcharge
} from "../../helpers/fakebackend_helper";
import {
  CompanyAllDetails,
  CompanyBasicDetailsAPI,
  CompanyBusinessDetails,
  CompanyCityDetails,
  CompanyCountryDetails,
  CompanyPincodeDetails,
  CompanyStateDetails,
  CompanyTaxDetails,
  CompanyUserAddDetails,
  getAddSurchargeData,
  getAllSurchargeCategory,
  getMSurchargeListSer,
  getUsersListSer,
  getUsersPageSer
} from "../../helpers/services/AuthService";
import { getAllTenantLocation, getAllTenantLocationType, postTenantLocation, postTenantLocationType } from "../../helpers/services/GlobalService";
import { Get_File_URL } from "../../helpers/url_helper";
import {
  getFclSurchargeDataFail,
  getFclSurchargeDataSuccess
} from "./actions";
import {
  GET_ALL_COMPANY_SETTINGS,
  GET_ALL_COMPANY_SETTINGS_SUCCESS,
  GET_ALL_SURCHARGE_CATEGORY,
  GET_ALL_SURCHARGE_CATEGORY_SUCCESS,
  GET_ALL_TENANT_LOCATION,
  GET_ALL_TENANT_LOCATION_SUCCESS,
  GET_ALL_TENANT_LOCATION_TYPE,
  GET_ALL_TENANT_LOCATION_TYPE_SUCCESS,
  GET_BUSINESS_DATA,
  GET_BUSINESS_DATA_SUCCESS,
  GET_COMPANYDETAILS_BASIC_DATA,
  GET_COMPANYDETAILS_BASIC_DATA_SUCCESS,
  GET_COMPANY_ADD_USERS_DATA,
  GET_COMPANY_ADD_USERS_DATA_SUCCESS,
  GET_COMPANY_CITY_DATA,
  GET_COMPANY_CITY_DATA_SUCCESS,
  GET_COMPANY_COUNTRY_DATA,
  GET_COMPANY_COUNTRY_DATA_SUCCESS,
  GET_COMPANY_PINCODE_DATA,
  GET_COMPANY_PINCODE_DATA_SUCCESS,
  GET_COMPANY_STATE_DATA,
  GET_COMPANY_STATE_DATA_SUCCESS,
  GET_FCL_SURCHARGE_TABLE_DATA,
  GET_PARTIES_SURCHARGE_TABLE,
  GET_PARTIES_SURCHARGE_TABLE_SUCCESS,
  GET_TAXES_DATA,
  GET_TAXES_DATA_SUCCESS,
  GET_USERS_LOADER_TYPE,
  GET_USERS_TABLE_DATA,
  GET_USERS_TABLE_DATA_SUCCESS,
  POST_M_SURCHARGE_DATA,
  POST_SETTINGS_SURCHARGE_DATA_SUCCESS,
  POST_TENANT_LOCATION,
  POST_TENANT_LOCATION_SUCCESS,
  POST_TENANT_LOCATION_TYPE,
  POST_TENANT_LOCATION_TYPE_SUCCESS
} from "./actiontype";
import { GET_SURCHARGE_CATEGORY_DATA, GET_SURCHARGE_CODE_DATA } from "../Global/actiontype";

function* getUsersData({ payload }) {
  yield put({type: GET_USERS_LOADER_TYPE, payload: true});
  try {
    if(payload){
      const response = yield call(getUsersPageSer, payload);
      yield put({ type: GET_USERS_TABLE_DATA_SUCCESS, payload: response });
      yield put({type: GET_USERS_LOADER_TYPE, payload: false});
    } else {
      const response = yield call(getUsersListSer, payload);
      yield put({ type: GET_USERS_TABLE_DATA_SUCCESS, payload: response });
      yield put({type: GET_USERS_LOADER_TYPE, payload: false});

    }
  } catch (error) {
    yield put({type: GET_USERS_LOADER_TYPE, payload: false});
    console.log(error, "saga user api error");
  }
}

// Adduser in settings
function* getCompanyAddUserData({ payload }) {
  try {
    console.log("payload getCompanyAddUserData", payload);
    const response = yield call(CompanyUserAddDetails, payload);
    showSuccessToast("Add User Successfully");
    yield put({ type: GET_COMPANY_ADD_USERS_DATA_SUCCESS, payload: response.data, });
    const userList = yield call(getUsersListSer);
    yield put({ type: GET_USERS_TABLE_DATA_SUCCESS, payload: userList });
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga Add user ");
  }
}

// function* getCompanyDetailsData(){
//     try {
//         const response = yield call(getCompanyDetails)
//         yield put(getCompanyDetailsDataSuccess(response))
//     } catch (error) {
//         yield put(getCompanyDetailsDataFail(error))
//     }
// }

function* getCompanyDetailsData({ payload }) {
  try {
    console.log("payload getCompanyDetailsData", payload);
    const response = yield call(CompanyBasicDetailsAPI, payload);
    console.log(response, "response of getCompanyDetailsData");
    yield put({
      type: GET_COMPANYDETAILS_BASIC_DATA_SUCCESS,
      payload: response,
    });
    showSuccessToast("Update Comapany Info successfully");
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga login api error");
  }
}

function* getCompanyCityDetails() {
  try {
    // console.log("payload getCompanyCityDetails", payload)
    const response = yield call(CompanyCityDetails);
    // console.log(response, "--respnse");
    yield put({ type: GET_COMPANY_CITY_DATA_SUCCESS, payload: response });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga city api error");
  }
}

// state into company
function* getCompanyStateDetails({ payload: { cityId } }) {
  try {
    // console.log("payload getCompanyCityDetails", payload)
    const response = yield call(() => CompanyStateDetails({ cityId }));
    // console.log(response, "--respnse")
    yield put({ type: GET_COMPANY_STATE_DATA_SUCCESS, payload: response });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga state api error");
  }
}
function* getCompanyCountryDetails({ payload: { cityId } }) {
  try {
    const response = yield call(() => CompanyCountryDetails({ cityId }));
    yield put({ type: GET_COMPANY_COUNTRY_DATA_SUCCESS, payload: response });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga state api error");
  }
}

function* getCompanyPincodeDetails({ payload: { cityId } }) {
  try {
    const response = yield call(() => CompanyPincodeDetails({ cityId }));
    yield put({ type: GET_COMPANY_PINCODE_DATA_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga state api error");
  }
}

// All taxes
function* getCompanyTaxDetails({ payload }) {
  try {
    const response = yield call(CompanyTaxDetails, payload);
    showSuccessToast("Update Tax Info successfully");
    yield put({ type: GET_TAXES_DATA_SUCCESS, payload: response });
  } catch (error) {
    showErrorToast(error?.message);
  }
}

// business type api call
function* getCompanyBusinessDeatilsData({ payload }) {
  try {
    const response = yield call(CompanyBusinessDetails, payload);
    showSuccessToast("Update Business Deatils successfully");
    yield put({ type: GET_BUSINESS_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    showErrorToast(error?.message);
  }
}

// get all company settings
function* getAllCompanySettings() {
  try {
    let authuserData = localStorage.getItem('authUser');
    let tenantId = JSON.parse(authuserData)?.tenantId
    if(tenantId !== undefined){
      
      const response = yield call(CompanyAllDetails, tenantId);

      // logo
      let imageData = response?.logoPath;      
      const base64Encoded = window.btoa(imageData);
      // const resImageData = yield call(GetFileSer, base64Encoded);
  
      if (response !== undefined) {
        response.logo = `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`;
      }
  
      yield put({ type: GET_ALL_COMPANY_SETTINGS_SUCCESS, payload: { ...response } });
      // yield put({ type: GET_ALL_COMPANY_SETTINGS_SUCCESS, payload: { ...response, imageData: resImageData } });
    }
  } catch (error) {
    console.log(error, "saga getAllCompanySettings api error");
  }
}

// parties customer details

// ocean surcharge data
function* getFclSurchargeData() {
  try {
    const response = yield call(getFCLSurcharge);
    yield put(getFclSurchargeDataSuccess(response));
  } catch (error) {
    yield put(getFclSurchargeDataFail(error));
  }
}

// all parties surcharge table api
function* getSurchargeListSaga({ payload }) {
  try {
    const response = yield call(getMSurchargeListSer, payload);
    console.log(response, "reponse into getAllPartiesCompanySettings");
    yield put({ type: GET_PARTIES_SURCHARGE_TABLE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getAllCompanySettings api error");
  }
}

// post add surcharge data
function* postMSurchargeData({ payload }) {
  try {
    console.log("payload getAddSurchargeData", payload);
    const response = yield call(getAddSurchargeData, payload);
    showSuccessToast("Add Surcharge Data successfully");
    yield put({ type: POST_SETTINGS_SURCHARGE_DATA_SUCCESS, payload: response, });
    yield put({type: GET_SURCHARGE_CODE_DATA})
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "Surcharge Data saga");
  }
}

// get surcharge category
function* getSurchargeCategory() {
  try {
    const response = yield call(getAllSurchargeCategory);
    console.log(response, "reponse into getSurchargeCategory");
    yield put({ type: GET_ALL_SURCHARGE_CATEGORY_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getSurchargeCategory api error");
  }
}

function* getAllTenantLocations() {
  try {
    const response = yield call(getAllTenantLocation);
    console.log(response, "reponse into getAllTenantLocation");
    yield put({ type: GET_ALL_TENANT_LOCATION_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getAllTenantLocation api error");
  }
}

function* saveTenantLocation({ payload }) {
  try {
    const response = yield call(postTenantLocation, payload);
    console.log(response, "reponse into saveTenantLocation");
    showSuccessToast("Add Tenant Location Data successfully");
    yield put({ type: POST_TENANT_LOCATION_SUCCESS, payload: response });
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga saveTenantLocation api error");
  }
}

function* getAllTenantLocatonTypes() {
  try {
    const response = yield call(getAllTenantLocationType);
    console.log(response, "reponse into getAllTenantLocatonTypes");
    yield put({ type: GET_ALL_TENANT_LOCATION_TYPE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getAllTenantLocatonTypes api error");
  }
}

function* postTenantLocationTypes({ payload }) {
  try {
    const response = yield call(postTenantLocationType, payload);
    console.log(response, "reponse into postTenantLocationTypes");
    showSuccessToast("Add Tenant Location Type Data successfully");
    yield put({ type: POST_TENANT_LOCATION_TYPE_SUCCESS, payload: response });
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga postTenantLocationTypes api error");
  }
}


export function* watchGetSettingsUsersData() {
  yield takeLatest(GET_USERS_TABLE_DATA, getUsersData);
  yield takeLatest(GET_COMPANY_ADD_USERS_DATA, getCompanyAddUserData);
  yield takeLatest(GET_COMPANYDETAILS_BASIC_DATA, getCompanyDetailsData);
  yield takeLatest(GET_COMPANY_CITY_DATA, getCompanyCityDetails);
  yield takeLatest(GET_COMPANY_STATE_DATA, getCompanyStateDetails);
  yield takeLatest(GET_COMPANY_COUNTRY_DATA, getCompanyCountryDetails);
  yield takeLatest(GET_COMPANY_PINCODE_DATA, getCompanyPincodeDetails);
  yield takeLatest(GET_TAXES_DATA, getCompanyTaxDetails);
  yield takeLatest(GET_BUSINESS_DATA, getCompanyBusinessDeatilsData);
  yield takeLatest(GET_ALL_COMPANY_SETTINGS, getAllCompanySettings);
  yield takeLatest(GET_FCL_SURCHARGE_TABLE_DATA, getFclSurchargeData);
  yield takeLatest(GET_PARTIES_SURCHARGE_TABLE, getSurchargeListSaga);

  yield takeLatest(POST_M_SURCHARGE_DATA, postMSurchargeData);
  yield takeLatest(GET_ALL_SURCHARGE_CATEGORY, getSurchargeCategory);
  yield takeLatest(GET_ALL_TENANT_LOCATION, getAllTenantLocations);
  yield takeLatest(POST_TENANT_LOCATION, saveTenantLocation);
  yield takeLatest(GET_ALL_TENANT_LOCATION_TYPE, getAllTenantLocatonTypes);
  yield takeLatest(POST_TENANT_LOCATION_TYPE, postTenantLocationTypes);
}

function* settingsSaga() {
  yield all([fork(watchGetSettingsUsersData)]);
}

export default settingsSaga;
