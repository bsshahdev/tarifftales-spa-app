import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, Input, Modal, Nav, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
// import fileData from "../../assets/extra/upload_Formats.xlsx";
import { useFormik } from "formik";
import { delete_icon } from "../../assets/images";
import { addCarrierBreadcrumb, addVendorsBreadcrumb } from "../../common/data/parties";
import { optionMultiDestination, optionSurchargesName } from "../../common/data/procurement";
import { isAnyValueEmpty } from "../../components/Common/CommonLogic";
import { postVendorContactAction, postVendorDetailsAction, postVendorDocumentAction } from "../../store/Parties/Vendor/action";
import { getCustomersCityData } from "../../store/Parties/actions";
import { BLANK_CARRIER_DATA } from "../../store/Procurement/actiontype";
import TopBreadcrumbs from "../Settings/Surcharge/TopBreadcrumbs";
import ContactDetailsForm from "./partials/vendor/ContactDetailsForm";
import DocumentDetailsForm from "./partials/vendor/DocumentDetailsForm";
import VenderDetails from "./partials/vendor/VenderDetails";
import * as Yup from "yup";
import { marginType } from "../../common/data/settings";
import { GET_VENDOR_DETAILS_ID } from "../../store/Parties/Vendor/actiontype";
export default function UploadVendorData() {
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [progressValue, setProgressValue] = useState(40);
    const [activeTab, toggleTab] = useState("1");
    const navigate = useNavigate();
    const navigateState = useLocation();
    const [surcharges, setSurcharges] = useState([]);
    const { vendor_id, vendor_active_Tab } = useSelector((state) => state?.vendor);
    const { parties_city_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector(
        (state) => state?.parties
    );
    const dispatch = useDispatch();
    const [isNewVendor, setIsNewVendor] = useState(false)


    // if (!!(navigateState?.state?.data)) {
    //     navigateState?.state?.data?.documents?.forEach(element => {
    //         let imageData = element.documentPath;
    //         const base64Encoded = window.btoa(imageData);
    //         element.logo =(!!(imageData)? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`:'');
    //         console.log(element.logo);
    //     });
    // }

    useEffect(() => {
        dispatch(getCustomersCityData());
        // dispatch(getTenantInfoData());
        if (!!(navigateState?.state && navigateState?.state.data)) {
            dispatch({ type: GET_VENDOR_DETAILS_ID, payload: { id: navigateState?.state?.data?.id, version: navigateState?.state?.data?.version } });
        }
    }, []);


    useEffect(() => {
        setActiveTabProgress(vendor_active_Tab.tab)
        if (vendor_active_Tab.tab === 1) { setProgressValue(33) }
        if (vendor_active_Tab.tab === 2) { setProgressValue(66) }
        if (vendor_active_Tab.tab === 3) { setProgressValue(100); }
    }, [vendor_active_Tab]);

    const openSaveConfirmModal = () => {
        setOpenSaveModal(!openSaveModal);
    };

    const finalSaveButton = () => {
        setSurcharges([]);
        setActiveTabProgress(3);
        setProgressValue(100);
        dispatch({ type: BLANK_CARRIER_DATA });
        setOpenSaveModal(false);
    };

    const toggleTabProgress = (tab) => {
        if (activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 4) {
                setActiveTabProgress(tab);

                if (tab === 1) {
                    setProgressValue(40);
                }
                if (tab === 2) {
                    setProgressValue(70);
                }
                if (tab === 3) {
                    setProgressValue(100);
                }
                // if (tab === 4) {
                //     setProgressValue(100);
                // }
            }
        }
        if (tab === 5) {
            openSaveConfirmModal();
        }
    };
    const companyDetailsFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: navigateState?.state?.data?.logo || "",
            companyName: navigateState?.state?.data?.name || navigateState?.state?.carrierMaster?.name || "",
            companyCode: navigateState?.state?.data?.vendorCode || navigateState?.state?.carrierMaster?.carrierCode || "",
            logo: navigateState?.state?.data?.logo || navigateState?.state?.carrierMaster?.logo || "",
            address: navigateState?.state?.data?.address || "",
            city: navigateState?.state?.data?.city?.cityName || null,
            state: navigateState?.state?.data?.state?.id || null,
            country: navigateState?.state?.data?.country?.countryName || null,
            zipcode: navigateState?.state?.data?.pinCode || null,
            website: navigateState?.state?.data?.website || "",
            contactName: navigateState?.state?.data?.contactName || "",
            phoneNumber: navigateState?.state?.data?.contactNo || "",
            email: navigateState?.state?.data?.contactEmail || "",
            department: navigateState?.state?.data?.department || "",
            designation: navigateState?.state?.data?.designation || "",
            venderType: !!navigateState?.state?.carrierMaster ? navigateState?.state?.carrierMaster?.carrierType : navigateState?.state?.data?.vendorType || "",
            transportMode: navigateState?.state?.carrierMaster ? navigateState?.state?.carrierMaster?.transportMode : navigateState?.state?.data?.transportMode  || "",
            CINnumber: navigateState?.state?.data?.cin || "",
            GSTnumber: navigateState?.state?.data?.gst || "",
            PANnumber: navigateState?.state?.data?.pan || "",
            entityType: navigateState?.state?.data?.entityType || "",
            industryType: navigateState?.state?.data?.industryType || "",
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required("Please Enter Vendor Name"),
            companyCode: Yup.string().required("Please Enter Vendor Name"),
            city: Yup.string().nullable().required("Please Enter selected City"),
            country: Yup.string().nullable().required("Please Enter selected country"),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            contactName: Yup.string().required("Please Enter Your contact Name"),
            phoneNumber: Yup.string().required("Please Enter Your Phone Number"),
            venderType: Yup.string().required("Please select vender type"),
        }),
        onSubmit: async ({ image, ...value }) => {
            let countryVal = parties_country_details?.content?.filter((con) => con?.countryName === value?.country) || [];
            let cityVal = parties_city_details?.content?.filter((city) => city?.cityName === value?.city) || [];
            let stateVal = parties_state_details?.content?.filter((state) => state?.stateName === value?.state) || [];
            let pincodeVal = parties_pincode_details?.content?.filter((pin) => pin?.pin === value?.zipcode) || [];

            const projectUATRequestDTO = {
                ...Object.fromEntries(Object.entries({
                    name: value.companyName || null,
                    vendorCode: value.companyCode || null,
                    logo: null,
                    logoPath: image?.path || null,
                    address: value.address || null,
                    id: !!(navigateState?.state && navigateState?.state.data) ? navigateState?.state?.data?.id : isNewVendor ? vendor_id.id : null || null,
                    version: !!(navigateState?.state && navigateState?.state.data) ? !!vendor_id ? vendor_id.version : navigateState?.state?.data?.version : isNewVendor ? vendor_id.version : null || 0,
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
                    ...(navigateState?.state?.carrierMaster && {
                        "carrierMaster": {
                            "id": navigateState?.state?.carrierMaster?.id || '',
                            "version": navigateState?.state?.carrierMaster?.version || 0
                        }
                    }),
                    website: value?.website || null,
                    contactName: value?.contactName || null,
                    contactNo: value?.phoneNumber || null,
                    contactEmail: value?.email || null,
                    department: value?.department || null,
                    designation: value?.designation || null,
                    vendorType: value?.venderType || null,
                    transportMode: value?.transportMode || null,
                    cin: value?.CINnumber || null,
                    gst: value?.GSTnumber || null,
                    pan: value?.PANnumber || null,
                    entityType: value?.entityType || null,
                    industryType: value?.industryType || null,
                    addresses: [],
                    contacts: [],
                    documents: [],
                }).filter(([_, value]) => value !== null)),
            };

            const formData = new FormData();

            formData.append('file', image);
            formData.append('tenantVendor', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));
            setIsNewVendor(true);
            dispatch(postVendorDetailsAction(formData));
        },
    });
    const contactsFormik = useFormik({
        initialValues: {
            ...(!!(navigateState?.state?.data?.contacts && navigateState?.state?.data?.contacts.length > 0) && {
                contacts: navigateState?.state?.data?.contacts.map(contact => ({
                    title: "",
                    contactName: contact.contactName || "",
                    contactNo: contact.contactNo || "",
                    contactEmail: contact.contactEmail || "",
                    department: contact.department || "",
                    designation: contact.designation || "",
                    opCode: ""
                })),
            }) || {
                contacts: [
                    {
                        contactName: navigateState?.state?.data?.contactName || "",
                        contactNo: navigateState?.state?.data?.contactNo || "",
                        contactEmail: navigateState?.state?.data?.contactEmail || "",
                        department: navigateState?.state?.data?.department || "",
                        designation: navigateState?.state?.data?.designation || "",
                    }
                ]
            }
        },
        validationSchema: Yup.object({
            contacts: Yup.array().of(
                Yup.object({
                    contactName: Yup.string().required("Please Enter vendor Name"),
                    contactEmail: Yup.string().email('Invalid email address').required('Email is required'),
                    contactNo: Yup.string().required("Please Enter Your Phone Number")
                })
            ),
        }),
        onSubmit: (values) => {
            let data = {
                ...Object.fromEntries(Object.entries({
                    "id": (navigateState?.state?.data?.id) ? navigateState?.state?.data?.id : vendor_id.id || null,
                    "version": (navigateState?.state?.data?.version) ? navigateState?.state?.data?.version : vendor_id.version || 0,
                    contacts: values?.contacts?.map((val) => {
                        return {
                            ...Object.fromEntries(Object.entries({
                                "contactName": val?.contactName || null,
                                "contactNo": val?.contactNo || null,
                                "contactEmail": val?.contactEmail || null,
                                "department": val?.department || null,
                                "designation": val?.designation || null,
                            }).filter(([_, value]) => value !== null)),
                        }
                    })
                }).filter(([_, value]) => value !== null)),
            }
            dispatch(postVendorContactAction(data));
        },
    });
    const documentsFormik = useFormik({
        initialValues: {
            ...(!!(navigateState?.state?.data?.documents && navigateState?.state?.data?.documents.length > 0) && {
                document:
                    navigateState?.state?.data?.documents.map((document, index, array) => ({
                        documentType: document?.documentType || "",
                        uploadDocument: index === array.length - 1 ? "" : document?.documentPath || "",
                        documentPath: document?.documentPath || "",
                        id: document?.id || "",
                        version: document?.version || 0,
                    }))
            }) || {
                document: [{
                    documentType: document?.documentType || "",
                    uploadDocument: document?.documentPath || "",
                }
                ]
            }
        },
        validationSchema: Yup.object({
            document: Yup.array().of(
                Yup.object({
                    documentType: Yup.string().required("Please select document type"),
                    uploadDocument: Yup.string().required("Please select upload document"),
                })
            ),
        }),
        onSubmit: (values) => {
            console.log("document submit", values);
            let data = values?.document?.map((val) => {
                return {
                    docfile: val?.uploadDocument || '',
                    docdata: {
                        ...Object.fromEntries(Object.entries({
                            "id": (navigateState?.state?.data?.id) ? navigateState?.state?.data?.id : vendor_id.id || null,
                            "version": (navigateState?.state?.data?.version) ? navigateState?.state?.data?.version : vendor_id.version || 0,
                            "documents": [
                                {
                                    ...Object.fromEntries(Object.entries({
                                        "documentType": val?.documentType || '',
                                        "document": null,
                                        "documentPath": val?.documentPath || '',
                                        "id": val?.id || null,
                                        "version": val?.version || 0
                                    }).filter(([_, value]) => value !== null)),
                                }
                            ]
                        }).filter(([_, value]) => value !== null)),
                    }
                }
            });
            const allDocData = data.reduce((accumulator, currentValue) => {
                return accumulator.concat(currentValue.docdata.documents);
            }, []);
            let newDocData = {
                "id": (navigateState?.state?.data?.id) ? navigateState?.state?.data?.id : vendor_id.id || null,
                "version": (navigateState?.state?.data?.version) ? navigateState?.state?.data?.version : vendor_id.version || 0,
                "documents": allDocData
            };
            const formDataArray = data?.map((document) => {
                const formData = new FormData();
                formData.append('file', document.docfile);
                formData.append('tenantVendor', new Blob([JSON.stringify(newDocData)], { type: "application/json" }));
                return formData;
            });

            dispatch(postVendorDocumentAction({ documents: formDataArray }));
            // documentsFormik.resetForm();
        },
    });

    // ------------- dynamic field ------------------------
    const addHandler = () => {
        setSurcharges((s) => {
            return [
                ...s,
                {
                    surcharges_name: "",
                    destination: [],
                    payment_type: "prepaid",
                    gp1: "",
                    gp2: "",
                    hq1: "",
                    hq2: "",
                    rf1: "",
                    rf2: "",
                },
            ];
        });
    };
    const removeInputFields = (index) => {
        const rows = [...surcharges];
        rows.splice(index, 1);
        setSurcharges(rows);
    };

    const handleChange = (e, name, index) => {
        const list = [...surcharges];
        list[index][name] = e.target.value;
        setSurcharges(list);
    };

    const handleSelectGroup2 = useCallback(
        (opt, name, index) => {
            const list = [...surcharges];
            list[index][name] = opt;
            setSurcharges(list);
        },
        [surcharges]
    );

    const handleMultiSelectChange = useCallback(
        (selected, name, options, index) => {
            // Check if "Select All" is selected
            const list = [...surcharges];
            if (selected.some((option) => option.value === "selectAll")) {
                list[index][name] = options.filter(
                    (option) => option.value !== "selectAll"
                );
                setSurcharges(list);
                return;
            }
            list[index][name] = selected;
            setSurcharges(list);
        },
        [surcharges]
    );

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        {/* breadcrumbs && rate */}
                        <TopBreadcrumbs breadcrumbs={ !!navigateState?.state?.carrierMaster? addCarrierBreadcrumb:addVendorsBreadcrumb} />

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
                                        <div
                                            id="progrss-wizard"
                                            className="twitter-bs-wizard upload_freight_wrap"
                                        >
                                            {/* tabs */}
                                            <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 1, })} /*onClick={() => { toggleTabProgress(1); }}*/ >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="CompanyDetails" >
                                                            <i className="bx bx-list-ul"></i>
                                                            <UncontrolledTooltip placement="top" target="CompanyDetails" >
                                                                Company Details
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 2, })} /* onClick={() => { toggleTabProgress(2); }} */>
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Contacts" >
                                                            <i className="bx bx-food-menu"></i>
                                                            <UncontrolledTooltip placement="top" target="Contacts" >
                                                                Contacts
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 3, })} /* onClick={() => { toggleTabProgress(3); }} */>
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Documents" >
                                                            <i className="bx bx-book-bookmark"></i>
                                                            <UncontrolledTooltip placement="top" target="Documents" >
                                                                Documents
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>

                                                {/* <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTabProgress === 4, })}
                                                        onClick={() => { toggleTabProgress(4); }}
                                                    >
                                                        <div
                                                            className="step-icon"
                                                            data-bs-toggle="tooltip"
                                                            id="carriercommission"
                                                        >
                                                            <i className="bx bx-chat"></i>
                                                            <UncontrolledTooltip
                                                                placement="top"
                                                                target="carriercommission"
                                                            >
                                                                Carrier commission
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem> */}
                                            </ul>

                                            {/* Progress Bar */}
                                            <div id="bar" className="mt-4">
                                                <Progress color="primary" striped animated value={progressValue} />
                                            </div>

                                            {/* Content */}
                                            <TabContent
                                                activeTab={activeTabProgress}
                                                className="twitter-bs-wizard-tab-content"
                                            >
                                                <TabPane tabId={1}>
                                                    {/* Vendor Details */}
                                                    <VenderDetails companyDetailsFormik={companyDetailsFormik} />
                                                </TabPane>
                                                <TabPane tabId={2}>
                                                    {/* Vendor Contacts Details */}
                                                    <ContactDetailsForm contactsFormik={contactsFormik} />
                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    {/* Vendor Document Details */}
                                                    <DocumentDetailsForm documentsFormik={documentsFormik} />
                                                </TabPane>

                                                <TabPane tabId={4}>
                                                    <div>
                                                        {/* <div className="text-center mb-4">
                                                            <h5>Carrier commission</h5>
                                                        </div> */}

                                                        {/* <div className="col">
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
                                                                            </div>
                                                                            <div className="mb-4">
                                                                                <h5>Fcl InLand Charges</h5>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-12 col-md-6">
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
                                                                            </div>
                                                                            <div className="mb-4">
                                                                                <h5>LCL InLand Charges</h5>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-12 col-md-6">
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
                                                                            </div>
                                                                            <div className="mb-4">
                                                                                <h5>AIR InLand Charges</h5>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-12 col-md-6">
                                                                                    <div className="mb-3">
                                                                                        <label className="form-label">Margin Type</label>
                                                                                        <Select
                                                                                            name='customerType'
                                                                                            placeholder=""
                                                                                            options={marginType}
                                                                                            classNamePrefix="select2-selection form-select"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </TabPane>

                                                            </TabContent>
                                                        </div> */}

                                                        {/* <form>
                                                            {surcharges?.map((item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="upload_surcharges_row"
                                                                >
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="surcharges_name"
                                                                                    className="form-label"
                                                                                >
                                                                                    Select Surcharge Name
                                                                                </label>
                                                                                <Select
                                                                                    value={
                                                                                        optionSurchargesName
                                                                                            ? optionSurchargesName.find(
                                                                                                (obj) =>
                                                                                                    obj.value ===
                                                                                                    item.surcharges_name
                                                                                            )
                                                                                            : ""
                                                                                    }
                                                                                    name="surcharges_name"
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(
                                                                                            opt.value,
                                                                                            "surcharges_name",
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                    options={optionSurchargesName}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="destination"
                                                                                    className="form-label"
                                                                                >
                                                                                    Surcharge Applicable on destination
                                                                                </label>
                                                                                <Select
                                                                                    value={item.destination}
                                                                                    name="destination"
                                                                                    isMulti
                                                                                    options={optionMultiDestination}
                                                                                    onChange={(opt) => {
                                                                                        handleMultiSelectChange(
                                                                                            opt,
                                                                                            "destination",
                                                                                            optionMultiDestination,
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="btn_wrap">
                                                                        {surcharges.length !== 0 ? (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    removeInputFields(index);
                                                                                }}
                                                                                className="btn border p-0"
                                                                            >
                                                                                <img src={delete_icon} alt="Delete" />
                                                                            </button>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary add_btn d-flex align-items-center"
                                                                        onClick={() => {
                                                                            addHandler();
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        <i className="bx bx-plus me-2"></i> Add
                                                                        Charges
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form> */}
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                            <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-between">
                                                <li
                                                    className={`previous ${activeTabProgress === 1 ? "disabled" : ""
                                                        }`}
                                                >
                                                    <button
                                                        className={`d-flex align-items-center ${activeTabProgress === 1 ? "btn btn-primary disabled" : "btn btn-primary"}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress - 1);
                                                        }}
                                                    >
                                                        <i className="bx bx-chevron-left me-1"></i> Previous
                                                    </button>
                                                </li>
                                                <li className={`${activeTabProgress === 1 ? isAnyValueEmpty(companyDetailsFormik?.values) ? "disabled" : "" : activeTabProgress === 2 ? isAnyValueEmpty(contactsFormik?.values) ? "disabled" : "" : ""}`}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {(activeTabProgress === 2 || activeTabProgress === 3 || navigateState?.state?.data) && (
                                                            <a className="me-3"
                                                                onClick={() => {
                                                                    toggleTabProgress(((activeTabProgress === 1 && (navigateState?.state?.data)) ? 2 : 3));
                                                                    activeTabProgress === 3 ? !!navigateState?.state?.carrierMaster ? navigate('/carrierMaster') : navigate('/vendors') : ""
                                                                }}
                                                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                                            >
                                                                Skip
                                                            </a>
                                                        )}
                                                        <button
                                                            type="submit"
                                                            className={`btn btn-primary d-flex align-items-center ${activeTabProgress === 0
                                                                ? isAnyValueEmpty(companyDetailsFormik?.values) ? "disabled" : ""
                                                                : activeTabProgress === 2 ? isAnyValueEmpty(contactsFormik?.values) ? "disabled" : "" : ""
                                                                }`}
                                                            onClick={() => {
                                                                if (activeTabProgress === 1) {
                                                                    companyDetailsFormik.submitForm();
                                                                } else if (activeTabProgress === 2) {
                                                                    contactsFormik.submitForm();
                                                                } else if (activeTabProgress === 3) {
                                                                    documentsFormik.submitForm();
                                                                }
                                                            }}
                                                        >
                                                            {activeTabProgress === 3 ? "Save" : (
                                                                <>
                                                                    Next
                                                                    <i className="bx bx-chevron-right ms-1"></i>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            {/* modal */}
            <Modal
                isOpen={openSaveModal}
                toggle={() => {
                    openSaveConfirmModal();
                }}
                className="confirm_modal_wrap"
            >
                <div className="modal-header">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenSaveModal(false);
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body pb-5">
                    <h4 className="text-center">Are you sure?</h4>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={() => {
                            openSaveConfirmModal();
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            finalSaveButton();
                        }}
                        className="btn btn-primary "
                    >
                        Save changes
                    </button>
                </div>
            </Modal>
        </>
    );
}
