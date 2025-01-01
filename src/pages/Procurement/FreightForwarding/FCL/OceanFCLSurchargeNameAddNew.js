import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";
import { isAnyValueEmpty } from "../../../../components/Common/CommonLogic";
import { postSurchargeCodeAction } from "../../../../store/Global/actions";
import { GET_SURCHARGE_ALICE_DATA } from "../../../../store/Global/actiontype";
import ModalFCLAddNewAlias from "../Modal/ModalFCLAddNewAlias";

export default function OceanFCLSurchargeNameAddNew() {
  const [aliasModal, setAliasModal] = useState(false);
  const { surchargeCategory_data, surchargeAlice_data, surchargeAlice_descri } = useSelector((state) => state.globalReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [surchargeCateData, setSurchargeCateData] = useState([]);  
  const navigateState = useLocation();  

  useEffect(() => {
    let newData= []
    if(navigateState?.state?.id === "inland" || navigateState?.pathname?.includes('inland')) {      
      newData = surchargeCategory_data?.filter((item) => {
        return item.value === "DESTINATION TRANSPORTATION" || item.value === "ORIGIN TRANSPORTATION"
      }) || []
    } else if(navigateState?.state?.id === "fcl-pl" || navigateState?.pathname?.includes('fcl-pl')){
      newData = surchargeCategory_data?.filter((option) => (option?.value !== "DESTINATION TRANSPORTATION" && option?.value !== "ORIGIN TRANSPORTATION" && option?.value !== "OCEAN SURCHARGE")) || []
    } else {
      newData = surchargeCategory_data?.filter((item) => item.value === "OCEAN SURCHARGE") || []
    }
    console.log(newData,"newData")
    setSurchargeCateData(newData);
  }, [surchargeCategory_data]);

  const onCloseClick = () => {
    setAliasModal(false);
  };

  // const handleSelectGroup = useCallback(
  //   (name, opt) => {
  //     // console.log(opt, "opt");
  //     if (name === "surchargeCategory" && opt.value === "Add New") {
  //       setCategoryModal(true);
  //     } else if (name === "surchargeAliasCode" && opt.value === "Add New") {
  //       setAliasModal(true);
  //     }
  //     setAddDetails((prev) => ({ ...prev, [name]: opt }));
  //   },
  //   [addDetails]
  // );

  const surchargeFormik = useFormik({
    initialValues: {
      surchargeCode: "",
      surchargeDesc: "",
      surchargeCategory: "",
      surchargeAliasCode: "",
      surchargeAliasDesc: "",
    },
    onSubmit: (values) => {
      console.log(values, "values");
      let data = {
        code: values?.surchargeCode || '',
        description: values?.surchargeDesc || '',
        surchargeCategory: {
          version: values?.surchargeCategory?.version || 0,
          id: values?.surchargeCategory?.id || '',
        },
        ...(values?.surchargeAliasCode && {surchargeAlias: {
          version: values?.surchargeAliasCode?.version || 0,
          id: values?.surchargeAliasCode?.id || '',
        }})
      }

      console.log(JSON.stringify(data), "data");
      dispatch(postSurchargeCodeAction(data));
      surchargeFormik.resetForm();      
    },
  })

  useEffect(() => {
    dispatch({ type: GET_SURCHARGE_ALICE_DATA });
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="main_freight_wrapper surcharges_add_form_wrap">
            <button type="button" className="btn border mb-3" onClick={() => { navigate(-1); }} > Back </button>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Surcharge Code</label>
                          <div className="">
                            <Input
                              type="text"
                              name="surchargeCode"
                              value={surchargeFormik?.values?.surchargeCode || ""}
                              onChange={(e) => {
                                surchargeFormik.setFieldValue("surchargeCode", e.target.value);
                              }}
                              className="form-control"
                              id="Surcharge_Code"
                              placeholder="Enter Surcharge Code"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Surcharge Desc</label>

                          <div className="">
                            <Input
                              type="text"
                              name="surchargeDesc"
                              value={surchargeFormik?.values?.surchargeDesc || ""}
                              onChange={(e) => {
                                surchargeFormik.setFieldValue("surchargeDesc", e.target.value);
                              }}
                              className="form-control"
                              id="Surcharge_Desc"
                              placeholder="Enter Surcharge Desc"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Category
                          </label>
                          <div className="">
                            <Select
                              value={surchargeFormik?.values?.surchargeCategory || ""}
                              name="surchargeCategory"
                              onChange={(opt) => {
                                surchargeFormik.setFieldValue("surchargeCategory", opt);
                              }}
                              options={surchargeCateData}
                              placeholder={"Select Surcharge Category"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Alias Code
                          </label>
                          <div className="">
                            <Select
                              value={surchargeFormik?.values?.surchargeAliasCode}
                              name="surchargeAliasCode"
                              onChange={(opt) => {
                                surchargeFormik.setFieldValue("surchargeAliasCode", opt);
                              }}
                              options={surchargeAlice_data}
                              placeholder={"Select Surcharge Alias Code"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Alias Desc
                          </label>
                          <div className="">
                            <Select
                              value={surchargeAlice_descri ? surchargeAlice_descri.find(obj => obj.value === surchargeFormik?.values?.surchargeAliasCode?.value) : ''}
                              name="surchargeAliasDesc"
                              onChange={(opt) => {
                                surchargeFormik.setFieldValue("surchargeAliasDesc", opt);
                              }}
                              options={surchargeAlice_descri}
                              classNamePrefix="select2-selection form-select"
                              isDisabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={() => surchargeFormik.handleSubmit()} disabled={isAnyValueEmpty(surchargeFormik.values, ['surchargeAliasDesc', 'surchargeAliasCode'])}>Save</button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={() => surchargeFormik.resetForm()}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* <ModalAddNewCategory
              modal={categoryModal}
              onCloseClick={onCloseClick}
            /> */}
            <ModalFCLAddNewAlias modal={aliasModal} onCloseClick={onCloseClick} />
          </div>
        </Container>
      </div>
    </>
  );
}
