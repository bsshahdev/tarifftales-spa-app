import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { Card, CardBody, Col, Container, Form, Modal, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import fileData from '../../../../assets/extra/FclUplaodFormat.xlsx';
import { delete_icon } from '../../../../assets/images';
import { optionRateSource, optionRateType, optionValidityApp, optionVendorType } from '../../../../common/data/procurement';
import { formatBytes, isAnyValueEmpty, isAnyValueEmptyInArray, isExcelFile } from '../../../../components/Common/CommonLogic';
import { addFCLData, getFCLCurrVersionAction, getFclDestinationAction, updateFCLActiveTab, uploadFclCarrierData, uploadFclFrightData, uploadFclSurchargeData } from '../../../../store/Procurement/actions';
import { BLANK_FCL_CARRIER_DATA, BLANK_SURCHARGE_DATA, FCL_FREIGHT_FAILD_POPUP_TYPE, UPDATE_FCL_ACTIVE_TAB } from '../../../../store/Procurement/actiontype';
import { GET_UOM_DATA } from '../../../../store/Global/actiontype';

export default function UploadFreightData() {
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [progressValue, setProgressValue] = useState(33);
    const [selectedFiles, setselectedFiles] = useState([]);
    const navigate = useNavigate();
    const [surcharges, setSurcharges] = useState([]);
    const [fileError, setfileError] = useState('');
    const [AllVendorName, setAllVendorName] = useState([]);
    const [vendorName, setVendorName] = useState([]);
    const { addFCL, fclActiveTab, fcl_charge_id, fcl_destinationData, fclfaildData, fclPopup } = useSelector((state) => state?.procurement);
    const { vendor_data, currency_data, UOM_data, surchargeCode_data } = useSelector((state) => state?.globalReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: BLANK_FCL_CARRIER_DATA, payload: { name: 'addFCL', data: { ...addFCL, carrierDetails: carrierObj } } });
        dispatch({type: GET_UOM_DATA});
    },[]);

    let carrierObj = {
        rate_type: '',
        rate_source: '',
        vendor_type: { label: "CARRIER", value: "CARRIER" },
        vendor_name: '',
        validity_application: '',
        validity_from: '',
        validity_to: ''
    }

    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType }
        })
        setAllVendorName(vendorlist);
    }, [vendor_data]);

    useEffect(() => {
        setActiveTabProgress(fclActiveTab)
        if (fclActiveTab === 1) { setProgressValue(33) }
        if (fclActiveTab === 2) { setProgressValue(66) }
        if (fclActiveTab === 3) { setProgressValue(100); }
        setSurcharges(addFCL?.surcharges)
    }, [fclActiveTab]);

    const toggleTabProgress = (tab) => {
        if (activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 3) {
                setActiveTabProgress(tab)
                dispatch(updateFCLActiveTab(tab))
                if (tab === 1) { setProgressValue(33) }
                if (tab === 2) { setProgressValue(66) }
                if (tab === 3) { setProgressValue(100); }
            }
        }
    }

    function handleAcceptedFiles(files) {
        if (files && files.length) {
            var file = files[0];
            var fileName = file.name;
            if (isExcelFile(fileName)) {
                setfileError("");
                files.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        formattedSize: formatBytes(file.size),
                    })
                );
                setselectedFiles(files);
            } else {
                setfileError("The file type is not supported. Upload an Excel file.");
                setselectedFiles([]);
            }
        } else {
            setfileError("File is required");
        }
    }
    // ------------- dynamic field ------------------------

    const addHandler = () => {
        const newSurcharge = {
            surcharges_name: '',
            destination: [],
            uom: { label: "PER CONTAINER", value: "PER_CONTAINER", description: "PER CONTAINER", id: 2, version: 0 },
            gp1: '',
            gp2: '',
            hq1: '',
            hq2: '',
            rf1: '',
            rf2: ''
        }
        setSurcharges(s => [...s, newSurcharge])
        handleAddFCL("surcharges", [...surcharges, newSurcharge])
    }
    const removeInputFields = (index) => {
        const rows = [...surcharges];
        rows.splice(index, 1);
        setSurcharges(rows);
        handleAddFCL("surcharges", rows)
    }

    const handleChange = (e, name, index) => {
        const list = [...surcharges];
        list[index][name] = e.target.value;
        setSurcharges(list);
        handleAddFCL("surcharges", list);
    }

    const handleAddFCL = useCallback((name, opt) => {
        dispatch(addFCLData(name, opt));
    }, [addFCL]);

    const handleSelectGroup2 = useCallback((opt, name, index) => {
        const list = [...surcharges];
        list[index][name] = opt;
        setSurcharges(list);
        handleAddFCL("surcharges", list)
    }, [surcharges]);

    const handleMultiSelectChange = useCallback((selected, name, options, index) => {
        // Check if "Select All" is selected
        const list = [...surcharges];
        if (selected.some(option => option.value === 'selectAll')) {
            list[index][name] = options.filter(option => option.value !== 'selectAll');
            setSurcharges(list);
            handleAddFCL("surcharges", list);
            return;
        }
        list[index][name] = selected;
        setSurcharges(list);
        handleAddFCL("surcharges", list)
    }, [surcharges]);

    // ------------------ integration

    const openSaveConfirmModal = () => {
        setOpenSaveModal(!openSaveModal);
    }
    const finalSaveButton = () => {
        if (activeTabProgress === 3) {            
            let data = addFCL?.surcharges?.map((item) => {
                return {
                    ...(item?.surcharges_name && { "surchargeCodeId": item?.surcharges_name?.id }),
                    ...(item?.uom && { "uomId": item?.uom?.id }),
                    ...(item?.destination?.length !== 0 && { "destinationIds": item?.destination?.length !== 0 ? item?.destination?.map((item) => item?.id) : [] }),
                    ...(item?.charge_currency && { "currencyId": item?.charge_currency?.id }),
                    "containerWiseValues": {
                        ...(item?.gp1 && { "20GP": item?.gp1 }),
                        ...(item?.gp2 && { "40GP": item?.gp2 }),
                        ...(item?.hq1 && { "40HQ": item?.hq1 }),
                        ...(item?.hq2 && { "45HQ": item?.hq2 }),
                        ...(item?.rf1 && { "20RF": item?.rf1 }),
                        ...(item?.rf2 && { "40RF": item?.rf2 })
                    }
                }
            });

            console.log(JSON.stringify(data), "data"); 
            dispatch(uploadFclSurchargeData(data, fcl_charge_id?.id));
            dispatch({ type: BLANK_SURCHARGE_DATA, payload: { name: 'addFCL', data: { carrierDetails: carrierObj,freightUpload: {}, surcharges: [] } } });
            setSurcharges([]);
            setselectedFiles([]);
            setOpenSaveModal(false);
            // dispatch({ type: BLANK_FCL_CARRIER_DATA, payload: { name: 'addFCL', data: { ...addFCL, carrierDetails: carrierObj } } });
        }
        navigate('/freight/ocean/fcl');
    }
    const uploadSaveHandler = () => {        
        if (activeTabProgress === 1) {
            const data = {
                ...(fcl_charge_id && { id: fcl_charge_id?.id, version: fcl_charge_id?.version}),
                ...(addFCL?.carrierDetails?.rate_source !== "" && { rateSource: addFCL?.carrierDetails?.rate_source?.value || '' }),
                rateType: addFCL?.carrierDetails?.rate_type?.value || '',
                ...(addFCL?.carrierDetails?.validity_application !== "" && { validityApplication: addFCL?.carrierDetails?.validity_application?.value || '' }),
                validFrom: addFCL?.carrierDetails?.validity_from || '',
                validTo: addFCL?.carrierDetails?.validity_to || '',
            };

            const vendorInfo = {
                id: addFCL?.carrierDetails?.vendor_name?.id || '',
                version: addFCL?.carrierDetails?.vendor_name?.version || 0,
            };

            const newData = {
                ...data,
                [addFCL?.carrierDetails?.vendor_type?.value === 'CARRIER' ? 'tenantCarrierVendor' : 'tenantVendor']: vendorInfo,
            };
            
            console.log(newData,"newData");
            dispatch(uploadFclCarrierData({ ...newData }));
            
        } else if (activeTabProgress === 2) {
            let xlxsfile = selectedFiles[0]
            const formData = new FormData();
            formData.append('file', xlxsfile);

            dispatch(uploadFclFrightData(formData, fcl_charge_id?.id));            
        }
        if (activeTabProgress === 3) {
            if (addFCL?.surcharges?.length !== 0) {
                if (!isAnyValueEmptyInArray(addFCL?.surcharges, ['gp1', 'gp2', 'hq1', 'hq2', 'rf1', 'rf2']) && addFCL?.surcharges[0]?.destination?.length !== 0) {
                    openSaveConfirmModal();
                } else {
                    navigate('/freight/ocean/fcl');
                    dispatch({ type: BLANK_SURCHARGE_DATA, payload: { name: 'addFCL', data: { ...addFCL, surcharges: [] } } });
                    setSurcharges([]);
                }
            } else {
                navigate('/freight/ocean/fcl');
            }
        }
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button type="button" className='btn border mb-3' onClick={() => { navigate(-1) }}>Back</button>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <div id="progrss-wizard" className="twitter-bs-wizard upload_freight_wrap">
                                            <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 1 })} onClick={() => { toggleTabProgress(1) }}>
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="SellerDetails">
                                                            <i className="bx bx-list-ul"></i>
                                                            <UncontrolledTooltip placement="top" target="SellerDetails">
                                                                FCL Ocean Carrier Details
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 2 })} onClick={() => { toggleTabProgress(2) }}>
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="CompanyDocument">
                                                            <i className="bx bx-book-bookmark"></i>
                                                            <UncontrolledTooltip placement="top" target="CompanyDocument">
                                                                FCL Ocean Freight Upload
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 3 })} onClick={() => { toggleTabProgress(3) }}>
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="BankDetails">
                                                            <i className="bx bxs-bank"></i>
                                                            <UncontrolledTooltip placement="top" target="BankDetails">
                                                                FCL Ocean Surcharges
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </ul>

                                            <div id="bar" className="mt-4">
                                                <Progress color="primary" striped animated value={progressValue} />
                                            </div>
                                            <TabContent activeTab={activeTabProgress} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <div className="text-center mb-4">
                                                        <h5>FCL Ocean Carrier Details</h5>
                                                    </div>
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Rate Type<span className='required_star'>*</span></label>
                                                                    <Select
                                                                        value={addFCL?.carrierDetails?.rate_type || ""}
                                                                        name='rate_type'
                                                                        onChange={(opt) => {
                                                                            handleAddFCL('carrierDetails', { ...addFCL?.carrierDetails, rate_type: opt });
                                                                        }}
                                                                        options={optionRateType}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Rate Source</label>
                                                                    <Select
                                                                        value={addFCL?.carrierDetails?.rate_source || ""}
                                                                        name='rate_source'
                                                                        onChange={(opt) => {
                                                                            handleAddFCL('carrierDetails', { ...addFCL?.carrierDetails, rate_source: opt });
                                                                        }}
                                                                        options={optionRateSource}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Vendor Type<span className='required_star'>*</span></label>
                                                                    <Select
                                                                        value={addFCL?.carrierDetails?.vendor_type || ""}
                                                                        name='vendor_type'
                                                                        onChange={(opt) => {
                                                                            handleAddFCL('carrierDetails', { ...addFCL?.carrierDetails, vendor_name: "", vendor_type: opt });
                                                                            let newList = [...AllVendorName];
                                                                            let filterlist = newList.filter((item) => item.type === opt.value);
                                                                            setVendorName(filterlist);
                                                                        }}
                                                                        options={optionVendorType}
                                                                        classNamePrefix="select2-selection form-select"
                                                                        isDisabled={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Vendor Name/Carrier Name<span className='required_star'>*</span></label>
                                                                    <Select
                                                                        value={addFCL?.carrierDetails?.vendor_name || ''}
                                                                        name='vendor_name'
                                                                        onChange={(opt) => {
                                                                            handleAddFCL('carrierDetails', { ...addFCL?.carrierDetails, vendor_name: opt });
                                                                        }}
                                                                        options={AllVendorName && AllVendorName?.filter(t => t.type === "CARRIER") || []}                                                                        
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Validity Application</label>
                                                                    <Select
                                                                        value={addFCL?.carrierDetails?.validity_application}
                                                                        name='validity_application'
                                                                        onChange={(opt) => {
                                                                            handleAddFCL('carrierDetails', { ...addFCL?.carrierDetails, validity_application: opt });
                                                                        }}
                                                                        options={optionValidityApp}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label htmlFor='validity_from' className="form-label">Validity From<span className='required_star'>*</span></label>
                                                                    <input type="date" name="validity_from" id="validity_from" className='form-control' value={addFCL?.carrierDetails?.validity_from} onChange={(e) => {
                                                                        handleAddFCL('carrierDetails', { ...addFCL?.carrierDetails, validity_from: e.target.value });
                                                                    }} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label htmlFor='validity_to' className="form-label">Validity To<span className='required_star'>*</span></label>
                                                                    <input type="date" name="validity_to" id="validity_to" className='form-control' value={addFCL?.carrierDetails?.validity_to || ''} onChange={(e) => {
                                                                        handleAddFCL('carrierDetails', { ...addFCL?.carrierDetails, validity_to: e.target.value });
                                                                    }} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </TabPane>
                                                <TabPane tabId={2}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>FCL Ocean Freight Upload</h5>
                                                        </div>
                                                        <div className='mb-3 d-flex justify-content-end'>
                                                            <a href={fileData} className="download_formate btn btn-primary w-sm-100" download="Fcl Uplaod Format">Download Format</a>
                                                        </div>
                                                        <Form>
                                                            <Dropzone
                                                                onDrop={(acceptedFiles) => {
                                                                    handleAcceptedFiles(acceptedFiles);
                                                                }}
                                                            >
                                                                {({ getRootProps, getInputProps }) => (
                                                                    <div className="dropzone">
                                                                        <div
                                                                            className="dz-message needsclick mt-2"
                                                                            {...getRootProps()}
                                                                        >
                                                                            <input {...getInputProps()} />
                                                                            <div className="mb-3">
                                                                                <i className="display-4 text-muted bx bx-cloud-upload" />
                                                                            </div>
                                                                            <h4>Upload <b>Freight</b> file by dragging or selecting a file from browser.</h4>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                            <p className='text-danger mt-2'>{fileError}</p>
                                                            <div className="dropzone-previews mt-3" id="file-previews">
                                                                {selectedFiles?.map((f, i) => {
                                                                    return (
                                                                        <Card
                                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                            key={i + "-file"}
                                                                        >
                                                                            <div className="p-2">
                                                                                <Row className="align-items-center">
                                                                                    <Col className="col-auto">
                                                                                        <i className='mdi mdi-file-document-outline'></i>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <Link
                                                                                            to="#"
                                                                                            className="text-muted font-weight-bold"
                                                                                        >
                                                                                            {f.name}
                                                                                        </Link>
                                                                                        <p className="mb-0">
                                                                                            <strong>{f.formattedSize}</strong>
                                                                                        </p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </Card>
                                                                    );
                                                                })}
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>FCL Ocean Surcharges</h5>
                                                        </div>
                                                        <form>
                                                            {addFCL?.surcharges && addFCL?.surcharges?.map((item, index) => (
                                                                <div key={index} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Surcharge Name</label>
                                                                                <Select
                                                                                    value={item.surcharges_name || ''}
                                                                                    name='surcharges_name'
                                                                                    onChange={(opt) => {
                                                                                        if (opt.label == "Add New") {
                                                                                            navigate("/freight/upload/fcl/add-new", { state: { id: "fcl" } })
                                                                                        }
                                                                                        handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                    }}
                                                                                    options={[...(surchargeCode_data?.filter((item) => item?.surchargeCategory === "OCEAN SURCHARGE") || []), { label: "Add New", value: "Add New" }]}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='destination' className="form-label">Applicable Destination Ports</label>
                                                                                <Select
                                                                                    value={item.destination || []}
                                                                                    name='destination'
                                                                                    isMulti
                                                                                    options={(fcl_destinationData?.length !== 0 && fcl_destinationData !== undefined) ? [{ value: 'selectAll', label: 'Select All' }, ...fcl_destinationData] : []}
                                                                                    onChange={(opt) => { handleMultiSelectChange(opt, 'destination', (fcl_destinationData?.length !== 0 && fcl_destinationData !== undefined) ? [{ value: 'selectAll', label: 'Select All' }, ...fcl_destinationData] : [], index) }}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='charge_currency' className="form-label">Currency</label>
                                                                                <Select
                                                                                    value={item?.charge_currency || ''}
                                                                                    name='charge_currency'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt, 'charge_currency', index);
                                                                                    }}
                                                                                    options={currency_data}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='uom' className="form-label">UOM</label>
                                                                                <Select
                                                                                    value={item.uom || ''}
                                                                                    name='uom'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt, 'uom', index);
                                                                                    }}
                                                                                    options={UOM_data}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                    // isDisabled
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='payment_type' className="form-label">Select Payment Type For the surcharge</label>
                                                                                <Select
                                                                                    value={item.payment_type}
                                                                                    name='payment_type'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt, 'payment_type', index);
                                                                                    }}
                                                                                    options={optionPaymentType}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="gp1" className="form-label">20 GP</label>
                                                                                <input type="number" value={item?.gp1 || ''} className="form-control" id="gp1" placeholder="Enter value" onChange={(e) => { handleChange(e, 'gp1', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="gp2" className="form-label">40 GP</label>
                                                                                <input type="number" value={item?.gp2 || ''} className="form-control" id="gp2" placeholder="Enter value" onChange={(e) => { handleChange(e, 'gp2', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="hq1" className="form-label">40 HQ</label>
                                                                                <input type="number" value={item?.hq1 || ''} className="form-control" id="hq1" placeholder="Enter value" onChange={(e) => { handleChange(e, 'hq1', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="hq2" className="form-label">45 HQ</label>
                                                                                <input type="number" value={item?.hq2 || ''} className="form-control" id="hq2" placeholder="Enter value" onChange={(e) => { handleChange(e, 'hq2', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="rf1" className="form-label">20 RF</label>
                                                                                <input type="number" value={item?.rf1 || ''} className="form-control" id="rf1" placeholder="Enter value" onChange={(e) => { handleChange(e, 'rf1', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="rf2" className="form-label">40 RF</label>
                                                                                <input type="number" value={item?.rf2 || ''} className="form-control" id="rf2" placeholder="Enter value" onChange={(e) => { handleChange(e, 'rf2', index) }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="btn_wrap">
                                                                        {(surcharges.length !== 0) ? <button type='button' onClick={() => { removeInputFields(index) }} className="btn border p-0"><img src={delete_icon} alt="Delete" /></button> : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler(); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                            <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-between">                                                                        
                                                <li className={`previous ${activeTabProgress === 1 ? "disabled" : ""}`}>
                                                    <button
                                                        className={`d-flex align-items-center ${activeTabProgress === 1 ? "btn btn-primary disabled" : "btn btn-primary"}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress - 1);
                                                            if(activeTabProgress === 2){
                                                                if(fcl_charge_id){
                                                                    dispatch(getFCLCurrVersionAction(fcl_charge_id?.id));
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <i className="bx bx-chevron-left me-1"></i> Previous
                                                    </button>
                                                </li>

                                                <li className={`d-flex`}>
                                                    <button
                                                        className={`btn btn-primary ${activeTabProgress === 1 ? isAnyValueEmpty(addFCL?.carrierDetails, ['rate_source', 'validity_application']) ? "disabled" : "" : activeTabProgress === 2 ? selectedFiles?.length === 0 ? "disabled" : "" : ""}`}
                                                        onClick={() => { uploadSaveHandler() }}
                                                    >{activeTabProgress !== 3 ? (<>Save <i className="bx bx-chevron-right ms-1"></i></>) : "Save & Skip"}</button>
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
            <Modal isOpen={fclPopup} className='data_failed_popup'>
                <div className="modal-body pb-4">
                <div className='modal_icon text-center'>
                        <i className="bx bx-error"></i>
                        <h2 className='text-center'>File Was Not Uploaded.</h2>
                    </div>
                    <div id="bar" className="mt-4">
                        <Progress color="success" striped animated value={Number(fclfaildData?.data?.success || 0) * 100 / Number(fclfaildData?.data?.totalUploaded || 0)} />
                    </div>
                    <div className='mt-4 d-flex justify-content-between align-items-center'>
                        <p className='m-0'><b>Failed:</b> {fclfaildData?.data?.failed || 0}</p>
                        <p className='my-1'><b>Success:</b> {fclfaildData?.data?.success || 0}</p>
                        <p className='m-0'><b>Total Data Uploaded:</b> {fclfaildData?.data?.totalUploaded || 0}</p>
                    </div>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={() => {
                            dispatch({type: FCL_FREIGHT_FAILD_POPUP_TYPE, payload: false})
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                        
                    <a href={fclfaildData?.url} download={fclfaildData?.filename} className='btn btn-primary'>Download</a>

                    {(fclfaildData?.data?.success > 0 && fclfaildData?.data?.totalUploaded !== fclfaildData?.data?.failed) && (
                        <span className='text-decoration-underline text-primary' onClick={() => { dispatch(getFclDestinationAction(fcl_charge_id?.id)); dispatch({type: UPDATE_FCL_ACTIVE_TAB, payload: {tab: 3}});dispatch({type: FCL_FREIGHT_FAILD_POPUP_TYPE, payload: false}); }}>Proceed with error</span>              
                    )}
                </div>
            </Modal>
            <Modal
                isOpen={openSaveModal}
                toggle={() => {
                    openSaveConfirmModal();
                }}
                className='confirm_modal_wrap'
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
                    <h4 className='text-center'>Are you sure?</h4>
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
                    <button type="button" onClick={() => { finalSaveButton(); }} className="btn btn-primary ">
                        Save changes
                    </button>
                </div>
            </Modal>
        </>
    )
}