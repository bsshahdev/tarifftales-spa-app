import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";


export const postAirUploadService = (data) => post(url.Post_Air_destination_Data, data,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })

export const uploadAirRateData = ({ formData }) =>
    postFormData(url.Upload_Air_rate_data_, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });


export const getAirMWBData = () => get(url.GET_AIR_MWB_DATA);


export const getAirFreightData = (id) => get(url.GET_AIR_MWB_DATA + id);


export const postAirConsoleUploadService = (data) => post(url.Post_Air_destination_Data_Console, data,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })

export const uploadConsoleAirRateData = ({ formData }) =>
    postFormData(url.Upload_Air_rate_data_Console_, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });


//mawb
export const fetcAirFreighConsoletData = (id) => get(url.GET_AIR_MWB_DATA_Console + id);
export const fetchAirMawbdetails = (data) => get(url.GET_All_MAWB_DETAILS + data);
export const postAirMawbSer = (dataObj) => postFormData(url.save_air_mawb_data, dataObj);


//console
export const fetcAirConsoleTableData = () => get(url.GET_AIR_MWB_DATA_Console);
export const fetcAirConsoledetails = (data) => get(url.GET_All_CONSOLE_DETAILS + data);
export const postAirConsoleData = (dataObj) => postFormData(url.save_air_console_data, dataObj);



//Air local Changes
export const getAirPortLocalChargesTableData = () => get(url.GET_AIR_PORT_LOCAL_CHARGES_ALL);
export const getAirPortLocalChargesTableDataById = (id) => get(url.GET_AIR_PORT_LOCAL_CHARGES_ALL + id);
export const postAirPortLocalUploadSer = (dataObj) => postFormData(url.Upload_Air_Port_Local_Data, dataObj);

//Air line charges
export const getAirLineTableData = () => get(url.GET_AIR_LINE_CHARGES_ALL);
export const getAirLineTableDataById = (id) => get(url.GET_AIR_LINE_CHARGES_ALL + id);
export const postAirLineUploadSer = (dataObj) => postFormData(url.Upload_Airline_Charge_Data, dataObj);

// tenant cargo mode
export const getTenantCargoModeSer=()=> get(url.get_all_cargo_mode)