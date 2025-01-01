import { GET_CUSTOMERS_ID, GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS, GET_VENDOR_BY_ID_SUCCESS, GET_VENDOR_CARRIER_DETAILS_SUCCESS, GET_VENDOR_DATA_LIST_SUCCESS, GET_VENDOR_DETAILS_ID, GET_VENDOR_LIST_SUCCESS, VENDOR_LOADER_TYPE, VENDOR_TAB_ACTIVE_TYPE } from "./actiontype";

const INIT_STATE = {
    vendors_data: [],
    vendor_loader: false,
    vendor_id: {},
    vendor_data_by_id: {},
    vendor_active_Tab: {
        tab: 1,
        details: 'pending',
        contact: 'pending',
        document: 'pending',
    },
    vendor_carrier_data: {},
    vendors_data_list: {}
};
const vendor = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_VENDOR_LIST_SUCCESS:
            return {
                ...state,
                vendors_data: action.payload,
            };
        case GET_VENDOR_DATA_LIST_SUCCESS:
            return {
                ...state,
                vendors_data_list: action.payload,
            };
        case VENDOR_LOADER_TYPE:
            return {
                ...state,
                vendor_loader: action.payload,
            };
        case GET_VENDOR_DETAILS_ID:
            return {
                ...state,
                vendor_id: action.payload,
            };
        case VENDOR_TAB_ACTIVE_TYPE:
            return {
                ...state,
                vendor_active_Tab: action.payload,
            };
        case GET_VENDOR_BY_ID_SUCCESS:
            return {
                ...state,
                vendor_data_by_id: action.payload,
            };
        case GET_VENDOR_CARRIER_DETAILS_SUCCESS:
            return {
                ...state,
                vendor_carrier_data: action.payload
            }

        default:
            return state;
    }
}

export default vendor;