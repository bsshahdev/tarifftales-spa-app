import React, { useEffect } from "react";
import * as Yup from "yup";
import { FormFeedback, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";
import { placeOfSupply } from "../../../common/data/settings";
import { useDispatch } from "react-redux";
import { getBusinessData, getCompanyCountryData, getCompanyDetailsData, getCompanyPincodeData, getCompanyStateData, getTaxDetailsData } from "../../../store/Settings/actions";
import { useSelector } from "react-redux";
import * as schema from "../../../api/global-schema";
// const stateConverter = (num) => {
//   // console.log(num, "number");
//   return placeOfSupply.find((place) => +place.Code === +num)?.value;
// };


const ModalAddGST = ({ modal, onSubmitHandler, onCloseClick }) => {
  const stateAllData = useSelector((state) => state?.globalReducer?.stateAllData);
  const { settings_companyCity_data, settings_companyState_data, settings_companyCountry_data, settings_companyPincode_data } = useSelector(
    (state) => state.settings
  );
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      no: "",
      placeOfService: "",
    },
    validationSchema: Yup.object({
      placeOfService: schema.matchState,
  }),
    onSubmit: (value) => {
      console.log(value, "value");
      let cityVal = settings_companyCity_data?.content?.find((item) => item?.cityName === value?.city) || [];
      let stateVal = settings_companyState_data?.content?.find((item) => item?.stateName === value?.state) || [];
      let countryVal = settings_companyCountry_data?.content?.find((item) => item?.countryName === value?.country) || [];
      let zipcodeVal = settings_companyPincode_data?.content?.find((item) => item?.pin === value?.pinCode) || [];
      const payload = {
        address: value?.address || null,
        no: value?.no || null,
        placeOfService: value?.placeOfService || null,
        ...(cityVal?.length !== 0 && { city: { id: cityVal?.id, version: cityVal?.version } }),
        ...(stateVal?.length !== 0 && { state: { id: stateVal?.id, version: stateVal?.version } }),
        ...(countryVal?.length !== 0 && { country: { id: countryVal?.id, version: countryVal?.version } }),
        ...(zipcodeVal?.length !== 0 && { pinCode: { id: zipcodeVal?.id, version: zipcodeVal?.version } }),
      }
      onSubmitHandler(payload);
      // dispatch(getTaxDetailsData(value));
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (settings_companyState_data && settings_companyState_data?.content?.length > 0) {
      formik.setFieldValue("state", settings_companyState_data?.content[0]?.stateName || '')
    }
    if (settings_companyCountry_data && settings_companyCountry_data?.content?.length > 0) {
      formik.setFieldValue("country", settings_companyCountry_data?.content[0]?.countryName || '')
    }
    // if(settings_companyPincode_data){
    //   companyDetailsFormik.setFieldValue("zipcode", settings_companyPincode_data?.content?.map((item)=>item?.pin))
    // }
  }, [settings_companyState_data, settings_companyCountry_data, settings_companyPincode_data])


  const gstNumberHandler = (e) => {
    formik.handleChange(e);
    // formik.setFieldValue(
    //   "placeOfService",
    //   stateConverter(e.target.value.substring(0, 2))
    // );
  };

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
              <div className="row mt-4 mb-2">
                <div className="col-12 mb-4">
                  <label className="form-label">Comapany Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Comapany Address"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">City</label>
                  <Input
                    type="text"
                    name="city"
                    list="cityList"
                    value={formik.values.city}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue('state', '');
                      formik.setFieldValue('country', '');
                      formik.setFieldValue('pinCode', '');
                      const cityData = settings_companyCity_data?.content?.find((city) => city.cityName === e.target.value)
                      if (cityData) {
                        dispatch(getCompanyStateData({ cityId: cityData.id }));
                        dispatch(getCompanyCountryData({ cityId: cityData.id }));
                        dispatch(getCompanyPincodeData({ cityId: cityData.id }));
                      }
                    }
                    }
                    className="form-control"
                    placeholder="Enter City"
                  />
                  <datalist id="cityList">
                    {settings_companyCity_data && settings_companyCity_data?.content?.map((item, i) => <option key={i} value={item.cityName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">State</label>
                  <Input
                    type="text"
                    name="state"
                    // list="stateList"
                    value={formik.values.state || ''}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter State"
                  />
                  {/* <datalist id="stateList">
                    {settings_companyState_data && settings_companyState_data?.content?.map((item, i) => <option key={i} value={item.stateName} />)}
                  </datalist> */}
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Zipcode</label>
                  <Input
                    type="text"
                    name="pinCode"
                    list="zipcodeList"
                    value={formik.values.pinCode || ''}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Zipcode"
                  />
                  <datalist id="zipcodeList">
                    {settings_companyPincode_data && settings_companyPincode_data?.content?.map((item, i) => <option key={i} value={item.pin} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Country</label>
                  <Input
                    type="text"
                    name="country"
                    list="countryList"
                    value={formik.values.country || ''}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Country"
                  />
                  <datalist id="countryList">
                    {settings_companyCountry_data && settings_companyCountry_data?.content?.map((item, i) => <option key={i} value={item.countryName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">GST Number</label>
                  <Input
                    type="text"
                    name="no"
                    value={formik.values.no || ''}
                    onChange={gstNumberHandler}
                    className="form-control"
                    placeholder="Enter GST Number"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Place of Supply</label>
                  <Select
                    value={
                      stateAllData
                        ? stateAllData.find(
                          (option) =>
                            option.value === formik.values.placeOfService
                        )
                        : ""
                    }
                    name="placeOfService"
                    options={stateAllData}
                    placeholder={"Select Place of Supply"}
                    onChange={(e) => {
                      formik.setFieldValue(`placeOfService`, e.value);
                    }}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.placeOfService && formik.errors.placeOfService ? true : false
                    }
                    classNamePrefix="select2-selection form-select"
                  />
                  {formik.touched.placeOfService && formik.errors.placeOfService ? (
                    <FormFeedback type="invalid">{formik.errors.placeOfService}</FormFeedback>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      onClick={formik.handleSubmit}
                      className=" btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary" onClick={() => {formik.resetForm(); onCloseClick();}}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalAddGST;
