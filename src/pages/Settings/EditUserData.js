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
  Input,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";

const role = [
  { label: "Mode", value: "Mode" },
];


export default function EditUserData() {
  const navigate = useNavigate();

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
                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">First Name</label>
                          <div className="">
                            <Input
                              type="text"
                              name="firstName"
                              id="EfirstName"
                            //   value={}
                            //   onChange={}
                              className="form-control"
                              placeholder="Enter First Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Last Name</label>

                          <div className="">
                            <Input
                              type="text"
                              name="lastName"
                              id="ElastName"
                            //   value={}
                            //   onChange={}
                              className="form-control"
                              placeholder="Enter Last Name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Email Id</label>

                          <div className="">
                            <Input
                              type="text"
                              name="email"
                              id="Eemail"
                            //   value={}
                            //   onChange={}
                              className="form-control"
                              placeholder="Enter Email id"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Select Role
                          </label>
                          <div className="">
                            <Select
                            // value={
                            //     role
                            //       ? role.find(
                            //           (option) =>
                            //             option.value ===
                            //             formik.values.role
                            //         )
                            //       : ""
                            //   }
                              name="role"
                              id="Erole"
                            //   onChange={(opt) => {
                            //     handleSelectGroup("surchargeCategory", opt);
                            //   }}
                              options={role}
                              placeholder={"Select Role"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Enter Password</label>

                          <div className="">
                            <Input
                              type="password"
                              name="password"
                              id="Epassword1"
                            //   value={}
                            //   onChange={}
                              className="form-control"
                              placeholder="Enter Password"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Re-Enter Password</label>

                          <div className="">
                            <Input
                              type="password"
                              name="password2"
                              id="Epassword2"
                            //   value={}
                            //   onChange={}
                              className="form-control"
                              placeholder="Re-Enter Password"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary">Save</button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary">Cancel</button>
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
