import classnames from "classnames";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import fileData from "../../../assets/extra/FclUplaodFormat.xlsx";

import {
  formatBytes,
  isAnyValueEmpty,
  isExcelFile,
} from "../../../components/Common/CommonLogic";

export default function UploadFile() {
  const [selectedFiles, setselectedFiles] = useState([]);
  const navigate = useNavigate();
  const [fileError, setfileError] = useState("");

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

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="main_freight_wrapper">
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
                      <div>
                        <div className="mb-3 d-flex justify-content-end">
                          <a
                            href={fileData}
                            className="download_formate btn btn-primary"
                            download
                          >
                            Download Format
                          </a>
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
                                  <h4>
                                    Upload Surcharge file by dragging or
                                    selecting a file from browser.
                                  </h4>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <p className="text-danger mt-2">{fileError}</p>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {selectedFiles?.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <i className="mdi mdi-file-document-outline"></i>
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
                    </div>
                    <div className="row mt-2">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary">Save</button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={()=>{navigate(-1)}}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
