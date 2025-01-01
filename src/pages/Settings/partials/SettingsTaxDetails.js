import { FieldArray, FormikProvider } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { Card, CardBody, Input } from 'reactstrap';

// const stateConverter = (num) => {
//     return placeOfSupply.find((place) => +place.Code === +num)?.value;
// };
const SettingsTaxDetails = ({ taxDetailsFormik, setGstModal }) => {
    const [viewGst, setViewGst] = useState(false);
    const stateAllData = useSelector((state) => state?.globalReducer?.stateAllData);
    const gstNumberHandler = (e) => {
        taxDetailsFormik.handleChange(e);
        // taxDetailsFormik.setFieldValue(
        //     "placeOfService",
        //     stateConverter(e.target.value.substring(0, 2))
        // );
    };
    return (
        <>
            <Card id="taxDetails" className="my-4">
                <CardBody>
                    <div>
                        <h5>Tax Details</h5>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12 col-md-6 mb-4">
                            <label className="form-label">Pan Number</label>
                            <Input
                                type="text"
                                name="pan"
                                value={taxDetailsFormik?.values?.pan || ""}
                                onChange={taxDetailsFormik.handleChange}
                                className="form-control"
                                placeholder=""
                            />
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                            <label className="form-label">CIN Number</label>
                            <Input
                                type="text"
                                name="cin"
                                value={taxDetailsFormik?.values?.cin || ""}
                                onChange={taxDetailsFormik.handleChange}
                                className="form-control"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 mb-4">
                            <label className="form-label">Transporter ID</label>
                            <Input
                                type="text"
                                name="transporterId"
                                value={
                                    taxDetailsFormik?.values?.transporterId || ""
                                }
                                onChange={taxDetailsFormik.handleChange}
                                className="form-control"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                            <label className="form-label">GST Number</label>
                            <Input
                                type="text"
                                name="no"
                                onChange={gstNumberHandler}
                                value={taxDetailsFormik?.values?.no || ""}
                                // value={modalAlldata?.no|| ''}
                                className="form-control"
                                placeholder="Enter GST Number"
                            />
                        </div>
                        <div className="col-10 col-md-5 mb-4">
                            <label className="form-label">Place of Service</label>
                            <Select
                                value={stateAllData ? stateAllData.find((option) => option.value === taxDetailsFormik?.values?.placeOfService) : ""}
                                name="placeOfService"
                                options={stateAllData}
                                placeholder={"Select Place of service"}
                                onChange={(e) => {
                                    taxDetailsFormik.setFieldValue(`placeOfService`, e.value);
                                }}
                                classNamePrefix="select2-selection form-select"
                            />
                        </div>
                        <div className="col-2 col-md-1">
                            <button
                                className="btn btn-primary mt-4"
                                onClick={() => setGstModal(true)}
                            >
                                <i className="bx bx-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div className="row mt-4 mb-2">
                        <a className="col-12 col-md-6 d-flex">
                            <p>{taxDetailsFormik?.values?.moreGstNumbers?.length} More GST available</p>
                            <p
                                className='ms-1'
                                onClick={() => {
                                    setViewGst((prev) => !prev);
                                }}
                            >
                                <u>View {viewGst ? " less" : " More"}</u>
                            </p>
                        </a>
                    </div>
                    {/* ------------ map GST ------ */}
                    {viewGst && (
                        <FormikProvider value={taxDetailsFormik}>
                            <FieldArray name="moreGstNumbers" validateOnChange={false}>
                                {(arrayHelpers) => (
                                    <>
                                        {taxDetailsFormik?.values?.moreGstNumbers?.map((gst, index) => (
                                            <div className="row" key={index}>
                                                <div className="col-12 col-md-6 mb-4">
                                                    <label className="form-label">GST Number</label>
                                                    <Input
                                                        type="text"
                                                        name={`moreGstNumbers[${index}].no`}
                                                        onChange={gstNumberHandler}
                                                        value={taxDetailsFormik?.values?.moreGstNumbers?.[index]?.no}
                                                        className="form-control"
                                                        placeholder=""
                                                    />
                                                </div>

                                                <div className="col-10 col-md-5 mb-4">
                                                    <label className="form-label"> Place of Supply </label>
                                                    <Select
                                                        value={stateAllData ? stateAllData.find((option) => option.value === taxDetailsFormik?.values?.moreGstNumbers?.[index]?.placeOfService) : ""}
                                                        name={`moreGstNumbers[${index}].placeOfService`}
                                                        options={stateAllData}
                                                        onChange={(e) => {
                                                            taxDetailsFormik.setFieldValue(`moreGstNumbers[${index}].placeOfService`, e.value);
                                                        }}
                                                        placeholder={"Select Place of service"}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                                <div className="col-2 col-md-1">
                                                    <button className="btn border mt-4" onClick={() => { arrayHelpers.remove(index); }}>
                                                        <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {/* <button type="button" className='btn btn-primary'
                                        onClick={() => arrayHelpers.push({
                                            gstNo: '',
                                            placeOfService: ''
                                        })}>
                                        Add
                                    </button> */}
                                    </>
                                )
                                }
                            </FieldArray>
                        </FormikProvider>
                    )}
                    {/* ----------- more GST --------------- */}

                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <div className="mb-3 mx-3 d-flex justify-content-end">
                                <button
                                    type="submit"
                                    onClick={taxDetailsFormik.handleSubmit}
                                    className="btn btn-primary"
                                    disabled={taxDetailsFormik.values.no !== '' ? !(taxDetailsFormik.values.no !== '' && taxDetailsFormik.values.placeOfService !== '') : false}
                                >
                                    Save
                                </button>
                            </div>
                            <div className="mb-3 mx-3 d-flex justify-content-end">
                                <button
                                    onClick={() => taxDetailsFormik.resetForm()}
                                    className="btn btn-primary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default SettingsTaxDetails;
