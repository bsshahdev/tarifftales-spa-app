import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { Card, CardBody, Input } from 'reactstrap';
import { optionMarkupType } from '../../../../common/data/common';
import { marginType } from '../../../../common/data/settings';
import { GET_CONTAINER_DATA } from '../../../../store/Global/actiontype';
const CustomerFclFreight = () => {
    const { customer_id } = useSelector((state) => state?.customer);
    // const {
    //     surchargeCategory_data, oceanPort_data, vendor_data, surchargeCode_data, UOM_data, currency_data, cargoType_data, container_data,
    //   } = useSelector(state => state?.globalReducer)
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const [AllVendorName, setAllVendorName] = useState([]);
    const {
        vendor_data, container_data
    } = useSelector((state) => state?.globalReducer);


    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType }
        })
        setAllVendorName(vendorlist);
        console.log(vendor_data);
    }, [vendor_data]);

    useEffect(() => {
        dispatch({ type: GET_CONTAINER_DATA });
    }, [])

    const fclFreightRateFormik = useFormik({
        initialValues: {
            from_date: "",
            to_date: "",
            freight_rate: [
                {
                    carrier: "",
                    container: { label: "ALL", value: "all" },
                    margin_type: { label: "Percentage", value: "PERCENTAGE" },
                    margin: 10,
                },
            ],
            surcharge_rate: [
                {
                    carrier: "",
                    container: { label: "ALL", value: "all" },
                    margin_type: { label: "Percentage", value: "PERCENTAGE" },
                    margin: 10,
                },
            ],
        },
        onSubmit: (values) => {
            console.log(values, "values");
            
        },
    });

    const onClickSkip = () => {
        //   toggleTabProgress(3);
    }
    return (
        <>
            <div>
                <FormikProvider value={fclFreightRateFormik}>
                    <>
                        <div className="mb-1">
                            <h5>Rate EffectCtive Date</h5>
                        </div>
                        <Card >
                            <CardBody>
                                <div className='row'>
                                    <div className="col-12 col-md-4">
                                        <div className="mb-2">
                                            <label className="form-label">From Date</label>
                                            <Flatpickr
                                                // value={fclFreightRateFormik?.values?.from_date}
                                                name='from_date'
                                                className="form-control d-block"
                                                placeholder="Select From Date"
                                                options={{
                                                    altFormat: "F j, Y",
                                                    dateFormat: "Y-m-d"
                                                }}
                                                // onChange={fclFreightRateFormik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div>
                                            <label className="form-label">To Date</label>
                                            <Flatpickr
                                                // value={fclFreightRateFormik?.values?.to_date}
                                                name='to_date'
                                                className="form-control d-block"
                                                placeholder="Select From Date"
                                                options={{
                                                    altFormat: "F j, Y",
                                                    dateFormat: "Y-m-d"
                                                }}
                                                // onChange={fclFreightRateFormik.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                        <div className="mb-1">
                            <h5>Add Freight Rates</h5>
                        </div>
                        <FieldArray name="freight_rate" validateOnChange={false}>
                            {(arrayHelpers) => (
                                <Card >
                                    <CardBody>
                                        {fclFreightRateFormik?.values?.freight_rate?.map((val, index) => (
                                            <div key={index}>
                                                <div className='row'>
                                                    <div className="row align-items-end">
                                                        <div className="col-12 col-md-3">
                                                            <div className="mb-2">
                                                                <label className="form-label">Select Carrier/Vendor</label>
                                                                <Select
                                                                    name={`freight_rate[${index}].carrier`}
                                                                    value={val.carrier || ''}
                                                                    placeholder="Select Carrier/Vendor"
                                                                    onChange={(e) => {
                                                                        fclFreightRateFormik.setFieldValue(`freight_rate[${index}].carrier`, e);
                                                                    }}
                                                                    options={AllVendorName ? [...AllVendorName, { label: "ALL", value: "all" }] : []}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-3">
                                                            <div className="mb-2">
                                                                <label className="form-label">Container Type</label>
                                                                <Select
                                                                    value={val.container || ''}
                                                                    name={`freight_rate[${index}].container`}
                                                                    placeholder="Select Container Type"
                                                                    onChange={(e) => {
                                                                        fclFreightRateFormik.setFieldValue(`freight_rate[${index}].container`, e);
                                                                    }}
                                                                    options={container_data ? [...container_data, { label: "ALL", value: "all" }] : []}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-3">
                                                            <div className="mb-2">
                                                                <label className="form-label">Margin Type</label>
                                                                <Select
                                                                    value={val.margin_type || ''}
                                                                    name={`freight_rate[${index}].margin_type`}
                                                                    placeholder="Margin Type"
                                                                    onChange={(e) => {
                                                                        fclFreightRateFormik.setFieldValue(`freight_rate[${index}].margin_type`, e);
                                                                    }}
                                                                    options={optionMarkupType || []}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-2">
                                                            <div className="mb-2">
                                                                <label className="form-label">Margin</label>
                                                                <Input
                                                                    value={val.margin || ''}
                                                                    type="number"
                                                                    name={`freight_rate[${index}].margin`}
                                                                    onChange={fclFreightRateFormik.handleChange}
                                                                    className="form-control"
                                                                    placeholder=""
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-1">
                                                            {fclFreightRateFormik.values.freight_rate.length >
                                                                1 && (
                                                                    <button
                                                                        className="btn m-2 border"
                                                                        onClick={() => { arrayHelpers.remove(index); }}
                                                                    >
                                                                        <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                                    </button>
                                                                )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        ))}
                                        <div>
                                            <button type="button" className='btn btn-primary'
                                                onClick={() => arrayHelpers.push({
                                                    carrier: "",
                                                    container: { label: "ALL", value: "all" },
                                                    margin_type: { label: "Percentage", value: "PERCENTAGE" },
                                                    margin: 10,
                                                })}
                                                disabled={fclFreightRateFormik?.values?.freight_rate?.[0]?.carrier?.value === "all" || false}
                                                >
                                                Add
                                            </button>
                                        </div>
                                    </CardBody>
                                </Card>
                            )}
                        </FieldArray>

                        <div className="mb-1">
                            <h5>Add Ocean Surcharge Rates</h5>
                        </div>
                        {console.log(fclFreightRateFormik?.values,"values")}
                        <FieldArray name="surcharge_rate" validateOnChange={false}>
                            {(arrayHelpers) => (
                                <Card >
                                    <CardBody>
                                        {fclFreightRateFormik?.values?.surcharge_rate?.map((val, index) => (
                                            <div key={index}>
                                                <div className='row'>
                                                    <div className="row align-items-end">
                                                        <div className="col-12 col-md-3">
                                                            <div className="mb-2">
                                                                <label className="form-label">Select Carrier/Vendor</label>
                                                                <Select
                                                                    name={`surcharge_rate[${index}].carrier`}
                                                                    value={val.carrier || ''}
                                                                    placeholder="Select Carrier/Vendor"
                                                                    onChange={(e) => {
                                                                        fclFreightRateFormik.setFieldValue(`surcharge_rate[${index}].carrier`, e);
                                                                    }}
                                                                    options={AllVendorName ? [...AllVendorName, { label: "ALL", value: "all" }] : []}                                                                    
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-3">
                                                            <div className="mb-2">
                                                                <label className="form-label">Container Type</label>
                                                                <Select
                                                                    value={val.container || ''}
                                                                    name={`surcharge_rate[${index}].container`}
                                                                    placeholder="Select Container Type"
                                                                    onChange={(e) => {
                                                                        fclFreightRateFormik.setFieldValue(`surcharge_rate[${index}].container`, e);
                                                                    }}
                                                                    options={container_data ? [...container_data, { label: "ALL", value: "all" }] : []}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-3">
                                                            <div className="mb-2">
                                                                <label className="form-label">Margin Type</label>
                                                                <Select
                                                                    value={val.margin_type || ''}
                                                                    name={`surcharge_rate[${index}].margin_type`}
                                                                    placeholder="Margin Type"
                                                                    onChange={(e) => {
                                                                        fclFreightRateFormik.setFieldValue(`surcharge_rate[${index}].margin_type`, e);
                                                                    }}
                                                                    options={optionMarkupType || []}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-2">
                                                            <div className="mb-2">
                                                                <label className="form-label">Margin</label>
                                                                <Input
                                                                    value={val.margin || ''}
                                                                    type="number"
                                                                    name={`surcharge_rate[${index}].margin`}
                                                                    onChange={fclFreightRateFormik.handleChange}
                                                                    className="form-control"
                                                                    placeholder=""
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-1">
                                                            {fclFreightRateFormik.values.surcharge_rate.length >
                                                                1 && (
                                                                    <button
                                                                        className="btn m-2 border"
                                                                        onClick={() => { arrayHelpers.remove(index); }}
                                                                    >
                                                                        <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                                    </button>
                                                                )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        ))}
                                        <div>
                                            <button type="button" className='mb-1 btn btn-primary'
                                                onClick={() => arrayHelpers.push({
                                                    carrier: "",
                                                    container: { label: "ALL", value: "all" },
                                                    margin_type: { label: "Percentage", value: "PERCENTAGE" },
                                                    margin: 10,
                                                })}
                                                disabled={fclFreightRateFormik?.values?.surcharge_rate?.[0]?.carrier?.value === "all" || false}
                                                >
                                                Add
                                            </button>
                                        </div>
                                    </CardBody>
                                </Card>
                            )}
                        </FieldArray>
                    </>
                </FormikProvider>
            </div>
            <div className="d-flex justify-content-center mb-4 mt-3" style={{ margin: "0 0 -62px" }}>
                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        onClick={fclFreightRateFormik.handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>

        </>
    );
}

export default CustomerFclFreight;
