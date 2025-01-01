import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { Card, CardBody, Input } from 'reactstrap';
import { optionQuoteContactCode, optionQuoteContacttitle } from '../../../common/data/sales';
const AirConsigneeForm = () => {
    const { tenant_info } = useSelector((state) => state?.settings);

    const consigneeDetailsFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            customerName: '-',
            address: '-',
            city: '-',
            state: '-',
            country: '-',
            zipcode: '-',
            title: "Mr",
            contactName: '-',
            opCode: "+91",
            phoneNumber: '-',
            email: '-',
        }
    })
    return (
        <>
            <div className="customer_form_details">
                <Card>
                    <CardBody>
                        <form>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Company name</label>
                                        <Input
                                            type="text"
                                            name="companyName"
                                            value={consigneeDetailsFormik?.values?.customerName}
                                            onChange={consigneeDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <Input
                                            type="text"
                                            name="address"
                                            value={consigneeDetailsFormik.values.address}
                                            onChange={consigneeDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <Input
                                            type="text"
                                            name="city"
                                            value={consigneeDetailsFormik.values.city}
                                            onChange={consigneeDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">State</label>
                                        <Input
                                            type="text"
                                            name="state"
                                            value={consigneeDetailsFormik.values.state}
                                            onChange={consigneeDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Country</label>
                                        <Input
                                            type="text"
                                            name="country"
                                            value={consigneeDetailsFormik.values.country}
                                            onChange={consigneeDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Zipcode</label>
                                        <Input
                                            type="text"
                                            name="zipcode"
                                            value={consigneeDetailsFormik.values.zipcode}
                                            onChange={consigneeDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Contact Name</label>
                                        <div className='row'>
                                            <div className='col-4 col-md-2'>
                                                <Select
                                                    name='title'
                                                    value={
                                                        optionQuoteContacttitle ? optionQuoteContacttitle.find((option) => option.value === consigneeDetailsFormik?.values?.title) : ""
                                                    }
                                                    onChange={(e) => {
                                                        consigneeDetailsFormik.setFieldValue(`title`, e.value);
                                                    }}
                                                    placeholder="Mr"
                                                    options={optionQuoteContacttitle}
                                                    classNamePrefix="select2-selection form-select"                                                    
                                                />
                                            </div>
                                            <div className='col-6'>
                                                <Input
                                                    type="text"
                                                    name="contactName"
                                                    value={consigneeDetailsFormik.values.contactName}
                                                    onChange={consigneeDetailsFormik.handleChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <div className='row'>
                                            <div className='col-4 col-md-3'>
                                                <Select
                                                    name='opCode'
                                                    value={optionQuoteContactCode ? optionQuoteContactCode.find((option) => option.value === consigneeDetailsFormik?.values?.opCode) : ""}
                                                    onChange={(e) => {
                                                        consigneeDetailsFormik.setFieldValue(`opCode`, e.value);
                                                    }}
                                                    placeholder="+91"
                                                    options={optionQuoteContactCode}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>
                                            <div className='col-8 col-md-9'>
                                                <Input
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={consigneeDetailsFormik.values.phoneNumber}
                                                    onChange={consigneeDetailsFormik.handleChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Email Id</label>
                                        <Input
                                            type="text"
                                            name="email"
                                            value={consigneeDetailsFormik.values.email}
                                            onChange={consigneeDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default AirConsigneeForm;
