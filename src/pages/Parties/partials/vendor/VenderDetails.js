import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Card, CardBody, FormFeedback, Input } from "reactstrap";
import { optionVendorType } from "../../../../common/data/procurement";
import { getCustomersCountryData, getCustomersPincodeData, getCustomersStateData } from "../../../../store/Parties/actions";
import FileUpload from "../../FileUpload";
import ModalAddNewDepartment from "../../Modal/ModalAddNewDepartment";
import ModalAddNewDesignation from "../../Modal/ModalAddNewDesignation";
import ModalAddNewEntityType from "../../Modal/ModalAddNewEntityType";
import ModalAddNewIndustryType from "../../Modal/ModalAddNewIndustryType";
import ModalAddNewServiceType from "../../Modal/ModalAddNewServiceType";
import ModalAddNewVendorType from "../../Modal/ModalAddNewVendorType";
import {
  department,
  designation,
  entityType,
  industryType,
  serviceTypeOptions
} from "../../constants/venderEnumList";
import { useLocation } from "react-router-dom";

const title = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];
const opCode = [{ label: "+91", value: "+91" }];

const VenderDetails = ({ companyDetailsFormik }) => {
  const [departmentModal, setDepartmentModal] = useState(false);
  const [designationModal, setDesignationModal] = useState(false);
  const [entityTypeModal, setEntityTypeModal] = useState(false);
  const [industryTypeModal, setIndustryTypeModal] = useState(false);
  const [vendorTypeModal, setVendorTypeModal] = useState(false);
  const [serviceTypeModal, setServiceTypeModal] = useState(false);
  const dispatch = useDispatch();
  const navigateState = useLocation();

  const { parties_city_details, parties_all_details, parties_all_employee_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector(
    (state) => state?.parties
  );


  useEffect(() => {
    if (parties_state_details && parties_state_details?.content?.length > 0) {
      companyDetailsFormik.setFieldValue("state", parties_state_details?.content[0]?.stateName)
    }
    if (parties_country_details && parties_country_details?.content?.length > 0) {
      companyDetailsFormik.setFieldValue("country", parties_country_details?.content[0]?.countryName)
    }
  }, [parties_state_details, parties_country_details, parties_pincode_details, parties_all_details]);


  useEffect(() => {
    const cityData = parties_city_details?.content?.find((city) => city.cityName === companyDetailsFormik.values.city);
    if (!!cityData) {
      dispatch(getCustomersStateData({ cityId: cityData.id }));
      dispatch(getCustomersCountryData({ cityId: cityData.id }));
      dispatch(getCustomersPincodeData({ cityId: cityData.id }));
    }

  }, []);

  const onUploadChange = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
    }
    companyDetailsFormik.setFieldValue("image", file);
  };
  const onCloseClick = () => {
    setDesignationModal(false);
    setDepartmentModal(false);
    setIndustryTypeModal(false);
    setEntityTypeModal(false);
    setVendorTypeModal(false);
    setServiceTypeModal(false);
  };
  return (
    <>
      <div className="text-center mb-4">
        <h5>{!!navigateState?.state?.carrierMaster ? 'Carrier':'Vendor'} Details</h5>
      </div>

      <Card>
        <CardBody>
          <form>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                  {!!navigateState?.state?.carrierMaster ? 'Carrier':'Vendor'} Code<span className="required_star">*</span>
                  </label>
                  <Input
                    type="text"
                    name="companyCode"
                    value={companyDetailsFormik.values.companyCode}
                    readOnly={!!navigateState?.state?.carrierMaster}
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
                  <label className="form-label">{!!navigateState?.state?.carrierMaster ? 'Carrier':'Vendor'} Name<span className="required_star">*</span>
                  </label>
                  <Input
                    type="text"
                    name="companyName"
                    value={companyDetailsFormik.values.companyName}
                    onChange={companyDetailsFormik.handleChange}
                    className="form-control"
                    readOnly={!!navigateState?.state?.carrierMaster}
                    placeholder=""
                    onBlur={companyDetailsFormik.handleBlur}
                    invalid={
                      companyDetailsFormik.touched.companyName &&
                        companyDetailsFormik.errors.companyName
                        ? true
                        : false
                    }
                  />
                  {companyDetailsFormik.touched.companyName &&
                    companyDetailsFormik.errors.companyName ? (
                    <FormFeedback>{companyDetailsFormik.errors.companyName}</FormFeedback>
                  ) : null}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Logo</label>
                  <FileUpload
                    iconName="img"
                    name="image"
                    disabled={!!navigateState?.state?.carrierMaster}
                    onUpload={onUploadChange}
                    src={companyDetailsFormik.values.image}
                  />
                </div>
              </div>
            </div>


            <div className="row">
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
                    list="cityList"
                    value={companyDetailsFormik?.values?.city || ""}
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
                    {parties_city_details &&
                      parties_city_details?.content?.map((item, i) => (
                        <option key={i} value={item.cityName} />
                      ))}
                  </datalist>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">State</label>

                  <Input
                    type="text"
                    name="state"
                    list="stateList"
                    value={companyDetailsFormik?.values?.state || ""}
                    onChange={companyDetailsFormik.handleChange}
                    className="form-control"
                    placeholder=""
                  />
                  {/* <datalist id="stateList">
                    {state_list &&
                      state_list.map((item, i) => (
                        <option key={i} value={item} />
                      ))}
                  </datalist> */}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Country<span className='required_star'>*</span></label>
                  <Input
                    type="text"
                    name="country"
                    list="countryList"
                    readOnly
                    value={companyDetailsFormik?.values?.country || ""}
                    onChange={companyDetailsFormik.handleChange}
                    className="form-control"
                    placeholder=""
                    onBlur={companyDetailsFormik.handleBlur}
                    invalid={companyDetailsFormik.touched.country && companyDetailsFormik.errors.country ? true : false}
                  />
                  {companyDetailsFormik.touched.country && companyDetailsFormik.errors.country ? (
                    <FormFeedback>{companyDetailsFormik.errors.country}</FormFeedback>
                  ) : null}
                  {/* <datalist id="countryList">
                    {country_list &&
                      country_list.map((item, i) => (
                        <option key={i} value={item} />
                      ))}
                  </datalist> */}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Zipcode</label>
                  <Input
                    type="text"
                    name="zipcode"
                    list="zipcodeList"
                    value={companyDetailsFormik?.values?.zipcode || ""}
                    onChange={companyDetailsFormik.handleChange}
                    className="form-control"
                    placeholder=""
                  />
                  <datalist id="zipcodeList">
                    {parties_pincode_details &&
                      parties_pincode_details?.content?.map((item, i) => (
                        <option key={i} value={item.pin} />
                      ))}
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
          </form>
        </CardBody>
      </Card>
      {/* Primary Contact Details */}
      <div className="text-center mb-4">
        <h5>Primary Contact Details</h5>
      </div>
      <Card>
        <CardBody>
          <form>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Contact Name <span className='required_star'>*</span></label>
                  <div className="row">
                    <div className="col-4 col-md-2">
                      <Select
                        name="title"
                        value={
                          title
                            ? title.find(
                              (option) =>
                                option.value ===
                                companyDetailsFormik?.values?.title
                            )
                            : ""
                        }
                        onChange={(e) => {
                          companyDetailsFormik.setFieldValue(`title`, e.value);
                        }}
                        placeholder="Mr"
                        options={title}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-6">
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

            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone Number<span className='required_star'>*</span></label>
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <Select
                        name="opCode"
                        value={
                          opCode
                            ? opCode.find(
                              (option) =>
                                option.value ===
                                companyDetailsFormik?.values?.opCode
                            )
                            : ""
                        }
                        onChange={(e) => {
                          companyDetailsFormik.setFieldValue(`opCode`, e.value);
                        }}
                        placeholder="+91"
                        options={opCode}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-8 col-md-9">
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
                  placeholder="Enter your email address"
                  required={true}
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
                    name="department"
                    value={
                      department
                        ? department.find(
                          (option) =>
                            option.value ===
                            companyDetailsFormik?.values?.department
                        )
                        : ""
                    }
                    onChange={(e) => {
                      if (e.label == "Add New") {
                        setDepartmentModal(true);
                      }
                      companyDetailsFormik.setFieldValue(`department`, e.value);
                    }}
                    options={department}
                    classNamePrefix="select2-selection form-select"
                  // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Designation</label>
                  <Select
                    name="designation"
                    value={
                      designation
                        ? designation.find(
                          (option) =>
                            option.value ===
                            companyDetailsFormik?.values?.designation
                        )
                        : ""
                    }
                    onChange={(e) => {
                      if (e.label == "Add New") {
                        setDesignationModal(true);
                      }
                      companyDetailsFormik.setFieldValue(
                        `designation`,
                        e.value
                      );
                    }}
                    options={designation}
                    // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Company identification */}
      <div className="text-center mb-4">
        <h5>Company identification</h5>
      </div>
      <Card>
        <CardBody>
          <>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Vender Type<span className='required_star'>*</span></label>
                  <Select
                    name="venderType"
                    id="venderType"
                    value={optionVendorType ? optionVendorType.find((option) => option.value === companyDetailsFormik?.values?.venderType) : ""}
                    onChange={(e) => {
                      companyDetailsFormik.setFieldValue(`venderType`, e.value);
                    }}
                    options={!!navigateState?.state?.carrierMaster ? optionVendorType : optionVendorType.filter(data => data.value != 'CARRIER' && data.value != 'NVOCC')}
                    // options={[...optionVendorType,{ label: "Add New", value: "Add New"}]}
                    isDisabled={!!navigateState?.state?.carrierMaster}
                    classNamePrefix="select2-selection form-select"
                    onBlur={companyDetailsFormik.handleBlur}
                    invalid={companyDetailsFormik.touched.venderType || companyDetailsFormik.errors.venderType ? true : false}
                  />
                  {companyDetailsFormik.touched.venderType || companyDetailsFormik.errors.venderType ? (
                    <FormFeedback>{companyDetailsFormik.errors.venderType}</FormFeedback>
                  ) : null}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Service Type</label>

                  <Select
                    name="transportMode"
                    id="transportMode"
                    value={serviceTypeOptions ? serviceTypeOptions.find((option) => option.value === companyDetailsFormik?.values?.transportMode) : ""}
                    onChange={(e) => {
                      companyDetailsFormik.setFieldValue(`transportMode`, e.value);
                    }}
                    options={serviceTypeOptions}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
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
              <div className="col-12 col-md-6">
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
                    name="entityType"
                    value={
                      entityType
                        ? entityType.find(
                          (option) =>
                            option.value ===
                            companyDetailsFormik?.values?.entityType
                        )
                        : ""
                    }
                    onChange={(e) => {
                      if (e.label == "Add New") {
                        setEntityTypeModal(true);
                      }
                      companyDetailsFormik.setFieldValue(`entityType`, e.value);
                    }}
                    options={entityType}
                    classNamePrefix="select2-selection form-select"
                  // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Industry Type</label>
                  <Select
                    name="industryType"
                    value={
                      industryType
                        ? industryType.find(
                          (option) =>
                            option.value ===
                            companyDetailsFormik?.values?.industryType
                        )
                        : ""
                    }
                    onChange={(e) => {
                      if (e.label == "Add New") {
                        setIndustryTypeModal(true);
                      }
                      companyDetailsFormik.setFieldValue(
                        `industryType`,
                        e.value
                      );
                    }}
                    options={industryType}
                    // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>
            </div>
          </>
        </CardBody>
      </Card>
      {/* <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} /> */}
      <ModalAddNewDepartment
        modal={departmentModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewDesignation
        modal={designationModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewEntityType
        modal={entityTypeModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewIndustryType
        modal={industryTypeModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewVendorType
        modal={vendorTypeModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewServiceType
        modal={serviceTypeModal}
        onCloseClick={onCloseClick}
      />
    </>
  );
};

export default VenderDetails;
