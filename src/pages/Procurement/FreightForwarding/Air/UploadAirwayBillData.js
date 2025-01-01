import React, { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { Card, Col, Container, Form, Modal, Progress, Row } from 'reactstrap';
import fileData from '../../../../assets/extra/FclUplaodFormat.xlsx';
import mawpFileData from '../../../../assets/extra/MAWB_Upload_Format.xlsx';
import { optionRateType, optionVendorType } from '../../../../common/data/procurement';
import { formatBytes, isExcelFile } from '../../../../components/Common/CommonLogic';
import { addAirwaybillData, postCarrierData } from '../../../../store/Procurement/actions';
import { BLANK_CARRIER_DATA, MAWB_FRIGHT_FAILD_POPUP_TYPE } from '../../../../store/Procurement/actiontype';

export default function UploadAirwayBillData() {
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [selectedFiles, setselectedFiles] = useState([]);
    const navigate = useNavigate();
    const [fileError, setfileError] = useState('');
    const addAirBill = useSelector((state) => state?.procurement?.addAirWaybill);
    const { mawbFaildData, mawbPopup } = useSelector((state) => state?.procurement);

    const dispatch = useDispatch();
    const navigateState = useLocation();
    const [AllVendors, setAllVendors] = useState([]);
    const [filteredVendors, setFilteredValue] = useState([]);
    const {
        vendor_data
    } = useSelector((state) => state?.globalReducer);

    useEffect(() => {
        const vendorMap = new Map();
        if (vendor_data?.content) {
            vendor_data.content.forEach((item) => {
                const vendorType = item.vendorType;
                const vendor = {
                    label: item.name,
                    value: item.name,
                    version: item.version,
                    id: item.id,
                };

                const vendorsForType = vendorMap.get(vendorType) || [];
                vendorsForType.push(vendor);
                vendorMap.set(vendorType, vendorsForType);
            });

            setAllVendors(vendorMap);
        }


    }, [vendor_data]);

    const openSaveConfirmModal = () => {
        setOpenSaveModal(!openSaveModal);
    }

    const finalSaveButton = () => {
        setselectedFiles([]);
        dispatch({ type: BLANK_CARRIER_DATA });
        setOpenSaveModal(false);
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
                setselectedFiles();
            }
        } else {
            setfileError("File is required");
        }
    }

    // ------------- dynamic field ------------------------
    const handleAddAirWayBill = useCallback((name, opt) => {
        dispatch(addAirwaybillData(name, opt));
    }, [addAirBill])
    const handleSaveCarrierDetails = () => {

        const vendorInfo = {
            id: addAirBill?.carrierDetails?.vendor_name?.id || '',
            version: addAirBill?.carrierDetails?.vendor_name?.version || 0,
        };

        // const data = {
        //     rateType: addAirBill?.carrierDetails?.rate_type?.value || '',
        //     validFrom: addAirBill?.carrierDetails?.validity_from || '',
        //     validTo: addAirBill?.carrierDetails?.validity_to || '',
        //     status: addAirBill?.carrierDetails?.status || 'ACTIVE'
        // };

        // const carrierData = {
        //     'tenantVendor': vendorInfo,
        // };

        let xlxsfile = selectedFiles[0]
        const formData = new FormData();
        formData.append('file', xlxsfile);


        const newData = {
            // 'carrierData': carrierData,
            'formData': formData,
        };
        console.log(newData);
         dispatch(postCarrierData({ newData }));
       //  setselectedFiles([]);

    }
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button type="button" className='btn border mb-3' onClick={() => { navigate(-1) }}>Back</button>
                        <Row>
                            <Col lg="12">
                                <div id="progrss-wizard" className="twitter-bs-wizard upload_freight_wrap">

                                    {/* <div className="text-center mb-4">
                                        <h5>Carrier Details</h5>
                                    </div>
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Rate Type</label>
                                                    <Select
                                                        value={addAirBill?.carrierDetails?.rate_type || ''}
                                                        name='rate_type'
                                                        onChange={(opt) => {
                                                            handleAddAirWayBill('carrierDetails', { ...addAirBill?.carrierDetails, rate_type: opt });
                                                        }}
                                                        options={optionRateType}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Vendor Type</label>
                                                    <Select
                                                        value={addAirBill?.carrierDetails?.vendor_type || ''}
                                                        name='vendor_type'
                                                        onChange={(opt) => {
                                                            if (AllVendors) {
                                                                let vendors = AllVendors?.get(opt?.value);
                                                                setFilteredValue(vendors);
                                                            }
                                                            handleAddAirWayBill('carrierDetails', { ...addAirBill?.carrierDetails, vendor_name: '', vendor_type: opt });
                                                        }}
                                                        options={optionVendorType}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Vendor/Carrier Name</label>
                                                    <Select
                                                        value={addAirBill?.carrierDetails?.vendor_name || ''}
                                                        name='vendor_name'
                                                        onChange={(opt) => {
                                                            handleAddAirWayBill('carrierDetails', { ...addAirBill?.carrierDetails, vendor_name: opt });

                                                        }}
                                                        options={filteredVendors}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label htmlFor='validity_from' className="form-label">Validity From</label>
                                                    <input type="date" name="validity_from" id="validity_from" className='form-control' value={addAirBill?.carrierDetails?.validity_from} onChange={(e) => {
                                                        handleAddAirWayBill('carrierDetails', { ...addAirBill?.carrierDetails, validity_from: e.target.value });
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label htmlFor='validity_to' className="form-label">Validity To</label>
                                                    <input type="date" name="validity_to" id="validity_to" className='form-control' value={addAirBill?.carrierDetails?.validity_to} onChange={(e) => {
                                                        handleAddAirWayBill('carrierDetails', { ...addAirBill?.carrierDetails, validity_to: e.target.value });
                                                    }} />

                                                </div>
                                            </div>
                                        </div>
                                    </form> */}


                                    <div>

                                        <div className='mb-3 d-flex justify-content-end'>
                                            {navigateState?.state?.id === "inland" ? (
                                                <a href={mawpFileData} className="download_formate btn btn-primary" download="Inland Upload Format">Download Format</a>
                                            ) : (
                                                <a href={mawpFileData} className="download_formate btn btn-primary" download="Sample_Master_Waybill_Rate">Download Format</a>
                                            )}
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

                                        <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-center">
                                            <li>
                                                <button onClick={handleSaveCarrierDetails} className="d-flex align-items-center btn btn-primary">
                                                    Save
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="btn btn-primary d-flex align-items-center ms-3">Cancel
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            {/* modal */}

            <Modal isOpen={mawbPopup} className='data_failed_popup'>
                <div className="modal-body pb-4">
                <div className='modal_icon text-center'>
                        <i className="bx bx-error"></i>
                        {/* <h2 className='text-center'>{mawbFaildData?.data?.status}</h2> */}
                        <h2 className='text-center'>File Was Not Uploaded.</h2>
                    </div>
                    <div id="bar" className="mt-4">
                        <Progress color="success" striped animated value={Number(mawbFaildData?.data?.success || 0) * 100 / Number(mawbFaildData?.data?.totalUploaded || 0)} />
                    </div>
                    <div className='mt-4 d-flex justify-content-between align-items-center'>
                        <p className='m-0'><b>Total Records:</b> {mawbFaildData?.data?.totalUploaded || 0}</p>
                        <p className='m-0'><b>Failed:</b> {mawbFaildData?.data?.failed || 0}</p>
                        <p className='my-1'><b>Success:</b> {mawbFaildData?.data?.success || 0}</p>
                    </div>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={() => {
                            dispatch({type: MAWB_FRIGHT_FAILD_POPUP_TYPE, payload: false})
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                        
                    <a href={mawbFaildData?.url} download={mawbFaildData?.filename} className='btn btn-primary'>Download</a>

                    {/* {(mawbFaildData?.data?.success > 0 && mawbFaildData?.data?.totalUploaded !== mawbFaildData?.data?.failed) && (
                        <span className='text-decoration-underline text-primary' onClick={() => { dispatch(getFclDestinationAction(fcl_charge_id?.id)); dispatch({type: UPDATE_FCL_ACTIVE_TAB, payload: {tab: 3}});dispatch({type: FCL_FREIGHT_FAILD_POPUP_TYPE, payload: false}); }}>Proceed with error</span>              
                    )} */}
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