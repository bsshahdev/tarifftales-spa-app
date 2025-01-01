import React, {  useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Form, Modal, Progress, Row } from 'reactstrap';
import fileData from '../../../../assets/extra/Fcl_Uplaod_Format_V2.xlsx';
import { formatBytes, isExcelFile } from '../../../../components/Common/CommonLogic';
import {  getFclDestinationAction, uploadFclFrightData, uploadFclFrightDataV1 } from '../../../../store/Procurement/actions';
import {  FCL_FREIGHT_FAILD_POPUP_TYPE, UPDATE_FCL_ACTIVE_TAB } from '../../../../store/Procurement/actiontype';

export default function UploadFreightFrom() {
    const [selectedFiles, setselectedFiles] = useState([]);
    const navigate = useNavigate();
    const [fileError, setfileError] = useState('');
    const { fcl_charge_id, fclfaildData, fclPopup } = useSelector((state) => state?.procurement);
    const dispatch = useDispatch();

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
  
    const uploadSaveHandler = () => {
            let xlxsfile = selectedFiles[0]
            const formData = new FormData();
            formData.append('file', xlxsfile);
            dispatch(uploadFclFrightDataV1(formData));
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
                                                        }}>
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

                                            <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-center">
                                                <li>
                                                    <button onClick={uploadSaveHandler} className="d-flex align-items-center btn btn-primary">
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
                        <p className='m-0'><b>Total Records:</b> {fclfaildData?.data?.totalUploaded || 0}</p>
                        <p className='m-0'><b>Failed:</b> {fclfaildData?.data?.failed || 0}</p>
                        <p className='my-1'><b>Success:</b> {fclfaildData?.data?.success || 0}</p>
                    </div>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={() => {
                            dispatch({ type: FCL_FREIGHT_FAILD_POPUP_TYPE, payload: false })
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Close
                    </button>

                    <a href={fclfaildData?.url} download={fclfaildData?.filename} className='btn btn-primary'>Download</a>
                </div>
            </Modal>
         
        </>
    )
}