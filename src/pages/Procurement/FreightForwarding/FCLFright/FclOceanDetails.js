import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Input
} from "reactstrap";

import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { CommonValue } from "../partials/OceanCol";
import { Edit } from "../../../Settings/SettingsCol";
import { getAirConsoleDetails, getAirMawbDetails, getOceanDetails, postMawbFrightRpDetails, postOceanDetails } from "../../../../store/Procurement/actions";
import TfBreadcrumbs from "../../../../components/Common/TfBreadcrumbs";
import { mawbBreadcrumb, oceanBreadcrumb } from "../../../../common/data/sales";
import { useFormik } from "formik";
import TableOceanDetails from "./TableOceanDetails";
import debounce from 'lodash.debounce';
import { eye_icon } from "../../../../assets/images";
const FclOceanDetails = () => {
    let valuesObj = {
        gp20: 0,
        gp40: 0,
        rf20: 0,
        hq40: 0,
        hq45: 0,
        transitTime: 0
    }
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const navigateState = useLocation();
    const { tenantCargoModeData, mawbData } = useSelector((state) => state?.procurement);
    const { fcl_freight_details, fcl_get_freight_view_loader, fcl_responce } = useSelector((state) => state.procurement);
    const [editOptionValues, setEditOptionValues] = useState(valuesObj)
    const [editingRowIndex, setEditingRowIndex] = useState(null);
    const { oceanPort_data, currency_data, container_data, cargoType_data, UOM_data } = useSelector((state) => state.globalReducer);
    const viewPopupHandler = (data) => {
        // setModal(true);
        // setViewData(data);
    };


    const formik = useFormik({
        initialValues: {
            data: '',
            destinationPort: '',
            originPort: '',
            cargoMode: '',
            gp20: '',
            gp40: '',
            rf20: '',
            hq40: '',
            hq45: '',
            transitTime: ''
        },
        onSubmit: (values) => {
                editOptionValues.gp20 ? values.gp20 = editOptionValues.gp20 : '',
                editOptionValues.gp40 ? values.gp40 = editOptionValues.gp40 : '',
                editOptionValues.rf20 ? values.rf20 = editOptionValues.rf20 : '',
                editOptionValues.rf40 ? values.rf40 = editOptionValues.rf40 : '',
                editOptionValues.hq40 ? values.hq40 = editOptionValues.hq40 : '',
                editOptionValues.hq45 ? values.hq45 = editOptionValues.hq45 : '',
                editOptionValues.transitTime ? values.transitTime = editOptionValues.transitTime : ''
            var exitingData;
            let newRecord = [];
            values.data.tenantOceanFCLFreightRPS.forEach(data => {
                data.destinationPort = values.destinationPort;
                data.originPort = values.originPort;
                data.transitTime = values.transitTime;
                if (data.oceanContainer.name == "20GP") {
                    data.freightAmount = values.gp20;
                } else if (data.oceanContainer.name == "40GP") {
                    data.freightAmount = values.gp40;
                } else if (data.oceanContainer.name == "40HQ") {
                    data.freightAmount = values.hq40;
                } else if (data.oceanContainer.name == "45HQ") {
                    data.freightAmount = values.hq45;
                } else if (data.oceanContainer.name == "20RF") {
                    data.freightAmount = values.rf20;
                } else if (data.oceanContainer.name == "40RF") {
                    data.freightAmount = values.rf40;
                }
                exitingData = data;
            });

            // Create a new object to avoid reference issues
            const createNewData = (containerName, amount) => {
                return {
                    ...exitingData,
                    destinationPort: values.destinationPort,
                    originPort: values.originPort,
                    transitTime: values.transitTime,
                    oceanContainer: container_data.find(data => data.value == containerName),
                    freightAmount: amount,
                    version: 0,
                    id: null,
                    tenantOceanFCLSurchargeRPS: null,
                    tenantOceanFCLViaPortRPS: null
                };
            };

            if (!values.data.tenantOceanFCLFreightRPS.find(data => data.oceanContainer.name === "20GP") && values.gp20) {
                newRecord.push(createNewData("20GP", values.gp20));
            }
            if (!values.data.tenantOceanFCLFreightRPS.find(data => data.oceanContainer.name === "40GP") && values.gp40) {
                newRecord.push(createNewData("40GP", values.gp40));
            }
            if (!values.data.tenantOceanFCLFreightRPS.find(data => data.oceanContainer.name === "40HQ") && values.hq40) {
                newRecord.push(createNewData("40HQ", values.hq40));
            }
            if (!values.data.tenantOceanFCLFreightRPS.find(data => data.oceanContainer.name === "45HQ") && values.hq45) {
                newRecord.push(createNewData("45HQ", values.hq45));
            }
            if (!values.data.tenantOceanFCLFreightRPS.find(data => data.oceanContainer.name === "20RF") && values.rf20) {
                newRecord.push(createNewData("20RF", values.rf20));
            }
            if (!values.data.tenantOceanFCLFreightRPS.find(data => data.oceanContainer.name === "40RF") && values.rf40) {
                newRecord.push(createNewData("40RF", values.rf40));
            }

            values.data.tenantOceanFCLFreightRPS = values.data.tenantOceanFCLFreightRPS.concat(newRecord);
            dispatch(postOceanDetails(values.data.tenantOceanFCLFreightRPS));
        }

    });


    const handleEdit = (rowIndex, data) => {
        console.log(data);
        formik.setValues({
            data: data,
            destinationPort: oceanPort_data?.find(origin => origin?.value == data?.destinationPort),
            originPort: oceanPort_data?.find(origin => origin?.value == data?.originPort),
            cargoMode: tenantCargoModeData?.find(cargoMode => cargoMode?.value == data?.tenantCargoMode?.code),
            uomCode: UOM_data?.find(charge => charge?.value == data?.uomCode),
            cargoType: cargoType_data?.find(cargo => cargo?.value == data?.cargoType),
            currency: currency_data?.find(currency => currency?.currencyCode == data?.currency),
            gp20: data?.gp20,
            gp40: data?.gp40,
            rf20: data?.rf20,
            rf40: data?.rf40,
            hq40: data?.hq40,
            hq45: data?.hq45,
            transitTime: data?.transitTime
        })
        setEditingRowIndex(rowIndex);
    };

    const viewSurcharges = (data) => {
        navigateState.state.data.destinationPort = data.destinationPort;
        navigate(`/freight/ocean/fcl/surcharge/Details`, { state: { data: navigateState.state.data || '', }, })
    }

    useEffect(() => {
        if (currentPage !== '' && currentPage !== undefined && navigateState?.state?.data) {
            let url = `?page=${currentPage}&size=10`;
            Object.entries(navigateState.state.data).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined && key !== "totalCount" && key !== "vendorType") {
                    url += `&${key}=${encodeURIComponent(value)}`;
                }
            });
            dispatch(getOceanDetails(url));
            setEditingRowIndex(-1);
        }
    }, [dispatch, currentPage, navigateState.state.data, fcl_responce]);

    const onChangeEditOptionValues = (e, type) => {
        e.stopPropagation();
        editOptionValues[type] = Number(e.target.value);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Org Port',
                accessor: 'originPort',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="originPort"
                            value={formik?.values?.originPort}
                            onChange={(e) => {
                                formik.setFieldValue(`originPort`, e);
                            }}
                            options={oceanPort_data}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'Dest Port',
                accessor: "destinationPort",
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="destinationPort"
                            value={formik?.values?.destinationPort}
                            onChange={(e) => {
                                formik.setFieldValue(`destinationPort`, e);
                            }}
                            options={oceanPort_data}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'Currency',
                accessor: "currency",
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="currency"
                            value={formik?.values?.currency}
                            onChange={(e) => {
                                formik.setFieldValue(`currency`, e);
                            }}
                            options={oceanPort_data}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'Transit Time',
                accessor: 'transitTime',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="transitTime"
                            defaultValue={formik.values.transitTime}
                            onChange={(e) => onChangeEditOptionValues(e, 'transitTime')}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },

            {
                Header: '20GP',
                accessor: 'gp20',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="gp20"
                            defaultValue={formik.values.gp20}
                            onChange={(e) => onChangeEditOptionValues(e, 'gp20')}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: '40GP',
                accessor: 'gp40',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="gp40"
                            defaultValue={formik.values.gp40}
                            onChange={(e) => onChangeEditOptionValues(e, 'gp40')}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: '40HQ',
                accessor: 'hq40',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="hq40"
                            defaultValue={formik.values.hq40}
                            onChange={(e) => onChangeEditOptionValues(e, 'hq40')}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: '45HQ',
                accessor: 'hq45',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="hq45"
                            defaultValue={formik.values.hq45}
                            onChange={(e) => onChangeEditOptionValues(e, 'hq45')}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: '20RF',
                accessor: 'rf20',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="rf20"
                            defaultValue={formik.values.rf20}
                            onChange={(e) => onChangeEditOptionValues(e, 'rf20')}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: '40RF',
                accessor: 'rf40',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Input
                            type="number"
                            name="rf40"
                            defaultValue={formik.values.rf40}
                            onChange={(e) => onChangeEditOptionValues(e, 'rf40')}
                            className="form-control"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'View Surcharges',
                accessor: 'totalCount',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <div className="d-flex justify-content-center align-items-center h-100">
                        <img src={eye_icon} alt="Eye" onClick={() => viewSurcharges(cellProps.row?.original)} />
                    </div>
                }
            },
            {
                Header: "Actions",
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <div>
                            <button type="button"
                                className="btn btn-primary btn-sm border" onClick={formik.handleSubmit}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Save">
                                <i className="fas fa-save"></i>
                            </button>
                            <button type="button"
                                className="btn btn-danger btn-sm border" onClick={() => setEditingRowIndex(-1)} data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Cancle">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                    ) : (
                        <Edit cellProps={cellProps} viewPopupHandler={() => handleEdit(rowIndex, cellProps.row?.original)} />
                    );
                },
            }
        ],
        [editingRowIndex,formik.values]
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
                            <TfBreadcrumbs breadcrumb={oceanBreadcrumb} />
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
                        <TableOceanDetails
                            columns={columns}
                            data={fcl_freight_details?.length > 0 ? fcl_freight_details : [] || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            // toggleRightCanvas={toggleRightCanvas}
                            component={"Customers"}
                            loader={fcl_get_freight_view_loader || false}
                            setCurrentPage={setCurrentPage}
                            totalPages={fcl_freight_details?.length / 10 || 0}
                            totalEntries={fcl_freight_details?.length || 0}
                        />
                    </div>
                </Container>
            </div>
        </>
    );
};

export default FclOceanDetails;
