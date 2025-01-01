import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Row,
    FormFeedback
} from "reactstrap";
import { getCustomersCityData, getCustomersCountryData, getCustomersPincodeData, getCustomersStateData } from "../../store/Parties/actions";
import { getAllTenantLocationType, postTenantLocation } from "../../store/Settings/actions";
import AddTenantLocationType from "./Modal/AddTenentType";
import * as Yup from "yup";

export default function AddTanentLocation() {
    const [tenentType, setAddTenentType] = useState(false);
    const [locationType, setLocationType] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { parties_city_details, parties_all_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector((state) => state?.parties);
    const { tenant_all_location_type_data } = useSelector((state) => state.settings);

    useEffect(() => {
        if (parties_state_details && parties_state_details?.content?.length > 0) {
            addLocationFormik.setFieldValue("state", parties_state_details?.content[0]?.stateName)
        }
        if (parties_country_details && parties_country_details?.content?.length > 0) {
            addLocationFormik.setFieldValue("country", parties_country_details?.content[0]?.countryName)
        }
    }, [parties_state_details, parties_country_details, parties_pincode_details, parties_city_details, parties_all_details]);
    useEffect(() => {
        dispatch(getAllTenantLocationType())
        dispatch(getCustomersCityData())
    }, []);

    const addLocationFormik = useFormik({
        initialValues: {
            name: "",
            tenantLocationType: "",
            address: "",
            state: "",
            contactName: "",
            contactNo: "",
            city: "",
            zipcode: "",
            country: "",
            email: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Location Name"),
            city: Yup.string().nullable().required("Please Enter selected City"),
            country: Yup.string().nullable().required("Please Enter selected country"),
            tenantLocationType: Yup.string().required("Please Enter select Location type"),
        }),
        onSubmit: (values) => {
            console.log(values, "values");
            let countryVal = parties_country_details?.content?.filter((con) => con?.countryName === values?.country) || [];
            let cityVal = parties_city_details?.content?.filter((city) => city?.cityName === values?.city) || [];
            let stateVal = parties_state_details?.content?.filter((state) => state?.stateName === values?.state) || [];
            let pincodeVal = parties_pincode_details?.content?.filter((pin) => pin?.pin === values?.zipcode) || [];            
            let locationtypeVal = tenant_all_location_type_data?.content?.filter((type) => type?.typeName === values?.tenantLocationType);
            
            const tenantLocation = {
                "name": values.name || "",
                "address": values.address || null,
                "zipcode": values.zipcode || null,
                ...(pincodeVal?.length !== 0 && {
                    "pinCode": {
                        id: pincodeVal[0]?.id,
                        version: pincodeVal[0]?.version
                    },
                }),
                ...(cityVal?.length !== 0 && {
                    "city": {
                        id: cityVal[0]?.id,
                        version: cityVal[0]?.version
                    },
                }),
                ...(stateVal?.length !== 0 && {
                    "state": {
                        id: stateVal[0]?.id,
                        version: stateVal[0]?.version
                    },
                }),
                ...(countryVal?.length !== 0 && {
                    "country": {
                        id: countryVal[0]?.id,
                        version: countryVal[0]?.version
                    },
                }),
                ...(locationtypeVal?.length !== 0 && {
                    "tenantLocationType": {
                        id: locationtypeVal[0]?.id,
                        version: locationtypeVal[0]?.version
                    },
                }),
                "contactNo": values.contactNo || null,
                "email": values.email || null,
                "contactName": values.contactName || null,
            }
            console.log(tenantLocation, "tenantLocation");
            dispatch(postTenantLocation(tenantLocation));
            addLocationFormik.resetForm();
        },
    })
    useEffect(() => {
        const newLocationType = tenant_all_location_type_data?.content?.map(locationtype => ({
            value: locationtype.id,
            label: locationtype.typeName,
            id: locationtype.id,
        })) || [];

        const addNewItem = {
            value: 'add_new',
            label: 'Add New',
        };

        setLocationType([...newLocationType, addNewItem]);
    }, [tenant_all_location_type_data]);
    const onCloseClick = () => {
        dispatch(getAllTenantLocationType());
        setAddTenentType(false);
    };

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper surcharges_add_form_wrap">
                        <button type="button" className="btn border mb-3" onClick={() => { navigate(-1); }} > Back </button>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Location Name<span className='required_star'>*</span></label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="name"
                                                            value={addLocationFormik?.values?.name}
                                                            onChange={addLocationFormik.handleChange}
                                                            className="form-control"
                                                            placeholder="Enter Location Name"
                                                            onBlur={addLocationFormik.handleBlur}
                                                            invalid={addLocationFormik.touched.name && addLocationFormik.errors.name ? true : false}
                                                        />
                                                        {addLocationFormik.touched.name && addLocationFormik.errors.name ? (
                                                            <FormFeedback> {addLocationFormik.errors.name} </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Location Type<span className='required_star'>*</span></label>
                                                    <div className="">
                                                        <Select
                                                            value={locationType ? locationType?.find(obj => obj.label === addLocationFormik?.values?.tenantLocationType) : ''}
                                                            name="tenantLocationType"
                                                            onChange={(opt) => {
                                                                if (opt.label == "Add New") {
                                                                    setAddTenentType(true)
                                                                } else {
                                                                    addLocationFormik.setFieldValue("tenantLocationType", opt.label);
                                                                }
                                                            }}
                                                            options={locationType}
                                                            placeholder={"Select location type"}
                                                            classNamePrefix="select2-selection form-select"
                                                            onBlur={addLocationFormik.handleBlur}
                                                            invalid={addLocationFormik.touched.tenantLocationType && addLocationFormik.errors.tenantLocationType ? true : false}
                                                        />
                                                        {addLocationFormik.touched.tenantLocationType && addLocationFormik.errors.tenantLocationType ? (
                                                            <FormFeedback> {addLocationFormik.errors.tenantLocationType} </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Comapany Address</label>

                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="address"
                                                            value={addLocationFormik?.values?.address}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("address", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="mb-3">
                                                    <label className="form-label">City<span className='required_star'>*</span></label>
                                                    <Input
                                                        type="text"
                                                        name="city"
                                                        list='cityList'
                                                        value={addLocationFormik.values.city}
                                                        onChange={(e) => {
                                                            addLocationFormik.handleChange(e);
                                                            addLocationFormik.setFieldValue('state', '');
                                                            addLocationFormik.setFieldValue('country', '');
                                                            addLocationFormik.setFieldValue('zipcode', '');
                                                            const cityData = parties_city_details?.content?.find((city) => city.cityName === e.target.value);
                                                            if (cityData) {
                                                                dispatch(getCustomersStateData({ cityId: cityData.id }));
                                                                dispatch(getCustomersCountryData({ cityId: cityData.id }));
                                                                dispatch(getCustomersPincodeData({ cityId: cityData.id }));
                                                            }
                                                        }
                                                        }
                                                        className="form-control"
                                                        placeholder="Select City"
                                                        onBlur={addLocationFormik.handleBlur}
                                                        invalid={addLocationFormik.touched.city && addLocationFormik.errors.city ? true : false}
                                                    />
                                                    {addLocationFormik.touched.city && addLocationFormik.errors.city ? (
                                                        <FormFeedback> {addLocationFormik.errors.city} </FormFeedback>
                                                    ) : null}
                                                    <datalist id="cityList">
                                                        {parties_city_details && parties_city_details?.content?.map((item, i) => <option key={i} value={item.cityName} />)}
                                                    </datalist>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Country<span className='required_star'>*</span></label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="country"
                                                            readOnly={true}
                                                            value={addLocationFormik.values.country}
                                                            onChange={addLocationFormik.handleChange}
                                                            className="form-control"
                                                            placeholder="Country"
                                                            onBlur={addLocationFormik.handleBlur}
                                                            invalid={addLocationFormik.touched.city && addLocationFormik.errors.city ? true : false}
                                                        />
                                                        {addLocationFormik.touched.city && addLocationFormik.errors.city ? (
                                                            <FormFeedback> {addLocationFormik.errors.city} </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">State</label>

                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="state"
                                                            value={addLocationFormik?.values?.state}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("state", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter state"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Zipcode</label>

                                                    <div className="">
                                                        <Input
                                                            type="number"
                                                            name="zipcode"
                                                            value={addLocationFormik?.values?.zipcode}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("zipcode", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter zipcode"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Contact Name</label>

                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="contactName"
                                                            value={addLocationFormik?.values?.contactName}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("contactName", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter contactName"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Contact No</label>
                                                    <div className="">
                                                        <Input
                                                            type="number"
                                                            name="contactNo"
                                                            value={addLocationFormik?.values?.contactNo}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("contactNo", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter contactNo"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Contact Email</label>
                                                    <div className="">
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            value={addLocationFormik?.values?.email}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("email", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter email"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="d-flex justify-content-center">
                                                <div className="mb-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" onClick={() => addLocationFormik.handleSubmit()}>Save</button>
                                                </div>
                                                <div className="mb-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" onClick={() => addLocationFormik.resetForm()}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <AddTenantLocationType modal={tenentType} onCloseClick={onCloseClick} />
                    </div>
                </Container>
            </div>
        </>
    );
}
