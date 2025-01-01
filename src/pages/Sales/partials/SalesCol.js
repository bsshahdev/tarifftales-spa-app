import React from "react";

const CommonValue = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}

const QueriesColVal = ({cellProps}) => {
    return <span>{cellProps.value ? cellProps.value : '-'}</span>;
}

export {
    CommonValue, QueriesColVal
}