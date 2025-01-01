import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";
import { addSurchargeSettingsBreadcrumb } from "../../../common/data/parties";
import { isAnyValueEmpty } from "../../../components/Common/CommonLogic";
import { GET_SURCHARGE_ALICE_DATA } from "../../../store/Global/actiontype";
import {
  getAllSurchargeCategoryData
} from "../../../store/Settings/actions";
import ModalAddNewAlias from "./Modal/ModalAddNewAlias";
import ModalAddNewCategory from "./Modal/ModalAddNewCategory";
import TopBreadcrumbs from "./TopBreadcrumbs";
import { useUploadRateData } from "./hook/useUploadRateData";


export default function UploadRateData() {
  const [categoryModal, setCategoryModal] = useState(false);
  const [aliasModal, setAliasModal] = useState(false);  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { initialValue, handleSubmit } = useUploadRateData();
  
  const { surchargeCategory_data, surchargeAlice_data, surchargeAlice_descri } = useSelector((state) => state.globalReducer);

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(getAllSurchargeCategoryData());
    // dispatch(getTenantInfoData());
    dispatch({ type: GET_SURCHARGE_ALICE_DATA });
  }, []);

  const onCloseClick = () => {
    setCategoryModal(false);
    setAliasModal(false);
  };  

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="main_freight_wrapper surcharges_add_form_wrap">

            {/* breadcrumbs && rate */}
            <TopBreadcrumbs breadcrumbs={addSurchargeSettingsBreadcrumb} />

            <button
              type="button"
              className="btn border mb-3"
              onClick={() => { navigate(-1); }}
            > Back </button>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Surcharge Code<span className='required_star'>*</span></label>
                          <div className="">
                            <Input
                              type="text"
                              name="surchargeCode"
                              value={formik.values.surchargeCode}
                              onChange={formik.handleChange}
                              className="form-control"
                              id="Surcharge_Code"
                              placeholder="Enter Surcharge Code"
                              invalid={formik.touched.surchargeCode && formik.errors.surchargeCode ? true : false}
                            />
                            {/* <FormFeedback> {formik.errors.surchargeCode} </FormFeedback> */}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Surcharge Desc<span className='required_star'>*</span></label>

                          <div className="">
                            <Input
                              type="text"
                              name="surchargeDesc"
                              value={formik.values.surchargeDesc}
                              onChange={formik.handleChange}
                              className="form-control"
                              id="Surcharge_Desc"
                              placeholder="Enter Surcharge Desc"
                              invalid={formik.touched.surchargeDesc && formik.errors.surchargeDesc ? true : false}
                            />
                            {/* <FormFeedback> {formik.errors.surchargeDesc} </FormFeedback> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label"> Surcharge Category<span className='required_star'>*</span></label>
                          <div className="">
                            <Select
                              value={surchargeCategory_data && surchargeCategory_data?.find((item) => item.value === formik?.values?.surchargeCategory) || ""}
                              name="surchargeCategory"
                              options={surchargeCategory_data ? [...surchargeCategory_data, { label: "Add New", value: "Add New" }] : [{ label: "Add New", value: "Add New" }]}
                              placeholder={"Select Surcharge Category"}
                              onChange={(e) => {
                                if (e.label === 'Add New') {
                                  setCategoryModal(true);
                                }
                                formik.setFieldValue(`surchargeCategory`, e.value);
                              }}
                              classNamePrefix="select2-selection form-select"
                              invalid={formik.touched.surchargeCategory && formik.errors.surchargeCategory ? true : false}
                            />
                            {/* <FormFeedback> {formik.errors.surchargeCategory} </FormFeedback> */}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label"> Surcharge Alias Code </label>
                          <div className="">
                            <Select
                              value={surchargeAlice_data && surchargeAlice_data?.find((item) => item.value === formik?.values?.surchargeAliasCode) || ""}
                              name="surchargeAliasCode"
                              options={surchargeAlice_data ? [...surchargeAlice_data, { label: "Add New", value: "Add New" }] : [{ label: "Add New", value: "Add New" }]}
                              placeholder={"Select Surcharge Alias Code"}
                              onChange={(e) => {
                                formik.setFieldValue(`surchargeAliasCode`, e.value);
                                if (e.label === 'Add New') {
                                  setAliasModal(true);
                                }
                              }}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label"> Surcharge Alias Desc </label>
                          <div className="">
                            <Select
                              value={surchargeAlice_descri ? surchargeAlice_descri.find(obj => obj.value === formik?.values?.surchargeAliasCode) : ''}
                              name="surchargeAliasDesc"
                              options={surchargeAlice_descri || []}
                              placeholder={"Select Surcharge Alias Code"}
                              onChange={(e) => {
                                formik.setFieldValue(`surchargeAliasDesc`, e.value);
                              }}
                              isDisabled={true}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button
                            type="submit"
                            className=" btn btn-primary"
                            onClick={formik.handleSubmit}
                            disabled={isAnyValueEmpty(formik.values, ['surchargeAliasDesc', 'surchargeAliasCode'])}
                          >
                            Save
                          </button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={() => formik.resetForm()}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <ModalAddNewCategory
              modal={categoryModal}
              onCloseClick={onCloseClick}
            />
            <ModalAddNewAlias modal={aliasModal} onCloseClick={onCloseClick} />
          </div>
        </Container>
      </div>
    </>
  );
}
