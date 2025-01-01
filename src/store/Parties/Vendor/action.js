import { GET_VENDOR_BY_ID, GET_VENDOR_CARRIER_DETAILS, GET_VENDOR_DATA_LIST, GET_VENDOR_LIST_TYPE, UPLOAD_VENDOR_CONTACT_TYPE, UPLOAD_VENDOR_DETAILS_TYPE, UPLOAD_VENDOR_DOCUMENT_TYPE } from "./actiontype";

export const getVendorListAction = (data) => {
    return {
        type: GET_VENDOR_LIST_TYPE,
        payload: data,
    };
};

export const getVendorDataListAction = (data) => {
    return {
        type: GET_VENDOR_DATA_LIST,
        payload: data,
    };
};

export const postVendorDetailsAction = (formData) => ({
    type: UPLOAD_VENDOR_DETAILS_TYPE,
    payload: { formData },
});
export const postVendorContactAction = (data) => ({
    type: UPLOAD_VENDOR_CONTACT_TYPE,
    payload: { data },
});
export const postVendorDocumentAction = (data) => ({
    type: UPLOAD_VENDOR_DOCUMENT_TYPE,
    payload: { data },
});
export const getVendorCarrierDataAction = (data) => ({
    type: GET_VENDOR_CARRIER_DETAILS,
    payload: { data },
});
export const getVendorById = (id) => {
    console.log(id, "---->>getVendorById");
    return {
        type: GET_VENDOR_BY_ID,
        payload: { id },
    };
};