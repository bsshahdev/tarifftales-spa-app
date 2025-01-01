import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, FormFeedback, Input, Row } from "reactstrap";
import { optionBookingType, optionMovementType } from "../../../../../common/data/procurement";
import { isAnyValueEmpty } from "../../../../../components/Common/CommonLogic";
import { GET_CARGO_TYPE_DATA, GET_COMMODITY_DATA, GET_CONTAINER_DATA, GET_UOM_DATA } from "../../../../../store/Global/actiontype";
import { getAirlineChargesDataById, postAirlineChargesData } from "../../../../../store/Procurement/actions";
import { GET_AIR_LOCATION_TYPE } from "../../../../../store/InstantRate/actionType";
import * as Yup from "yup";

export default function UploadAirLineCharges() {
    const { vendor_data, commodity_data, surchargeCode_data, UOM_data, currency_data, cargoType_data } = useSelector(state => state?.globalReducer);
    const { airLocation } = useSelector((state) => state.instantRate);
    const [optionVendorName, setOptionVendorName] = useState([]);
    const [optionCarrierName, setOptionCarrierName] = useState([]);
    const [addTermsModal, setAddTermsModal] = useState({ isOpen: false, id: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const { airLineChargesDataById } = useSelector(state => state.procurement)
    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType }
        });
        let carrierList = vendorlist?.filter((item) => item?.type === "CARRIER");
        let vendorNewList = vendorlist?.filter((item) => item?.type !== "CARRIER");
        setOptionVendorName(vendorNewList);
        setOptionCarrierName(carrierList);
    }, [vendor_data]);

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
            dispatch(getAirlineChargesDataById(navigateState?.state?.id))
    }, [])

    const formik = useFormik({
        initialValues: {
            carrierName: "",
            vendorName: "",
            bookingMode: "",
            mainBox: [
                {
                    chargeCode: "",
                    chargeBasis: "",
                    currency: "",
                    validFrom: "",
                    validTo: "",
                    tax: "",
                    isSlab: false,
                    addTerms: {},
                    subBox: [{
                        id: '',
                        version: '',
                        originPort: "",
                        destinataionPort: "",
                        flightNumber: "",
                        cargoType: [],
                        commodity: [],
                        slab: [{
                            minVal: "",
                            fromSlab: "",
                            toSlab: "",
                            rate: "",
                        }],
                        rate: "",
                    }],
                },
            ],
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
                    validFrom: Yup.string().required("Please select Valid From"),
                    validTo: Yup.string().required("Please select Valid To"),

                    subBox: Yup.array().of(
                        Yup.object({
                            // cargoType: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
                            //     if (typeof value === 'string') {
                            //         return true;
                            //     } else if (typeof value === 'object' && value !== null) {
                            //         return true;
                            //     } else {
                            //         return false;
                            //     }
                            // }).required("Please select cargo type"),
                            rate: Yup.string().required("Please enter rate")
                        })
                    )
                })
            )
        }),

        onSubmit: (value) => {
            let surchargeValuesArray = value?.mainBox?.map((item) => {
                let newData = item?.subBox?.map((subItem, subIndex) => {
                    let slabData = subItem?.slab?.map((slab) => {
                        console.log(subItem?.rate);
                        const subbox = subItem.chargeValue?.find(data => subItem.rate == data.rate)
                        let obj = {
                            ...(airLineChargesDataById && subbox && {
                                id: subbox.id || "",
                                version: subbox.version || 0
                            }),
                            ...(airLineChargesDataById && !subbox && subItem.id && {
                                id: subItem.id || "",
                                version: subItem.version || 0
                            }),
                            ...(item?.chargeCode && {
                                "surchargeCode": {
                                    "id": item?.chargeCode?.id || '',
                                    "version": item?.chargeCode?.version || 0
                                }
                            }),
                            ...(item?.validFrom && { "validFrom": item?.validFrom || 0 }),
                            ...(item?.validTo && { "validTo": item?.validTo || 0 }),
                            ...(item?.currency && {
                                "currency": {
                                    "id": item?.currency?.id || '',
                                    "version": item?.currency?.version || 0
                                }
                            }),

                            ...(item?.chargeBasis && {
                                "unitOfMeasurement": {
                                    "id": item?.chargeBasis?.id || '',
                                    "version": item?.chargeBasis?.version || 0
                                }
                            }),

                            ...(subItem?.originPort && {
                                "originPort": {
                                    "id": subItem?.originPort?.id || '',
                                    "version": subItem?.originPort?.version || 0
                                }
                            }),
                            ...(subItem?.destinataionPort && {
                                "destinationPort": {
                                    "id": subItem?.destinataionPort?.id || '',
                                    "version": subItem?.destinataionPort?.version || 0
                                }
                            }),
                            ...(item?.tax && { "tax": item?.tax || 0 }),
                            ...(subItem?.rate && { "rate": subItem?.rate || 0 }),
                            ...(slab?.fromSlab && { "fromSlab": slab?.fromSlab || 0 }),
                            ...(slab?.toSlab && { "toSlab": slab?.toSlab || 0 }),
                            ...(subItem?.rate && { "rate": subItem?.rate || 0 }),
                            ...(slab?.rate && { "rate": slab?.rate || 0 }),
                            ...(slab?.minVal && { "minValue": slab?.minVal || 0 }),
                            ...(subItem?.flightNumber && { "flightNumber": subItem?.flightNumber || 0 }),
                        };
                        if (!(subItem?.cargoType && subItem?.cargoType.length > 0)) {
                            console.log("i am in");
                            return obj;
                        }
                        let cargoTypeData = subItem?.cargoType?.map((cargoType) => {
                            const subbox = subItem.chargeValue?.find(data => subItem.rate == data.rate && data.cargoType.type == cargoType.value)
                            let obj = {
                                ...(airLineChargesDataById && subbox && {
                                    id: subbox.id || "",
                                    version: subbox.version || 0
                                }),
                                ...(airLineChargesDataById && !subbox && subItem.id && {
                                    id: subItem.id || "",
                                    version: subItem.version || 0
                                }),
                                ...(item?.chargeCode && {
                                    "surchargeCode": {
                                        "id": item?.chargeCode?.id || '',
                                        "version": item?.chargeCode?.version || 0
                                    }
                                }),
                                ...(item?.validFrom && { "validFrom": item?.validFrom || 0 }),
                                ...(item?.validTo && { "validTo": item?.validTo || 0 }),
                                ...(item?.currency && {
                                    "currency": {
                                        "id": item?.currency?.id || '',
                                        "version": item?.currency?.version || 0
                                    }
                                }),

                                ...(item?.chargeBasis && {
                                    "unitOfMeasurement": {
                                        "id": item?.chargeBasis?.id || '',
                                        "version": item?.chargeBasis?.version || 0
                                    }
                                }),
                                ...(subItem?.cargoType && {
                                    "cargoType": {
                                        "id": cargoType?.id || '',
                                        "version": cargoType?.version || 0
                                    }
                                }),
                                ...(subItem?.originPort && {
                                    "originPort": {
                                        "id": subItem?.originPort?.id || '',
                                        "version": subItem?.originPort?.version || 0
                                    }
                                }),
                                ...(subItem?.destinataionPort && {
                                    "destinationPort": {
                                        "id": subItem?.destinataionPort?.id || '',
                                        "version": subItem?.destinataionPort?.version || 0
                                    }
                                }),
                                ...(item?.tax && { "tax": item?.tax || 0 }),
                                ...(subItem?.rate && { "rate": subItem?.rate || 0 }),
                                ...(subItem?.flightNumber && { "flightNumber": subItem?.flightNumber || 0 }),
                            };
                            if (!(subItem?.commodity && subItem?.commodity.length > 0)) {
                                return obj;
                            }
                            let commodityData = subItem?.commodity?.map((commodity) => {

                                const subbox = subItem.chargeValue?.find(data => subItem.rate == data.rate && data.cargoType.type == cargoType.value)
                                let obj = {
                                    ...(airLineChargesDataById && subbox && {
                                        id: subbox.id || "",
                                        version: subbox.version || 0
                                    }),
                                    ...(airLineChargesDataById && !subbox && subItem.id && {
                                        id: subItem.id || "",
                                        version: subItem.version || 0
                                    }),
                                    ...(item?.chargeCode && {
                                        "surchargeCode": {
                                            "id": item?.chargeCode?.id || '',
                                            "version": item?.chargeCode?.version || 0
                                        }
                                    }),
                                    ...(item?.validFrom && { "validFrom": item?.validFrom || 0 }),
                                    ...(item?.validTo && { "validTo": item?.validTo || 0 }),
                                    ...(item?.currency && {
                                        "currency": {
                                            "id": item?.currency?.id || '',
                                            "version": item?.currency?.version || 0
                                        }
                                    }),

                                    ...(item?.chargeBasis && {
                                        "unitOfMeasurement": {
                                            "id": item?.chargeBasis?.id || '',
                                            "version": item?.chargeBasis?.version || 0
                                        }
                                    }),
                                    ...(subItem?.cargoType && {
                                        "cargoType": {
                                            "id": cargoType?.id || '',
                                            "version": cargoType?.version || 0
                                        }
                                    }),
                                    ...(subItem?.commodity && {
                                        "commodity": {
                                            "id": commodity?.id || '',
                                            "version": commodity?.version || 0
                                        }
                                    }),
                                    ...(subItem?.originPort && {
                                        "originPort": {
                                            "id": subItem?.originPort?.id || '',
                                            "version": subItem?.originPort?.version || 0
                                        }
                                    }),
                                    ...(subItem?.destinataionPort && {
                                        "destinationPort": {
                                            "id": subItem?.destinataionPort?.id || '',
                                            "version": subItem?.destinataionPort?.version || 0
                                        }
                                    }),
                                    ...(item?.tax && { "tax": item?.tax || 0 }),
                                    ...(slab?.fromSlab && { "fromSlab": slab?.fromSlab || 0 }),
                                    ...(slab?.toSlab && { "toSlab": slab?.toSlab || 0 }),
                                    ...(subItem?.rate && { "rate": subItem?.rate || 0 }),
                                    ...(slab?.rate && { "rate": slab?.rate || 0 }),
                                    ...(slab?.minVal && { "minValue": slab?.minVal || 0 }),
                                    ...(subItem?.flightNumber && { "flightNumber": subItem?.flightNumber || 0 }),
                                }
                                return obj

                            })
                            return commodityData;
                        });
                        return cargoTypeData;
                    })
                    return slabData;
                });
                return newData
            });

            let spreadSurArray = surchargeValuesArray?.map((item) => {
                return item.flat(Infinity)
            });
            let finalArray = spreadSurArray?.reduce((acc, val) => acc.concat(val), []);

            let data = {
                ...(airLineChargesDataById && {
                    id: airLineChargesDataById?.id || "",
                    version: airLineChargesDataById?.version || 0
                }),

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
                ...(value?.bookingMode && { "bookingModeType": value?.bookingMode?.value || airLineChargesDataById?.bookingModeType || "MAWB" }),
                "vendorAirlineChargeValues": finalArray
            }
            dispatch(postAirlineChargesData(data));
            !!navigateState?.state?.id ? "" : formik.resetForm();

        },
    });


    useEffect(() => {
        if (navigateState?.state?.id && airLineChargesDataById) {
            const uniqueValues = new Set(
                airLineChargesDataById?.vendorAirlineChargeValues?.map(chargeValue => JSON.stringify({
                    surchargeCode: chargeValue?.surchargeCode || "",
                    unitOfMeasurement: chargeValue?.unitOfMeasurement || "",
                    currency: chargeValue?.currency || "",
                    validFrom: chargeValue?.validFrom || "",
                    validTo: chargeValue?.validTo || "",
                    tax: chargeValue?.tax || "",
                }))
            );
            const distinctVendorAirlineChargeValues = Array.from(uniqueValues).map(value => JSON.parse(value));
            formik.setValues({
                ...formik.values,
                ...(!!(navigateState?.state?.id) && {
                    bookingMode: airLineChargesDataById?.bookingModeType || "",
                    carrierName: airLineChargesDataById?.tenantCarrierVendor || "",
                    vendorName: airLineChargesDataById?.tenantVendor || "",
                    mainBox: distinctVendorAirlineChargeValues?.map(chargeValue => ({
                        chargeCode: chargeValue?.surchargeCode ? chargeValue.surchargeCode : "",
                        chargeBasis: chargeValue?.unitOfMeasurement ? chargeValue.unitOfMeasurement : "",
                        currency: chargeValue?.currency ? chargeValue.currency : "",
                        validFrom: chargeValue?.validFrom || '',
                        validTo: chargeValue?.validTo || "",
                        tax: chargeValue?.tax || "",
                        isSlab: airLineChargesDataById?.vendorAirlineChargeValues?.some(chargeValue => chargeValue.fromSlab || chargeValue.toSlab),
                        id: chargeValue?.id,
                        version: chargeValue?.version,
                        addTerms: {},
                        subBox: airLineChargesDataById?.vendorAirlineChargeValues.reduce((acc, val) => {
                            const isUnique = !acc.some(item =>
                                item.minValue === val.minValue &&
                                item.rate === val.rate &&
                                item.originPort?.name == val.originPort?.name &&
                                item.destinataionPort?.name == val.destinataionPort?.name
                            );
                            if (isUnique) {
                                acc.push(val);
                            }
                            return acc;
                        }, []).filter(data =>
                            chargeValue.surchargeCode?.code === data.surchargeCode?.code &&
                            chargeValue.unitOfMeasurement?.code === data.unitOfMeasurement?.code &&
                            chargeValue.currency.currencyName === data.currency.currencyName &&
                            chargeValue.validFrom === data.validFrom &&
                            chargeValue.validTo === data.validTo
                        ).map(chargeValue => ({
                            id: chargeValue.id || "",
                            version: chargeValue.version || '',
                            chargeValue: airLineChargesDataById?.vendorAirlineChargeValues,
                            originPort: chargeValue?.originPort ? chargeValue.originPort : "",
                            destinataionPort: chargeValue?.destinationPort ? chargeValue?.destinationPort : "",
                            id: chargeValue?.id || "",
                            version: chargeValue?.version || 0,
                            cargoType: airLineChargesDataById ? (
                                () => {
                                    const cargoTypesSet = new Set();
                                    airLineChargesDataById?.vendorAirlineChargeValues.filter(data =>
                                        data?.destinationPort?.name === chargeValue?.destinationPort?.name &&
                                        data?.originPort?.name === chargeValue?.originPort?.name
                                    ).forEach(filteredData => {
                                        if (filteredData?.cargoType) {
                                            const cargoTypeString = JSON.stringify(cargoType_data.find(data => data.value == filteredData.cargoType.type));
                                            cargoTypesSet.add(cargoTypeString);
                                        }
                                    });
                                    return Array.from(cargoTypesSet).map(value => JSON.parse(value))
                                }
                            )() : [],
                            commodity: airLineChargesDataById ? (
                                () => {
                                    const commoditysSet = new Set();
                                    airLineChargesDataById?.vendorAirlineChargeValues.filter(data =>
                                        data?.destinationPort?.name === chargeValue?.destinationPort?.name &&
                                        data?.originPort?.name === chargeValue?.originPort?.name
                                    ).forEach(filteredData => {
                                        if (filteredData?.commodity) {
                                            const commodityString = JSON.stringify(commodity_data.find(data => data.value == filteredData.commodity.name));
                                            commoditysSet.add(commodityString);
                                        }
                                    });
                                    return Array.from(commoditysSet).map(value => JSON.parse(value))
                                }
                            )() : [],
                            flightNumber: chargeValue?.flightNumber || "",
                            rate: chargeValue?.rate || "",
                            slab: [{
                                minVal: chargeValue.minValue,
                                fromSlab: chargeValue.fromSlab,
                                toSlab: chargeValue.toSlab,
                                rate: chargeValue.minValue || chargeValue.fromSlab || chargeValue.toSlab ? chargeValue.rate:"" || "",
                            }],
                        })),
                    }))
                }) || {
                    carrierName: "",
                    vendorName: "",
                    bookingMode: "",
                    mainBox: [
                        {
                            chargeCode: "",
                            chargeBasis: "",
                            currency: "",
                            validFrom: "",
                            validTo: "",
                            tax: "",
                            isSlab: false,
                            addTerms: {},
                            subBox: [{
                                originPort: "",
                                destinataionPort: "",
                                flightNumber: "",
                                cargoType: [],
                                commodity: [],
                                slab: [{
                                    minVal: "",
                                    fromSlab: "",
                                    toSlab: "",
                                    rate: "",
                                }],
                                rate: "",
                            }],
                        },
                    ],
                }
            });
        }

    }, [airLineChargesDataById]);


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

                                            {/* Carrier Name */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Carrier Name<span className='required_star'>*</span></label>
                                                <Select
                                                    name="carrierName"
                                                    value={optionCarrierName ? optionCarrierName.find((option) => option.value === formik?.values?.carrierName?.name) : ""}
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
                                                    value={optionVendorName ? optionVendorName.find((option) => option.value === formik?.values?.vendorName?.name) : ""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`vendorName`, e);
                                                    }}
                                                    options={optionVendorName}
                                                    placeholder={"Select Vendor Name"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Booking Mode<span className='required_star'>*</span></label>
                                                <Select
                                                    name="bookingMode"
                                                    value={optionBookingType ? optionBookingType.find((option) => option.value === formik?.values?.bookingMode) : ""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`bookingMode`, e);
                                                    }}
                                                    options={optionBookingType || []}
                                                    placeholder={"Select booking Name"}
                                                    classNamePrefix="select2-selection form-select"
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
                                                                                <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
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
                                                                                <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Charge Basis<span className='required_star'>*</span></label>
                                                                                    <Select
                                                                                        name={`mainBox[${index}].chargeBasis`}
                                                                                        value={UOM_data ? UOM_data.find((option) => option.value === formik.values.mainBox[index].chargeBasis?.code) : ""}
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
                                                                                        value={currency_data ? currency_data.find((option) => option.value === formik.values.mainBox[index].currency?.currencyName) : ""}
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

                                                                                <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label">Valid From<span className='required_star'>*</span></label>
                                                                                    <Input
                                                                                        type="date"
                                                                                        name={`mainBox[${index}].validFrom`}
                                                                                        id="validity_from"
                                                                                        value={formik.values.mainBox[index].validFrom}
                                                                                        onChange={formik.handleChange}
                                                                                        className="form-control"
                                                                                        onBlur={formik.handleBlur}
                                                                                        invalid={
                                                                                            formik.touched.mainBox &&
                                                                                                formik.touched.mainBox[index] &&
                                                                                                formik.errors.mainBox &&
                                                                                                formik.errors.mainBox[index] &&
                                                                                                formik.errors.mainBox[index].validFrom
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                    />
                                                                                    {formik.touched.mainBox &&
                                                                                        formik.touched.mainBox[index] &&
                                                                                        formik.errors.mainBox &&
                                                                                        formik.errors.mainBox[index] &&
                                                                                        formik.errors.mainBox[index].validFrom ? (
                                                                                        <FormFeedback>{formik.errors.mainBox[index].validFrom}</FormFeedback>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Validity To */}
                                                                                <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label">Valid To<span className='required_star'>*</span></label>
                                                                                    <Input
                                                                                        type="date"
                                                                                        name={`mainBox[${index}].validTo`}
                                                                                        id="validity_to"
                                                                                        value={formik.values.mainBox[index].validTo}
                                                                                        onChange={formik.handleChange}
                                                                                        className="form-control"
                                                                                        onBlur={formik.handleBlur}
                                                                                        invalid={
                                                                                            formik.touched.mainBox &&
                                                                                                formik.touched.mainBox[index] &&
                                                                                                formik.errors.mainBox &&
                                                                                                formik.errors.mainBox[index] &&
                                                                                                formik.errors.mainBox[index].validTo
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                    />
                                                                                    {formik.touched.mainBox &&
                                                                                        formik.touched.mainBox[index] &&
                                                                                        formik.errors.mainBox &&
                                                                                        formik.errors.mainBox[index] &&
                                                                                        formik.errors.mainBox[index].validTo ? (
                                                                                        <FormFeedback>{formik.errors.mainBox[index].validTo}</FormFeedback>
                                                                                    ) : null}
                                                                                </div>
                                                                                <div className="col-lg-1 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Tax </label>
                                                                                    <Input
                                                                                        type="number"
                                                                                        name={`mainBox[${index}].tax`}
                                                                                        placeholder="Enter tax"
                                                                                        value={formik.values.mainBox[index].tax}
                                                                                        onChange={formik.handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-1 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-between">
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
                                                                                            <>
                                                                                                <Card key={i}>
                                                                                                    <CardBody>
                                                                                                        {item.subBox && item.subBox.length > 0 && item.subBox.map((subItem, subIndex) => {
                                                                                                            return (
                                                                                                                <React.Fragment key={subIndex}>
                                                                                                                    <div className="row mb-3">
                                                                                                                        <div className="col-md-2 mb-2">
                                                                                                                            <label className="form-label"> Origin Port</label>
                                                                                                                            <Select
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].originPort`}
                                                                                                                                value={airLocation ? airLocation.find((option) => option.value === formik.values.mainBox[index].subBox[subIndex].originPort?.name) : ""}
                                                                                                                                onChange={(e) => {
                                                                                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].originPort`, e);
                                                                                                                                }}
                                                                                                                                options={airLocation.filter(data => data.value != formik.values.mainBox[index].subBox[subIndex].destinataionPort?.value) || []}
                                                                                                                                classNamePrefix="select2-selection form-select"
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                        <div className="col-md-2 mb-2">
                                                                                                                            <label className="form-label"> Detination Port</label>
                                                                                                                            <Select
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].destinataionPort`}
                                                                                                                                value={airLocation ? airLocation.find((option) => option.value === formik.values.mainBox[index].subBox[subIndex].destinataionPort?.name) : ""}
                                                                                                                                onChange={(e) => {
                                                                                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].destinataionPort`, e);
                                                                                                                                }}
                                                                                                                                options={airLocation.filter(data => data.value != formik.values.mainBox[index].subBox[subIndex].originPort?.value) || []}
                                                                                                                                classNamePrefix="select2-selection form-select"
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                        {/* cargo type */}
                                                                                                                        <div className="col-md-2 mb-2">
                                                                                                                            <label className="form-label"> Cargo Type</label>
                                                                                                                            <Select
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                                                                                                                value={formik.values.mainBox[index].subBox[subIndex].cargoType}
                                                                                                                                onChange={(e) => {
                                                                                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].cargoType`, e);
                                                                                                                                }}
                                                                                                                                isMulti
                                                                                                                                options={cargoType_data.filter(data => data.transportMode == "AIR")}
                                                                                                                                classNamePrefix="select2-selection form-select"
                                                                                                                            />
                                                                                                                        </div>

                                                                                                                        {/* Commodity */}
                                                                                                                        <div className="col-md-2 mb-2">
                                                                                                                            <label className="form-label"> Commodity</label>
                                                                                                                            <Select
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].commodity`}
                                                                                                                                value={formik.values.mainBox[index].subBox[subIndex].commodity}
                                                                                                                                onChange={(e) => {
                                                                                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].commodity`, e);
                                                                                                                                }}
                                                                                                                                // isDisabled={!formik.values.mainBox[index].subBox[subIndex].cargoType?.find(data=>data.value=="PERISHABLE")}
                                                                                                                                isMulti
                                                                                                                                options={commodity_data || []}
                                                                                                                                classNamePrefix="select2-selection form-select"
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                        <div className="col-md-2 mb-2">
                                                                                                                            <label className="form-label"> Flight Number</label>
                                                                                                                            <Input
                                                                                                                                type="text"
                                                                                                                                name={`mainBox[${index}].subBox[${subIndex}].flightNumber`}
                                                                                                                                value={formik.values.mainBox[index].subBox[subIndex].flightNumber || ''}
                                                                                                                                onChange={formik.handleChange}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                        {!formik.values.mainBox[index].isSlab && (
                                                                                                                            <div className={"col-md-" + (formik.values.mainBox[index].subBox.length > 1 ? "1" : "2") + " mb-2 pr-0"}>
                                                                                                                                <label className="form-label"> Rate<span className='required_star'>*</span></label>
                                                                                                                                <Input
                                                                                                                                    type="number"
                                                                                                                                    name={`mainBox[${index}].subBox[${subIndex}].rate`}
                                                                                                                                    value={formik.values.mainBox[index].subBox[subIndex].rate || ''}
                                                                                                                                    onChange={formik.handleChange}
                                                                                                                                    className="form-control"
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
                                                                                                                        )}
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
                                                                                                                    {formik.values.mainBox[index].isSlab && (
                                                                                                                        <div>
                                                                                                                            <FieldArray name={`mainBox[${index}].subBox[${subIndex}].slab`}>
                                                                                                                                {(slabArrayHelpers, i) => (
                                                                                                                                    <>
                                                                                                                                        <Card key={i}>
                                                                                                                                            <CardBody>
                                                                                                                                                {subItem.slab && subItem.slab.length > 0 && subItem.slab.map((subItem, slabIndex) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <div className="row mb-3">
                                                                                                                                                                <div className="col-md-2 mb-2">
                                                                                                                                                                    <label className="form-label">From Slab</label>
                                                                                                                                                                    <input
                                                                                                                                                                        type="number"
                                                                                                                                                                        name={`mainBox[${index}].subBox[${subIndex}].slab[${slabIndex}].fromSlab`}
                                                                                                                                                                        value={formik.values.mainBox[index].subBox[subIndex].slab[slabIndex].fromSlab || ''}
                                                                                                                                                                        onChange={formik.handleChange}
                                                                                                                                                                        onBlur={formik.handleBlur}
                                                                                                                                                                        className="form-control"
                                                                                                                                                                    />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-2 mb-2">
                                                                                                                                                                    <label className="form-label">To Slab</label>
                                                                                                                                                                    <input
                                                                                                                                                                        type="number"
                                                                                                                                                                        name={`mainBox[${index}].subBox[${subIndex}].slab[${slabIndex}].toSlab`}
                                                                                                                                                                        value={formik.values.mainBox[index].subBox[subIndex].slab[slabIndex].toSlab || ''}
                                                                                                                                                                        onChange={formik.handleChange}
                                                                                                                                                                        onBlur={formik.handleBlur}
                                                                                                                                                                        className="form-control"
                                                                                                                                                                    />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-2 mb-2">
                                                                                                                                                                    <label className="form-label">Rate</label>
                                                                                                                                                                    <input
                                                                                                                                                                        type="number"
                                                                                                                                                                        name={`mainBox[${index}].subBox[${subIndex}].slab[${slabIndex}].rate`}
                                                                                                                                                                        value={formik.values.mainBox[index].subBox[subIndex].slab[slabIndex].rate || ''}
                                                                                                                                                                        onChange={(e) => {
                                                                                                                                                                            formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].slab[${slabIndex}].rate`, e.target.value);
                                                                                                                                                                            formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].rate`, e.target.value)
                                                                                                                                                                        }}
                                                                                                                                                                        onBlur={formik.handleBlur}
                                                                                                                                                                        className="form-control"
                                                                                                                                                                    />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-2 mb-2">
                                                                                                                                                                    <label className="form-label">Min Value</label>
                                                                                                                                                                    <input
                                                                                                                                                                        type="number"
                                                                                                                                                                        name={`mainBox[${index}].subBox[${subIndex}].slab[${slabIndex}].minVal`}
                                                                                                                                                                        value={formik.values.mainBox[index].subBox[subIndex].slab[slabIndex].minVal || ''}
                                                                                                                                                                        onChange={formik.handleChange}
                                                                                                                                                                        onBlur={formik.handleBlur}
                                                                                                                                                                        className="form-control"
                                                                                                                                                                    />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-1 p-0 mt-2 d-flex justify-content-end align-items-center">
                                                                                                                                                                    {formik.values.mainBox[index].subBox[subIndex].slab.length > 1 && (
                                                                                                                                                                        <button
                                                                                                                                                                            className="btn border"
                                                                                                                                                                            onClick={() => {
                                                                                                                                                                                slabArrayHelpers.remove(slabIndex);
                                                                                                                                                                            }}
                                                                                                                                                                        >
                                                                                                                                                                            <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                                                                                                                                        </button>
                                                                                                                                                                    )}
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })}
                                                                                                                                                <div>
                                                                                                                                                    <button
                                                                                                                                                        className="btn btn-primary me-2"
                                                                                                                                                        onClick={() => {
                                                                                                                                                            slabArrayHelpers.push({
                                                                                                                                                                fromSlab: "",
                                                                                                                                                                toSlab: "",
                                                                                                                                                                rate: "",
                                                                                                                                                                minVal: ""
                                                                                                                                                            });
                                                                                                                                                        }}
                                                                                                                                                    >
                                                                                                                                                        <i className="bx bx-plus"></i>
                                                                                                                                                    </button>
                                                                                                                                                </div>
                                                                                                                                            </CardBody>
                                                                                                                                        </Card>
                                                                                                                                    </>
                                                                                                                                )}
                                                                                                                            </FieldArray>
                                                                                                                        </div>
                                                                                                                    )}
                                                                                                                </React.Fragment>
                                                                                                            );
                                                                                                        })}
                                                                                                        <div>
                                                                                                            <button
                                                                                                                className="btn btn-primary me-2"
                                                                                                                onClick={() => {
                                                                                                                    arrayHelpersTwo.push(
                                                                                                                        {
                                                                                                                            originPort: "",
                                                                                                                            destinataionPort: "",
                                                                                                                            flightNumber: "",
                                                                                                                            cargoType: "",
                                                                                                                            commodity: "",
                                                                                                                            rate: "",
                                                                                                                            slab: [{
                                                                                                                                fromSlab: "",
                                                                                                                                toSlab: "",
                                                                                                                                rate: "",
                                                                                                                            }],
                                                                                                                        }
                                                                                                                    );
                                                                                                                }}
                                                                                                            >
                                                                                                                <i className="bx bx-plus"></i>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </CardBody>
                                                                                                </Card>
                                                                                            </>
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
                                                                            currency: "",
                                                                            validFrom: "",
                                                                            validTo: "",
                                                                            tax: "",
                                                                            isSlab: false,
                                                                            addTerms: false,
                                                                            subBox: [{
                                                                                originPort: "",
                                                                                destinataionPort: "",
                                                                                flightNumber: "",
                                                                                cargoType: [],
                                                                                commodity: [],
                                                                                rate: "",
                                                                                slab: [{
                                                                                    fromSlab: "",
                                                                                    toSlab: "",
                                                                                    rate: "",
                                                                                }],
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
                                        <div className="row">
                                            <div className="d-flex justify-content-center">
                                                <div className="mt-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={isAnyValueEmpty(formik.values, ['terminalName', 'vendorName'])}> Save </button>
                                                    {/* <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={!(!isAnyValueEmpty(formik.values.mainBox, ['flightNumber','addTerms']) && !isAnyValueEmptyInArray(formik.values.mainBox[0].subBox))}> Save </button> */}
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
