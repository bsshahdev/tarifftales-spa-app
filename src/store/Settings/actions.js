import { GET_ALL_COMPANY_SETTINGS, GET_ALL_SURCHARGE_CATEGORY, GET_ALL_TENANT_LOCATION, GET_ALL_TENANT_LOCATION_TYPE, GET_BUSINESS_DATA, GET_COMPANYDETAILS_BASIC_DATA, GET_COMPANYDETAILS_BASIC_DATA_FAIL, GET_COMPANYDETAILS_BASIC_DATA_SUCCESS, GET_COMPANY_ADD_USERS_DATA, GET_COMPANY_CITY_DATA, GET_COMPANY_COUNTRY_DATA, GET_COMPANY_PINCODE_DATA, GET_COMPANY_STATE_DATA, GET_FCL_SURCHARGE_TABLE_DATA, GET_FCL_SURCHARGE_TABLE_DATA_FAIL, GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS, GET_PARTIES_SURCHARGE_TABLE, GET_TAXES_DATA, GET_USERS_TABLE_DATA, GET_USERS_TABLE_DATA_FAIL, GET_USERS_TABLE_DATA_SUCCESS, POST_M_SURCHARGE_DATA, POST_TENANT_LOCATION, POST_TENANT_LOCATION_TYPE, UPDATE_USER_SWITCH } from "./actiontype"
// --------------------------- User Master

export const getUsersData = (data) => {
    return {
        type: GET_USERS_TABLE_DATA,
        payload: data,
    }
}

export const getUsersDataSuccess = (data) => ({
    type: GET_USERS_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getUsersDataFail = (error) => ({
    type: GET_USERS_TABLE_DATA_FAIL,
    payload: error,
})

// add user in settings
export const addUsersData = (data) => {
    console.log(data, "data addUsersData")
    return ({
        type: GET_COMPANY_ADD_USERS_DATA,
        payload: data,
    })
}

export const updateUserSwitchData = (user_id, user_is_active) => ({
    type: UPDATE_USER_SWITCH,
    payload: {
        user_id,
        user_is_active
    }
})

// -------------------------------- company details

export const postSettingsCompanyDetailsAction = (data) => {
    return {
        type: GET_COMPANYDETAILS_BASIC_DATA,
        payload: data,
    }
}

export const getCompanyDetailsDataSuccess = (data) => ({
    type: GET_COMPANYDETAILS_BASIC_DATA_SUCCESS,
    payload: data,
})

export const getCompanyDetailsDataFail = (error) => ({
    type: GET_COMPANYDETAILS_BASIC_DATA_FAIL,
    payload: error,
})

// ----cITYcode 
export const getCompanyCityData = (data) => {
    // console.log(data, "data getCompanyCityData")
    return {
        type: GET_COMPANY_CITY_DATA,
        payload: data,
    }
}
export const getCompanyStateData = (data) => {
    // console.log(data, "data getCompanyCityData")
    return {
        type: GET_COMPANY_STATE_DATA,
        payload: data,
    }
}
export const getCompanyCountryData = (data) => {
    // console.log(data, "data getCompanyCountryData")
    return {
        type: GET_COMPANY_COUNTRY_DATA,
        payload: data,
    }
}

export const getCompanyPincodeData = (data) => {
    // console.log(data, "data getCompanyCountryData")
    return {
        type: GET_COMPANY_PINCODE_DATA,
        payload: data,
    }
}

// Taxdetails table Data

export const getTaxDetailsData = (data) => {
    console.log(data, "data getTaxDetailsData")
    return {
        type: GET_TAXES_DATA,
        payload: data,
    }
}

// Business Table Data

export const getBusinessData = (data) => {
    console.log(data, "data---getBusinessData")
    return {
        type: GET_BUSINESS_DATA,
        payload: data
    }
}

// ALl get company details
export const getTenantInfoData = (data) => {
    return {
        type: GET_ALL_COMPANY_SETTINGS,
        payload: data,
    }
}

// --------------------------------- surcharge fcl table

export const getFclSurchargeData = (data) => {
    return {
        type: GET_FCL_SURCHARGE_TABLE_DATA,
        payload: data,
    }
}

export const getFclSurchargeDataSuccess = (data) => ({
    type: GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getFclSurchargeDataFail = (error) => ({
    type: GET_FCL_SURCHARGE_TABLE_DATA_FAIL,
    payload: error,
})

// all table in sucharge table
export const getAllTableSurcharge = (data) => {
    return {
        type: GET_PARTIES_SURCHARGE_TABLE,
        payload: data
    }
}

// add data in surcharge
export const postMSurchargeData = (data) => {
    return {
        type: POST_M_SURCHARGE_DATA,
        payload: data
    }
}

// all get category
export const getAllSurchargeCategoryData = (data) => {
    return {
        type: GET_ALL_SURCHARGE_CATEGORY,
        payload: data
    }
}

// all get tanent locations

export const getAllTenantLocationData = (data) => {
    return {
        type: GET_ALL_TENANT_LOCATION,
        payload: data
    }
}

export const postTenantLocation = (data) => {
    return {
        type: POST_TENANT_LOCATION,
        payload: data
    }
}


// get all tenant locations types
export const getAllTenantLocationType = (data) => {
    return {
        type: GET_ALL_TENANT_LOCATION_TYPE,
        payload: data
    }
}

export const postTenantLocationType = (data) => {

    return {
        type: POST_TENANT_LOCATION_TYPE,
        payload: data
    }
}