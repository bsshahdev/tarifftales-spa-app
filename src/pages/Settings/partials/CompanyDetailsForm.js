import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, FormFeedback, Input } from "reactstrap";
import { country_list, state_list } from "../../../common/data/settings";
import { getCompanyCountryData, getCompanyPincodeData, getCompanyStateData, } from "../../../store/Settings/actions";
import FileUpload from "../FileUpload";
import { isAnyValueEmpty } from "../../../components/Common/CommonLogic";

const CompanyDetailsForm = ({ companyDetailsFormik }) => {
  const dispatch = useDispatch();
  const { settings_companyCity_data, settings_companyState_data,tenant_info, settings_companyCountry_data, settings_companyPincode_data, } = useSelector((state) => state?.settings);
  const onUploadChange = (file) => {
    companyDetailsFormik.setFieldValue("image", file);
  };

  useEffect(() => {
    if (settings_companyState_data && settings_companyState_data?.content?.length > 0) {
      companyDetailsFormik.setFieldValue("state", settings_companyState_data?.content[0]?.stateName || "")
    }
    if (settings_companyCountry_data && settings_companyCountry_data?.content?.length > 0) {
      companyDetailsFormik.setFieldValue("country", settings_companyCountry_data?.content[0]?.countryName || "")
    }
  }, [settings_companyState_data, settings_companyCountry_data]);

  return (
    <>
      <Card id="comapanyDetails" className="mb-4">
        <CardBody>
          <div>
            <h5>Company Details</h5>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-md-4 mb-4">
              <label className="form-label">Image</label>
              <FileUpload
                iconName="img"
                name="image"
                onUpload={onUploadChange}
                src={tenant_info ? tenant_info?.logo || "": companyDetailsFormik?.values?.image || ""}
                className="form-control"
              />
            </div>

            <div className="col-12 col-md-8 mb-4">
              <label className="form-label">Company Name<span className='required_star'>*</span></label>
              <Input
                type="text"
                name="companyName"
                value={companyDetailsFormik?.values?.companyName}
                onChange={companyDetailsFormik.handleChange}
                className="form-control"
                placeholder=""
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-4">
              <label className="form-label">Contact Number<span className='required_star'>*</span></label>
              <Input
                type="text"
                name="contactNumber"
                value={companyDetailsFormik?.values?.contactNumber || ""}
                onChange={companyDetailsFormik.handleChange}
                className="form-control"
                placeholder=""
              />
            </div>

            <div className="col-12 col-md-6 mb-4">
              <label className="form-label">Email id<span className='required_star'>*</span></label>
              <Input
                type="text"
                name="email"
                value={companyDetailsFormik?.values?.email || ""}
                onChange={companyDetailsFormik.handleChange}
                onBlur={companyDetailsFormik.handleBlur}
                className="form-control"
                invalid={
                  companyDetailsFormik.touched.email &&
                    companyDetailsFormik.errors.email
                    ? true
                    : false
                }
                placeholder=""
              />
              {companyDetailsFormik.touched.email &&
                companyDetailsFormik.errors.email ? (
                <FormFeedback type="invalid">
                  {companyDetailsFormik.errors.email}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-4">
              <label className="form-label">Company Address</label>
              <Input
                type="text"
                name="companyAddress"
                value={companyDetailsFormik?.values?.companyAddress || ""}
                onChange={companyDetailsFormik.handleChange}
                className="form-control"
                placeholder=""
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-4">
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
                  const cityData = settings_companyCity_data?.content?.find((city) => city.cityName === e.target.value);
                  if (cityData) {
                    dispatch(getCompanyStateData({ cityId: cityData.id }));
                    dispatch(getCompanyCountryData({ cityId: cityData.id }));
                    dispatch(getCompanyPincodeData({ cityId: cityData.id }));
                  }
                }}
                className="form-control"
                placeholder=""
              />
              <datalist id="cityList">
                {settings_companyCity_data &&
                  settings_companyCity_data?.content?.map((item, i) => (
                    <option key={i} value={item.cityName} />
                  ))}
              </datalist>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <label className="form-label">State</label>
              <Input
                type="text"
                name="state"
                list="stateList"
                value={companyDetailsFormik?.values?.state || ''}
                onChange={companyDetailsFormik.handleChange}
                className="form-control"
                placeholder=""
              />
              <datalist id="stateList">
                {state_list &&
                  state_list.map((item, i) => <option key={i} value={item} />)}
              </datalist>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-4">
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
                {settings_companyPincode_data &&
                  settings_companyPincode_data?.content?.map((item, i) => (
                    <option key={i} value={item.pin} />
                  ))}
              </datalist>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <label className="form-label">Country<span className='required_star'>*</span></label>
              <Input
                type="text"
                name="country"
                list="countryList"
                value={companyDetailsFormik?.values?.country || ""}
                onChange={companyDetailsFormik.handleChange}
                className="form-control"
                placeholder=""
              />
              <datalist id="countryList">
                {country_list &&
                  country_list.map((item, i) => (
                    <option key={i} value={item} />
                  ))}
              </datalist>
            </div>
          </div>

          <div className="row">
            <div className="d-flex justify-content-center">
              <div className="mb-3 mx-3 d-flex justify-content-end">
                <button
                  onClick={companyDetailsFormik.handleSubmit}
                  type="submit"
                  className=" btn btn-primary"
                  disabled={isAnyValueEmpty(companyDetailsFormik?.values, ["image","companyAddress","state","zipcode","country"])}
                >
                  Save
                </button>
              </div>
              <div className="mb-3 mx-3 d-flex justify-content-end">
                <button
                  onClick={() => companyDetailsFormik.resetForm()}
                  className=" btn btn-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CompanyDetailsForm;
