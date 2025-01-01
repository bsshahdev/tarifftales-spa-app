import { ADD_AIRCONSOLE_DATA, ADD_AIRWAYBILL_DATA, ADD_FCL_DATA, ADD_INLAND_DATA, GET_AIR_LINE_CHARGES_BY_ID, GET_AIR_LINE_CHARGES_DATA, GET_AIR_PORT_LOCAL_CHARGES_BY_ID, GET_AIR_PORT_LOCAL_CHARGES_DATA, GET_ALL_CONSOLE_FRIGHT_DETAILS, GET_ALL_MAWB_FRIGHT_DETAILS, GET_ALL_TENANT_CARGO_MODE, GET_CONSOLE_TABLE_DATA, GET_CONSOLE_TABLE_DATA_BY_ID, GET_CONSOLE_TABLE_DATA_FAIL, GET_CONSOLE_TABLE_DATA_SUCCESS, GET_CONSOLE_TABLE_DATA_SUCCESS_BY_ID, GET_FCL_CURRENT_VERSION_TYPE, GET_FCL_DESTINATION_DATA, GET_FCL_FREIGHT_VIEW_DATA, GET_FCL_INLAND_FREIGHT_ACTION, GET_FCL_INLAND_SURCHARGE_ACTION, GET_FCL_INLAND_TABLE_DATA, GET_FCL_INLAND_TABLE_DATA_FAIL, GET_FCL_INLAND_TABLE_DATA_SUCCESS, GET_FCL_OCEAN_SURCHARGES_DETAILS, GET_FCL_SURCHARGE_VIEW_DATA, GET_FCL_TABLE_DATA, GET_FCL_TABLE_DATA_FAIL, GET_FCL_TABLE_DATA_SUCCESS, GET_LCL_TABLE_DATA, GET_LCL_TABLE_DATA_FAIL, GET_LCL_TABLE_DATA_SUCCESS, GET_OCEAN_FRIGHT_DETAILS, GET_OCEAN_FRIGHT_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA_FAIL, GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS, GET_UPLOAD_STATUS, GET_UPLOAD_STATUS_SUCCESS, GET_WAYBILL_TABLE_DATA, GET_WAYBILL_TABLE_DATA_BY_ID, GET_WAYBILL_TABLE_DATA_BY_ID_RESPONSE, GET_WAYBILL_TABLE_DATA_FAIL, GET_WAYBILL_TABLE_DATA_SUCCESS, POST_CARRIER_DATA, POST_CARRIER_DATA_CONSOLE, POST_FCL_OCEAN_SURCHARGES, POST_OCEAN_FCL_SURCHARGE_DETAILS, POST_OCEAN_FRIGHT_DETAILS, POST_OCEAN_SURCHARGES, SAVE_CONSOLE_FRIGHT_RP_DATA, SAVE_MAWB_FRIGHT_RP_DATA, UPDATE_AIRCONSOLE_SWITCH, UPDATE_AIRWAYBILL_SWITCH, UPDATE_FCL_ACTIVE_TAB, UPDATE_FCL_SWITCH, UPDATE_FCL_TABLE_DATA, UPDATE_INLAND_ACTIVE_TAB, UPDATE_INLAND_SWITCH, UPDATE_LCL_SWITCH, UPLOAD_AIR_LINE_DATA, UPLOAD_AIR_PORT_LOCAL_DATA, UPLOAD_FCL_CARRIER_DATA, UPLOAD_FCL_FREIGHT, UPLOAD_FCL_FREIGHT_V2, UPLOAD_FCL_INLAND_CARRIER_DATA, UPLOAD_FCL_INLAND_FREIGHT_DATA, UPLOAD_FCL_INLAND_SURCHARGE_DATA, UPLOAD_FCL_PORTLOCALCHARGES, UPLOAD_FCL_SURCHARGE } from "./actiontype";


export const getFclData = (data) => ({
    type: GET_FCL_TABLE_DATA,
    payload: data,
})
export const getFclFreightViewAction = (data) => {
    return {
        type: GET_FCL_FREIGHT_VIEW_DATA,
        payload: data,
    }
}
export const getFclSurchargeViewAction = (data) => {
    return {
        type: GET_FCL_SURCHARGE_VIEW_DATA,
        payload: data,
    }
}
export const getFclDestinationAction = (data) => {
    return {
        type: GET_FCL_DESTINATION_DATA,
        payload: { data },
    }
}

export const updateFclData = (data) => ({
    type: UPDATE_FCL_TABLE_DATA,
    payload: data,
})

export const getFclDataSuccess = (data) => ({
    type: GET_FCL_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getFclDataFail = (error) => ({
    type: GET_FCL_TABLE_DATA_FAIL,
    payload: error,
})

export const uploadFclCarrierData = (dataObj) => {
    return {
        type: UPLOAD_FCL_CARRIER_DATA,
        payload: { dataObj }
    }
}
export const uploadFclFrightData = (formData, id) => {
    return {
        type: UPLOAD_FCL_FREIGHT,
        payload: { formData, id }
    }
}

export const uploadFclFrightDataV1 = (formData) => {
    return {
        type: UPLOAD_FCL_FREIGHT_V2,
        payload: { formData }
    }
}

export const getOceanDetails = (data) => ({
    type: GET_OCEAN_FRIGHT_DETAILS,
    payload: { data }
})

export const postOceanDetails = (data) => ({
    type: POST_OCEAN_FRIGHT_DETAILS,
    payload: { data }
})

export const postFclOceanSurcharges = (data) => ({
    type: POST_FCL_OCEAN_SURCHARGES,
    payload: { data }
})

export const getOceanTableData = (data) => ({
    type: GET_OCEAN_FRIGHT_TABLE_DATA,
    payload: { data }
})

export const getFclSurchargeViewDetails = (data) => {
    return {
        type: GET_FCL_OCEAN_SURCHARGES_DETAILS,
        payload: { data },
    }
}
export const PostFclSurchargeViewDetails = (data) => {
    return {
        type: POST_OCEAN_FCL_SURCHARGE_DETAILS,
        payload: { data },
    }
}
export const uploadFclSurchargeData = (data, id) => {
    return {
        type: UPLOAD_FCL_SURCHARGE,
        payload: { data, id }
    }
}
export const getFCLCurrVersionAction = (data) => ({
    type: GET_FCL_CURRENT_VERSION_TYPE,
    payload: data
})

// oceanFreight/lcl
export const getLclData = (data) => ({
    type: GET_LCL_TABLE_DATA,
    payload: data,
})

export const getLclDataSuccess = (data) => ({
    type: GET_LCL_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getLclDataFail = (error) => ({
    type: GET_LCL_TABLE_DATA_FAIL,
    payload: error,
})
export const updatefclSwitchData = (fcl_id, fcl_is_active) => ({
    type: UPDATE_FCL_SWITCH,
    payload: {
        fcl_id,
        fcl_is_active
    }
})
// oceanFreight/port local charges
export const getPortLocalChargesData = (data) => ({
    type: GET_PORTLOCALCHARGES_TABLE_DATA,
    payload: data,
})

export const getPortLocalChargesDataSuccess = (data) => ({
    type: GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getPortLocalChargesDataFail = (error) => ({
    type: GET_PORTLOCALCHARGES_TABLE_DATA_FAIL,
    payload: error,
})
export const postPortLocalChargesData = (dataObj) => {
    return {
        type: UPLOAD_FCL_PORTLOCALCHARGES,
        payload: { dataObj },
    }
}

//air port local charges
export const getAIrPortLocalChargesData = (data) => ({
    type: GET_AIR_PORT_LOCAL_CHARGES_DATA,
    payload: data,
})
export const postAirPortLocalChargesData = (dataObj) => {
    return {
        type: UPLOAD_AIR_PORT_LOCAL_DATA,
        payload: { dataObj },
    }
}
export const getAirPortLocalChargesById = (id) => {
    return {
        type: GET_AIR_PORT_LOCAL_CHARGES_BY_ID,
        payload: { id },
    }
}

// air line charges
export const getAIrlineChargesData = (data) => ({
    type: GET_AIR_LINE_CHARGES_DATA,
    payload: data,
})
export const postAirlineChargesData = (dataObj) => {
    return {
        type: UPLOAD_AIR_LINE_DATA,
        payload: { dataObj },
    }
}
export const getAirlineChargesDataById = (id) => {
    return {
        type: GET_AIR_LINE_CHARGES_BY_ID,
        payload: { id },
    }
}

// TENANT CARGO MODE
export const getTenantCargoModeData = (data) => ({
    type: GET_ALL_TENANT_CARGO_MODE,
    payload: data,
})

// FCL Inland Actions
export const uploadFclInlandCarrierAction = (dataObj) => {
    return {
        type: UPLOAD_FCL_INLAND_CARRIER_DATA,
        payload: { dataObj }
    }
}
export const uploadFclInlandFreightAction = (formData, id) => {
    return {
        type: UPLOAD_FCL_INLAND_FREIGHT_DATA,
        payload: { formData, id }
    }
}
export const uploadFclInlandSurchargeAction = (data) => {
    return {
        type: UPLOAD_FCL_INLAND_SURCHARGE_DATA,
        payload: { data }
    }
}

//---------------
export const updateFCLActiveTab = (tab) => ({
    type: UPDATE_FCL_ACTIVE_TAB,
    payload: {
        tab
    }
})
export const updateInlandActiveTab = (tab) => ({
    type: UPDATE_INLAND_ACTIVE_TAB,
    payload: {
        tab
    }
})

export const addFCLData = (name, data) => ({
    type: ADD_FCL_DATA,
    payload: {
        name, data
    }
})

export const addAirwaybillData = (name, data) => ({
    type: ADD_AIRWAYBILL_DATA,
    payload: {
        name, data
    }
})

export const addAirConsoleData = (name, data) => ({
    type: ADD_AIRCONSOLE_DATA,
    payload: {
        name, data
    }
})

export const addInlandData = (name, data) => ({
    type: ADD_INLAND_DATA,
    payload: {
        name, data
    }
})

export const postCarrierData = (dataObj) => {
    return {
        type: POST_CARRIER_DATA,
        payload: { dataObj }
    }
}

export const postconsoleCarrierDetails = (dataObj) => {
    return {
        type: POST_CARRIER_DATA_CONSOLE,
        payload: { dataObj }
    }
}

export const updatelclSwitchData = (lcl_id, lcl_is_active) => ({
    type: UPDATE_LCL_SWITCH,
    payload: {
        lcl_id,
        lcl_is_active
    }
})
// mawb
export const postMawbFrightRpDetails = (data) => {
    return {
        type: SAVE_MAWB_FRIGHT_RP_DATA,
        payload: { data }
    }
}
export const getAirwaybillData = (data) => ({
    type: GET_WAYBILL_TABLE_DATA,
    payload: data
})
export const getAirwaybillDataSuccess = (data) => ({
    type: GET_WAYBILL_TABLE_DATA_SUCCESS,
    payload: data
})
export const getAirwaybillDataFail = (error) => ({
    type: GET_WAYBILL_TABLE_DATA_FAIL,
    payload: error
})
export const updateAirwaybillSwitchData = (id, is_active) => ({
    type: UPDATE_AIRWAYBILL_SWITCH,
    payload: {
        id,
        is_active
    }
})


export const getAirwaybillDataById = (id) => ({
    type: GET_WAYBILL_TABLE_DATA_BY_ID,
    payload: { id }
})

export const getAirwaybillDataByIdResponse = (data) => ({
    type: GET_WAYBILL_TABLE_DATA_BY_ID_RESPONSE,
    payload: data
})

export const getAirMawbDetails = (data) => ({
    type: GET_ALL_MAWB_FRIGHT_DETAILS,
    payload: { data }
})

// console
export const postConsoleFrightRpDetails = (data) => {
    return {
        type: SAVE_CONSOLE_FRIGHT_RP_DATA,
        payload: { data }
    }
}
export const getAirConsoleDetails = (data) => ({
    type: GET_ALL_CONSOLE_FRIGHT_DETAILS,
    payload: { data }
})

export const getAirConsoleData = (data) => ({
    type: GET_CONSOLE_TABLE_DATA,
    payload: data
})
export const getAirConsoleDataSuccess = (data) => ({
    type: GET_CONSOLE_TABLE_DATA_SUCCESS,
    payload: data
})

export const getAirConsoleDataById = (id) => ({
    type: GET_CONSOLE_TABLE_DATA_BY_ID,
    payload: { id }
})

export const getAirConsoleDataSuccessById = (data) => ({
    type: GET_CONSOLE_TABLE_DATA_SUCCESS_BY_ID,
    payload: data
})

export const getAirConsoleDataFail = (error) => ({
    type: GET_CONSOLE_TABLE_DATA_FAIL,
    payload: error
})
export const updateAirConsoleSwitchData = (console_id, console_is_active) => ({
    type: UPDATE_AIRCONSOLE_SWITCH,
    payload: {
        console_id, console_is_active
    }
})

export const getInLandData = (data) => ({
    type: GET_FCL_INLAND_TABLE_DATA,
    payload: data
})
export const getInLandDataSuccess = (data) => ({
    type: GET_FCL_INLAND_TABLE_DATA_SUCCESS,
    payload: data
})
export const getInLandDataFail = (error) => ({
    type: GET_FCL_INLAND_TABLE_DATA_FAIL,
    payload: error
})
export const getInLandFreightAction = (id) => ({
    type: GET_FCL_INLAND_FREIGHT_ACTION,
    payload: { id }
})
export const getInLandSurchargeAction = (id) => ({
    type: GET_FCL_INLAND_SURCHARGE_ACTION,
    payload: { id }
})

export const updateInLandSwitchData = (inland_id, inland_is_active) => ({
    type: UPDATE_INLAND_SWITCH,
    payload: {
        inland_id, inland_is_active
    }
})
export const getUploadData = () => ({
    type: GET_UPLOAD_STATUS
})
export const getUploadDataSuccess = (data) => ({
    type: GET_UPLOAD_STATUS_SUCCESS,
    payload: data
})