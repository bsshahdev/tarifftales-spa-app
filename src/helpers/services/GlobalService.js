import * as url from "../url_helper"
import { del, get, getWithOutAuth, post } from "../api_helper";

export const getVendorData = () => get(url.Get_Vendor_Data);
export const getVendorCarrierData = (data) => get(url.Get_Vendor_Carrier_Data+data);
export const getCurrencyData = () => get(url.Get_Currency_Data);
export const getUomData = () => get(`${url.Get_Uom_Data}`);
export const getUomWeightData = () => get(url.Get_Uom_Data + '?weightParameterOnly=true');
export const getOceanPortData = () => get(url.Get_Ocean_Port_Data);
export const getCargoTypeData = () => get(url.Get_Cargo_Type_Data);
export const getCommodityData = () => get(url.Get_commodity_data);
export const getContainerData = () => get(url.Get_Container_Data);
export const getStateAllSer = () => get(url.Get_State_ALL_URL);
export const getRoleAllSer = () => get(url.ROLE_URL);
export const saveRoleSer=(data) => post(url.ROLE_URL,data)
export const getRoleById=(id) => get(`${url.ROLE_URL}${id}`)
export const getModuleAllSer=() => get(url.GET_MODULE_URL);
export const deletePermissionser = (roleId, moduleId, RolName) =>del(`${url.DELETE_PERMISSIONS}${roleId}/${moduleId}/${RolName}`);
export const savePermissionSer = (data, id) =>post(`${url.Save_PERMISSIONS}/${id}`,data);
export const getAllmodulesbyrole=() =>get(url.GET_ALL_MODULES_BY_ROLE)
export const getAllOceanPortTerminals=() =>get(url.GET_ALL_OCEAN_PORT_TERMINALS)



// surcharge
export const getSurchargeCodeData = () => get(url.Get_surcharge_code_Data);
export const getSurchargeCategoryData = () => get(url.Get_surcharge_category_Data);
export const getSurchargeAliceSer = () => get(url.Get_Surcharge_Alice_Data);
export const postSurchargeCodeSer = (data) => post(url.Post_Surcharge_Data, data);
export const postSurchargeCateSer = (data) => post(url.POST_SURCHARGE_CATE_URL, data);
export const postSurchargeAliseSer = (data) => post(url.POST_SURCHARGE_ALISE_URL, data);

// Image Download
export const GetFileSer = (base64Encoded) => getWithOutAuth(url.Get_File_URL + base64Encoded);

export const getAllFilesSer= () => get(url.Get_All_File_URL)

// instant rate search droup downs
export const getInstantRateLocation = () => get(url.GET_INSTANT_RATE_LOCATION);
export const getAirLocation = () => get(url.GET_AIR_LOCATION_URL);
export const getAllIncoTerms = () => get (url.GET_ALL_INCOTERM)

// tenant location
export const getAllTenantLocation = () => get (url.GET_ALL_TANANT_LOCATION);
export const postTenantLocation = (data) => post(url.POST_TANANT_LOCATION, data);

// tenant location type
export const getAllTenantLocationType = () => get (url.GET_ALL_TANANT_LOCATION_TYPE);
export const postTenantLocationType= (data) => post (url.POST_TANANT_LOCATION_TYPE, data);

export const getUploadStatus = () => get(url.Get_Upload_Status);
