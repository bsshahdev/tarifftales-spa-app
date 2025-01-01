import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";

export const getFCLTableData = () => get(url.Get_FCL_Data);
export const getFCLVersionSer = (data) => get(url.Get_FCL_Data + data);
export const getFCLFilterSer = (data) => get(url.Get_FCL_Data + data);
export const postFclUploadSer = (data) => post(url.Get_FCL_Data, data);
export const postFclFreightUploadSer = ({formData, id}) => postFormData(url.Upload_FCL_freight_Data + id, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const postFclFreightUploadServ1 = ({formData}) => postFormData(url.Upload_FCL_freight_Data_V2 , formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const postFclSurchargeUploadSer = ({data, id}) => postFormData(url.Upload_FCL_surcharge_Data + id, data);
export const getFCLFreightViewData = (id) => get(url.Get_FCL_View_Freight_Data + id);
export const getFCLSurchargeViewData = (id) => get(url.Get_FCL_View_Surcharge_Data + id);
export const getFCLDestinationData = (id) => get(`${url.Get_FCL_destination_Data}${id}/D`);
export const getOceanFilterSer = (data) => get(url.Get_FCL_freight_Details_V2 + data);
export const getOceanTableDataSer = () => get(url.Get_FCL_freight_Data_V2);
export const postFclOceanDetailsSer = (dataObj) => postFormData(url.Get_FCL_freight_Data_V2, dataObj);
export const postFclOceanSurchargesSer = (dataObj) => postFormData(url.Save_FCL_Surcharges_Data, dataObj);
export const postFclOceanSurchargesDetailsSer = (dataObj) => postFormData(url.Save_FCL_Surcharges_Details, dataObj);
export const getFclOceanSurchrgesSer = (data) => get(url.Get_FCL_Surcharges_Data + data);


// FCL Port & Local Charges
export const getPortLocalChargesTableData = () => get(url.GET_PORTLOCALCHARGES_ALL);
export const getPortLocalChargesFilterSer = (data) => get(url.GET_PORTLOCALCHARGES_ALL + data);
export const postFclPLUploadSer = (dataObj) => postFormData(url.Upload_FCL_PL_Data, dataObj);


// FCL Inland Charges
export const getFCLInlandTableData = () => get(url.GET_FCL_INLAND);
export const getFCLInlandFilterSer = (data) => get(url.GET_FCL_INLAND + data);
export const getFCLInlandFreightSer = (id) => get(url.GET_FCL_INLAND_FREIGHT + id);
export const getFCLInlandSurchargeSer = (id) => get(url.GET_FCL_INLAND_SURCHARGE + id);
export const postFclInlandUploadSer = (data) => post(url.Upload_FCL_INLAND_Carrier, data);
export const postFclInlandFreightUploadSer = ({formData, id}) => postFormData(url.Upload_FCL_INLAND_Freight + id, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const postFclInlandSurchargeUploadSer = (data) => postFormData(url.Upload_FCL_INLAND_Surcharge, data);
