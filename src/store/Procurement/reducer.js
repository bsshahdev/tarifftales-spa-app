import { ADD_AIRCONSOLE_DATA, ADD_AIRWAYBILL_DATA, ADD_FCL_DATA, ADD_INLAND_DATA, BLANK_CARRIER_DATA, BLANK_FCL_CARRIER_DATA, BLANK_SURCHARGE_DATA, CONSOLE_FRIGHT_FAILD_DATA_TYPE, CONSOLE_FRIGHT_FAILD_POPUP_TYPE, FCL_FREIGHT_FAILD_DATA_TYPE, FCL_FREIGHT_FAILD_POPUP_TYPE, FCL_FREIGHT_TABLE_DATA_SUCCESS, FCL_INLAND_FAILD_DATA_TYPE, FCL_INLAND_FAILD_POPUP_TYPE, FILTER_FCL_DATA, FILTER_PORTLOCALCHARGES_DATA, GET_AIR_LINE_CHARGES_BY_ID_SUCCESS, GET_AIR_LINE_CHARGES_LOADER, GET_AIR_LINE_CHARGES_SUCCESS, GET_AIR_PORT_LOCAL_CHARGES_BY_ID_SUCCESS, GET_AIR_PORT_LOCAL_CHARGES_LOADER, GET_AIR_PORT_LOCAL_CHARGES_SUCCESS, GET_ALL_CONSOLE_FRIGHT_DETAILS_LOADER, GET_ALL_CONSOLE_FRIGHT_DETAILS_SUCCESS, GET_ALL_MAWB_FRIGHT_DETAILS_LOADER, GET_ALL_MAWB_FRIGHT_DETAILS_SUCCESS, GET_ALL_TENANT_CARGO_MODE_SUCCESS, GET_CONSOLE_TABLE_DATA_FAIL, GET_CONSOLE_TABLE_DATA_LOADER, GET_CONSOLE_TABLE_DATA_SUCCESS, GET_CONSOLE_TABLE_DATA_SUCCESS_BY_ID, GET_FCL_CHARGE_ID, GET_FCL_DESTINATION_DATA_SUCCESS, GET_FCL_FREIGHT_DETAILS_SUCCESS, GET_FCL_FREIGHT_VIEW_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_LOADER, GET_FCL_INLAND_CHARGE_ID, GET_FCL_INLAND_FREIGHT_ACTION_SUCCESS, GET_FCL_INLAND_FREIGHT_LOADER, GET_FCL_INLAND_LOADER, GET_FCL_INLAND_SURCHARGE_ACTION_SUCCESS, GET_FCL_INLAND_SURCHARGE_LOADER, GET_FCL_INLAND_TABLE_DATA_FAIL, GET_FCL_INLAND_TABLE_DATA_SUCCESS, GET_FCL_LOADER, GET_FCL_PLCHARGES_LOADER, GET_FCL_PLCHARGES_RESPONCE, GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, GET_FCL_SURCHARGE_VIEW_LOADER, GET_FCL_TABLE_DATA_FAIL, GET_FCL_TABLE_DATA_SUCCESS, GET_LCL_TABLE_DATA_FAIL, GET_LCL_TABLE_DATA_SUCCESS, GET_PORTLOCALCHARGES_TABLE_DATA_FAIL, GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS, GET_UPLOAD_STATUS_SUCCESS, GET_WAYBILL_TABLE_DATA_BY_ID_RESPONSE, GET_WAYBILL_TABLE_DATA_FAIL, GET_WAYBILL_TABLE_DATA_LOADER, GET_WAYBILL_TABLE_DATA_SUCCESS, MAWB_FRIGHT_FAILD_DATA_TYPE, MAWB_FRIGHT_FAILD_POPUP_TYPE, POST_OCEAN_FRIGHT_DETAILS_SUCCESS, SAVE_CONSOLE_FRIGHT_RP_DATA_SUCCESS, SAVE_MAWB_FRIGHT_RP_DATA_SUCCESS, UPDATE_AIRCONSOLE_SWITCH, UPDATE_AIRWAYBILL_SWITCH, UPDATE_FCL_ACTIVE_TAB, UPDATE_FCL_SWITCH, UPDATE_FCL_TABLE_DATA, UPDATE_INLAND_ACTIVE_TAB, UPDATE_INLAND_SWITCH, UPDATE_LCL_SWITCH } from "./actiontype";

const INIT_STATE = {
    fcl_data: [],
    fcl_get_loader: false,
    fcl_freight_view: [],
    fcl_get_freight_view_loader: false,
    fcl_surcharge_view: [],
    fcl_get_surcharge_view_loader: false,
    fcl_destinationData: [],
    fcl_charge_id: '',
    addFCL: {
        carrierDetails: {
            rate_type: "",
            rate_source: "",
            vendor_name: "",
            validity_from: "",
            validity_to: "",
            vendor_type: { label: "CARRIER", value: "CARRIER" }
        },
        freightUpload: {},
        surcharges: []
    },
    fclActiveTab: 1,
    fclPopup: false,
    fclfaildData: {},
    mawbFaildData: {},
    mawbPopup: false,
    consoleFaildData: {},
    consolePopup: false,
    // FCL INland
    fclInlandData: [],
    fclInlandLoader: false,
    fclInlandFreightView: [],
    fclInlandFreightLoader: false,
    fclInlandSurchargeView: [],
    fclInlandSurchargeLoader: false,
    fcl_Inland_Charge_id: '',
    addInland: {
        carrierDetails: {
            rate_type: '',
            rate_source: '',
            vendor_type: '',
            vendor_name: '',
            validity_from: '',
            validity_to: ''
        },
        freightUpload: {},
        surcharges: []
    },
    inlandError: {},
    fclinlandPopup: false,
    fclinlandfaildData: {},

    portLocalChargesData: [],
    fclplChargesLoader: false,

    lclData: [],
    inlandActiveTab: 1,
    error: {},
    lclError: {},

    waybillData: [],
    wayBillDataLoader: false,
    consoleData: [],
    waybillError: {},
    consoleError: {},
    addAirWaybill: {
        carrierDetails: {
            rate_type: '',
            rate_source: '',
            vendor_type: '',
            vendor_name: '',
            carrier_name: '',
            validity_from: '',
            validity_to: '',
            status: ''
        },
        freightUpload: {},
        surcharges: []
    },
    addAirConsole: {
        carrierDetails: {
            rate_type: '',
            rate_source: '',
            vendor_type: '',
            vendor_name: '',
            carrier_name: '',
            validity_from: '',
            validity_to: '',
            status: ''
        },
        freightUpload: {},
        surcharges: []
    },
    airFreightData: [],
    uploadStatus: [],
    consoleFreightData: [],
    airportLocalChargesData: [],
    airportLocalChargesLoder: false,
    consoleDataLoader: false,
    airLineChargesData: [],
    airLineChargesLoder: false,
    airportLocalChargesDataById: {},
    airLineChargesDataById: {},
    mawbDetailsData: [],
    mawbDetailsDataLoader: false,
    consoleDetailsData: [],
    consoleDetailsDataLoader: false,
    tenantCargoModeData: [],
    mawbData: {},
    consoleData: {},
    fcl_freight_details: {},
    fcl_table_data: {},
    fcl_port_local_data:{}
}
const procurement = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_FCL_TABLE_DATA_SUCCESS:
            return {
                ...state,
                fcl_data: action.payload,
            }
        case GET_FCL_TABLE_DATA_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case GET_FCL_LOADER:
            return {
                ...state,
                fcl_get_loader: action.payload,
            }
        case GET_FCL_CHARGE_ID:
            return {
                ...state,
                fcl_charge_id: action.payload,
            }
        case GET_FCL_PLCHARGES_RESPONCE:
            return {
                ...state,
                fcl_port_local_data: action.payload,
            }
        case GET_FCL_FREIGHT_VIEW_DATA_SUCCESS:
            return {
                ...state,
                fcl_freight_view: action.payload,
            }
        case FCL_FREIGHT_TABLE_DATA_SUCCESS:
            return {
                ...state,
                fcl_table_data: action.payload,
            }
        case GET_FCL_FREIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                fcl_freight_details: action.payload,
            }
        case POST_OCEAN_FRIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                fcl_responce: action.payload
            }
        case GET_FCL_FREIGHT_VIEW_LOADER:
            return {
                ...state,
                fcl_get_freight_view_loader: action.payload,
            }
        case GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS:
            return {
                ...state,
                fcl_surcharge_view: action.payload,
            }
        case GET_FCL_SURCHARGE_VIEW_LOADER:
            return {
                ...state,
                fcl_get_surcharge_view_loader: action.payload,
            }
        case UPDATE_FCL_TABLE_DATA:
            return {
                ...state,
                fcl_data: action.payload,
            }
        case GET_FCL_DESTINATION_DATA_SUCCESS:
            return {
                ...state,
                fcl_destinationData: action.payload.map(item => {
                    return {
                        label: `${item?.code} - ${item?.address}`,
                        value: `${item?.code}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                    }
                }),
            }
        case FCL_FREIGHT_FAILD_DATA_TYPE:
            return {
                ...state,
                fclfaildData: action.payload
            }
        case FCL_FREIGHT_FAILD_POPUP_TYPE:
            return {
                ...state,
                fclPopup: action.payload
            }
        case MAWB_FRIGHT_FAILD_DATA_TYPE:
            return {
                ...state,
                mawbFaildData: action.payload
            }
        case MAWB_FRIGHT_FAILD_POPUP_TYPE:
            return {
                ...state,
                mawbPopup: action.payload
            }
        case CONSOLE_FRIGHT_FAILD_POPUP_TYPE:
            return {
                ...state,
                consolePopup: action.payload
            }
        case CONSOLE_FRIGHT_FAILD_DATA_TYPE:
            return {
                ...state,
                consoleFaildData: action.payload
            }

        case GET_ALL_MAWB_FRIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                mawbDetailsData: action.payload
            }
        case GET_ALL_MAWB_FRIGHT_DETAILS_LOADER:
            return {
                ...state,
                mawbDetailsDataLoader: action.payload
            }

        case GET_ALL_CONSOLE_FRIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                consoleDetailsData: action.payload
            }
        case GET_ALL_CONSOLE_FRIGHT_DETAILS_LOADER:
            return {
                ...state,
                consoleDetailsDataLoader: action.payload
            }

        // fcl inland
        case GET_FCL_INLAND_TABLE_DATA_SUCCESS:
            return {
                ...state,
                fclInlandData: action.payload
            }
        case GET_FCL_INLAND_TABLE_DATA_FAIL:
            return {
                ...state,
                inlandError: action.payload
            }
        case GET_FCL_INLAND_LOADER:
            return {
                ...state,
                fclInlandLoader: action.payload
            }
        case GET_FCL_INLAND_FREIGHT_LOADER:
            return {
                ...state,
                fclInlandFreightLoader: action.payload
            }
        case GET_FCL_INLAND_FREIGHT_ACTION_SUCCESS:
            return {
                ...state,
                fclInlandFreightView: action.payload
            }
        case GET_FCL_INLAND_SURCHARGE_LOADER:
            return {
                ...state,
                fclInlandSurchargeLoader: action.payload
            }
        case GET_FCL_INLAND_SURCHARGE_ACTION_SUCCESS:
            return {
                ...state,
                fclInlandSurchargeView: action.payload
            }
        case GET_FCL_INLAND_CHARGE_ID:
            return {
                ...state,
                fcl_Inland_Charge_id: action.payload
            }
        case FCL_INLAND_FAILD_DATA_TYPE:
            return {
                ...state,
                fclinlandfaildData: action.payload
            }
        case FCL_INLAND_FAILD_POPUP_TYPE:
            return {
                ...state,
                fclinlandPopup: action.payload
            }

        // lcl
        case GET_LCL_TABLE_DATA_SUCCESS:
            return {
                ...state,
                lclData: action.payload,
            }
        case GET_LCL_TABLE_DATA_FAIL:
            return {
                ...state,
                lclError: action.payload,
            }

        // port local charges
        case GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS:
            return {
                ...state,
                portLocalChargesData: action.payload,
            }
        case GET_PORTLOCALCHARGES_TABLE_DATA_FAIL:
            return {
                ...state,
                portLocalChargesData: action.payload,
            }
        case FILTER_PORTLOCALCHARGES_DATA:
            return {
                ...state,
                portLocalChargesData: action.payload,
            }
        case GET_FCL_PLCHARGES_LOADER:
            return {
                ...state,
                fclplChargesLoader: action.payload,
            }
        case GET_AIR_PORT_LOCAL_CHARGES_SUCCESS:
            return {
                ...state,
                airportLocalChargesData: action.payload?.content,
            }
        case GET_AIR_PORT_LOCAL_CHARGES_LOADER:
            return {
                ...state,
                airportLocalChargesLoder: action.payload,
            }
        case GET_AIR_PORT_LOCAL_CHARGES_BY_ID_SUCCESS:
            return {
                ...state,
                airportLocalChargesDataById: action.payload,
            }
        //air line 

        case GET_AIR_LINE_CHARGES_LOADER:
            return {
                ...state,
                airLineChargesLoder: action.payload,
            }
        case GET_AIR_LINE_CHARGES_BY_ID_SUCCESS:
            return {
                ...state,
                airLineChargesDataById: action.payload,
            }
        case GET_AIR_LINE_CHARGES_SUCCESS:
            return {
                ...state,
                airLineChargesData: action.payload?.content,
            }

        // waybill
        case GET_WAYBILL_TABLE_DATA_SUCCESS:
            return {
                ...state,
                waybillData: action.payload
            }
        case SAVE_MAWB_FRIGHT_RP_DATA_SUCCESS:
            return {
                ...state,
                mawbData: action.payload
            }
        case SAVE_CONSOLE_FRIGHT_RP_DATA_SUCCESS:
            return {
                ...state,
                consoleData: action.payload
            }
        case GET_WAYBILL_TABLE_DATA_LOADER:
            return {
                ...state,
                wayBillDataLoader: action.payload
            }
        case GET_CONSOLE_TABLE_DATA_LOADER:
            return {
                ...state,
                consoleDataLoader: action.payload
            }

        case GET_ALL_TENANT_CARGO_MODE_SUCCESS:
            return {
                ...state,
                tenantCargoModeData: action.payload.content?.map((item) => {
                    return {
                        label: item?.description.split('_').join(' '),
                        value: item?.code,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version
                    }
                })
            }

        case GET_WAYBILL_TABLE_DATA_FAIL:
            return {
                ...state,
                waybillError: action.payload
            }
        case GET_CONSOLE_TABLE_DATA_SUCCESS:
            return {
                ...state,
                consoleData: action.payload
            }
        case GET_CONSOLE_TABLE_DATA_FAIL:
            return {
                ...state,
                consoleError: action.payload
            }
        case UPDATE_FCL_ACTIVE_TAB:
            return {
                ...state,
                fclActiveTab: action.payload.tab
            }
        case UPDATE_INLAND_ACTIVE_TAB:
            return {
                ...state,
                inlandActiveTab: action.payload.tab
            }
        case ADD_FCL_DATA:
            return {
                ...state,
                addFCL: {
                    ...state.addFCL,
                    [action.payload.name]: action.payload.data
                }
            }

        case ADD_INLAND_DATA:
            console.log("action", action.payload.name);
            return {
                ...state,
                addInland: {
                    ...state.addInland,
                    [action.payload.name]: action.payload.data
                }
            }

        case ADD_AIRWAYBILL_DATA:
            return {
                ...state,
                addAirWaybill: {
                    ...state.addAirWaybill,
                    [action.payload.name]: action.payload.data
                }
            }

        case ADD_AIRCONSOLE_DATA:
            return {
                ...state,
                addAirConsole: {
                    ...state.addAirConsole,
                    [action.payload.name]: action.payload.data
                }
            }

        case BLANK_CARRIER_DATA:
            return {
                ...state,
                addFCL: {
                    ...state.addFCL,
                    carrierDetails: {
                        rate_type: '',
                        rate_source: '',
                        vendor_type: '',
                        vendor_name: '',
                        validity_application: '',
                        validity_from: '',
                        validity_to: ''
                    }
                }
            }
        case BLANK_FCL_CARRIER_DATA:
            return {
                ...state,
                [action.payload.name]: action.payload.data
            }
        case BLANK_SURCHARGE_DATA:
            return {
                ...state,
                [action.payload.name]: action.payload.data
            }

        case UPDATE_FCL_SWITCH:
            const { fcl_id, fcl_is_active } = action.payload;
            const updatedFCLItems = state.fcl_data.map(item =>
                item.id === fcl_id ? { ...item, is_active: !fcl_is_active } : item
            );
            return { ...state, fcl_data: updatedFCLItems };

        case UPDATE_LCL_SWITCH:
            const { lcl_id, lcl_is_active } = action.payload;
            const updatedLCLItems = state.lclData.map(item =>
                item.id === lcl_id ? { ...item, is_active: !lcl_is_active } : item
            );
            return { ...state, lclData: updatedLCLItems };

        case UPDATE_AIRWAYBILL_SWITCH:
            const { id, is_active } = action.payload;
            const updatedItems = state.waybillData.map(item =>
                item.id === id ? { ...item, is_active: !is_active } : item
            );
            return { ...state, waybillData: updatedItems };

        case UPDATE_AIRCONSOLE_SWITCH:
            const { console_id, console_is_active } = action.payload;
            const updatedConsoleItems = state.consoleData.map(item =>
                item.id === console_id ? { ...item, is_active: !console_is_active } : item
            );
            return { ...state, consoleData: updatedConsoleItems };

        case UPDATE_INLAND_SWITCH:
            const { inland_id, inland_is_active } = action.payload;
            const updatedInlandItems = state.fclInlandData.map(item =>
                item.id === inland_id ? { ...item, is_active: !inland_is_active } : item
            );
            return { ...state, fclInlandData: updatedInlandItems };

        case GET_WAYBILL_TABLE_DATA_BY_ID_RESPONSE:
            return {
                ...state,
                airFreightData: action.payload
            }

        case GET_CONSOLE_TABLE_DATA_SUCCESS_BY_ID:
            return {
                ...state,
                consoleFreightData: action.payload
            }

        case GET_UPLOAD_STATUS_SUCCESS:
            return {
                ...state,
                uploadStatus: action.payload
            }

        default:
            return state;
    }
}

export default procurement;

const getDistinctObjects = (arr, fields) => {
    const seen = new Set();
    return arr.filter(item => {
        const key = fields.map(field => item[field]).join('|');
        return seen.has(key) ? false : seen.add(key);
    });
};