import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Input } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { CommonValue } from "../partials/OceanCol";
import { Edit } from "../../../Settings/SettingsCol";
import { getAirConsoleDetails, getAirMawbDetails, postConsoleFrightRpDetails } from "../../../../store/Procurement/actions";
import TableMawbDetails from "./TableMawbDetails";
import TfBreadcrumbs from "../../../../components/Common/TfBreadcrumbs";
import { mawbBreadcrumb } from "../../../../common/data/sales";
import { consoleBreadcrumb } from "../../../../common/data/procurement";
import { useFormik } from "formik";

import Select from "react-select";
import { GET_CARGO_TYPE_DATA } from "../../../../store/Global/actiontype";
import { GET_AIR_LOCATION_TYPE } from "../../../../store/InstantRate/actionType";
import { GET_ALL_TENANT_CARGO_MODE } from "../../../../store/Procurement/actiontype";
const AirConsoleDetails = () => {
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const navigateState = useLocation();
    const { consoleDetailsData, consoleDetailsDataLoader, tenantCargoModeData, consoleData } = useSelector((state) => state?.procurement);
    const { airLocation } = useSelector((state) => state.instantRate);
    const [editingRowIndex, setEditingRowIndex] = useState(null);
    const viewPopupHandler = (data) => {
        // setModal(true);
        // setViewData(data);
    };

    useEffect(() => {
        dispatch({ type: GET_CARGO_TYPE_DATA });
        dispatch({ type: GET_AIR_LOCATION_TYPE });
        dispatch({ type: GET_ALL_TENANT_CARGO_MODE })
    }, [])

    const formik = useFormik({
        initialValues: {
            data: '',
            destinationPort: '',
            originPort: '',
            cargoMode: '',
            minValue: '',
            nrate: '',

        },
        onSubmit: (values) => {
            console.log(values.originPort);
            values.data.originPort = values.originPort;
            values.data.destinationPort = values.originPort;
            values.data.tenantCargoMode = values.cargoMode;
            values.data.minimumRate = values.minValue;
            values.data.rate = values.nrate;
            dispatch(postConsoleFrightRpDetails(values.data))

        },
    });
    const handleEdit = (rowIndex, data) => {
        formik.setValues({
            data: data,
            destinationPort: airLocation.find(origin => origin.value == data?.destinationPort?.name),
            originPort: airLocation.find(origin => origin.value == data?.originPort?.name),
            cargoMode: tenantCargoModeData.find(cargoMode => cargoMode.value == data?.tenantCargoMode?.code),
            minValue: data?.minimumRate,
            nrate: data?.rate,
        })
        setEditingRowIndex(rowIndex);
    };
    useEffect(() => {
        if (currentPage !== '' && currentPage !== undefined && navigateState?.state?.data) {
            let url = `?page=${currentPage}&size=10`;
            Object.entries(navigateState.state.data).forEach(([key, value]) => {
                if (value !== '' && value !== undefined && key !== "totalCount") {
                    url += `&${key}=${encodeURIComponent(value)}`;
                }
            });

            dispatch(getAirConsoleDetails(url));
            setEditingRowIndex(-1)
        }
    }, [dispatch, currentPage, navigateState.state.data, consoleData]);


    const columns = useMemo(
        () => [
            {
                Header: 'Org Port',
                accessor: (row) => row.originPort?.name || '',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="originPort"
                            value={formik?.values?.originPort}
                            onChange={(e) => {
                                formik.setFieldValue(`originPort`, e);
                            }}
                            options={airLocation}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'Dest Port',
                accessor: (row) => `${row.destinationPort === null ? '' : row?.destinationPort?.name}`,
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="destinationPort"
                            value={formik?.values?.destinationPort}
                            onChange={(e) => {
                                formik.setFieldValue(`destinationPort`, e);
                            }}
                            options={airLocation}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'Flight Mode',
                accessor: (row) => `${row.tenantCargoMode === null ? '' : row?.tenantCargoMode?.code}`,
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="cargoMode"
                            value={formik.values.cargoMode}
                            onChange={(e) => {
                                formik.setFieldValue(`cargoMode`, e);
                            }}
                            options={tenantCargoModeData}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'Min Rate',
                accessor: 'minimumRate',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="minValue"
                            value={formik.values.minValue}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'N Rate',
                accessor: 'rate',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="nrate"
                            value={formik.values.nrate}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },

            {
                Header: "Actions",
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row.index;
                    return editingRowIndex === rowIndex ? (
                        <div>
                            <button type="button"
                                className="btn btn-primary btn-sm border " onClick={formik.handleSubmit}>Save</button>
                            {/* Add a Cancel button if needed */}
                        </div>
                    ) : (
                        <Edit cellProps={cellProps} viewPopupHandler={() => handleEdit(rowIndex, cellProps.row.original)} />
                    );
                },
            }
        ],
        [editingRowIndex, formik.values]
    );

    return (
        <>
            <div className="page-content settings_users_wrapper">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button
                            type="button"
                            className="btn border mb-3"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Back
                        </button>
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={consoleBreadcrumb} />
                            <div className="tf_box_wrap d-flex">
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Carrier Name</p>
                                    <div>
                                        {navigateState.state.data?.carrierName}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Vendor Name</p>
                                    <div>
                                        {navigateState.state.data?.agentName}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Valid From</p>
                                    <div>
                                        {navigateState.state.data?.validFrom}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Valid To</p>
                                    <div>
                                        {navigateState.state.data?.validTo}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Rate Rype</p>
                                    <div>
                                        {navigateState.state.data?.rateType}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TableMawbDetails
                            columns={columns}
                            data={consoleDetailsData?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            // toggleRightCanvas={toggleRightCanvas}
                            component={"Customers"}
                            loader={consoleDetailsDataLoader || false}
                            setCurrentPage={setCurrentPage}
                            totalPages={consoleDetailsData?.totalPages || 0}
                            totalEntries={consoleDetailsData?.totalElements || 0}
                        />

                    </div>
                </Container>
            </div>
        </>
    );
};

export default AirConsoleDetails;
