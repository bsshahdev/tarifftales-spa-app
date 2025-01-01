import axios from "axios";
import * as url from "../url_helper"
import axiosInstance, { get, post } from "../api_helper";

export async function LoginAPI(dataObj) {
    return axiosInstance({
        method: 'POST',
        url: url.LOGIN_API,
        headers: {
            ...dataObj,
        }
    }).then(response => response)
}

export const CompanyBasicDetailsAPI = data => {
   
    return post(url.COMPANY_BASIC_DETAILS, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const getUsersListSer = () => get(url.COMPANY_USER_DETAILS)
export const getUsersPageSer = (data) => get(url.COMPANY_USER_DETAILS + data)
export const CompanyUserAddDetails = data => {
    return post((url.COMPANY_USER_ADD_DETAILS), data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const CompanyCityDetails = () => get(url.COMPANY_CITY_DETAILS)
export const CompanyStateDetails = ({ cityId }) => get(`${url.COMPANY_STATE_DETAILS}?cityId=${cityId}`)
export const CompanyCountryDetails = ({ cityId }) => get(`${url.COMPANY_COUNTRY_DETAILS}?cityId=${cityId}`)
export const CompanyPincodeDetails = ({ cityId }) => get(`${url.COMPANY_PINCODE_DETAILS}?cityId=${cityId}`)

export const CompanyTaxDetails = (data) => post(url.COMPANY_TAX_DETAILS, data);
export const CompanyBusinessDetails = (data) => post(url.COMPANY_BUSINESS_DETAILS, data);


// GET ALL company settings
export const CompanyAllDetails = (userId) => get(url.COMPANY_GET_ALL_DETAILS + userId);

// get all parties into surcharge table data
export const getMSurchargeListSer = (data) => get(url.GET_M_SURCHARGE_API + data);

// POST ADD data in surcharge table
export const getAddSurchargeData = data => {
    return post(url.GET_SURCHARGE_ADD_DATA, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// get surcharge category
export const getAllSurchargeCategory = () => {
    return get(url.GET_SURCHARGE_CATEGORY, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

// customers employeee data
export const getAllPartiesCustomerEmployeeDeatils = () => {
    return get(url.GET_PARTIES_CUSTOMERS_EMPLOYEE_DETAILS, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}


