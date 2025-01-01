import React, { useEffect, useState } from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";
import ModalAddNewAddressType from "./ModalAddNewAddressType";
import { useSelector } from "react-redux";
import { getCustomersCountryData, getCustomersPincodeData, getCustomersStateData } from "../../../store/Parties/actions";
import { useDispatch } from "react-redux";

const gen = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];
const addressType = [
  { label: "Office", value: "OFFICE" },
  { label: "Branch", value: "BRANCH" },
  { label: "Regional Office", value: "REGIONAL_OFFICE" },
  { label: "Head Office", value: "HEAD_OFFICE" },
  { label: "City Office", value: "CITY_OFFICE" },
  { label: "Warehouse", value: "WAREHOUSE" },
  { label: "Fulfilment Center", value: "FULFILMENT_CENTER" },
  { label: "Add New", value: "Add New" },
];

const phone = [{ label: "+91", value: "+91" }];

const addGstInitialValue = {
  address: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  no: "",
  contactName : "",
  placeOfSupply: "",
};

// const stateConverter = (num) => {
//   // console.log(num, "number");
//   return placeOfSupply.find((place) => +place.Code === +num)?.value;
// };

const ModalAddGST = ({ modal, onCloseClick ,}) => {
  const dispatch = useDispatch();
  // onSubmitHandler
  const [addressTypeModal, setAddressTypeModal] = useState(false)

  const onCloseClickModal = () => {
    setAddressTypeModal(false);
  };
  const formik = useFormik({
    initialValues: addGstInitialValue,
    onSubmit: (value) => {
      console.log(value, "value");
      const payload = {
        ...value,
        id:2,
        pinCode: {
          "version": 0,
          "id": 1,
          pin: value.zipcode
        },
        city: {
          "version": 0,
          "id": 1,
          cityName: value.city
        },
        state: {
          "version": 4,
          "id": 1,
          stateName: value.state
        },
        country: {
          "version": 0,
          "id": 5,
          countryName: value.country
        },
        status: "ACTIVE"
      }
      // onSubmitHandler(payload);
      formik.resetForm();
    },
  });

  const { parties_country_details, parties_pincode_details, parties_city_details, parties_state_details } = useSelector(
    (state) => state.parties
  );

// console.log(parties_city_details,"parties_city_details");




useEffect(() => {
  if (parties_state_details && parties_state_details?.content?.length > 0) {
    formik.setFieldValue("state", parties_state_details?.content[0]?.stateName)
  }
  if (parties_country_details && parties_country_details?.content?.length > 0) {
    formik.setFieldValue("country", parties_country_details?.content[0]?.countryName)
  }
  
}, [parties_state_details, parties_country_details, parties_pincode_details,parties_city_details])

  // const gstNumberHandler = (e) => {
  //   formik.handleChange(e);
  //   formik.setFieldValue(
  //     "placeOfSupply",
  //     stateConverter(e.target.value.substring(0, 2))
  //   );
  // };

  return (
    <>
      <Modal isOpen={modal} toggle={onCloseClick} className="table_view_modal">
        <ModalHeader tag="h4">
          Add GST
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              {/* //// */}
              <div className="row mt-4 mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Comapany Address"
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">City</label>
                  <Input
                    type="text"
                    list="cityList"
                    name="city"
                    value={formik.values.city}
                    onChange={(e) => {
                      // formik.handleChange
                      formik.handleChange(e);
                      const cityData = parties_city_details?.content?.find((city) => city.cityName === e.target.value)
                      if (cityData) {
                        dispatch(getCustomersStateData({ cityId: cityData.id }));
                        dispatch(getCustomersCountryData({ cityId: cityData.id }));
                        dispatch(getCustomersPincodeData({ cityId: cityData.id }));
                      }
                    }}
                    className="form-control"
                    placeholder="Enter Comapany City"
                  />
                  <datalist id="cityList">
                    {parties_city_details && parties_city_details?.content?.map((item, i) => <option key={i} value={item.cityName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">State</label>
                  <Input
                    type="text"
                    name="state"
                    list="stateList"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter State"
                  />
                    <datalist id="stateList">
                    {parties_state_details && parties_state_details?.content?.map((item, i) => <option key={i} value={item.stateName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Country</label>
                  <Input
                    type="text"
                    name="country"
                    list="countryList"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Country"
                  />
                  <datalist id="countryList">
                    {parties_country_details && parties_country_details?.content?.map((item, i) => <option key={i} value={item.countryName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Zipcode</label>
                  <Input
                    type="text"
                    name="zipcode"
                    list="zipcodeList"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Zipcode"
                  />
                  <datalist id="zipcodeList">
                    {parties_pincode_details && parties_pincode_details?.content?.map((item, i) => <option key={i} value={item.pin} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">GST Number</label>
                  <Input
                    type="text"     
                    name="no"
                    value={formik.values.no}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter GST Number"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Contact Name</label>
                  <div className="row">
                    <div className="col-3">
                      <Select
                        // value={carrierData.rate_type}
                        // name='rate_type'
                        // onChange={(opt) => {
                        //     handleSelectGroup('rate_type', opt);
                        // }}
                        placeholder="Mr"
                        options={gen || []}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-9">
                      <Input
                        type="text"
                        name="contactName"
                          value={formik.values.contactName}
                          onChange={formik.handleChange}
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="row">
                    <div className="col-3">
                      <Select
                        // value={carrierData.rate_type}
                        // name='rate_type'
                        // onChange={(opt) => {
                        //     handleSelectGroup('rate_type', opt);
                        // }}
                        placeholder="+91"
                        options={phone || []}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-9">
                      <Input
                        type="text"
                        name="contactNo"
                          value={formik.values.contactName}
                          onChange={formik.handleChange}
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label">Address Type</label>
                    <Select
                      // name='designation'
                      // value={
                      //   addressType
                      //       ? addressType.find(
                      //           (option) =>
                      //             option.value ===
                      //             companyDetailsFormik?.values?.addressType
                      //         )
                      //       : ""
                      //   }
                      onChange={(e) => {
                          if (e.label == "Add New") {
                            setAddressTypeModal(true)
                          }
                          // companyDetailsFormik.setFieldValue(
                          //   `designation`,
                          //   e.value
                          // );
                        }}
                      options={addressType || []}
                      classNamePrefix="select2-selection form-select"
                      // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button
                      onClick={formik.handleSubmit}
                      className=" btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary" onClick={onCloseClick}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* //// */}
              {/* </div> */}
            </div>
          </div>
          <ModalAddNewAddressType modal={addressTypeModal} onCloseClick={onCloseClickModal}/>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalAddGST;
