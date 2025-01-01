import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, FormFeedback, Input, Row } from "reactstrap";
import { optionMovementType } from "../../../../../../common/data/procurement";
import { isAnyValueEmpty } from "../../../../../../components/Common/CommonLogic";
import { GET_CARGO_TYPE_DATA, GET_COMMODITY_DATA, GET_CONTAINER_DATA, GET_UOM_DATA } from "../../../../../../store/Global/actiontype";
import { getAirPortLocalChargesById, postAirPortLocalChargesData } from "../../../../../../store/Procurement/actions";
import { GET_AIR_LOCATION_TYPE } from "../../../../../../store/InstantRate/actionType";
import * as Yup from "yup";

const terminalName = [];





export default function UploadAirPortLocalChargesData() {
    const {
        surchargeCategory_data, vendor_data, commodity_data, surchargeCode_data, UOM_data, currency_data, cargoType_data, container_data,
    } = useSelector(state => state?.globalReducer);
    const { airLocation } = useSelector((state) => state.instantRate);
    const { airportLocalChargesDataById } = useSelector(state => state.procurement)
    const [optionVendorName, setOptionVendorName] = useState([]);
    const [optionCarrierName, setOptionCarrierName] = useState([]);
    const [addTermsModal, setAddTermsModal] = useState({ isOpen: false, id: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateState = useLocation();

    const onCloseClick = () => {
        setAddTermsModal((prev) => ({ ...prev, isOpen: false, id: "" }));
    };

    const setTermHandler = (obj) => {
        formik.setFieldValue(`mainBox[${addTermsModal.id}].addTerms`, obj);
    };
    useEffect(() => {
        dispatch({ type: GET_CARGO_TYPE_DATA });
        dispatch({ type: GET_CONTAINER_DATA });
        dispatch({ type: GET_UOM_DATA });
        dispatch({ type: GET_AIR_LOCATION_TYPE });
        dispatch({ type: GET_COMMODITY_DATA });
        if (!!navigateState?.state?.id)
            dispatch(getAirPortLocalChargesById(navigateState?.state?.id))
    }, [])

    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType,transportMode:item?.transportMode }
        });
        let carrierList = vendorlist?.filter((item) => item?.type === "CARRIER" && item?.transportMode=='AIR');
        let vendorNewList = vendorlist?.filter((item) => item?.type !== "CARRIER" && item?.transportMode=='AIR');
        setOptionVendorName(vendorNewList);
        setOptionCarrierName(carrierList);
    }, [vendor_data]);


    const formik = useFormik({
        initialValues: {
            chargeCategory: "",
            portName: "",
            terminalName: "",
            movementType: "",
            carrierName: "",
            vendorName: "",
            validityFrom: "",
            validityTo: '',
            mainBox: [{
                chargeCode: "",
                chargeBasis: "",
                currency: "",
                tax: "",
                mainrate: "",
                isSlab: false,
                addTerms: {},
                id: "",
                version: 0,
                subBox: [{
                    id: "",
                    version: 0,
                    cargoType: [],
                    commodity: [],
                    minValue: "",
                    fromSlab: "",
                    toSlab: "",
                    rate: "",
                }],
            }],
        },

        validationSchema: Yup.object({
            mainBox: Yup.array().of(
                Yup.object().shape({
                    chargeCode: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
                        if (typeof value === 'string') {
                            return true;
                        } else if (typeof value === 'object' && value !== null) {
                            return true;
                        } else {
                            return false;
                        }
                    }).required("Please select charge code"),
                    chargeBasis: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
                        if (typeof value === 'string') {
                            return true;
                        } else if (typeof value === 'object' && value !== null) {
                            return true;
                        } else {
                            return false;
                        }
                    }).required('Please select charge basis'),
                    currency: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
                        if (typeof value === 'string') {
                            return true;
                        } else if (typeof value === 'object' && value !== null) {
                            return true;
                        } else {
                            return false;
                        }
                    }).required("Please select currency"),
                    subBox: Yup.array().of(
                        Yup.object({
                            cargoType: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
                                if (typeof value === 'string') {
                                    return true;
                                } else if (typeof value === 'object' && value !== null) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }).required("Please select cargo type"),
                            rate: Yup.string().required("Please enter rate")
                        })
                    )
                })
            )
        }),

        onSubmit: (value) => {
            console.log(value);
            let surchargeValuesArray = value?.mainBox?.map((item) => {
                let newData = item?.subBox?.map((subItem, subIndex) => {
                    let cargoTypeData = subItem?.cargoType?.map((cargoType) => {
                        const subbox = subItem.chargeValue?.find(data => subItem.rate == data.rate &&data.cargoType.type == cargoType.value)
                        let obj = {
                            ...(airportLocalChargesDataById && airportLocalChargesDataById?.id && subItem?.id && subbox && {
                                id: subbox?.id || "",
                                version: subbox?.version || 0
                            }),
                            ...(subItem?.cargoType && {
                                "cargoType": {
                                    "id": cargoType?.id || '',
                                    "version": cargoType?.version || 0
                                }
                            }),
                            ...(subItem?.fromSlab && { "fromSlab": subItem?.fromSlab || 0 }),
                            ...(subItem?.toSlab && { "toSlab": subItem?.toSlab || 0 }),
                            ...(subItem?.rate && { "rate": subItem?.rate || 0 }),
                            ...(subItem?.minValue && { "minValue": subItem?.minValue || 0 }),
                        };
                        if (!(subItem?.commodity && subItem?.commodity.length>0)) {
                            console.log("sub");
                            return obj; 
                        }
                        let commodityData = subItem?.commodity?.map((commodity) => {
                            const subbox = subItem.chargeValue?.find(data => subItem.rate == data.rate && data.cargoType.type == cargoType.value)
                            let obj = {
                                ...(airportLocalChargesDataById && airportLocalChargesDataById?.id && subItem?.id && subbox && {
                                    id: subbox?.id || "",
                                    version: subbox?.version || 0
                                }),
                                ...(subItem?.cargoType && {
                                    "cargoType": {
                                        "id": cargoType?.id || '',
                                        "version": cargoType?.version || 0
                                    }
                                }),
                                ...(commodity && {
                                    "commodity": {
                                        "id": commodity?.id || '',
                                        "version": commodity?.version || 0
                                    }
                                }),
            
                                ...(subItem?.fromSlab && { "fromSlab": subItem?.fromSlab || 0 }),
                                ...(subItem?.toSlab && { "toSlab": subItem?.toSlab || 0 }),
                                ...(subItem?.rate && { "rate": subItem?.rate || 0 }),
                                ...(subItem?.minValue && { "minValue": subItem?.minValue || 0 }),
                            };
                            return obj;
                        });
            
                        return commodityData;
                    }).filter(data => data !== undefined);
                    return cargoTypeData;
                });
                return newData;
            });
            

            let spreadSurArray = surchargeValuesArray?.map((item) => {
                return item.flat(Infinity)
            });

            let data = {
                ...(airportLocalChargesDataById && airportLocalChargesDataById?.id && {
                    id: airportLocalChargesDataById?.id || "",
                    version: airportLocalChargesDataById?.version || 0
                }),
                ...(value?.chargeCategory && {
                    "surchargeCategory": {
                        "id": value?.chargeCategory?.id || 0,
                        "version": value?.chargeCategory?.version || 0
                    }
                }),
                ...(value?.portName && {
                    "airPort": {
                        "id": value?.portName?.id || 0,
                        "version": value?.portName?.version || 0
                    }
                }),

                ...(value?.terminalName && {
                    "oceanPortTerminal": {
                        "id": 1,
                        "version": 0
                    },
                }),

                ...(value?.movementType && { "movementType": value?.movementType?.value || "IMPORT" }),
                ...(value?.carrierName && {
                    "tenantCarrierVendor": {
                        "id": value?.carrierName?.id || '',
                        "version": value?.carrierName?.version || 0
                    },
                }),
                ...(value?.vendorName && {
                    "tenantVendor": {
                        "id": value?.vendorName?.id || '',
                        "version": value?.vendorName?.version || 0
                    },
                }),
                ...(value?.validityFrom && { "validFrom": value?.validityFrom || 0 }),
                ...(value?.validityTo && { "validTo": value?.validityTo || 0 }),
                "vendorAirportChargeDetails": value?.mainBox?.map((item, mainindex) => {
                    return {
                        ...(airportLocalChargesDataById && airportLocalChargesDataById?.id && item?.id && {
                            id: item.id || "",
                            version: item.version || 0
                        }),
                        ...(item?.chargeCode && {
                            "surchargeCode": {
                                "id": item?.chargeCode?.id || '',
                                "version": item?.chargeCode?.version || 0
                            }
                        }),
                        ...(item?.currency && {
                            "currency": {
                                "id": item?.currency?.id || '',
                                "version": item?.currency?.version || 0
                            }
                        }),
                        ...(item?.tax && { "tax": item?.tax || 0 }),
                        ...(item?.chargeBasis && {
                            "unitOfMeasurement": {
                                "id": item?.chargeBasis?.id || '',
                                "version": item?.chargeBasis?.version || 0
                            }
                        }),
                        ...(item?.tax && { "tax": item?.tax || 0 }),

                        "vendorAirportChargeValues": spreadSurArray?.[mainindex],
                    }
                })
            }
            console.log(data);
            dispatch(postAirPortLocalChargesData(data));
            !!navigateState?.state?.id ? "" : formik.resetForm();
        },
    });

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            ...(!!(navigateState?.state?.id) && {
                chargeCategory: airportLocalChargesDataById?.surchargeCategory || "",
                portName: airportLocalChargesDataById?.airPort || "",
                terminalName: "",
                movementType: airportLocalChargesDataById?.movementType || "",
                carrierName: airportLocalChargesDataById?.tenantCarrierVendor || "",
                vendorName: airportLocalChargesDataById?.tenantVendor || "",
                validityFrom: airportLocalChargesDataById?.validFrom || "",
                validityTo: airportLocalChargesDataById?.validTo || '',
                mainBox: airportLocalChargesDataById?.vendorAirportChargeDetails?.map(chargeDetail => ({
                    id: chargeDetail?.id || "",
                    version: chargeDetail.version || 0,
                    chargeCode: chargeDetail?.surchargeCode ? chargeDetail.surchargeCode : "",
                    chargeBasis: chargeDetail?.unitOfMeasurement ? chargeDetail.unitOfMeasurement : "",
                    currency: chargeDetail?.currency ? chargeDetail.currency : "",
                    tax: chargeDetail?.tax || "",
                    isSlab: chargeDetail?.vendorAirportChargeValues?.some(chargeValue => chargeValue.fromSlab || chargeValue.toSlab),
                    addTerms: {},
                    subBox: chargeDetail?.vendorAirportChargeValues.reduce((acc, val) => {
                        const isUnique = !acc.some(item => item.rate === val.rate);
                        if (isUnique) {
                            acc.push(val);
                        }
                        return acc;
                    }, [])?.map(chargeValue => ({
                        chargeValue: chargeDetail?.vendorAirportChargeValues,
                        id: chargeValue?.id || "",
                        version: chargeValue.version || 0,
                        cargoType: chargeDetail?.vendorAirportChargeValues ? (
                            () => {
                                const cargoTypesSet = new Set();
                                chargeDetail?.vendorAirportChargeValues.filter(data =>
                                    data.rate === chargeValue.rate
                                ).forEach(filteredData => {
                                    const cargoTypeString = JSON.stringify(cargoType_data.find(data => data.value == filteredData.cargoType.type));
                                    cargoTypesSet.add(cargoTypeString);
                                });
                                return Array.from(cargoTypesSet).map(value => JSON.parse(value))
                            }
                        )() : [],
                        commodity: chargeDetail?.vendorAirportChargeValues ? (
                            () => {
                                const commoditysSet = new Set();
                                chargeDetail?.vendorAirportChargeValues.filter(data =>
                                    data.rate === chargeValue.rate
                                ).forEach(filteredData => {
                                    if (filteredData?.commodity) {
                                        const commodityString = JSON.stringify(commodity_data.find(data => data.value == filteredData.commodity.name));
                                        commoditysSet.add(commodityString);
                                    }
                                });
                                return Array.from(commoditysSet).map(value => JSON.parse(value))
                            }
                        )() : [],
                        minValue: chargeValue?.minValue || "",
                        fromSlab: chargeValue?.fromSlab || "",
                        toSlab: chargeValue?.toSlab || "",
                        rate: chargeValue?.rate || "",
                    })),
                }))
            }) || {
                chargeCategory: "",
                portName: "",
                terminalName: "",
                movementType: "",
                carrierName: "",
                vendorName: "",
                validityFrom: "",
                validityTo: '',
                mainBox: [{
                    chargeCode: "",
                    chargeBasis: "",
                    currency: "",
                    tax: "",
                    mainrate: "",
                    isSlab: false,
                    addTerms: {},
                    subBox: [{
                        cargoType: [],
                        commodity: [],
                        minValue: "",
                        fromSlab: "",
                        toSlab: "",
                        rate: "",
                    }],
                }],
            }
        });
    }, [airportLocalChargesDataById]);

    return (
        <>
            <div className="page-content">
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
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <div className="row">
                                            {/* Charge Category */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Charge Category</label>
                                                <Select
                                                    value={surchargeCategory_data ? surchargeCategory_data.find((option) => option.value === formik?.values?.chargeCategory?.name) : ""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`chargeCategory`, e);
                                                    }}
                                                    name="chargeCategory"
                                                    options={surchargeCategory_data?.filter((option) => (option?.value !== "DESTINATION TRANSPORTATION" && option?.value !== "ORIGIN TRANSPORTATION" && option?.value !== "OCEAN SURCHARGE")) || []}
                                                    placeholder={"Select Charge Category"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>

                                            {/* Port Name */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">AirPort Name<span className='required_star'>*</span></label>
                                                <Select
                                                    name="portName"
                                                    value={airLocation ? airLocation.find((option) => option.value === formik?.values?.portName?.name) : ""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`portName`, e);
                                                    }}
                                                    options={airLocation}
                                                    placeholder={"Select Port Name"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>

                                            {/* Terminal Name */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Terminal Name</label>
                                                <Select
                                                    name="terminalName"
                                                    value={terminalName ? terminalName.find((option) => option.value === formik.values.terminalName) : ""}
                                                    isDisabled={true}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`terminalName`, e.value);
                                                    }}
                                                    options={terminalName}
                                                    placeholder={"Select Terminal Name"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>

                                            {/* Movement Type */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Movement Type<span className='required_star'>*</span></label>
                                                <Select
                                                    name="movementType"
                                                    value={optionMovementType ? optionMovementType.find((option) => option.value === formik.values.movementType) : ""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`movementType`, e);
                                                    }}
                                                    options={optionMovementType}
                                                    placeholder={"Select Movement Type"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>

                                            {/* Carrier Name */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Carrier Name<span className='required_star'>*</span></label>
                                                <Select
                                                    name="carrierName"
                                                    value={optionCarrierName ? optionCarrierName.find((option) => option.value === formik.values.carrierName?.name) : ""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`carrierName`, e);
                                                    }}
                                                    options={optionCarrierName}
                                                    placeholder={"Select Carrier Name"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>

                                            {/* Vendor Name */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Agent Name</label>
                                                <Select
                                                    name="vendorName"
                                                    value={optionVendorName ? optionVendorName.find((option) => option.value === formik.values.vendorName?.name) : ""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`vendorName`, e);
                                                    }}
                                                    options={optionVendorName}
                                                    placeholder={"Select Vendor Name"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>

                                            {/* Validity From */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Validity From<span className='required_star'>*</span></label>
                                                <input
                                                    type="date"
                                                    name="validityFrom"
                                                    id="validity_from"
                                                    value={formik.values.validityFrom}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                />
                                            </div>

                                            {/* Validity To */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Validity To<span className='required_star'>*</span></label>
                                                <input
                                                    type="date"
                                                    name="validityTo"
                                                    id="validity_to"
                                                    value={formik.values.validityTo}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <hr />
                                        <div className="p-3"></div>

                                        {/* Field Array started------------------------------------------------- */}
                                        <FormikProvider value={formik}>
                                            <FieldArray name="mainBox">
                                                {(arrayHelpers, i) => {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            {formik.values.mainBox && formik.values.mainBox.length > 0 &&
                                                                formik.values.mainBox.map((item, index) => (
                                                                    <Card key={index} className={`sub_field_wrap`}>
                                                                        <CardBody>
                                                                            <div className="row" key={index}>
                                                                                {/* Charge Code */}
                                                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Charge Code<span className='required_star'>*</span></label>
                                                                                    <Select
                                                                                        name={`mainBox[${index}].chargeCode`}
                                                                                        value={surchargeCode_data ? surchargeCode_data.find((option) => option.value === formik.values.mainBox[index].chargeCode?.code) : ""}
                                                                                        onChange={(e) => {
                                                                                            if (e.label == "Add New") {
                                                                                                navigate("/freight/ocean/upload/fcl-pl/add-new", { state: { id: 'fcl-pl' } })
                                                                                            }
                                                                                            formik.setFieldValue(`mainBox[${index}].chargeCode`, e);
                                                                                        }}
                                                                                        options={[
                                                                                            ...surchargeCode_data || [],
                                                                                            { label: "Add New", value: "Add New" }
                                                                                        ]}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                        onBlur={formik.handleBlur}
                                                                                        invalid={
                                                                                            formik.touched.mainBox &&
                                                                                                formik.touched.mainBox[index] &&
                                                                                                formik.errors.mainBox &&
                                                                                                formik.errors.mainBox[index] &&
                                                                                                formik.errors.mainBox[index].chargeCode
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                    />
                                                                                    {formik.touched.mainBox &&
                                                                                        formik.touched.mainBox[index] &&
                                                                                        formik.errors.mainBox &&
                                                                                        formik.errors.mainBox[index] &&
                                                                                        formik.errors.mainBox[index].chargeCode ? (
                                                                                        <FormFeedback>{formik.errors.mainBox[index].chargeCode}</FormFeedback>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Charge Basis */}
                                                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Charge Basis<span className='required_star'>*</span></label>
                                                                                    <Select
                                                                                        name={`mainBox[${index}].chargeBasis`}
                                                                                        value={UOM_data ? UOM_data.find((option) => option.value === formik.values.mainBox[index].chargeBasis.code) : ""}
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`mainBox[${index}].chargeBasis`, e);
                                                                                        }}
                                                                                        options={UOM_data?.filter(data => data.transportMode == "AIR")}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                        onBlur={formik.handleBlur}
                                                                                        invalid={
                                                                                            formik.touched.mainBox &&
                                                                                                formik.touched.mainBox[index] &&
                                                                                                formik.errors.mainBox &&
                                                                                                formik.errors.mainBox[index] &&
                                                                                                formik.errors.mainBox[index].chargeBasis
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                    />
                                                                                    {formik.touched.mainBox &&
                                                                                        formik.touched.mainBox[index] &&
                                                                                        formik.errors.mainBox &&
                                                                                        formik.errors.mainBox[index] &&
                                                                                        formik.errors.mainBox[index].chargeBasis ? (
                                                                                        <FormFeedback>{formik.errors.mainBox[index].chargeBasis}</FormFeedback>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Currency */}
                                                                                <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Currency<span className='required_star'>*</span></label>
                                                                                    <Select
                                                                                        name={`mainBox[${index}].currency`}
                                                                                        value={currency_data ? currency_data.find((option) => option.value === formik.values.mainBox[index].currency.currencyName) : ""}
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`mainBox[${index}].currency`, e);
                                                                                        }}
                                                                                        options={currency_data}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                        onBlur={formik.handleBlur}
                                                                                        invalid={
                                                                                            formik.touched.mainBox &&
                                                                                                formik.touched.mainBox[index] &&
                                                                                                formik.errors.mainBox &&
                                                                                                formik.errors.mainBox[index] &&
                                                                                                formik.errors.mainBox[index].currency
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                    />
                                                                                    {formik.touched.mainBox &&
                                                                                        formik.touched.mainBox[index] &&
                                                                                        formik.errors.mainBox &&
                                                                                        formik.errors.mainBox[index] &&
                                                                                        formik.errors.mainBox[index].currency ? (
                                                                                        <FormFeedback>{formik.errors.mainBox[index].currency}</FormFeedback>
                                                                                    ) : null}
                                                                                </div>


                                                                                {/* Min Value */}
                                                                                {/* <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Min Value </label>
                                                                                    <Input
                                                                                        type="text"
                                                                                        name={`mainBox[${index}].minValue`}
                                                                                        placeholder="Enter minvalue"
                                                                                        value={formik.values.mainBox[index].minValue}
                                                                                        onChange={formik.handleChange}
                                                                                    />
                                                                                </div> */}

                                                                                <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Tax(Optional) </label>
                                                                                    <Input
                                                                                        type="number"
                                                                                        name={`mainBox[${index}].tax`}
                                                                                        placeholder="Enter tax"
                                                                                        value={formik.values.mainBox[index].tax}
                                                                                        onChange={formik.handleChange}
                                                                                    />
                                                                                </div>

                                                                                {/* Rate Value */}
                                                                                {/* <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Rate<span className='required_star'>*</span></label>
                                                                                    <Input
                                                                                        type="text"
                                                                                        name={`mainBox[${index}].mainrate`}
                                                                                        value={formik.values.mainBox[index].mainrate || ''}
                                                                                        onChange={formik.handleChange}
                                                                                        disabled={formik.values.mainBox[index].isSlab}
                                                                                    />
                                                                                </div> */}

                                                                                {/* checkbox */}
                                                                                <div className="col-lg-2 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-between">
                                                                                    <div>
                                                                                        <div className="form-check mt-3">
                                                                                            <input className="form-check-input" type="checkbox" id="add_slab"
                                                                                                name={`mainBox[${index}].isSlab`}
                                                                                                onChange={() => {
                                                                                                    formik.setFieldValue(`mainBox[${index}].mainrate`, '');
                                                                                                    formik.setFieldValue(`mainBox[${index}].isSlab`, !formik.values.mainBox[index].isSlab);
                                                                                                }}
                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="add_slab">
                                                                                                Add Slab (Optional)
                                                                                            </label>
                                                                                        </div>
                                                                                        {/* <div className="form-check">
                                                                                            <input className="form-check-input" type="checkbox" id="add_rules"
                                                                                                onChange={(e) => {
                                                                                                    if (e.target.checked) {
                                                                                                        setAddTermsModal({
                                                                                                            isOpen: true,
                                                                                                            id: index,
                                                                                                        });
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="add_rules">
                                                                                                Add Rules (Optional)
                                                                                            </label>
                                                                                        </div>
                                                                                        <div className="form-check">
                                                                                            <input className="form-check-input" type="checkbox" id="add_slab"
                                                                                                // name={`mainBox[${index}].isSlab`}
                                                                                                // onChange={() => {
                                                                                                //     formik.setFieldValue(`mainBox[${index}].mainrate`, '');
                                                                                                //     formik.setFieldValue(`mainBox[${index}].isSlab`, !formik.values.mainBox[index].isSlab);
                                                                                                // }}
                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="add_slab">
                                                                                                Add Sector (Optional)
                                                                                            </label>
                                                                                        </div>
                                                                                        <div className="form-check">
                                                                                            <input className="form-check-input" type="checkbox" id="add_slab"
                                                                                                // name={`mainBox[${index}].isSlab`}
                                                                                                // onChange={() => {
                                                                                                //     formik.setFieldValue(`mainBox[${index}].mainrate`, '');
                                                                                                //     formik.setFieldValue(`mainBox[${index}].isSlab`, !formik.values.mainBox[index].isSlab);
                                                                                                // }}
                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="add_slab">
                                                                                                Add Commodity (Optional)
                                                                                            </label>
                                                                                        </div> */}
                                                                                    </div>
                                                                                    <div>
                                                                                        {formik.values.mainBox.length >
                                                                                            1 && (
                                                                                                <button
                                                                                                    className="btn m-1 border"
                                                                                                    onClick={() => { arrayHelpers.remove(index); }}
                                                                                                >
                                                                                                    <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                                                                </button>
                                                                                            )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* SUB Field Array started------------------------------------------------- */}
                                                                            {(
                                                                                <FieldArray name={`mainBox[${index}].subBox`} >
                                                                                    {(arrayHelpersTwo, i) => {
                                                                                        return (
                                                                                            <Card key={i}>
                                                                                                <CardBody>
                                                                                                    {item.subBox && item.subBox.length > 0 && item.subBox.map((subItem, subIndex) => {
                                                                                                        return (
                                                                                                            <React.Fragment key={subIndex}>
                                                                                                                {(
                                                                                                                    <div className="row mb-3">
                                                                                                                        {/* cargo type */}
                                                                                                                        <div className="col-md-3 mb-2">
                                                                                                                            <label className="form-label"> Cargo Type<span className='required_star'>*</span></label>
                                                                                                                            <Select
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                                                                                                                value={formik.values.mainBox[index].subBox[subIndex].cargoType}
                                                                                                                                onChange={(e) => {
                                                                                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].cargoType`, e);
                                                                                                                                }}
                                                                                                                                isMulti
                                                                                                                                options={cargoType_data.filter(data => data.transportMode == "AIR")}
                                                                                                                                classNamePrefix="select2-selection form-select"
                                                                                                                                onBlur={formik.handleBlur}
                                                                                                                                invalid={
                                                                                                                                    formik.touched.mainBox &&
                                                                                                                                        formik.touched.mainBox[index] &&
                                                                                                                                        formik.errors.mainBox &&
                                                                                                                                        formik.errors.mainBox[index] &&
                                                                                                                                        formik.errors.mainBox[index].subBox &&
                                                                                                                                        formik.errors.mainBox[index].subBox[subIndex] &&
                                                                                                                                        formik.errors.mainBox[index].subBox[subIndex].cargoType
                                                                                                                                        ? true
                                                                                                                                        : false
                                                                                                                                }
                                                                                                                            />
                                                                                                                            {formik.touched.mainBox &&
                                                                                                                                formik.touched.mainBox[index] &&
                                                                                                                                formik.errors.mainBox &&
                                                                                                                                formik.errors.mainBox[index] &&
                                                                                                                                formik.errors.mainBox[index].subBox &&
                                                                                                                                formik.errors.mainBox[index].subBox[subIndex] &&
                                                                                                                                formik.errors.mainBox[index].subBox[subIndex].cargoType ? (
                                                                                                                                <FormFeedback>{formik.errors.mainBox[index].subBox[subIndex].cargoType}</FormFeedback>
                                                                                                                            ) : null}
                                                                                                                        </div>

                                                                                                                        {/* Commodity */}
                                                                                                                        <div className="col-md-3 mb-2">
                                                                                                                            <label className="form-label"> Commodity</label>
                                                                                                                            <Select
                                                                                                                                isMulti
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].commodity`}
                                                                                                                                value={formik.values.mainBox[index].subBox[subIndex].commodity}
                                                                                                                                isDisabled={!(formik.values.mainBox[index].subBox[subIndex].cargoType?.find(data=>data.value=="PERISHABLE") && formik.values.mainBox[index].subBox[subIndex].cargoType.length==1)}
                                                                                                                                onChange={(e) => {
                                                                                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].commodity`, e);
                                                                                                                                }}
                                                                                                                                options={commodity_data || []}
                                                                                                                                classNamePrefix="select2-selection form-select"
                                                                                                                            />
                                                                                                                        </div>

                                                                                                                        {/* min value */}
                                                                                                                        <div className="col-md-1 mb-2">
                                                                                                                            <label className="form-label"> Min Value</label>
                                                                                                                            <Input
                                                                                                                                type="number"
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].minValue`}
                                                                                                                                value={formik.values.mainBox[index].subBox[subIndex].minValue || ''}
                                                                                                                                onChange={
                                                                                                                                    formik.handleChange
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </div>

                                                                                                                        {formik.values.mainBox[index].isSlab && (
                                                                                                                            <div className="col-md-1 mb-2">
                                                                                                                                <label className="form-label">From Slab </label>
                                                                                                                                <Input
                                                                                                                                    type="number"
                                                                                                                                    name={`mainBox[${index}].subBox[${subIndex}].fromSlab`}
                                                                                                                                    value={formik.values.mainBox[index].subBox[subIndex].fromSlab || ''}
                                                                                                                                    onChange={
                                                                                                                                        formik.handleChange
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        )}
                                                                                                                        {formik.values.mainBox[index].isSlab && (
                                                                                                                            <div className="col-md-1 mb-2">
                                                                                                                                <label className="form-label"> To Slab</label>
                                                                                                                                <Input
                                                                                                                                    type="number"
                                                                                                                                    name={`mainBox[${index}].subBox[${subIndex}].toSlab`}
                                                                                                                                    value={formik.values.mainBox[index].subBox[subIndex].toSlab || ''}
                                                                                                                                    onChange={
                                                                                                                                        formik.handleChange
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        )}

                                                                                                                        <div className={"col-md-1 mb-2 pr-0"}>
                                                                                                                            <label className="form-label"> Rate<span className='required_star'>*</span></label>
                                                                                                                            <Input
                                                                                                                                type="number"
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].rate`}
                                                                                                                                required
                                                                                                                                value={formik.values.mainBox[index].subBox[subIndex].rate || ''}
                                                                                                                                onChange={formik.handleChange}
                                                                                                                                onBlur={formik.handleBlur}
                                                                                                                                invalid={
                                                                                                                                    formik.touched.mainBox &&
                                                                                                                                        formik.touched.mainBox[index] &&
                                                                                                                                        formik.errors.mainBox &&
                                                                                                                                        formik.errors.mainBox[index] &&
                                                                                                                                        formik.errors.mainBox[index].subBox &&
                                                                                                                                        formik.errors.mainBox[index].subBox[subIndex] &&
                                                                                                                                        formik.errors.mainBox[index].subBox[subIndex].rate
                                                                                                                                        ? true
                                                                                                                                        : false
                                                                                                                                }
                                                                                                                            />
                                                                                                                            {formik.touched.mainBox &&
                                                                                                                                formik.touched.mainBox[index] &&
                                                                                                                                formik.errors.mainBox &&
                                                                                                                                formik.errors.mainBox[index] &&
                                                                                                                                formik.errors.mainBox[index].subBox &&
                                                                                                                                formik.errors.mainBox[index].subBox[subIndex] &&
                                                                                                                                formik.errors.mainBox[index].subBox[subIndex].rate ? (
                                                                                                                                <FormFeedback>{formik.errors.mainBox[index].subBox[subIndex].rate}</FormFeedback>
                                                                                                                            ) : null}
                                                                                                                        </div>


                                                                                                                        {/* Add remove  */}
                                                                                                                        <div className="col-md-1 p-0 mt-2 d-flex justify-content-end align-items-center">
                                                                                                                            <div>
                                                                                                                                {formik.values.mainBox[index].subBox.length > 1 && (
                                                                                                                                    <button
                                                                                                                                        className="btn border"
                                                                                                                                        onClick={() => {
                                                                                                                                            arrayHelpersTwo.remove(subIndex);
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                                                                                                    </button>
                                                                                                                                )}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                )}
                                                                                                            </React.Fragment>
                                                                                                        );
                                                                                                    }
                                                                                                    )}

                                                                                                    <div>
                                                                                                        <button
                                                                                                            className="btn btn-primary me-2"
                                                                                                            onClick={() => {
                                                                                                                arrayHelpersTwo.push(
                                                                                                                    {
                                                                                                                        fromSlab: "",
                                                                                                                        toSlab: "",
                                                                                                                        rate: "",
                                                                                                                    }
                                                                                                                );
                                                                                                            }}
                                                                                                        >
                                                                                                            <i className="bx bx-plus"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </CardBody>
                                                                                            </Card>
                                                                                        );
                                                                                    }}
                                                                                </FieldArray>
                                                                            )}
                                                                            {/* SUB Field Array ended------------------------------------------------- */}
                                                                        </CardBody>
                                                                    </Card>
                                                                )
                                                                )}
                                                            {/* add button of main box  */}
                                                            <div>
                                                                <button
                                                                    className="btn btn-primary m-1"
                                                                    onClick={() => {
                                                                        arrayHelpers.push({
                                                                            chargeCode: "",
                                                                            chargeBasis: "",
                                                                            slabBasis: "",
                                                                            currency: "",
                                                                            mainrate: "",
                                                                            tax: "",
                                                                            isSlab: false,
                                                                            addTerms: false,
                                                                            subBox: [{
                                                                                fromSlab: "",
                                                                                toSlab: "",
                                                                                rate: "",
                                                                                minValue: "",
                                                                                cargoType: [],
                                                                                commodity: [],
                                                                            }],
                                                                        });
                                                                    }}
                                                                    disabled={isAnyValueEmpty(formik.values, ['terminalName', 'vendorName'])}
                                                                >
                                                                    <i className="bx bx-plus align-middle me-1"></i> Add
                                                                </button>
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                }}
                                            </FieldArray>
                                        </FormikProvider>

                                        {/* <ModalAddTerm
                      modal={addTermsModal}
                      onCloseClick={onCloseClick}
                      setTermHandler={setTermHandler}
                    />      */}
                                        <div className="row">
                                            <div className="d-flex justify-content-center">
                                                <div className="mt-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={isAnyValueEmpty(formik.values, ['terminalName', 'vendorName', 'chargeCategory'])}> Save </button>
                                                    {/* <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={!(!isAnyValueEmpty(formik.values.mainBox, ['minValue','addTerms']) && !isAnyValueEmptyInArray(formik.values.mainBox[0].subBox))}> Save </button> */}
                                                </div>
                                                <div className="mt-3 mx-3 d-flex justify-content-end">
                                                    <button
                                                        className=" btn btn-primary"
                                                        onClick={() => { navigate(-1); }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container >
            </div >
        </>
    );
}
