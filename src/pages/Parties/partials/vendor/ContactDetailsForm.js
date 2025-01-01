import { FieldArray, FormikProvider } from "formik";
import React from "react";
import Select from "react-select";
import { Card, CardBody, FormFeedback, Input } from "reactstrap";
import { department, designation, } from "../../constants/venderEnumList";
import { useLocation } from "react-router-dom";
const opCode = [{ label: "+91", value: "+91" }];

const phone = [{ label: "+91", value: "+91" }];


const title = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];

const ContactDetailsForm = ({ contactsFormik }) => {
  const navigateState = useLocation();

  return (
    <>
      <div className="text-center mb-4">
        <h5>{!!navigateState?.state?.carrierMaster ? 'Carrier':'Vendor'} Contacts</h5>
      </div>
      <div>
        <FormikProvider value={contactsFormik}>
          <FieldArray name="contacts" validateOnChange={false}>
            {(arrayHelpers) => (
              <>
                {contactsFormik?.values?.contacts?.map((contact, index) => (
                  <Card key={index}>
                    <CardBody>
                      <div className="row">
                        <div className="col-10 col-md-11">
                          <div className="mb-3">
                            <label className="form-label">Contact Name</label>
                            <div className="row">
                              <div className="col-4 col-md-2">
                                <Select
                                  name={`contacts[${index}].title`}
                                  value={title ? title.find((option) => option.value === contactsFormik?.values?.contacts[index].title) : ""}
                                  onChange={(e) => {
                                    contactsFormik.setFieldValue(
                                      `contacts[${index}].title`,
                                      e.value
                                    );
                                  }}
                                  options={title}
                                  placeholder="Mr"
                                  classNamePrefix="select2-selection form-select"
                                /> 
                              </div>
                              <div className="col-8 col-md-6">
                                <Input
                                  type="text"
                                  name={`contacts[${index}].contactName`}
                                  value={
                                    contactsFormik.values.contacts[index].contactName
                                  }
                                  onChange={contactsFormik.handleChange}
                                  className="form-control"
                                  placeholder=""
                                  onBlur={contactsFormik.handleBlur}
                                  invalid={
                                      contactsFormik.touched.contacts &&
                                          contactsFormik.touched.contacts[index] &&
                                          contactsFormik.errors.contacts&&
                                          contactsFormik.errors.contacts[index]?.contactName
                                          ? true
                                          : false
                                  }
                              />
                              {contactsFormik.touched.contacts &&
                                  contactsFormik.touched.contacts[index] &&
                                  contactsFormik.errors.contacts &&
                                  contactsFormik.errors.contacts[index]?.contactName ? (
                                  <FormFeedback>{contactsFormik.errors.contacts[index]?.contactName}</FormFeedback>
                              ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-1">
                          {contactsFormik.values.contacts.length > 1 && (
                            <button
                              className="btn m-1 border"
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            >
                              <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <div className="row">
                              <div className="col-4 col-md-3">
                                <Select
                                  name={`contacts[${index}].opCode`}
                                  value={
                                    opCode
                                      ? opCode.find(
                                        (option) =>
                                          option.value ===
                                          contactsFormik?.values?.contacts[
                                            index
                                          ].opCode
                                      )
                                      : ""
                                  }
                                  onChange={(e) => {
                                    contactsFormik.setFieldValue(
                                      `contacts[${index}].opCode`,
                                      e.value
                                    );
                                  }}
                                  options={phone}
                                  placeholder="+91"
                                  classNamePrefix="select2-selection form-select"
                                />
                              </div>
                              <div className="col-8 col-md-9">
                                <Input
                                  type="text"
                                  name={`contacts[${index}].contactNo`}
                                  value={contactsFormik.values.contacts[index].contactNo}
                                  onChange={contactsFormik.handleChange}
                                  className="form-control"
                                  placeholder=""
                                  onBlur={contactsFormik.handleBlur}
                                  invalid={
                                      contactsFormik.touched.contacts &&
                                          contactsFormik.touched.contacts[index] &&
                                          contactsFormik.errors.contacts&&
                                          contactsFormik.errors.contacts[index]?.contactNo
                                          ? true
                                          : false
                                  }
                              />
                              {contactsFormik.touched.contacts &&
                                  contactsFormik.touched.contacts[index] &&
                                  contactsFormik.errors.contacts &&
                                  contactsFormik.errors.contacts[index]?.contactNo ? (
                                  <FormFeedback>{contactsFormik.errors.contacts[index]?.contactNo}</FormFeedback>
                              ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="">
                            <label className="form-label">Email Id</label>
                          </div>
                          <Input
                            type="text"
                            name={`contacts[${index}].contactEmail`}
                            value={
                              contactsFormik.values.contacts[index].contactEmail
                            }
                            onChange={contactsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                            invalid={
                              contactsFormik.touched.contacts &&
                                  contactsFormik.touched.contacts[index] &&
                                  contactsFormik.errors.contacts&&
                                  contactsFormik.errors.contacts[index]?.contactEmail
                                  ? true
                                  : false
                          }
                      />
                      {contactsFormik.touched.contacts &&
                          contactsFormik.touched.contacts[index] &&
                          contactsFormik.errors.contacts &&
                          contactsFormik.errors.contacts[index]?.contactEmail ? (
                          <FormFeedback>{contactsFormik.errors.contacts[index]?.contactEmail}</FormFeedback>
                      ) : null}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Department</label>
                            <Select
                              name={`contacts[${index}].department`}
                              value={department ? department.find((option) => option.value === contactsFormik?.values?.contacts[index].department) : ""}
                              onChange={(e) => {
                                contactsFormik.setFieldValue(`contacts[${index}].department`, e.value);
                              }}
                              options={department}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Designation</label>
                            <Select
                              name={`contacts[${index}].designation`}
                              value={designation ? designation.find((option) => option.value === contactsFormik?.values?.contacts[index].designation) : ""}
                              onChange={(e) => {
                                contactsFormik.setFieldValue(`contacts[${index}].designation`, e.value);
                              }}
                              options={designation}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    arrayHelpers.push({
                      title: "",
                      contactName: "",
                      contactNo: "",
                      contactEmail: "",
                      department: "",
                      opCode: "",
                      designation: "",
                    })
                  }
                >
                  Add
                </button>
              </>
            )}
          </FieldArray>
        </FormikProvider>
      </div>
    </>
  );
};

export default ContactDetailsForm;
