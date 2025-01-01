import { FieldArray, FormikProvider, useFormik } from 'formik';
import React from 'react';
import Select from 'react-select';
import { Card, CardBody, FormFeedback, Input } from 'reactstrap';
import { optionCustdepartment, optionCustdesignation, optionCustopCode, optionCusttitle } from '../../../../common/data/settings';
import { useDispatch } from 'react-redux';
import { postCustomerContactAction } from '../../../../store/Parties/Customer/action';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as Yup from "yup";
const CustomerContact = ({ toggleTabProgress }) => {
    const { customer_id } = useSelector((state) => state?.customer);
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const contactsFormik = useFormik({
        initialValues: {
            ...(!!(navigateState?.state?.data?.contacts && navigateState?.state?.data?.contacts.length > 0) && {
            contacts: navigateState?.state?.data?.contacts.map(contact => ({
                title: contact.contactName || "",
                name: contact.contactName || "",
                opCode: contact.opCode || "",
                phoneNumber: contact.contactNo || "",
                emailId: contact.contactEmail || "",
                department: contact.department || "",
                designation: contact.designation || "",
            })),
        })|| {
            contacts: [
                {
                        title: "",
                        name: navigateState?.state?.data?.contactName || "",
                        opCode: "",
                        phoneNumber: navigateState?.state?.data?.contactNo || "",
                        emailId: navigateState?.state?.data?.contactEmail || "",
                        department: navigateState?.state?.data?.department || "",
                        designation: navigateState?.state?.data?.designation || "",
                },]
            }
        },
        validationSchema: Yup.object({
            contacts: Yup.array().of(
                Yup.object({
                    name: Yup.string().required("Please Enter Customer Name"),
                    emailId: Yup.string().email('Invalid email address').required('Email is required'),
                    phoneNumber: Yup.string().required("Please Enter Your Phone Number")
                })
            ),
        }),
        onSubmit: (values) => {
            let data = {
                ...Object.fromEntries(Object.entries({
                    "id": (navigateState?.state?.data?.id) ?  navigateState?.state?.data?.id :customer_id.id || null,
                    "version": (navigateState?.state?.data?.version) ? navigateState?.state?.data?.version:customer_id.version || 0,
                    contacts: values?.contacts?.map((val) => {
                        return {
                            ...Object.fromEntries(Object.entries({
                                "contactName": val?.name || null,
                                "contactNo": val?.phoneNumber || null,
                                "contactEmail": val?.emailId || null,
                                "department": val?.department || null,
                                "designation": val?.designation || null,
                            }).filter(([_, value]) => value !== null)),
                        }
                    })
                }).filter(([_, value]) => value !== null)),
            }
            console.log(data, "data---------------");
            dispatch(postCustomerContactAction(data));
            toggleTabProgress(3);
        },
    });

    const onClickSkip = () => {
        toggleTabProgress(3);
    }
    return (
        <>
            <div className="text-center mb-4">
                <h5>Customer Contacts</h5>
            </div>
            <div>
                <FormikProvider value={contactsFormik}>
                    <FieldArray name="contacts" validateOnChange={false}>
                        {(arrayHelpers) => (
                            <>
                                {contactsFormik?.values?.contacts?.map((contact, index) => (
                                    <Card key={index}>
                                        <CardBody>
                                            <div className='row'>
                                                <div className="col-10 col-md-11">
                                                    <div className="mb-3">
                                                        <label className="form-label">Contact Name <span className='required_star'>*</span></label>
                                                        <div className='row'>
                                                            <div className='col-4 col-md-2'>
                                                                <Select
                                                                    name={`contacts[${index}].title`}
                                                                    value={
                                                                        optionCusttitle ? optionCusttitle.find((option) => option.value === contactsFormik?.values?.contacts[index].title) : ""
                                                                    }
                                                                    onChange={(e) => {
                                                                        contactsFormik.setFieldValue(`contacts[${index}].title`, e.value);
                                                                    }}
                                                                    options={optionCusttitle}
                                                                    placeholder="Mr"
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                            <div className='col-8 col-md-6'>
                                                                <Input
                                                                    type="text"
                                                                    name={`contacts[${index}].name`}
                                                                    value={contactsFormik.values.contacts[index].name}
                                                                    onChange={contactsFormik.handleChange}
                                                                    className="form-control"
                                                                    placeholder=""
                                                                    onBlur={contactsFormik.handleBlur}
                                                                    invalid={
                                                                        contactsFormik.touched.contacts &&
                                                                            contactsFormik.touched.contacts[index] &&
                                                                            contactsFormik.errors.contacts &&
                                                                            contactsFormik.errors.contacts[index]?.name
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                {contactsFormik.touched.contacts &&
                                                                    contactsFormik.touched.contacts[index] &&
                                                                    contactsFormik.errors.contacts &&
                                                                    contactsFormik.errors.contacts[index]?.name ? (
                                                                    <FormFeedback>{contactsFormik.errors.contacts[index]?.name}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='col-2 col-md-1'>
                                                    {contactsFormik.values.contacts.length >
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

                                            <div className='row'>
                                                <div className="col-12 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Phone Number<span className='required_star'>*</span></label>
                                                        <div className='row'>
                                                            <div className='col-4 col-md-3'>
                                                                <Select
                                                                    // value={carrierData.rate_type}
                                                                    name={`contacts[${index}].opCode`}
                                                                    value={
                                                                        optionCustopCode
                                                                            ? optionCustopCode.find(
                                                                                (option) =>
                                                                                    option.value ===
                                                                                    contactsFormik?.values?.contacts[index].opCode
                                                                            )
                                                                            : ""
                                                                    }
                                                                    onChange={(e) => {
                                                                        contactsFormik.setFieldValue(
                                                                            `contacts[${index}].opCode`,
                                                                            e.value
                                                                        );
                                                                    }}
                                                                    options={optionCustopCode}
                                                                    placeholder="+91"
                                                                    classNamePrefix="select2-selection form-select"
                                                                />
                                                            </div>
                                                            <div className='col-8 col-md-9'>
                                                                <Input
                                                                    type="text"
                                                                    name={`contacts[${index}].phoneNumber`}
                                                                    value={contactsFormik.values.contacts[index].phoneNumber}
                                                                    onChange={contactsFormik.handleChange}
                                                                    className="form-control"
                                                                    placeholder=""
                                                                    onBlur={contactsFormik.handleBlur}
                                                                    invalid={
                                                                        contactsFormik.touched.contacts &&
                                                                            contactsFormik.touched.contacts[index] &&
                                                                            contactsFormik.errors.contacts &&
                                                                            contactsFormik.errors.contacts[index]?.phoneNumber
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                {contactsFormik.touched.contacts &&
                                                                    contactsFormik.touched.contacts[index] &&
                                                                    contactsFormik.errors.contacts &&
                                                                    contactsFormik.errors.contacts[index]?.phoneNumber ? (
                                                                    <FormFeedback>{contactsFormik.errors.contacts[index]?.phoneNumber}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="">
                                                        <label className="form-label">Email Id<span className='required_star'>*</span></label>
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        name={`contacts[${index}].emailId`}
                                                        value={contactsFormik.values.contacts[index].emailId}
                                                        onChange={contactsFormik.handleChange}
                                                        className="form-control"
                                                        placeholder=""
                                                        onBlur={contactsFormik.handleBlur}
                                                        invalid={
                                                            contactsFormik.touched.contacts &&
                                                                contactsFormik.touched.contacts[index] &&
                                                                contactsFormik.errors.contacts &&
                                                                contactsFormik.errors.contacts[index]?.emailId
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {contactsFormik.touched.contacts &&
                                                        contactsFormik.touched.contacts[index] &&
                                                        contactsFormik.errors.contacts &&
                                                        contactsFormik.errors.contacts[index]?.emailId ? (
                                                        <FormFeedback>{contactsFormik.errors.contacts[index]?.emailId}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Department</label>
                                                        <Select
                                                            name={`contacts[${index}].department`}
                                                            value={
                                                                optionCustdepartment
                                                                    ? optionCustdepartment.find(
                                                                        (option) =>
                                                                            option.value ===
                                                                            contactsFormik?.values?.contacts[index].department
                                                                    )
                                                                    : ""
                                                            }
                                                            onChange={(e) => {
                                                                contactsFormik.setFieldValue(
                                                                    `contacts[${index}].department`,
                                                                    e.value
                                                                );
                                                            }}
                                                            options={optionCustdepartment}
                                                            classNamePrefix="select2-selection form-select"
                                                        // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Designation</label>
                                                        <Select
                                                            name={`contacts[${index}].designation`}
                                                            value={
                                                                optionCustdesignation
                                                                    ? optionCustdesignation.find(
                                                                        (option) =>
                                                                            option.value ===
                                                                            contactsFormik?.values?.contacts[index].designation
                                                                    )
                                                                    : ""
                                                            }
                                                            onChange={(e) => {
                                                                contactsFormik.setFieldValue(
                                                                    `contacts[${index}].designation`,
                                                                    e.value
                                                                );
                                                            }}
                                                            options={optionCustdesignation}
                                                            // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                                            classNamePrefix="select2-selection form-select"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                                <button type="button" className='btn btn-primary'
                                    onClick={() => arrayHelpers.push({
                                        title: "",
                                        name: '',
                                        opCode: "",
                                        phoneNumber: '',
                                        emailId: '',
                                        department: '',
                                        designation: '',
                                    })}>
                                    Add
                                </button>
                            </>
                        )}

                    </FieldArray>
                </FormikProvider>
            </div>
            <div className="d-flex justify-content-end mt-3" style={{ margin: "0 0 -62px" }}>
                <div className="d-flex align-items-center">
                    <a
                        className="me-3"
                        onClick={onClickSkip}
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        Skip
                    </a>
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        onClick={contactsFormik.handleSubmit}
                    >
                        Save
                        <i className="bx bx-chevron-right ms-1"></i>
                    </button>
                </div>
            </div>

        </>
    );
}

export default CustomerContact;
