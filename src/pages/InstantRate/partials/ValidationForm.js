export const instantFromValidate = (val) => {
    let error = {}
    let isValid = true;
    if(!val?.location_from?.label?.trim()){
        error['location_from'] = 'Please Select From Location';
        isValid = false;
    } else {
        error['location_from'] = '';  
    }
    if(!val?.location_to?.label?.trim()){
        error['location_to'] = 'Please Select To Location';
        isValid = false;
    } else {
        error['location_to'] = '';  
    }
    if(!val?.container_type?.cargo_weight?.value?.trim() || val?.container_type?.cargo_weight?.value === 0){
        error['cargo_weight'] = 'Please Enter Weight';
        isValid = false;
    } else {
        error['cargo_weight'] = '';  
    }
    if(val?.container_type?.containerArray?.length === 0){
        error['containerArray'] = 'Please Enter Container Details';
        isValid = false;
    } else {
        error['containerArray'] = '';  
    }
    if(val?.cargo_date?.length === 0){
        error['cargo_date'] = 'Please Select Cargo Date';
        isValid = false;
    } else {
        error['cargo_date'] = '';  
    }
    if(!val?.customerName?.label?.trim()){
        error['customerName'] = 'Please Select Customer Name';
        isValid = false;
    } else {
        error['customerName'] = '';  
    }
    return {isValid, error}
}
export const instantAirFormValidate = (val) => {
    let error = {}
    let isValid = true;
    if(!val?.location_from?.label?.trim()){
        error['location_from'] = 'Please Select From Location';
        isValid = false;
    } else {
        error['location_from'] = '';  
    }
    if(!val?.location_to?.label?.trim()){
        error['location_to'] = 'Please Select To Location';
        isValid = false;
    } else {
        error['location_to'] = '';  
    }
    console.log(val,"val")
    if(!val?.shipment_details?.weight?.trim() || val?.shipment_details?.weight === "0"){
        error['weight'] = 'Please Enter Weight';
        isValid = false;
    } else {
        error['weight'] = '';  
    }
    console.log(val,"val");
    if(!val?.shipment_details?.array || val?.shipment_details?.array?.length === 0){
        error['shipment_details'] = 'Please Enter Shipment Details';
        isValid = false;
    } else {
        error['shipment_details'] = '';  
    }
    if(val?.cargo_date?.length === 0){
        error['cargo_date'] = 'Please Select Cargo Date';
        isValid = false;
    } else {
        error['cargo_date'] = '';  
    }
    return {isValid, error}
}