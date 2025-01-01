import {
  GET_CUSTOMERS_TABLE_DATA_FAIL,
  GET_CUSTOMERS_TABLE_DATA_SUCCESS,
  GET_PARTIES_ALL_DETAILS_FAIL,
  GET_PARTIES_ALL_DETAILS_SUCCESS,
  GET_PARTIES_COMPANY_CITY_DATA_FAIL,
  GET_PARTIES_COMPANY_CITY_DATA_SUCCESS,
  GET_PARTIES_COMPANY_COUNTRY_DATA_FAIL,
  GET_PARTIES_COMPANY_COUNTRY_DATA_SUCCESS,
  GET_PARTIES_COMPANY_PINCODE_DATA_FAIL,
  GET_PARTIES_COMPANY_PINCODE_DATA_SUCCESS,
  GET_PARTIES_COMPANY_STATE_DATA_FAIL,
  GET_PARTIES_COMPANY_STATE_DATA_SUCCESS,
  GET_PARTIES_CUSTOMERS_DETAILS_FAIL,
  GET_PARTIES_CUSTOMERS_DETAILS_SUCCESS,
  GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS_FAIL,
  GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS_SUCCESS,
  GET_VENDORS_TABLE_DATA_FAIL,
  GET_VENDORS_TABLE_DATA_SUCCESS,
  UPDATE_CUSTOMER_SWITCH,
  UPDATE_VENDOR_SWITCH
} from "./actiontype";

const INIT_STATE = {
  parties_customers_data: [],
  parties_vendors_data: [],
  parties_customers_details: [],
  parties_city_details: [],
  parties_state_details: [],
  parties_country_details: [],
  parties_pincode_details: [],
  parties_all_details: [],
  parties_all_employee_details: [],
  parties_vendors_details: [],  
  vendor_loader: false,
  vendor_id: {},
};

const parties = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_TABLE_DATA_SUCCESS:
      return {
        ...state,
        parties_customers_data: action.payload,
      };

    case GET_CUSTOMERS_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // add Basic company details
    case GET_PARTIES_CUSTOMERS_DETAILS_SUCCESS:
      return {
        ...state,
        parties_customers_details: action.payload,
      };

    case GET_PARTIES_CUSTOMERS_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // city get in parties
    case GET_PARTIES_COMPANY_CITY_DATA_SUCCESS:
      return {
        ...state,
        parties_city_details: action.payload,
      };

    case GET_PARTIES_COMPANY_CITY_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // state api
    case GET_PARTIES_COMPANY_STATE_DATA_SUCCESS:
      return {
        ...state,
        parties_state_details: action.payload,
      };

    case GET_PARTIES_COMPANY_STATE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // country api

    case GET_PARTIES_COMPANY_COUNTRY_DATA_SUCCESS:
      return {
        ...state,
        parties_country_details: action.payload,
      };

    case GET_PARTIES_COMPANY_COUNTRY_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PARTIES_COMPANY_PINCODE_DATA_SUCCESS:
      return {
        ...state,
        parties_pincode_details: action.payload,
      };

    case GET_PARTIES_COMPANY_PINCODE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // parties all data

    case GET_PARTIES_ALL_DETAILS_SUCCESS:
      return {
        ...state,
        parties_all_details: action.payload,
      };

    case GET_PARTIES_ALL_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // all customers in parties

    case GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        parties_all_employee_details: action.payload,
      };

    case GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CUSTOMER_SWITCH:
      const { user_id, user_is_active } = action.payload;
      const updatedCustomerItems = state.parties_customers_data.map((item) =>
        item.id === user_id ? { ...item, is_active: !user_is_active } : item
      );
      return { ...state, parties_customers_data: updatedCustomerItems };

    // ---------------------
    case GET_VENDORS_TABLE_DATA_SUCCESS:
      return {
        ...state,
        parties_vendors_data: action.payload,
      };

    case GET_VENDORS_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_VENDOR_SWITCH:
      const { user_id: id, user_is_active: active } = action.payload;
      const updatedVendorItems = state.parties_vendors_data.map((item) =>
        item.id === id ? { ...item, is_active: !active } : item
      );
      return { ...state, parties_vendors_data: updatedVendorItems };
    
    default:
      return state;
  }
};

export default parties;
