import { GET_CURRENCY_EXCHANGE_RATE } from "./Quotation/actiontype";
import { GET_INQUIRY_CUSTOMER_SUMMARY_DATA, GET_INQUIRY_DATA, GET_INQUIRY_DATA_SUCCESS, GET_INQUIRY_EXPORT_SUMMARY_DATA, GET_INQUIRY_IMPORT_SUMMARY_DATA, GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA, GET_INQUIRY_SUMMARY_DATA, GET_QUOTATION_DATA, GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS, GET_QUOTATION_RESULT_DATA, GET_QUOTATION_RESULT_DATA1, GET_QUOTATION_RESULT_DATA2, GET_QUOTATION_RESULT_DATA3 } from "./actiontype";


export const getSalesQuotationData = (data) => ({
    type: GET_QUOTATION_DATA,
    payload: data
})
export const getSalesQuotationDataSuccess = (data) => ({
    type: GET_QUOTATION_DATA_SUCCESS,
    payload: data
})
export const getSalesQuotationDataFail = (error) => ({
    type: GET_QUOTATION_DATA_FAIL,
    payload: error
})

export const getCurrencyExchangeRate = (data) => ({
    type: GET_CURRENCY_EXCHANGE_RATE,
    payload: data
})

export const getSalesInquiryData = (data) => ({
    type: GET_INQUIRY_DATA,
    payload: data
})
export const getSalesInquiryDataSuccess = (data) => ({
    type: GET_INQUIRY_DATA_SUCCESS,
    payload: data
})
export const getSalesInquiryDataFail = (error) => ({
    type: GET_QUOTATION_DATA_FAIL,
    payload: error
})

export const getInquirySummeryData = (data) => ({
    type: GET_INQUIRY_SUMMARY_DATA,
    payload: data
})

export const getInquiryExportSummeryData = (data) => ({
    type: GET_INQUIRY_EXPORT_SUMMARY_DATA,
    payload: data
})

export const getInquiryImportSummeryData = (data) => ({
    type: GET_INQUIRY_IMPORT_SUMMARY_DATA,
    payload: data
})

export const getInquiryCustomerSummeryData = (data) => ({
    type: GET_INQUIRY_CUSTOMER_SUMMARY_DATA,
    payload: data
})

export const getInquirySalesCustomerSummeryData = (data) => ({
    type: GET_INQUIRY_SALES_CUSTOMER_SUMMARY_DATA,
    payload: data
})