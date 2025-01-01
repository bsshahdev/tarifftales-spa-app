import React from "react";
import { edit_icon } from "../../assets/images";
import {reset_icon} from "../../assets/images";
import { calculateTimeDifference } from "../../components/Common/CommonLogic";

// -------------------------Setting - Users-------------------------

export const UserName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const FirstName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const LastName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const Role = ({cellProps,viewPopupHandler, roleData}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{
        (roleData?.length !== 0 && cellProps.value.length > 0) ? (
        <>
            {cellProps?.value.map((item,index) => index !== 0 ? ', ' + roleData?.find(obj => obj.id === item)?.label?.toLowerCase() : roleData?.find(obj => obj.id === item)?.label.toLowerCase())}
        </>) : '-'}
    </span>;
}
export const LastActive = ({cellProps,viewPopupHandler}) => {
    const {value} = cellProps;
    const lastActiveTime =  value ? calculateTimeDifference(value) : '-';
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{lastActiveTime}</span>;
}
export const ResetPassword = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{<img src={reset_icon} alt="Reset" />}</span>;
}
// export const Status = ({cellProps,viewPopupHandler}) => {
//     return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
// }
export const Edit = ({cellProps,viewPopupHandler}) => {
    return <p onClick={() => {viewPopupHandler(cellProps.row.original);}}>{<img src={edit_icon} alt="Edit" />}</p>;
}
