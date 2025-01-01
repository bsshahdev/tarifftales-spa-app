import {
  GET_ALL_COMPANY_SETTINGS_FAIL,
  GET_ALL_COMPANY_SETTINGS_SUCCESS,
  GET_ALL_SURCHARGE_CATEGORY_FAIL,
  GET_ALL_SURCHARGE_CATEGORY_SUCCESS,
  GET_ALL_TENANT_LOCATION_SUCCESS,
  GET_ALL_TENANT_LOCATION_TYPE_SUCCESS,
  GET_BUSINESS_DATA_FAIL,
  GET_BUSINESS_DATA_SUCCESS,
  GET_COMPANYDETAILS_BASIC_DATA_FAIL,
  GET_COMPANYDETAILS_BASIC_DATA_SUCCESS,
  GET_COMPANY_ADD_USERS_DATA_FAIL,
  GET_COMPANY_ADD_USERS_DATA_SUCCESS,
  GET_COMPANY_CITY_DATA_FAIL,
  GET_COMPANY_CITY_DATA_SUCCESS,
  GET_COMPANY_COUNTRY_DATA_FAIL,
  GET_COMPANY_COUNTRY_DATA_SUCCESS,
  GET_COMPANY_PINCODE_DATA_FAIL,
  GET_COMPANY_PINCODE_DATA_SUCCESS,
  GET_COMPANY_STATE_DATA_FAIL,
  GET_COMPANY_STATE_DATA_SUCCESS,
  GET_FCL_SURCHARGE_TABLE_DATA_FAIL,
  GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS,
  GET_PARTIES_SURCHARGE_TABLE_FAIL,
  GET_PARTIES_SURCHARGE_TABLE_SUCCESS,
  GET_TAXES_DATA_FAIL,
  GET_TAXES_DATA_SUCCESS,
  GET_USERS_LOADER_TYPE,
  // UPDATE_SURCHARGE_FCL_TABLE_DATA,
  GET_USERS_TABLE_DATA_FAIL,
  GET_USERS_TABLE_DATA_SUCCESS,
  POST_SETTINGS_SURCHARGE_DATA_FAIL,
  POST_SETTINGS_SURCHARGE_DATA_SUCCESS,
  POST_TENANT_LOCATION_SUCCESS,
  POST_TENANT_LOCATION_TYPE_SUCCESS,
  UPDATE_USER_SWITCH
} from "./actiontype";

const INIT_STATE = {
  settings_users_data: [],
  users_loader: [],
  settings_Add_users_data: [],
  settings_companydetails_data: {},
  settings_companyCity_data: [],
  settings_companyState_data: [],
  settings_companyCountry_data: [],
  settings_companyPincode_data: [],
  settings_companyTaxes_data: {},
  settings_business_data: [],
  tenant_info: [],
  fcl_surcharge_data: [],
  settings_surcharges_table_data: [],
  settings_add_surcharge_data: [],
  settings_all_category_data: [],
  tenant_all_location_data: [],
  tenant_add_location_data: [],
  tenant_all_location_type_data: [],
  tenant_add_location_type_data: [],
};

const settings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_TABLE_DATA_SUCCESS:
      return {
        ...state,
        settings_users_data: action.payload,
      };

    // case UPDATE_SURCHARGE_FCL_TABLE_DATA:
    //   return {
    //     ...state,
    //     fcl_data: action.payload,
    //   };

    case GET_USERS_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USERS_LOADER_TYPE:
      return {
        ...state,
        users_loader: action.payload,
      };

    case GET_COMPANY_ADD_USERS_DATA_SUCCESS:
      return {
        ...state,
        settings_Add_users_data: action.payload,
      };

    case GET_COMPANY_ADD_USERS_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_USER_SWITCH:
      {
        const { user_id, user_is_active } = action.payload;
        const updatedUserItems = state.settings_users_data.map((item) =>
          item.id === user_id ? { ...item, is_active: !user_is_active } : item
        );
        return { ...state, settings_users_data: updatedUserItems };
      }


    case GET_COMPANYDETAILS_BASIC_DATA_SUCCESS:
      console.log(action.payload, "payload in companyies data");
      return {
        ...state,
        settings_companydetails_data: action.payload,
      };

    case GET_COMPANYDETAILS_BASIC_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // city data
    case GET_COMPANY_CITY_DATA_SUCCESS:
      return {
        ...state,
        settings_companyCity_data: action.payload,
      };

    case GET_COMPANY_CITY_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMPANY_STATE_DATA_SUCCESS:
      return {
        ...state,
        settings_companyState_data: action.payload,
      };

    case GET_COMPANY_STATE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMPANY_COUNTRY_DATA_SUCCESS:
      return {
        ...state,
        settings_companyCountry_data: action.payload,
      };

    case GET_COMPANY_COUNTRY_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMPANY_PINCODE_DATA_SUCCESS:
      return {
        ...state,
        settings_companyPincode_data: action.payload,
      };

    case GET_COMPANY_PINCODE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // All Taxes
    case GET_TAXES_DATA_SUCCESS:
      console.log(action.payload, "action.payload")
      return {
        ...state,
        settings_companyTaxes_data: action.payload,
      };

    case GET_TAXES_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // All Business
    case GET_BUSINESS_DATA_SUCCESS:
      return {
        ...state,
        settings_business_data: action.payload,
      };

    case GET_BUSINESS_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // all get data
    case GET_ALL_COMPANY_SETTINGS_SUCCESS:
      return {
        ...state,
        tenant_info: action.payload,
      };

    case GET_ALL_COMPANY_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // get all surcharge table 
    case GET_PARTIES_SURCHARGE_TABLE_SUCCESS:
      return {
        ...state,
        settings_surcharges_table_data: action.payload,
      };

    case GET_PARTIES_SURCHARGE_TABLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // post add adata in surcharge data
    case POST_SETTINGS_SURCHARGE_DATA_SUCCESS:
      return {
        ...state,
        settings_add_surcharge_data: action.payload,
      }

    case POST_SETTINGS_SURCHARGE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // all get category

    case GET_ALL_SURCHARGE_CATEGORY_SUCCESS:
      return {
        ...state,
        settings_all_category_data: action.payload,
      };

    case GET_ALL_SURCHARGE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        fcl_surcharge_data: action.payload,
      };
    case GET_FCL_SURCHARGE_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    // tenanat location 
    case GET_ALL_TENANT_LOCATION_SUCCESS:
      return {
        ...state,
        tenant_all_location_data: action.payload,
      };

    case POST_TENANT_LOCATION_SUCCESS:
      return {
        ...state,
        tenant_add_location_data: action.payload,
      };
    // tenant location type
    case GET_ALL_TENANT_LOCATION_TYPE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        tenant_all_location_type_data: action.payload,
      };

    case POST_TENANT_LOCATION_TYPE_SUCCESS:
      return {
        ...state,
        tenant_add_location_type_data: action.payload,
      };

    default:
      return state;
  }
};

export default settings;

