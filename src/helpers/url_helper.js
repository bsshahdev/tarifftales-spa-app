//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"
export const ADD_INVOICE = "/add/invoice"
export const DELETE_INVOICE = "/delete/invoice"
export const UPDATE_INVOICE = "/update/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//CONTACTS
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data"
export const GET_YEARLY_DATA = "/yearly-data"
export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"

export const GET_PRODUCT_COMMENTS = "/comments-product"

export const ON_LIKNE_COMMENT = "/comments-product-action"

export const ON_ADD_REPLY = "/comments-product-add-reply"

export const ON_ADD_COMMENT = "/comments-product-add-comment"

export const GET_MARKET_OVERVIEW = "GET_MARKET_OVERVIEW"
export const GET_MARKET_OVERVIEW_SUCCESS = "GET_MARKET_OVERVIEW_SUCCESS"
export const GET_MARKET_OVERVIEW_FAIL = "GET_MARKET_OVERVIEW_FAIL"

export const GET_WALLENT_BALANCE = "GET_WALLENT_BALANCE"

export const GET_WALLENT_BALANCE_ALL_DATA = "GET_MARKET_ALL_DATA"

export const GET_Invested_Overview = "GET_Invested_Overview"

// --------------------- procurement --------------------------------
export const GET_FCL = "/get-fcl"
export const GET_LCL = "/get-lcl"
// export const GET_PORTLOCALCHARGES = "/get-portlocalcharges"
export const GET_WAYBILL = "/get-waybill"
export const GET_CONSOLE = "/get-console"
// export const GET_INLAND = "/get-inland"

// --------------------- Rate Management --------------------------------
export const GET_FCL_SURCHARGE = "/get-fcl-surcharge"

// --------------------- Settings --------------------------------
export const GET_SETTINGS_USERS = "/get-settings-users"
export const GET_SETTINGS_COMPANYDETAILS = "/get-settings-companydetails"

// --------------------- Parties --------------------------------
export const GET_PARTIES_CUSTOMERS = "/get-parties-customers"
export const GET_PARTIES_VENDORS = "/get-parties-vendors"



// -------------------- Sales --------------------------------------------
export const GET_QUOTATION = "get-quotation"
export const GET_quote_exchange_rate = "get-exchangerate"
export const GET_INQUIRY_TABLE = "/api/v1/fcl-inquiry-detail/"
export const GET_INQUIRY_EXPORT_SUMMARY = "/api/v1/fcl-inquiry-detail/export-summary"
export const GET_INQUIRY_IMPORT_SUMMARY = "/api/v1/fcl-inquiry-detail/import-summary"
export const GET_INQUIRY_CUSTOMER_SUMMARY = "/api/v1/fcl-inquiry-detail/customer-summary"
export const GET_INQUIRY_SALES_CUSTOMER_SUMMARY = "/api/v1/fcl-inquiry-detail/sales-customer-summary"
export const GET_INQUIRY_SUMMARY= "/api/v1/fcl-inquiry-detail/inquiry-summary"
// -------------------- original Url Helper

// Auth
export const LOGIN_API = "/api/v1/user/sign-in"

// Global
// get
export const Get_Vendor_Data= "/api/v1/tenant/vendor/"
export const Get_Vendor_Data_List="/api/v1/tenant/vendor/list/"
export const Get_Vendor_Carrier_Data ="/api/v1/carrier-master/"
export const Get_Currency_Data= "/api/v1/currency/"
export const Get_Uom_Data= "/api/v1/unit-of-measurement/"
export const Get_surcharge_code_Data= "/api/v1/surcharge-code/"
export const Get_surcharge_category_Data= "/api/v1/surcharge-category/"
export const Get_Ocean_Port_Data= "/api/v1/ocean-port/"
export const Get_Cargo_Type_Data= "/api/v1/cargo-type/"
export const Get_commodity_data="/api/v1/commodity/"
export const Get_Container_Data= "/api/v1/ocean-container/"
export const Get_Surcharge_Alice_Data= "/api/v1/surcharge-alias/"
export const Get_State_ALL_URL= "/api/v1/state/"
export const ROLE_URL= "/api/v1/role/"
export const GET_MODULE_URL= "/api/v1/module/"
export const Get_File_URL= "/api/v1/misc/download-file/"
export const Get_All_File_URL= "/api/v1/misc/files"
export const Get_Upload_Status = "/api/v1/misc/upload-status"
export const DELETE_PERMISSIONS = "/api/v1/permission/delete/"
export const Save_PERMISSIONS = "/api/v1/permission/save"
export const GET_ALL_MODULES_BY_ROLE = "/api/v1/module/getAllModulesByRole"
export const GET_ALL_OCEAN_PORT_TERMINALS = "/api/v1/ocean-port-terminal/"


// post
export const Post_Surcharge_Data= "/api/v1/surcharge-code/"
export const POST_SURCHARGE_CATE_URL = "/api/v1/surcharge-category/"
export const POST_SURCHARGE_ALISE_URL = "/api/v1/surcharge-alias/"


// FCL
export const Get_FCL_Data= "/api/v1/tenant-ocean-fcl-rp/"
// export const Get_FCL_View_Freight_Data= "/api/v1/tenant-ocean-fcl-rp/freight-details/"
export const Get_FCL_View_Freight_Data= "/api/v2/tenant-ocean-fcl-rp/freight-details/"
// export const Get_FCL_View_Surcharge_Data= "/api/v1/tenant-ocean-fcl-rp/freight-surcharge-details/"
export const Get_FCL_View_Surcharge_Data= "/api/v2/tenant-ocean-fcl-rp/freight-surcharge-details/"
export const Get_FCL_destination_Data= "/api/v1/tenant-ocean-fcl-rp/od-details/"
export const Upload_FCL_Carrier_Data= "/api/v1/tenant-ocean-fcl-rp/"
export const Upload_FCL_freight_Data= "/api/v1/tenant-ocean-fcl-rp/upload/freight/"
export const Upload_FCL_freight_Data_V2= "/api/v2/tenant-ocean-fcl-rp/upload/freight/"
export const Get_FCL_freight_Data_V2= "/api/v2/tenant-ocean-fcl-rp/"
export const Get_FCL_freight_Details_V2= "/api/v2/tenant-ocean-fcl-rp/details"
export const Save_FCL_Surcharges_Data= "/api/v2/tenant-ocean-fcl-rp/surcharges/"
export const Get_FCL_Surcharges_Data= "/api/v2/tenant-ocean-fcl-rp/surcharges/details/"
export const Save_FCL_Surcharges_Details= "/api/v2/tenant-ocean-fcl-rp/surcharges/details/"

export const Upload_FCL_surcharge_Data= "/api/v1/tenant-ocean-fcl-rp/update/surcharge/"

//Air mawb
export const Post_Air_destination_Data= "/api/v1/tenant-mawb-rp/"
export const Upload_Air_rate_data_= "/api/v1/tenant-mawb-rp/upload"
export const GET_AIR_MWB_DATA= "/api/v1/tenant-mawb-rp/"
export const GET_All_MAWB_DETAILS= "/api/v1/tenant-mawb-rp/details"
export const save_air_mawb_data="/api/v1/tenant-mawb-rp/"

//Air Console
export const Post_Air_destination_Data_Console= "/api/v1/tenant-console-rp/"
export const Upload_Air_rate_data_Console_= "/api/v1/tenant-console-rp/upload"
export const GET_AIR_MWB_DATA_Console= "/api/v1/tenant-console-rp/"
export const GET_All_CONSOLE_DETAILS= "/api/v1/tenant-console-rp/details"
export const save_air_console_data="/api/v1/tenant-console-rp/"

// Air port & local charges
export const GET_AIR_PORT_LOCAL_CHARGES_ALL = "/api/v1/air-port-and-local-charges/"
export const Upload_Air_Port_Local_Data= "/api/v1/air-port-and-local-charges/"

export const GET_AIR_LINE_CHARGES_ALL = "/api/v1/air-line-charges/"
export const Upload_Airline_Charge_Data= "/api/v1/air-line-charges/"

// FCL Port & Local Charges
export const GET_PORTLOCALCHARGES_ALL = "/api/v1/port-and-local-charges/"
export const Upload_FCL_PL_Data= "/api/v1/port-and-local-charges/"

// tenant cargoMode
export const get_all_cargo_mode="/api/v1/tenant-cargo-mode/"


// FCL Inland Charges
export const GET_FCL_INLAND = "/api/v1/inland-vendor-charge/"
export const GET_FCL_INLAND_FREIGHT = "/api/v1/inland-vendor-freight/all/"
export const GET_FCL_INLAND_SURCHARGE = "/api/v1/inland-vendor-surcharge/all/"
export const Upload_FCL_INLAND_Carrier = "/api/v1/inland-vendor-charge/"
export const Upload_FCL_INLAND_Freight = "/api/v1/inland-vendor-freight/"
export const Upload_FCL_INLAND_Surcharge = "/api/v1/inland-vendor-surcharge/"

// customer
export const GET_PARTIES_CUSTOMERS_URL = "/api/v1/tenant/customer/"
export const PARTIES_CUSTOMERS_BASIC_DETAILS = "/api/v1/tenant/customer/update-basic-details"
export const UPLOAD_CUSTOMER_CONTACT_URL = "/api/v1/tenant/customer/update-contact-details"
export const UPLOAD_CUSTOMER_DOCUMENT_URL = "/api/v1/tenant/customer/update-document-details"


// vendor
export const UPLOAD_VENDOR_DETAIL_URL = "/api/v1/tenant/vendor/update-basic-details"
export const UPLOAD_VENDOR_CONTACT_URL = "/api/v1/tenant/vendor/update-contact-details"
export const UPLOAD_VENDOR_DOCUMENT_URL = "/api/v1/tenant/vendor/update-document-details"

// INstant Rate ---------------------------------------
export const GET_AIR_LOCATION_URL = "/api/v1/air-port/"
export const POST_INSTANT_RATE_URL = "/api/v1/fcl-inquiry-detail/"
export const FILTER_INSTANT_RATE_URL = "/api/v1/fcl-inquiry-detail/filter"

// Instant air Rate search
export const POST_AIR_INSTANT_RATE_URL = "/api/v1/airfreight-inquiry/"

// --------------------------------------------------------- Kunal ---------------------------------------------------------

export const COMPANY_BASIC_DETAILS = "/api/v1/tenant/update-basic-details"
export const COMPANY_USER_DETAILS = "/api/v1/user/"
export const COMPANY_USER_ADD_DETAILS = "/api/v1/user/"
// export const COMPANY_CITY_DETAILS = "/api/v1/pin-code/"
export const COMPANY_CITY_DETAILS = "/api/v1/city/"
export const COMPANY_STATE_DETAILS = "/api/v1/state/"
export const COMPANY_COUNTRY_DETAILS = "/api/v1/country/"
export const COMPANY_PINCODE_DETAILS = "/api/v1/pin-code/"
export const COMPANY_TAX_DETAILS = "/api/v1/tenant/update-tax-details"
export const COMPANY_BUSINESS_DETAILS = "/api/v1/tenant/update-business-details"


// get api in settings of Companysettings
export const COMPANY_GET_ALL_DETAILS = "/api/v1/tenant/" 

// get all table in parties
export const GET_ALL_PARTIES_TABLE = "/api/v1/tenant/customer"

// All table vendor listing
export const GET_VENDOR_LIST_URL = "/api/v1/tenant/vendor/"

// Parties into Basic companyDetails 
// export const PARTIES_VENDOR_BASIC_DETAILS = "/api/v1/tenant/vendor/update-basic-details"

// get all table in surcharge fcl 
export const GET_M_SURCHARGE_API = "/api/v1/surcharge-code/"

// get to particular id to target
export const GET_SURCHARGE_DATA_ID = "/api/v1/surcharge-code/"

// post api call save data
export const GET_SURCHARGE_ADD_DATA = "/api/v1/surcharge-code/"

// surcharge Category data
export const GET_SURCHARGE_CATEGORY = "/api/v1/surcharge-category/"

// customers details of key manager and sales employee
export const GET_PARTIES_CUSTOMERS_EMPLOYEE_DETAILS = "/api/v1/user/" 


// instant rate search from
export const GET_INSTANT_RATE_LOCATION= "/api/v1/global/misc/fcl-location"


// get all incoterm
export const GET_ALL_INCOTERM ="/api/v1/incoterm/"

//tanant locaton --------------------------------
export const GET_ALL_TANANT_LOCATION = "/api/v1/tenant-location/"
export const POST_TANANT_LOCATION = "/api/v1/tenant-location/"

// TANANT LOCATION TYPE --------------------------------
export const GET_ALL_TANANT_LOCATION_TYPE = "/api/v1/tenant-location-type/"
export const POST_TANANT_LOCATION_TYPE = "/api/v1/tenant-location-type/"
