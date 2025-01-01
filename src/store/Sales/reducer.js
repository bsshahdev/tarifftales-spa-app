import { FILTER_QUOTATION_DATA, GET_INQUIRY_CUSTOMER_SUMMARY_DATA_SUCCESS, GET_INQUIRY_DATA_FAIL, GET_INQUIRY_DATA_LOADER, GET_INQUIRY_DATA_SUCCESS, GET_INQUIRY_EXPORT_SUMMARY_DATA_SUCCESS, GET_INQUIRY_IMPORT_SUMMARY__DATA_SUCCESS, GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA_SUCCESS, GET_INQUIRY_SUMMARY_DATA_SUCCESS, GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS, SEARCH_QUOTATION_BLANK, UPDATE_CONTAINERTYPE_CONFIRM, UPDATE_CONTAINER_CHANGE, UPDATE_SEARCH_QUOTATION_DATA, UPDATE_SEARCH_QUOTATION_DATE, UPDATE_SEARCH_QUOTATION_SWAP, UPDATE_VALUE_BLANK } from "./actiontype"


const INIT_STATE = {
    quotation_data: [],
    quotation_error: {},
    createFields: {
        // customer_name: '',
        // service_type: '',
        // incoterm: '',
        shipping_by: '',
        container_type: '',
        cargo_weight: { weight: "MT", value: '' },
        cargo_type: '',
        cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
        cargo_date: '',
        location_from: '',
        location_to: '',
    },

    inquiry_data: [],
    inquiry_error: [],
    inquiry_export_data: [],
    inquiry_import_data: [],
    inquiry_customer_data: [],
    inquiry_summary_data: [],
    inquiry_sales_customer_data:[],
    inquiry_data_loader:false
}

const sales = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_QUOTATION_DATA_SUCCESS:
            return { ...state, quotation_data: action.payload }
        case FILTER_QUOTATION_DATA:
            return { ...state, quotation_data: action.payload }

        case GET_INQUIRY_CUSTOMER_SUMMARY_DATA_SUCCESS:
            return { ...state, inquiry_customer_data: action.payload }

        case GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA_SUCCESS:
            return { ...state, inquiry_sales_customer_data: action.payload }

        case GET_INQUIRY_EXPORT_SUMMARY_DATA_SUCCESS:
            return { ...state, inquiry_export_data: action.payload }

        case GET_INQUIRY_IMPORT_SUMMARY__DATA_SUCCESS:
            return { ...state, inquiry_import_data: action.payload }

        case GET_INQUIRY_SUMMARY_DATA_SUCCESS:
            return { ...state, inquiry_summary_data: action.payload }

        case GET_QUOTATION_DATA_FAIL:
            return { ...state, quotation_error: action.payload }

        case UPDATE_SEARCH_QUOTATION_DATA:
            const { item, name } = action.payload
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    [name]: item
                }
            }

        case UPDATE_SEARCH_QUOTATION_DATE:
            const { arrItem } = action.payload
            let newObj = {
                ...state,
                createFields: {
                    ...state.createFields,
                    cargo_date: [...arrItem],
                }
            }
            return state = newObj

        case UPDATE_SEARCH_QUOTATION_SWAP:
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    location_to: state.createFields.location_from,
                    location_from: state.createFields.location_to
                }
            }

        case UPDATE_CONTAINERTYPE_CONFIRM:
            return state = {
                ...state,
                createFields: {
                    ...state.createFields,
                    container_type: action.payload,
                }
            }
        case UPDATE_CONTAINER_CHANGE:
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    container_type: action.payload
                }
            }
        case UPDATE_VALUE_BLANK:
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    [action.payload]: ''
                }
            }

        case SEARCH_QUOTATION_BLANK:
            return {
                ...state,
                createFields: {
                    shipping_by: '',
                    cargo_type: '',
                    cargo_weight: { weight: "MT", value: '' },
                    container_type: '',
                    cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
                    cargo_date: '',
                    location_from: '',
                    location_to: '',
                },
            }

        // inquiry
        case GET_INQUIRY_DATA_SUCCESS:
            return { ...state, inquiry_data: action.payload }

        case GET_INQUIRY_DATA_LOADER:
        return { ...state, inquiry_data_loader: action.payload }

        case GET_INQUIRY_DATA_FAIL:
            return { ...state, inquiry_data: action.payload }

        default:
            return state;
    }
}

export default sales