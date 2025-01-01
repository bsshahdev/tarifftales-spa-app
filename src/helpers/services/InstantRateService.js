import { get, post } from "../api_helper";
import * as url from "../url_helper"


export const postInstantRateSer = (data) => post(url.POST_INSTANT_RATE_URL, data);
export const filterInstantRateSer = (data) => get(url.FILTER_INSTANT_RATE_URL + data);

// AIR PORT SEARCH
export const postAirInstantRateSer = (data) => post(url.POST_AIR_INSTANT_RATE_URL, data)

export const getInquirySummary = () => get(url.GET_INQUIRY_SUMMARY);
export const getInquiryCustomerSummary = () => get(url.GET_INQUIRY_CUSTOMER_SUMMARY);
export const getInquirySalesCustomerSummary = () => get(url.GET_INQUIRY_SALES_CUSTOMER_SUMMARY);
export const getInquiryImportSummary = () => get(url.GET_INQUIRY_IMPORT_SUMMARY);
export const getInquiryExportSummary = () => get(url.GET_INQUIRY_EXPORT_SUMMARY); 
