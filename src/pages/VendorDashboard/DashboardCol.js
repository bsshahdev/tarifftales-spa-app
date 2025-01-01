import React from "react";
export const CommonValue = ({ cellProps }) => {
    return <span>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const TrendValue = ({ cellProps }) => {
    return <span className={"badge badge-soft-" + `${cellProps.value < 0 ? "danger" : "success"}` + " text-" + `${cellProps.value < 0 ? "danger" : "success"}`}> {cellProps.value || 0}% </span>;
}
