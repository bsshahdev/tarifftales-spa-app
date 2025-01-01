import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, FormFeedback, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { postSurchargeCateAction } from "../../../../store/Global/actions";
import { optionChargeBasis } from "../../../../common/data/procurement";
import Select from "react-select";
import { GET_CONTAINER_DATA } from "../../../../store/Global/actiontype";
import { getOceanDetails, postFclOceanSurcharges } from "../../../../store/Procurement/actions";
import * as Yup from "yup";

const AddSurchargesModal = ({ modal, onCloseClick, data }) => {
    const dispatch = useDispatch();
    const { oceanPort_data, currency_data, surchargeCode_data, container_data, cargoType_data, UOM_data } = useSelector(state => state?.globalReducer);
    const { fcl_freight_details } = useSelector((state) => state.procurement);

    useEffect(() => {
        dispatch({ type: GET_CONTAINER_DATA });
    }, [dispatch]);



    let allFrightDetails = fcl_freight_details && fcl_freight_details.length > 0 ? fcl_freight_details?.reduce((acc, data) => {
        if (data && data.tenantOceanFCLFreightRPS) {
            data.tenantOceanFCLFreightRPS.forEach(frightdetais => {
                acc.push(frightdetais);
            });
        }
        return acc;
    }, []) : [];

    const formik = useFormik({
        initialValues: {
            surchargeName: '',
            chargeBasis: '',
            originPort: '',
            destinationPort: '',
            currency: '',
            mainBox: [{
                cargoType: '',
                equipmentType: '',
                rate: ''
            }],
        },

        validationSchema: Yup.object({
            surchargeName: Yup.mixed().required('Please select surcharge name'),
            chargeBasis: Yup.mixed().required('Please select charge basis'),
            originPort: Yup.mixed().required('Please select origin port'),
            destinationPort: Yup.mixed().required('Please select destination port'),
            currency: Yup.mixed().required('Please select currency'),
            mainBox: Yup.array().of(
                Yup.object().shape({
                    cargoType: Yup.mixed().required('Please select cargo type'),
                    equipmentType: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
                        if (typeof value === 'string') {
                            return true;
                        } else if (typeof value === 'object' && value !== null) {
                            return true;
                        } else {
                            return false;
                        }
                    }).required("Please select cargo type"),
                    rate: Yup.string().required('Please enter rate')
                })
            )
        }),
        onSubmit: (values) => {
            const filteredFrightDetails = allFrightDetails.filter(frightDetail =>
                frightDetail.originPort.code === values.originPort.value &&
                values.destinationPort.some(destination =>
                    frightDetail.destinationPort.code === destination.value
                )
            );
            const updatedFrightDetails = filteredFrightDetails.flatMap(detail =>
                values.mainBox.flatMap(mainBox =>
                    values.destinationPort.flatMap(destinationPort =>
                        mainBox.equipmentType.map(equipmentType => ({
                            originPort: values.originPort,
                            destinationPort: destinationPort,
                            surchargeCode: { id: values.surchargeName.id, version: values.surchargeName.version },
                            unitOfMeasurement: values.chargeBasis,
                            oceanContainer: equipmentType,
                            cargoType: mainBox.cargoType,
                            surchargeValue: mainBox.rate,
                            currency: values.currency,
                            tenantOceanFCLFreightRP: { id: detail.id, version: detail.version },
                        }))
                    )
                )
            );
            console.log(updatedFrightDetails);
            dispatch(postFclOceanSurcharges(updatedFrightDetails));
            onCloseClick();
            formik.resetForm();
        }
    });

    useEffect(() => {
        if (data !== '' && data !== undefined && data) {
            let url = `?`;
            Object.entries(data).forEach(([key, value]) => {
                if (value !== '' && value !=null && value !== undefined && key !== "totalCount") {
                    url += `&${key}=${encodeURIComponent(value)}`;
                }
            });
            dispatch(getOceanDetails(url));
            console.log(data);
            formik.setValues({
                surchargeName: '',
                chargeBasis: '',
                destinationPort: "",
                originPort: oceanPort_data.find(origin => origin.value == data?.originPort),
                currency: '',
                mainBox: [{
                    cargoType: '',
                    equipmentType: '',
                    rate: ''
                }],
            });
        }
    }, [dispatch, data, oceanPort_data]);
    return (
        <Modal isOpen={modal} toggle={onCloseClick} className="table_view_modal">
            <ModalHeader tag="h4">
                Add Additional Surcharges
                <span className="close" onClick={onCloseClick}></span>
            </ModalHeader>
            <ModalBody>
                <div className="table_view_data_wrap">
                    <div className="charge_details">
                        <div className="row mt-4 mb-2">
                            <div className="col-md-1 col-lg-6 mb-4">
                                <label className="form-label">Select Surcharge Name<span className='required_star'>*</span></label>
                                <Select
                                    name="surchargeName"
                                    value={formik.values.surchargeName}
                                    onChange={(e) => {
                                        formik.setFieldValue('surchargeName', e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    options={surchargeCode_data}
                                    placeholder={"Select Surcharge Name"}
                                    classNamePrefix="select2-selection form-select"
                                />
                                {formik.errors.surchargeName && formik.touched.surchargeName && (
                                    <FormFeedback>{formik.errors.surchargeName}</FormFeedback>
                                )}
                            </div>
                            <div className="col-md-6 col-lg-6 mb-4">
                                <label className="form-label">Charge Basis<span className='required_star'>*</span></label>
                                <Select
                                    name="chargeBasis"
                                    value={formik.values.chargeBasis}
                                    onChange={(e) => {
                                        formik.setFieldValue('chargeBasis', e);
                                    }}
                                    options={UOM_data}
                                    onBlur={formik.handleBlur}
                                    placeholder={"Select Charge Basis"}
                                    classNamePrefix="select2-selection form-select"
                                />
                                {formik.errors.chargeBasis && formik.touched.chargeBasis && (
                                    <FormFeedback>{formik.errors.chargeBasis}</FormFeedback>
                                )}
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <label className="form-label">Origin Port<span className='required_star'>*</span></label>
                                <Select
                                    name="originPort"
                                    value={formik.values.originPort}
                                    onChange={(e) => { formik.setFieldValue('originPort', e); }}
                                    isDisabled={true}
                                    onBlur={formik.handleBlur}
                                    options={oceanPort_data}
                                    placeholder={"Origin Port"}
                                    classNamePrefix="select2-selection form-select"
                                />
                                {formik.errors.originPort && formik.touched.originPort && (
                                    <FormFeedback>{formik.errors.originPort}</FormFeedback>
                                )}
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <label className="form-label">Destination Port<span className='required_star'>*</span></label>
                                <Select
                                    name="destinationPort"
                                    value={formik.values.destinationPort}
                                    onChange={(e) => {
                                        formik.setFieldValue('destinationPort', e);
                                    }}
                                    options={oceanPort_data.filter(portData => allFrightDetails.some(frightDetail => frightDetail.destinationPort.code === portData.value))}
                                    isMulti
                                    onBlur={formik.handleBlur}
                                    placeholder={"Destination"}
                                    classNamePrefix="select2-selection form-select"
                                />

                                {formik.errors.destinationPort && formik.touched.destinationPort && (
                                    <FormFeedback>{formik.errors.destinationPort}</FormFeedback>
                                )}
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <label className="form-label">Currency<span className='required_star'>*</span></label>
                                <Select
                                    name="currency"
                                    value={formik.values.currency}
                                    onChange={(e) => { formik.setFieldValue('currency', e); }}
                                    options={currency_data}
                                    placeholder={"Currency"}
                                    classNamePrefix="select2-selection form-select"
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.currency && formik.touched.currency && (
                                    <FormFeedback>{formik.errors.currency}</FormFeedback>
                                )}
                            </div>
                        </div>
                        <FormikProvider value={formik}>
                            <FieldArray name="mainBox">
                                {arrayHelpers => (
                                    <>
                                        {formik.values.mainBox && formik.values.mainBox.length > 0 &&
                                            formik.values.mainBox.map((item, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2">
                                                        <label className="form-label">Cargo Type<span className='required_star'>*</span></label>
                                                        <Select
                                                            name={`mainBox[${index}].cargoType`}
                                                            value={formik.values.mainBox[index].cargoType}
                                                            onChange={(e) => {
                                                                formik.setFieldValue(`mainBox[${index}].cargoType`, e);
                                                                formik.setFieldValue(`mainBox.${index}.equipmentType`, []);
                                                            }}
                                                            options={cargoType_data.filter(data => data.transportMode == "OCEAN")}
                                                            classNamePrefix="select2-selection form-select"
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.mainBox &&
                                                                    formik.touched.mainBox[index] &&
                                                                    formik.errors.mainBox &&
                                                                    formik.errors.mainBox[index] &&
                                                                    formik.errors.mainBox[index].cargoType
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {formik.touched.mainBox &&
                                                            formik.touched.mainBox[index] &&
                                                            formik.errors.mainBox &&
                                                            formik.errors.mainBox[index] &&
                                                            formik.errors.mainBox[index].cargoType ? (
                                                            <FormFeedback>{formik.errors.mainBox[index].cargoType}</FormFeedback>
                                                        ) : null}
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2">
                                                        <label className="form-label">Equipment Type<span className='required_star'>*</span></label>
                                                        <Select
                                                            name={`mainBox[${index}].equipmentType`}
                                                            value={formik.values.mainBox[index].equipmentType}
                                                            onChange={(e) => {
                                                                formik.setFieldValue(`mainBox[${index}].equipmentType`, e);
                                                            }}

                                                            options={formik.values?.chargeBasis?.value == "PER_TEU" ? container_data?.filter(data => data?.value == "20GP")
                                                                : formik.values.mainBox[index].cargoType?.value == "GENERAL" ?
                                                                    container_data?.filter(data => ['20GP', '40GP', '40HQ', '45HQ'].includes(data?.value))
                                                                    : formik.values.mainBox[index].cargoType?.value == "REFRIGERATED" ? container_data.filter(data => ['40RF', '20RF'].includes(data?.value)) : container_data}
                                                            classNamePrefix="select2-selection form-select"
                                                            onBlur={formik.handleBlur}
                                                            isMulti
                                                            invalid={
                                                                formik.touched.mainBox &&
                                                                    formik.touched.mainBox[index] &&
                                                                    formik.errors.mainBox &&
                                                                    formik.errors.mainBox[index] &&
                                                                    formik.errors.mainBox[index].equipmentType
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {formik.touched.mainBox &&
                                                            formik.touched.mainBox[index] &&
                                                            formik.errors.mainBox &&
                                                            formik.errors.mainBox[index] &&
                                                            formik.errors.mainBox[index].equipmentType ? (
                                                            <FormFeedback>{formik.errors.mainBox[index].equipmentType}</FormFeedback>
                                                        ) : null}
                                                    </div>
                                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                                        <label className="form-label">Rate<span className='required_star'>*</span></label>
                                                        <Input
                                                            type="number"
                                                            name={`mainBox[${index}].rate`}
                                                            placeholder="Enter rate"
                                                            value={formik.values.mainBox[index].rate}
                                                            onChange={formik.handleChange}
                                                        />
                                                        {formik.touched.mainBox &&
                                                            formik.touched.mainBox[index] &&
                                                            formik.errors.mainBox &&
                                                            formik.errors.mainBox[index] &&
                                                            formik.errors.mainBox[index].rate ? (
                                                            <FormFeedback>{formik.errors.mainBox[index].rate}</FormFeedback>
                                                        ) : null}
                                                    </div>
                                                    <div className="col-lg-1 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-between">
                                                        {formik.values.mainBox.length > 1 && (
                                                            <button
                                                                className="btn m-1 border"
                                                                onClick={() => { arrayHelpers.remove(index); }}
                                                            >
                                                                <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        <div>
                                            <button
                                                className="btn btn-primary m-1"
                                                onClick={() => {
                                                    arrayHelpers.push({
                                                        surchargeName: '',
                                                        chargeBasis: '',
                                                        originPort: '',
                                                        destinationPort: '',
                                                        currency: '',
                                                        mainBox: [{
                                                            cargoType: '',
                                                            equipmentType: '',
                                                            rate: ''
                                                        }],
                                                    });
                                                }}
                                            >
                                                <i className="bx bx-plus align-middle me-1"></i> Add
                                            </button>
                                        </div>
                                    </>
                                )}
                            </FieldArray>
                        </FormikProvider>
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <div className="mb-3 mx-3 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={formik.handleSubmit}>Save</button>
                                </div>
                                <div className="mb-3 mx-3 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={() => { onCloseClick(); formik.resetForm(); }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default AddSurchargesModal;
