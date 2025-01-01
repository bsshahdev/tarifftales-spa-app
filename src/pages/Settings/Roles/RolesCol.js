import React from "react";
import { edit_icon } from "../../../assets/images";




export const RoleName = ({ cellProps, viewPopupHandler }) => {
    return <span onClick={() => { viewPopupHandler(cellProps.row.original); }}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const Permissions = ({ cellProps, viewPopupHandler }) => {
    return <span onClick={() => { viewPopupHandler(cellProps.row.original); }}>{cellProps.value ? cellProps.value : '-'}</span>;
}

export const Edit = ({ cellProps, viewPopupHandler }) => {
    return <p onClick={() => { viewPopupHandler(cellProps.row.original); }}>{<img src={edit_icon} alt="Edit" />}</p>;
}
