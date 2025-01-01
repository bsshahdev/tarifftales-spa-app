import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Card, CardBody, FormFeedback, Input } from 'reactstrap';
import { marginType, optionCustdepartment, optionCustdesignation, optionCustopCode, optionCusttitle } from '../../../../common/data/settings';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as Yup from "yup";
import { optionSurchargesName } from '../../../../common/data/procurement';
const CustomerFclPortLocal = () => {
    const { customer_id } = useSelector((state) => state?.customer);
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const [AllVendorName, setAllVendorName] = useState([]);
    const {
        vendor_data, container_data, oceanPort_data
    } = useSelector((state) => state?.globalReducer);

    console.log(vendor_data);

    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType }
        })
        setAllVendorName(vendorlist);
        console.log(vendor_data);
    }, [vendor_data]);


    const contactsFormik = useFormik({
        initialValues: {
            contacts: [
                {
                    title: "",
                    name: navigateState?.state?.data?.contactName || "",
                    opCode: "",
                    phoneNumber: navigateState?.state?.data?.contactNo || "",
                },
            ],
            surcharge: [
                {
                    title: "",
                    name: navigateState?.state?.data?.contactName || "",
                    opCode: "",
                    phoneNumber: navigateState?.state?.data?.contactNo || "",
                },
            ],
        },
        // validationSchema: Yup.object({
        //     contacts: Yup.array().of(
        //         Yup.object({
        //             name: Yup.string().required("Please Enter Customer Name"),
        //             emailId: Yup.string().email('Invalid email address').required('Email is required'),
        //             phoneNumber: Yup.string().required("Please Enter Your Phone Number")
        //         })
        //     ),
        // }),
        // onSubmit: (values) => {
        //     let data = {
        //         ...Object.fromEntries(Object.entries({
        //             "id": (navigateState?.state?.data?.id) ? navigateState?.state?.data?.id : customer_id.id || null,
        //             "version": (navigateState?.state?.data?.version) ? navigateState?.state?.data?.version : customer_id.version || 0,
        //             contacts: values?.contacts?.map((val) => {
        //                 return {
        //                     ...Object.fromEntries(Object.entries({
        //                         "contactName": val?.name || null,
        //                         "contactNo": val?.phoneNumber || null,
        //                         "contactEmail": val?.emailId || null,
        //                         "department": val?.department || null,
        //                         "designation": val?.designation || null,
        //                     }).filter(([_, value]) => value !== null)),
        //                 }
        //             })
        //         }).filter(([_, value]) => value !== null)),
        //     }
        //     console.log(data, "data---------------");
        //     //  dispatch(postCustomerContactAction(data));
        //     // toggleTabProgress(3);
        // },
    });

    const onClickSkip = () => {
        //   toggleTabProgress(3);
    }
    return (
        <>
            <div>
                <FormikProvider value={contactsFormik}>
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
                                            <DatePicker
                                                // selected={fromDate}
                                                // onChange={(date) => setFromDate(date)}
                                                placeholderText="Select From Date"
                                                className="form-control"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div>
                                            <label className="form-label">To Date</label>
                                            <DatePicker
                                                // selected={toDate}
                                                // onChange={(date) => setToDate(date)}
                                                placeholderText="Select To Date"
                                                className="form-control"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                        <div className="mb-1">
                            <h5>Add Freight Rates</h5>
                        </div>
                        <FieldArray name="contacts" validateOnChange={false}>
                            {(arrayHelpers) => (
                                <Card >
                                    <CardBody>
                                        {contactsFormik?.values?.contacts?.map((contact, index) => (
                                            <div key={index}>
                                                <div className='row'>
                                                    <div className="row align-items-end">
                                                        <div className="col-12 col-md-2">
                                                            <div className="mb-2">
                                                                <label className="form-label">Select Carrier/Vendor</label>
                                                                <Select
                                                                    name='customerType'
                                                                    placeholder="Select Carrier/Vendor"
                                                                    options={AllVendorName}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-2">
                                                            <div className="mb-2">
                                                                <label className="form-label">Select Port</label>
                                                                <Select
                                                                    name='Port'
                                                                    placeholder="Select Port"
                                                                    options={oceanPort_data}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-2">
                                                            <div className="mb-2">
                                                                <label className="form-label">Surcharge Type</label>
                                                                <Select
                                                                    name='surchargeType'
                                                                    placeholder="Surcharge Type"
                                                                    options={optionSurchargesName}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-2">
                                                            <div className="mb-2">
                                                                <label className="form-label">Container Type</label>
                                                                <Select
                                                                    name='containerType'
                                                                    placeholder="Select Container Type"
                                                                    options={container_data}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-2">
                                                            <div className="mb-2">
                                                                <label className="form-label">Margin Type</label>
                                                                <Select
                                                                    name='marginType'
                                                                    placeholder="Margin Type"
                                                                    options={marginType}
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-1">
                                                            <div className="mb-2">
                                                                <label className="form-label">Margin</label>
                                                                <Input
                                                                    type="number"
                                                                    name="number"
                                                                    className="form-control"
                                                                    placeholder=""
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {contactsFormik.values.contacts.length >
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
                                                    title: "",
                                                    name: '',
                                                    opCode: "",
                                                    phoneNumber: '',
                                                })}>
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
            <div className="row">
                <div className="d-flex justify-content-center">
                    <div className="mb-3 mx-3 d-flex justify-content-end">
                        <button
                            onClick={contactsFormik.handleSubmit}
                            className=" btn btn-primary"
                        >
                            Save
                        </button>
                    </div>
                    <div className="mb-3 mx-3 d-flex justify-content-end">
                        <button
                           onClick={() => contactsFormik.resetForm()}
                            className=" btn btn-primary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CustomerFclPortLocal;
