import { GET_CUSTOMERS_ID, GET_CUSTOMER_BY_ID_SUCCESS, GET_CUSTOMER_LOADER, GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS } from "./actiontype";

const INIT_STATE = {
    customer_data: [],
    customer_loader: false,
    customer_id: {},
    customer_data_by_id:{},
};
const customer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS:
            return {
                ...state,
                customer_data: action.payload,
            };
        case GET_CUSTOMER_LOADER:
            return {
                ...state,
                customer_loader: action.payload,
            };
        case GET_CUSTOMERS_ID:
            return {
                ...state,
                customer_id: action.payload,
            };
            case GET_CUSTOMER_BY_ID_SUCCESS:
            return {
                ...state,
                customer_data_by_id: action.payload,
            };

        default:
            return state;
    }
}

export default customer;