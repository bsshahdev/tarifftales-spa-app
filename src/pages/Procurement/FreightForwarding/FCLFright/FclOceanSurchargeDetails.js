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
import { PostFclSurchargeViewDetails, getAirConsoleDetails, getAirMawbDetails, getFclSurchargeViewDetails, getOceanDetails, postMawbFrightRpDetails, postOceanDetails } from "../../../../store/Procurement/actions";
import TfBreadcrumbs from "../../../../components/Common/TfBreadcrumbs";
import { mawbBreadcrumb, oceanBreadSurchage, oceanBreadcrumb, optionChargeBasis } from "../../../../common/data/sales";
import { useFormik } from "formik";
import TableOceanDetails from "./TableOceanDetails";
import debounce from 'lodash.debounce';
import AddSurchargesModal from "./AddSurchargesModal";
const FclOceanSurchargeDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const navigateState = useLocation();
    const { tenantCargoModeData, mawbData } = useSelector((state) => state?.procurement);
    const { fcl_surcharge_view, fcl_get_surcharge_view_loader, fcl_responce } = useSelector((state) => state.procurement);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState();
    const [editingRowIndex, setEditingRowIndex] = useState(null);
    const { oceanPort_data, currency_data, surchargeCode_data, container_data, cargoType_data, UOM_data } = useSelector(state => state?.globalReducer);
    const viewPopupHandler = (data) => {
        // setModal(true);
        // setViewData(data);
    };
    // modal
    const onCloseClick = () => {
        setModal(false);
    }

    const formik = useFormik({
        initialValues: {
            data: '',
            destinationPort: '',
            originPort: '',
            gp20: '',
            gp40: '',
            rf20: '',
            hq40: '',
            hq45: '',
            surchargeName: ''

        },
        onSubmit: (values) => {
            values.data.tenantOceanFCLSurchargeRPS.forEach(data => {
                data.destinationPort = values.destinationPort;
                data.originPort = values.originPort;
                data.surchargeCode = values.surchargeName;
                data.cargoType = values.cargoType;
                data.currency = values.currency;
                data.unitOfMeasurement = values.uomCode;
                if (data.oceanContainer.name == "20GP") {
                    data.surchargeValue = values.gp20;
                } else if (data.oceanContainer.name == "40GP") {
                    data.surchargeValue = values.gp40;
                } else if (data.oceanContainer.name == "40HQ") {
                    data.surchargeValue = values.hq40;
                } else if (data.oceanContainer.name == "45HQ") {
                    data.surchargeValue = values.hq45;
                } else if (data.oceanContainer.name == "20RF") {
                    data.surchargeValue = values.rf20;
                } else if (data.oceanContainer.name == "40RF") {
                    data.surchargeValue = values.rf40;
                }
            })
            let newRecord = [];
            if (!values.data.tenantOceanFCLSurchargeRPS.find(data => data.oceanContainer.name === "20GP") && values.gp20) {
                newRecord.push({
                    destinationPort: values.destinationPort,
                    originPort: values.originPort,
                    surchargeCode: values.surchargeName,
                    oceanContainer: container_data.find(data => data.value == "20GP"),
                    surchargeValue: values.gp20,
                    cargoType: values.cargoType,
                    currency: values.currency,
                    unitOfMeasurement: values.uomCode,
                    tenantOceanFCLFreightRP: values.tenantOceanFCLFreightRP
                });
            }
            if (!values.data.tenantOceanFCLSurchargeRPS.find(data => data.oceanContainer.name === "40GP") && values.gp40) {
                newRecord.push({
                    destinationPort: values.destinationPort,
                    originPort: values.originPort,
                    surchargeCode: values.surchargeName,
                    oceanContainer: container_data.find(data => data.value == "40GP"),
                    cargoType: values.cargoType,
                    currency: values.currency,
                    unitOfMeasurement: values.uomCode,
                    surchargeValue: values.gp40,
                    tenantOceanFCLFreightRP: values.tenantOceanFCLFreightRP
                });
            }
            if (!values.data.tenantOceanFCLSurchargeRPS.find(data => data.oceanContainer.name === "40HQ") && values.hq40) {
                newRecord.push({
                    destinationPort: values.destinationPort,
                    originPort: values.originPort,
                    surchargeCode: values.surchargeName,
                    oceanContainer: container_data.find(data => data.value == "40HQ"),
                    cargoType: values.cargoType,
                    currency: values.currency,
                    unitOfMeasurement: values.uomCode,
                    surchargeValue: values.hq40,
                    tenantOceanFCLFreightRP: values.tenantOceanFCLFreightRP
                });
            }
            if (!values.data.tenantOceanFCLSurchargeRPS.find(data => data.oceanContainer.name === "45HQ") && values.hq45) {
                newRecord.push({
                    destinationPort: values.destinationPort,
                    originPort: values.originPort,
                    surchargeCode: values.surchargeName,
                    oceanContainer: container_data.find(data => data.value == "45HQ"),
                    cargoType: values.cargoType,
                    currency: values.currency,
                    unitOfMeasurement: values.uomCode,
                    surchargeValue: values.hq45,
                    tenantOceanFCLFreightRP: values.tenantOceanFCLFreightRP
                });
            }
            if (!values.data.tenantOceanFCLSurchargeRPS.find(data => data.oceanContainer.name === "20RF") && values.rf20) {
                newRecord.push({
                    destinationPort: values.destinationPort,
                    originPort: values.originPort,
                    surchargeCode: values.surchargeName,
                    oceanContainer: container_data.find(data => data.value == "20RF"),
                    cargoType: values.cargoType,
                    currency: values.currency,
                    unitOfMeasurement: values.uomCode,
                    surchargeValue: values.rf20,
                    tenantOceanFCLFreightRP: values.tenantOceanFCLFreightRP
                });
            }
            if (!values.data.tenantOceanFCLSurchargeRPS.find(data => data.oceanContainer.name === "40RF") && values.rf40) {
                newRecord.push({
                    destinationPort: values.destinationPort,
                    originPort: values.originPort,
                    surchargeCode: values.surchargeName,
                    cargoType: values.cargoType,
                    currency: values.currency,
                    unitOfMeasurement: values.uomCode,
                    oceanContainer: container_data.find(data => data.value == "40RF"),
                    surchargeValue: values.rf40,
                    tenantOceanFCLFreightRP: values.tenantOceanFCLFreightRP
                });
            }
            values.data.tenantOceanFCLSurchargeRPS = values.data.tenantOceanFCLSurchargeRPS.concat(newRecord);
            dispatch(PostFclSurchargeViewDetails(values.data.tenantOceanFCLSurchargeRPS))
            setCurrentPage(-1)
        },
    });


    const handleEdit = (rowIndex, data) => {
        console.log(data);
        formik.setValues({
            data: data,
            destinationPort: oceanPort_data?.find(origin => origin?.value == data?.destinationPort),
            originPort: oceanPort_data?.find(origin => origin?.value == data?.originPort),
            surchargeName: surchargeCode_data?.find(surcharge => surcharge?.value == data?.surchargeName),
            uomCode: UOM_data?.find(charge => charge?.value == data?.uomCode),
            cargoType: cargoType_data?.find(cargo => cargo?.value == data?.cargoType),
            currency: currency_data?.find(currency => currency?.currencyCode == data?.currency),
            gp20: data?.gp20,
            gp40: data?.gp40,
            rf20: data?.rf20,
            rf40: data?.rf40,
            hq40: data?.hq40,
            hq45: data?.hq45,
            tenantOceanFCLFreightRP: data.tenantOceanFCLFreightRP
        })
        setEditingRowIndex(rowIndex);
    };



    const debouncedHandleChange = useCallback(
        debounce(formik.handleChange, 300),
        []
    );

    useEffect(() => {
        if (currentPage !== '' && currentPage !== undefined && navigateState?.state?.data) {
            let url = `?page=${currentPage}&size=10`;
            Object.entries(navigateState.state.data).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined && key !== "totalCount" && key !== "vendorType") {
                    url += `&${key}=${encodeURIComponent(value)}`;
                }
            });
            dispatch(getFclSurchargeViewDetails(url));
            setEditingRowIndex(-1);
        }
    }, [dispatch, navigateState.state.data, fcl_responce]);

    const addSurcharges = () => {
       setViewData(navigateState?.state?.data)
       setModal(true)
    }

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
                Header: 'Surcharge Name',
                accessor: "surchargeName",
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="surchargeName"
                            value={formik?.values?.surchargeName}
                            onChange={(e) => { formik.setFieldValue(`surchargeName`, e); }}
                            options={surchargeCode_data}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },

            {
                Header: 'Charge Basis',
                accessor: "uomCode",
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="uomCode"
                            value={formik?.values?.uomCode}
                            onChange={(e) => { formik.setFieldValue(`uomCode`, e); }}
                            options={UOM_data}
                            classNamePrefix="select2-selection form-select"
                        />
                    ) : (
                        <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: 'Cargo Type',
                accessor: "cargoType",
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <Select
                            name="cargoType"
                            value={formik?.values?.cargoType}
                            onChange={(e) => { formik.setFieldValue(`cargoType`, e); }}
                            options={cargoType_data}
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
                            onChange={(e) => { formik.setFieldValue(`currency`, e); }}
                            options={currency_data}
                            classNamePrefix="select2-selection form-select"
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
                            value={formik.values.gp20}
                            onChange={formik.handleChange}
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
                            value={formik.values.gp40}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    ) : (<CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />);
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
                            value={formik.values.hq40}
                            onChange={formik.handleChange}
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
                            value={formik.values.hq45}
                            onChange={formik.handleChange}
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
                            value={formik.values.rf20}
                            onChange={formik.handleChange}
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
                            value={formik.values.rf40}
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
                    const rowIndex = cellProps.row?.index;
                    return editingRowIndex === rowIndex ? (
                        <div>
                            <button type="button"
                                className="btn btn-primary btn-sm border " onClick={formik.handleSubmit}>Save</button>
                            {/* Add a Cancel button if needed */}
                        </div>
                    ) : (
                        <Edit cellProps={cellProps} viewPopupHandler={() => handleEdit(rowIndex, cellProps.row?.original)} />
                    );
                },
            }
        ],
        [editingRowIndex, formik.values, debouncedHandleChange]
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
                            <TfBreadcrumbs breadcrumb={oceanBreadSurchage} />
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
                            data={fcl_surcharge_view?.length > 0 ? fcl_surcharge_view : [] || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            addSurcharges={addSurcharges}
                            component={"surcharge"}
                            loader={fcl_get_surcharge_view_loader || false}
                            setCurrentPage={setCurrentPage}
                            totalPages={fcl_surcharge_view?.length / 10 || 0}
                            totalEntries={fcl_surcharge_view?.length || 0}
                        />
                        <AddSurchargesModal modal={modal} onCloseClick={onCloseClick} data={viewData} />
                    </div>
                </Container>
            </div>
        </>
    );
};

export default FclOceanSurchargeDetails;
