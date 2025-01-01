import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { Card, CardBody, FormFeedback, Input, Nav, NavItem, Row, TabContent, TabPane, NavLink } from 'reactstrap';
import classnames from "classnames";
import { useDispatch } from 'react-redux';
import { optionCustcustomerType, optionCustdepartment, optionCustdesignation, optionCustentityType, optionCustindustryType, optionCustopCode, optionCusttitle, marginType } from '../../../../common/data/settings';
import { getAllCustomerDetailsData, getCustomersCountryData, getCustomersPincodeData, getCustomersStateData } from '../../../../store/Parties/actions';
import FileUpload from '../../FileUpload';
import ModalAddGST from '../../Modal/ModalAddGST';
import ModalAddNewCustomerType from '../../Modal/ModalAddNewCustomerType';
import ModalAddNewDepartment from '../../Modal/ModalAddNewDepartment';
import ModalAddNewDesignation from '../../Modal/ModalAddNewDesignation';
import ModalAddNewEntityType from '../../Modal/ModalAddNewEntityType';
import ModalAddNewIndustryType from '../../Modal/ModalAddNewIndustryType';
import ModalAddNewKeyAccountManager from '../../Modal/ModalAddNewKeyAccountManager';
import ModalAddNewSalesEmployee from '../../Modal/ModalAddNewSalesEmployee';
import { postCustomerDetailsAction } from '../../../../store/Parties/Customer/action';
import { useLocation } from 'react-router-dom';
import * as Yup from "yup";
import { GET_CUSTOMERS_ID } from '../../../../store/Parties/Customer/actiontype';

const CustomerCompDetails = ({ toggleTabProgress }) => {
    const [logoFile, setLogoFile] = useState('');
    const [gstModal, setGstModal] = useState(false);
    const [departmentModal, setDepartmentModal] = useState(false);
    const [designationModal, setDesignationModal] = useState(false);
    const [salesEmployeeModal, setSalesEmployeeModal] = useState(false);
    const [keyAccountManagerModal, setKeyAccountManagerModal] = useState(false);
    const [entityTypeModal, setEntityTypeModal] = useState(false);
    const [industryTypeModal, setIndustryTypeModal] = useState(false);
    const [customerTypeModal, setCustomerTypeModal] = useState(false);
    const [modalAlldata, setModalAllData] = useState([]);
    const [activeTab, toggleTab] = useState("1");
    const dispatch = useDispatch();
    const [isNewCustomer, setIsNewCustomer] = useState(false)

    const navigateState = useLocation();

    const { parties_city_details, parties_all_details, parties_all_employee_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector(
        (state) => state?.parties
    );
    const { customer_id, customer_data } = useSelector(
        (state) => state?.customer
    );

    useEffect(() => {
        const cityData = parties_city_details?.content?.find((city) => city.cityName === navigateState?.state?.data?.city?.cityName);
        if (!!cityData) {
            dispatch(getCustomersStateData({ cityId: cityData.id }));
            dispatch(getCustomersCountryData({ cityId: cityData.id }));
            dispatch(getCustomersPincodeData({ cityId: cityData.id }));
        }
        if (!!(navigateState?.state && navigateState?.state.data)) {
            dispatch({ type: GET_CUSTOMERS_ID, payload: { id: navigateState?.state?.data?.id, version: navigateState?.state?.data?.version } });
        }
    }, [])

    const onCloseClick = () => {
        setGstModal(false);
        setDepartmentModal(false)
        setDesignationModal(false)
        setSalesEmployeeModal(false)
        setKeyAccountManagerModal(false)
        setEntityTypeModal(false)
        setIndustryTypeModal(false)
        setCustomerTypeModal(false)
    };

    const gstDetailsHandler = (data) => {
        setModalAllData((prev) => ([...prev, data]))
    }

    const companyDetailsFormik = useFormik({
        initialValues: {
            image: navigateState?.state?.data?.logo || "",
            companyName: navigateState?.state?.data?.name || "",
            companyCode: navigateState?.state?.data?.customerCode || "",
            logo: navigateState?.state?.data?.logo || "",
            address: navigateState?.state?.data?.address || "",
            city: navigateState?.state?.data?.city?.cityName || null,
            state: navigateState?.state?.data?.state?.stateName || null,
            country: navigateState?.state?.data?.country?.countryName || null,
            zipcode: navigateState?.state?.data?.pinCode || null,
            website: navigateState?.state?.data?.website || "",
            contactName: navigateState?.state?.data?.contactName || "",
            phoneNumber: navigateState?.state?.data?.contactNo || "",
            email: navigateState?.state?.data?.contactEmail || "",
            department: navigateState?.state?.data?.department || "",
            designation: navigateState?.state?.data?.designation || "",
            venderType: navigateState?.state?.data?.vendorType || "",
            transportMode: navigateState?.state?.data?.transportMode || "",
            CINnumber: navigateState?.state?.data?.cin || "",
            GSTnumber: navigateState?.state?.data?.gst || "",
            PANnumber: navigateState?.state?.data?.pan || "",
            entityType: navigateState?.state?.data?.entityType || "",
            industryType: navigateState?.state?.data?.industryType || "",
            title: navigateState?.state?.data?.title || "",
            opCode: navigateState?.state?.data?.opCode || "",
            salesEmployee: navigateState?.state?.data?.salesUser?.firstName || "",
            keyAccountManager: navigateState?.state?.data?.accountManager?.firstName || "",
            customerType: navigateState?.state?.data?.type,
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required("Please Enter Customer Name"),
            companyCode: Yup.string().required("Please Enter Customer Name"),
            city: Yup.string().nullable().required("Please Enter selected City"),
            country: Yup.string().nullable().required("Please Enter selected country"),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            contactName: Yup.string().required("Please Enter Your contact Name"),
            phoneNumber: Yup.string().required("Please Enter Your Phone Number"),
            keyAccountManager: Yup.string().required("Please select manager account"),
            salesEmployee: Yup.string().required("Please select sales employee")
        }),
        onSubmit: async ({ image, ...values }) => {
            console.log("values company details", values);
            let countryVal = parties_country_details?.content?.filter((con) => con?.countryName === values?.country) || [];
            let cityVal = parties_city_details?.content?.filter((city) => city?.cityName === values?.city) || [];
            let stateVal = parties_state_details?.content?.filter((state) => state?.stateName === values?.state) || [];
            let pincodeVal = parties_pincode_details?.content?.filter((pin) => pin?.pin === values?.zipcode) || [];
            let salesEmployeeVal = salesEmployeeOptions.find((option) => option.value === values?.salesEmployee)
            let accountManagerVal = accountManagerOptions.find((option) => option.value === values?.keyAccountManager)

            let formData = new FormData();
            const projectUATRequestDTO = {
                ...Object.fromEntries(Object.entries({
                    "name": values.companyName || null,
                    customerCode: values.companyCode,
                    "logo": null,
                    "logoPath": image?.preview || null,
                    "address": values.address || null,
                    id: !!(navigateState?.state && navigateState?.state.data) ? navigateState?.state?.data?.id : isNewCustomer ? customer_id.id : null || null,
                    version: !!(navigateState?.state && navigateState?.state.data) ? !!customer_id ? customer_id.version : navigateState?.state?.data?.version : isNewCustomer ? customer_id.version : null || 0,
                    ...(!!(navigateState?.state && navigateState?.state.data) && {
                        logoPath: image?.path ? image?.path : navigateState?.state?.data?.logoPath
                    }),
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
                    "website": values.website || null,
                    "contactName": values.contactName || null,
                    "contactNo": values.phoneNumber || null,
                    "contactEmail": values.email || null,
                    "department": values.department || null,
                    "designation": values.designation || null,
                    "salesUser": {
                        id: salesEmployeeVal?.id,
                        version: salesEmployeeVal?.version
                    },
                    "accountManager": {
                        id: accountManagerVal?.id,
                        version: accountManagerVal?.version
                    },
                    "transportMode": "AIR",
                    "cin": values.CINnumber || null,
                    "gst": values.GSTnumber || null,
                    "pan": values.PANnumber || null,
                    "entityType": values.entityType || null,
                    "industryType": values.industryType || null,
                    "type": values.customerType || null,
                    "status": "ACTIVE",
                    "addresses": [],
                    "contacts": [],
                    documents: [],
                }).filter(([_, value]) => value !== null)),
            }

            console.log(projectUATRequestDTO, "projectUATRequestDTO");
            formData.append('file', image);
            formData.append('tenantCustomer', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));
            setIsNewCustomer(true)
            dispatch(postCustomerDetailsAction(formData));
            toggleTabProgress(2);
        },
    })

    useEffect(() => {
        if (parties_state_details && parties_state_details?.content?.length > 0) {
            companyDetailsFormik.setFieldValue("state", parties_state_details?.content[0]?.stateName)
        }
        if (parties_country_details && parties_country_details?.content?.length > 0) {
            companyDetailsFormik.setFieldValue("country", parties_country_details?.content[0]?.countryName)
        }
    }, [parties_state_details, parties_country_details, parties_pincode_details, parties_all_details]);

    const optionOfEmployee = parties_all_employee_details?.content || [];

    const salesEmployeeOptions = optionOfEmployee?.map((item) => ({
        value: item?.firstName,
        label: item?.firstName,
        id: item?.id,
        version: item?.version
    }));

    const accountManagerOptions = optionOfEmployee?.map((item) => {
        return {
            value: item?.firstName,
            label: item?.firstName,
            id: item?.id,
            version: item?.version
        }
    })
    const onClickSkip = () => {
        toggleTabProgress(2);
    }
    const onUploadChange = (file) => {
        console.log(file.name, "file")
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // When the file is loaded, set the Data URL in the state
                setLogoFile(e.target.result);
            };

            // Read the file as a Data URL
            reader.readAsDataURL(file);
        }
        companyDetailsFormik.setFieldValue("image", file);
    };

    return (
        <>
            <div className="text-center mb-4">
                <h5>Customer Details</h5>
            </div>
            <Card>
                <CardBody>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">
                                    Customer Code<span className="required_star">*</span>
                                </label>
                                <Input
                                    type="text"
                                    name="companyCode"
                                    value={companyDetailsFormik.values.companyCode}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                    onBlur={companyDetailsFormik.handleBlur}
                                    invalid={
                                        companyDetailsFormik.touched.companyCode &&
                                            companyDetailsFormik.errors.companyCode
                                            ? true
                                            : false
                                    }
                                />
                                {companyDetailsFormik.touched.companyCode &&
                                    companyDetailsFormik.errors.companyCode ? (
                                    <FormFeedback>{companyDetailsFormik.errors.companyCode}</FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Customer Name<span className='required_star'>*</span></label>
                                <Input
                                    type="text"
                                    name="companyName"
                                    value={companyDetailsFormik.values.companyName}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                    onBlur={companyDetailsFormik.handleBlur}
                                    invalid={companyDetailsFormik.touched.companyName && companyDetailsFormik.errors.companyName ? true : false}
                                />
                                {companyDetailsFormik.touched.companyName && companyDetailsFormik.errors.companyName ? (
                                    <FormFeedback>{companyDetailsFormik.errors.companyName}</FormFeedback>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Logo</label>
                                <FileUpload
                                    iconName="img"
                                    onUpload={onUploadChange}
                                    src={companyDetailsFormik?.values?.image}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={companyDetailsFormik.values.address}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">City<span className='required_star'>*</span></label>
                                <Input
                                    type="text"
                                    name="city"
                                    list='cityList'
                                    value={companyDetailsFormik.values.city}
                                    // onChange={companyDetailsFormik.handleChange}
                                    onChange={(e) => {
                                        companyDetailsFormik.handleChange(e);
                                        companyDetailsFormik.setFieldValue('state', '');
                                        companyDetailsFormik.setFieldValue('country', '');
                                        companyDetailsFormik.setFieldValue('zipcode', '');
                                        const cityData = parties_city_details?.content?.find((city) => city.cityName === e.target.value);
                                        if (cityData) {
                                            dispatch(getCustomersStateData({ cityId: cityData.id }));
                                            dispatch(getCustomersCountryData({ cityId: cityData.id }));
                                            dispatch(getCustomersPincodeData({ cityId: cityData.id }));
                                        }
                                    }
                                    }
                                    className="form-control"
                                    placeholder=""
                                    onBlur={companyDetailsFormik.handleBlur}
                                    invalid={companyDetailsFormik.touched.city && companyDetailsFormik.errors.city ? true : false}
                                />
                                {companyDetailsFormik.touched.city && companyDetailsFormik.errors.city ? (
                                    <FormFeedback>{companyDetailsFormik.errors.city}</FormFeedback>
                                ) : null}
                                <datalist id="cityList">
                                    {parties_city_details && parties_city_details?.content?.map((item, i) => <option key={i} value={item.cityName} />)}
                                </datalist>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">State</label>
                                <Input
                                    type="text"
                                    name="state"
                                    value={companyDetailsFormik.values.state}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Country<span className='required_star'>*</span></label>
                                <Input
                                    type="text"
                                    name="country"
                                    value={companyDetailsFormik.values.country}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                    readOnly={true}
                                    onBlur={companyDetailsFormik.handleBlur}
                                    invalid={companyDetailsFormik.touched.country && companyDetailsFormik.errors.country ? true : false}
                                />
                                {companyDetailsFormik.touched.country && companyDetailsFormik.errors.country ? (
                                    <FormFeedback>{companyDetailsFormik.errors.country}</FormFeedback>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Zipcode</label>
                                <Input
                                    type="text"
                                    name="zipcode"
                                    list='pincodeList'
                                    value={companyDetailsFormik.values.zipcode}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                />
                                <datalist id="pincodeList">
                                    {parties_pincode_details && parties_pincode_details?.content?.map((item, i) => <option key={i} value={item.pin} />)}
                                </datalist>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Website</label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={companyDetailsFormik.values.website}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            {/* Primary Contact Details */}
            <div className="text-center mb-4">
                <h5>Primary Contact Details</h5>
            </div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Contact Name<span className='required_star'>*</span></label>
                                <div className='row'>
                                    <div className='col-4 col-md-2'>
                                        <Select
                                            name='title'
                                            value={
                                                optionCusttitle
                                                    ? optionCusttitle.find(
                                                        (option) =>
                                                            option.value ===
                                                            companyDetailsFormik?.values?.title
                                                    )
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                companyDetailsFormik.setFieldValue(
                                                    `title`,
                                                    e.value
                                                );
                                            }}
                                            placeholder="Mr"
                                            options={optionCusttitle}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                    <div className='col-6'>
                                        <Input
                                            type="text"
                                            name="contactName"
                                            value={companyDetailsFormik.values.contactName}
                                            onChange={companyDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            onBlur={companyDetailsFormik.handleBlur}
                                            invalid={companyDetailsFormik.touched.contactName && companyDetailsFormik.errors.contactName ? true : false}
                                        />
                                        {companyDetailsFormik.touched.contactName && companyDetailsFormik.errors.contactName ? (
                                            <FormFeedback>{companyDetailsFormik.errors.contactName}</FormFeedback>
                                        ) : null}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Phone Number<span className='required_star'>*</span></label>
                                <div className='row'>
                                    <div className='col-4 col-md-3'>
                                        <Select
                                            name='opCode'
                                            value={
                                                optionCustopCode
                                                    ? optionCustopCode.find(
                                                        (option) =>
                                                            option.value ===
                                                            companyDetailsFormik?.values?.opCode
                                                    )
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                companyDetailsFormik.setFieldValue(
                                                    `opCode`,
                                                    e.value
                                                );
                                            }}
                                            placeholder="+91"
                                            options={optionCustopCode}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                    <div className='col-8 col-md-9'>
                                        <Input
                                            type="text"
                                            name="phoneNumber"
                                            value={companyDetailsFormik.values.phoneNumber}
                                            onChange={companyDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            onBlur={companyDetailsFormik.handleBlur}
                                            invalid={companyDetailsFormik.touched.phoneNumber && companyDetailsFormik.errors.phoneNumber ? true : false}
                                        />
                                        {companyDetailsFormik.touched.phoneNumber && companyDetailsFormik.errors.phoneNumber ? (
                                            <FormFeedback>{companyDetailsFormik.errors.phoneNumber}</FormFeedback>
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
                                name="email"
                                value={companyDetailsFormik.values.email}
                                onChange={companyDetailsFormik.handleChange}
                                className="form-control"
                                placeholder=""
                                onBlur={companyDetailsFormik.handleBlur}
                                invalid={companyDetailsFormik.touched.email && companyDetailsFormik.errors.email ? true : false}
                            />
                            {companyDetailsFormik.touched.email && companyDetailsFormik.errors.email ? (
                                <FormFeedback>{companyDetailsFormik.errors.email}</FormFeedback>
                            ) : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Department</label>
                                <Select
                                    name='department'
                                    value={
                                        optionCustdepartment
                                            ? optionCustdepartment.find(
                                                (option) =>
                                                    option.value ===
                                                    companyDetailsFormik?.values?.department
                                            )
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setDepartmentModal(true)
                                        }
                                        companyDetailsFormik.setFieldValue(
                                            `department`,
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
                                    name='designation'
                                    value={
                                        optionCustdesignation
                                            ? optionCustdesignation.find(
                                                (option) =>
                                                    option.value ===
                                                    companyDetailsFormik?.values?.designation
                                            )
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setDesignationModal(true)
                                        }
                                        companyDetailsFormik.setFieldValue(
                                            `designation`,
                                            e.value
                                        );
                                    }}
                                    options={optionCustdesignation}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Sales Employee<span className='required_star'>*</span></label>
                                <Select
                                    name='salesEmployee'
                                    value={
                                        salesEmployeeOptions
                                            ? salesEmployeeOptions.find(
                                                (option) =>
                                                    option.value ===
                                                    companyDetailsFormik?.values?.salesEmployee
                                            )
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setSalesEmployeeModal(true)
                                        } else {
                                            companyDetailsFormik.setFieldValue(`salesEmployee`, e.value);
                                        }
                                    }}
                                    options={salesEmployeeOptions}
                                    classNamePrefix="select2-selection form-select"
                                    onBlur={companyDetailsFormik.handleBlur}
                                    invalid={companyDetailsFormik.touched.salesEmployee && companyDetailsFormik.errors.salesEmployee ? true : false}
                                />
                                {companyDetailsFormik.touched.salesEmployee && companyDetailsFormik.errors.salesEmployee ? (
                                    <FormFeedback>{companyDetailsFormik.errors.salesEmployee}</FormFeedback>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Key Account Manager<span className='required_star'>*</span></label>
                                <Select
                                    name='keyAccountManager'
                                    value={
                                        accountManagerOptions
                                            ? accountManagerOptions.find(
                                                (option) =>
                                                    option.value ===
                                                    companyDetailsFormik?.values?.keyAccountManager
                                            )
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setKeyAccountManagerModal(true)
                                        } else {
                                            companyDetailsFormik.setFieldValue(`keyAccountManager`, e.value);
                                        }
                                    }}
                                    options={accountManagerOptions}
                                    classNamePrefix="select2-selection form-select"
                                    onBlur={companyDetailsFormik.handleBlur}
                                    invalid={companyDetailsFormik.touched.keyAccountManager && companyDetailsFormik.errors.keyAccountManager ? true : false}
                                />
                                {companyDetailsFormik.touched.keyAccountManager && companyDetailsFormik.errors.keyAccountManager ? (
                                    <FormFeedback>{companyDetailsFormik.errors.keyAccountManager}</FormFeedback>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Company identification */}
            <div className="text-center mb-4">
                <h5>Company identification</h5>
            </div>
            <Card>
                <CardBody>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <div className="mb-3">
                                <label className="form-label">CIN Number</label>
                                <Input
                                    type="text"
                                    name="CINnumber"
                                    value={companyDetailsFormik.values.CINnumber}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-5">
                            <div className="mb-3">
                                <label className="form-label">GST Number</label>
                                <Input
                                    type="text"
                                    name="GSTnumber"
                                    value={companyDetailsFormik.values.GSTnumber}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="col-2 col-md-1">
                            <button
                                className="btn btn-primary mt-4"
                            // onClick={() => setGstModal(true)}
                            >
                                <i className="bx bx-plus"></i>
                            </button>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">PAN Number</label>
                                <Input
                                    type="text"
                                    name="PANnumber"
                                    value={companyDetailsFormik.values.PANnumber}
                                    onChange={companyDetailsFormik.handleChange}
                                    className="form-control"
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Entity Type</label>
                                <Select
                                    name='entityType'
                                    value={
                                        optionCustentityType
                                            ? optionCustentityType.find(
                                                (option) =>
                                                    option.value ===
                                                    companyDetailsFormik?.values?.entityType
                                            )
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setEntityTypeModal(true)
                                        }
                                        companyDetailsFormik.setFieldValue(
                                            `entityType`,
                                            e.value
                                        );
                                    }}
                                    options={optionCustentityType}
                                    classNamePrefix="select2-selection form-select"
                                // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Industry Type</label>
                                <Select
                                    name='industryType'
                                    value={
                                        optionCustindustryType
                                            ? optionCustindustryType.find(
                                                (option) =>
                                                    option.value ===
                                                    companyDetailsFormik?.values?.industryType
                                            )
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setIndustryTypeModal(true)
                                        }
                                        companyDetailsFormik.setFieldValue(`industryType`, e.value);
                                    }}
                                    options={optionCustindustryType}
                                    // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Customer Type</label>
                                <Select
                                    name='customerType'
                                    value={
                                        optionCustcustomerType
                                            ? optionCustcustomerType.find(
                                                (option) =>
                                                    option.value ===
                                                    companyDetailsFormik?.values?.customerType
                                            )
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setCustomerTypeModal(true)
                                        }
                                        companyDetailsFormik.setFieldValue(`customerType`, e.value);
                                    }}
                                    options={optionCustcustomerType}
                                    placeholder="Customer"
                                    // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            {/* <div className="text-center mb-4">
                <h5>Customer Rate</h5>
            </div>
            <div className="col">
                <Card>
                    <CardBody>
                        <Nav className="nav-tabs-custom card-header-tabs justify-content-around">
                            <NavItem>
                                <NavLink href="#" className={classnames({ active: activeTab === "1", }, "px-3")} onClick={() => { toggleTab("1") }}>
                                    FCL
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className={classnames({ active: activeTab === "2", }, "px-3")} onClick={() => { toggleTab("2") }} >
                                    LCL
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className={classnames({ active: activeTab === "3", }, "px-3")} onClick={() => { toggleTab("3") }} >
                                    AIR
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </CardBody>
                </Card>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Card>
                            <CardBody>
                                <div className="mb-4">
                                    <h5>FCL Freight</h5>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="number"
                                                name="margin"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>FCL Port & Local charges</h5>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="number"
                                                name="PANnumber"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>Fcl InLand Charges</h5>
                                </div>
                                <div className="row">
                                    <div className="col-8 col-md-4">
                                        <div className="mb-2">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                placeholder=""
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-4">

                                        <div className="mb-2">
                                            <label className="form-label">Currency</label>
                                            <Select
                                                name='marginType'
                                                placeholder="Currency"
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-4">
                                        <div className="mb-2">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="text"
                                                name="number"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId="2">
                        <Card>
                            <CardBody>
                                <div className="mb-4">
                                    <h5>LCL Freight</h5>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="number"
                                                name="margin"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>LCL Port & Local charges</h5>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="number"
                                                name="PANnumber"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>LCL InLand Charges</h5>
                                </div>
                                <div className="row">
                                    <div className="col-8 col-md-4">
                                        <div className="mb-2">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                options={marginType}
                                                placeholder=""
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-4">

                                        <div className="mb-2">
                                            <label className="form-label">Currency</label>
                                            <Select
                                                name='customerType'
                                                placeholder="Currency"
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-4">
                                        <div className="mb-2">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="text"
                                                name="number"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId="3">
                        <Card>
                            <CardBody>
                                <div className="mb-4">
                                    <h5>AIR Freight</h5>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="number"
                                                name="margin"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>AIR Port & Local charges</h5>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='marginType'
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Margin</label>
                                            <Input
                                                type="number"
                                                name="PANnumber"
                                                className="form-control"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>AIR InLand Charges</h5>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <div className="mb-2">
                                            <label className="form-label">Margin Type</label>
                                            <Select
                                                name='customerType'
                                                placeholder=""
                                                options={marginType}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">

                                        <div className="mb-2">
                                            <label className="form-label">Currency</label>
                                            <Select
                                                name='currency'
                                                placeholder="Currency"
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
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
                                </div>
                            </CardBody>
                        </Card>
                    </TabPane>

                </TabContent>
            </div> */}

            <div className="d-flex justify-content-end" style={{ margin: "0 0 -62px" }}>

                <div className="d-flex align-items-center">
                    {!!(navigateState?.state?.data) && (
                        <a
                            className="me-3"
                            onClick={onClickSkip}
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        >
                            Skip
                        </a>
                    )}
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        onClick={companyDetailsFormik.handleSubmit}
                    >
                        Save
                        <i className="bx bx-chevron-right ms-1"></i>
                    </button>
                </div>
            </div>

            {/* onSubmitHandler={gstDetailsHandler} */}
            <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} />
            <ModalAddNewDepartment modal={departmentModal} onCloseClick={onCloseClick} />
            <ModalAddNewDesignation modal={designationModal} onCloseClick={onCloseClick} />
            <ModalAddNewSalesEmployee modal={salesEmployeeModal} onCloseClick={onCloseClick} />
            <ModalAddNewKeyAccountManager modal={keyAccountManagerModal} onCloseClick={onCloseClick} />
            <ModalAddNewCustomerType modal={customerTypeModal} onCloseClick={onCloseClick} />
            <ModalAddNewEntityType modal={entityTypeModal} onCloseClick={onCloseClick} />
            <ModalAddNewIndustryType modal={industryTypeModal} onCloseClick={onCloseClick} />
        </>
    );
}

export default CustomerCompDetails;
