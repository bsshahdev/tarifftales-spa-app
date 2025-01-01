import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, FormFeedback, Input, Row } from "reactstrap";

import { optionCalculationType, optionMovementType } from "../../../../common/data/procurement";
import { isAnyValueEmpty, isAnyValueEmptyInArray } from "../../../../components/Common/CommonLogic";
import { GET_CARGO_TYPE_DATA, GET_CONTAINER_DATA, GET_UOM_DATA } from "../../../../store/Global/actiontype";
import { postPortLocalChargesData } from "../../../../store/Procurement/actions";
import ModalAddTerm from "../Modal/ModalAddTerm";
import * as Yup from "yup";
import { components } from "react-select";


const initialValue = {
  chargeCategory: { lable: "ALL", value: "ALL" },
  portName: "",
  terminalName: "",
  movementType: "",
  carrierName: "",
  vendorName: "",
  validityFrom: "",
  validityTo: "",

  mainBox: [
    {
      chargeCode: "",
      chargeBasis: "",
      calculationType: "FLAT",
      // slabBasis: "",
      currency: "",
      minValue: "",
      tax: "",
      addTerms: {},
      subBox: [
        {
          cargoType: '',
          containerType: "",
          fromSlab: "",
          toSlab: "",
          rate: "",
        },
      ],
    },
  ],
};

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        style={{ marginRight: 10 }}
      />
      {props.data.label}
    </components.Option>
  );
};

const UploadPortLocalChargesData = () => {
  const {
    surchargeCategory_data, oceanPort_data, vendor_data, surchargeCode_data, UOM_data, currency_data, cargoType_data, container_data, oceanPort_terminal
  } = useSelector(state => state?.globalReducer);

  const { fcl_port_local_data } = useSelector(state => state?.procurement)
  const [optionVendorName, setOptionVendorName] = useState([]);
  const [optionCarrierName, setOptionCarrierName] = useState([]);
  const [addTermsModal, setAddTermsModal] = useState({ isOpen: false, id: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let generalContainerOpt = container_data?.filter((item) => item.value !== "20RF" && item.value !== "40RF");
  let refrigeContainerOpt = container_data?.filter((item) => item.value === "20RF" || item.value === "40RF");
  useEffect(() => {
    let vendorlist = vendor_data?.content?.map((item) => {
      return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType, transportMode: item?.transportMode }
    });
    let carrierList = vendorlist?.filter((item) => item?.type === "CARRIER" && item?.transportMode == 'OCEAN');
    let vendorNewList = vendorlist?.filter((item) => item?.type !== "CARRIER" && item?.transportMode == 'OCEAN');
    setOptionVendorName(vendorNewList);
    setOptionCarrierName(carrierList);
  }, []);

  const onCloseClick = () => {
    setAddTermsModal((prev) => ({ ...prev, isOpen: false, id: "" }));
  };

  const setTermHandler = (obj) => {
    formik.setFieldValue(`mainBox[${addTermsModal.id}].addTerms`, obj);
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      mainBox: Yup.array().of(
        Yup.object().shape({
          chargeCode: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
            if (typeof value === 'string') {
              return true;
            } else if (typeof value === 'object' && value !== null) {
              return true;
            } else {
              return false;
            }
          }).required("Please select charge code"),
          chargeBasis: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
            if (typeof value === 'string') {
              return true;
            } else if (typeof value === 'object' && value !== null) {
              return true;
            } else {
              return false;
            }
          }).required('Please select charge basis'),
          currency: Yup.mixed().test('is-object-or-string', 'Please select charge code', function (value) {
            if (typeof value === 'string') {
              return true;
            } else if (typeof value === 'object' && value !== null) {
              return true;
            } else {
              return false;
            }
          }).required("Please select currency"),
          subBox: Yup.array().of(
            Yup.object({
              containerType: Yup.mixed().test('is-object-or-string', 'Please select continer type', function (value) {
                if (typeof value === 'string') {
                  return true;
                } else if (typeof value === 'object' && value !== null) {
                  return true;
                } else {
                  return false;
                }
              }).required("Please continer type"),
              cargoType: Yup.mixed().test('is-object-or-string', 'Please select cargo type', function (value) {
                if (typeof value === 'string') {
                  return true;
                } else if (typeof value === 'object' && value !== null) {
                  return true;
                } else {
                  return false;
                }
              }).required("Please select cargo type"),
              rate: Yup.string().required("Please enter rate")
            })
          )
        })
      )
    }),

    onSubmit: (value) => {
      console.log(value);

      let surchargeValuesArray = value?.mainBox?.map((item) => {
        let newData = item?.subBox?.map((subItem, subIndex) => {
          let corgoTypeData = subItem?.cargoType?.map(cargoType => {
            const mapContainerData = (containerOption) => containerOption?.map((sub, index) => {
              return {
                ...(fcl_port_local_data && fcl_port_local_data.id && {
                  id: subItem?.id || "",
                  version: subItem?.version || 0
                }),
                ...(cargoType && {
                  "cargoType": {
                    "id": cargoType?.id || '',
                    "version": cargoType?.version || 0
                  }
                }),
                ...(subItem?.containerType && {
                  "oceanContainer": {
                    "id": sub?.oceanContainer.id || '',
                    "version": sub?.oceanContainer.version || 0
                  }
                }),
                ...(item?.currency && {
                  "currency": {
                    "id": item?.currency?.id || '',
                    "version": item?.currency?.version || 0
                  }
                }),
                ...(subItem?.fromSlab && { "fromSlab": subItem?.fromSlab || 0 }),
                ...(subItem?.toSlab && { "toSlab": subItem?.toSlab || 0 }),
                ...(subItem?.rate && { "value": subItem?.rate || 0 })
              }
            })
            const commonMappings = cargoType?.cargoContainerMappings.filter(data =>
              subItem.containerType.some(newData =>
                String(newData.id) === String(data.oceanContainer.id)
              )
            );
            return mapContainerData(commonMappings);
          })
          return corgoTypeData;
        });
        return newData;
      });

      let spreadSurArray = surchargeValuesArray?.map((item) => {
        return item.flat(Infinity)
      });

      let data = {
        // ...(fcl_port_local_data && fcl_port_local_data.id && {
        //   id: fcl_port_local_data?.id || "",
        //   version: fcl_port_local_data?.version || 0
        // }),
        // ...(value?.chargeCategory && {
        //   "surchargeCategory": {
        //     "id": value?.chargeCategory?.id || 0,
        //     "version": value?.chargeCategory?.version || 0
        //   }
        // }),
        ...(value?.portName && {
          "oceanPort": {
            "id": value?.portName?.id || 0,
            "version": value?.portName?.version || 0
          }
        }),
        ...(value?.terminalName && {
          "oceanPortTerminal": {
            "id": value?.terminalName?.id,
            "version": value?.terminalName?.version || 0,
          },
        }),
        ...(value?.movementType && { "movementType": value?.movementType.value || value?.movementType || "IMPORT" }),
        ...(value?.carrierName && {
          "tenantCarrier": {
            "id": value?.carrierName?.id || '',
            "version": value?.carrierName?.version || 0
          },
        }),
        ...(value?.vendorName && {
          "tenantVendor": {
            "id": value?.vendorName?.id || '',
            "version": value?.vendorName?.version || 0
          },
        }),
        ...(value?.validityFrom && { "validFrom": value?.validityFrom || 0 }),
        ...(value?.validityTo && { "validTo": value?.validityTo || 0 }),
        // "tenantVendorFCLSurchargeCategoryTerminals": [],
        "tenantVendorFCLSurchargeDetails": value?.mainBox?.map((item, mainindex) => {
          return {
            ...(fcl_port_local_data && fcl_port_local_data.id && {
              id: item?.id || "",
              version: item?.version || 0
            }),
            ...(item?.chargeCode && {
              "surchargeCode": {
                "id": item?.chargeCode?.id || '',
                "version": item?.chargeCode?.version || 0
              }
            }),
            ...(item?.chargeBasis && {
              "unitOfMeasurement": {
                "id": item?.chargeBasis?.id || '',
                "version": item?.chargeBasis?.version || 0
              }
            }),
            ...(item?.addTerms?.paymentTerm && { "paymentTerm": item?.addTerms?.paymentTerm || "PREPAID" }),
            "standard": item?.addTerms?.isStandard === 'incidental' ? false : true,
            ...(item?.calculationType && { "calculationType": item?.calculationType || "FLAT" }),
            ...(item?.minValue && { "minimumValue": item?.minValue || 0 }),
            ...(item?.tax && { "applicableTax": item?.tax || 0 }),

            "tenantVendorFCLSurchargeValues": spreadSurArray?.[mainindex],

            "tenantVendorFCLSurchargeDetailIncoterms": (item?.addTerms?.incoTerm && item?.addTerms?.incoTerm?.length > 0 &&
              item.addTerms.incoTerm.map((incoterm, index) => ({
                incoterm: {
                  id: incoterm?.value,
                  version: incoterm?.version
                }
              }))
            ) || [],

            "tenantVendorFCLSurchargeDetailCommodities": (item?.addTerms?.commodity && item?.addTerms?.commodity?.length > 0 &&
              item.addTerms.commodity.map((commodity, index) => ({
                commodity: {
                  id: commodity?.id || (index + 1),
                  version: commodity?.version || 0
                }
              }))
            ) || []
          }
        })
      }
      data.tenantVendorFCLSurchargeCategoryTerminals = fcl_port_local_data.tenantVendorFCLSurchargeCategoryTerminals || [];
      dispatch(postPortLocalChargesData(data));
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [fcl_port_local_data])

  useEffect(() => {
    dispatch({ type: GET_CARGO_TYPE_DATA });
    dispatch({ type: GET_CONTAINER_DATA });
    dispatch({ type: GET_UOM_DATA });
  }, [])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      chargeCategory: { lable: "ALL", value: "ALL" },
      portName: "",
      terminalName: "",
      movementType: "",
      carrierName: "",
      vendorName: "",
      validityFrom: "",
      validityTo: "",
      mainBox: [
        {
          chargeCode: "",
          chargeBasis: "",
          calculationType: "FLAT",
          currency: "",
          minValue: "",
          tax: "",
          addTerms: {},
          subBox: [
            {
              cargoType: '',
              containerType: '',
              fromSlab: "",
              toSlab: "",
              rate: "",
            },
          ],
        },
      ],
    });
  }, [fcl_port_local_data]);
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
                      {/* Charge Category */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Charge Category</label>
                        <Select
                          value={surchargeCategory_data ? formik.values.chargeCategory?.value != "ALL" ? surchargeCategory_data.find((option) => option.value === formik.values.chargeCategory?.name) : { label: "ALL", value: "ALL" } : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`chargeCategory`, e);
                          }}
                          name="chargeCategory"
                          options={[...surchargeCategory_data?.filter((option) => (option?.value !== "DESTINATION TRANSPORTATION" && option?.value !== "ORIGIN TRANSPORTATION" && option?.value !== "OCEAN SURCHARGE")), { label: "ALL", value: "ALL" }] || []}
                          placeholder={"Select Charge Category"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Port Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Port Name<span className='required_star'>*</span></label>
                        <Select
                          name="portName"
                          value={oceanPort_data ? oceanPort_data.find((option) => option.value === formik.values.portName?.code) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`portName`, e);
                            formik.setFieldValue(`terminalName`, "");
                          }}
                          options={oceanPort_data}
                          placeholder={"Select Port Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Terminal Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Terminal Name</label>
                        <Select
                          name="terminalName"
                          value={oceanPort_terminal ? oceanPort_terminal.find((option) => option.value === formik.values.terminalName) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`terminalName`, e);
                          }}
                          options={oceanPort_terminal.filter(data => data.oceanPort.id == formik.values.portName?.id)}
                          placeholder={"Select Terminal Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Movement Type */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Movement Type<span className='required_star'>*</span></label>
                        <Select
                          name="movementType"
                          value={optionMovementType ? optionMovementType.find((option) => option.value === formik.values.movementType) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`movementType`, e);
                          }}
                          options={optionMovementType}
                          placeholder={"Select Movement Type"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Carrier Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Carrier Name<span className='required_star'>*</span></label>
                        <Select
                          name="carrierName"
                          value={optionCarrierName ? optionCarrierName.find((option) => option.value === formik.values.carrierName?.name) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`carrierName`, e);
                          }}
                          options={optionCarrierName}
                          placeholder={"Select Carrier Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Vendor Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Vendor Name</label>
                        <Select
                          name="vendorName"
                          value={optionVendorName ? optionVendorName.find((option) => option.value === formik.values.vendorName?.name) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`vendorName`, e);
                          }}
                          options={optionVendorName}
                          placeholder={"Select Vendor Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Validity From */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Validity From<span className='required_star'>*</span></label>
                        <input
                          type="date"
                          name="validityFrom"
                          id="validity_from"
                          value={formik.values.validityFrom}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>

                      {/* Validity To */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Validity To<span className='required_star'>*</span></label>
                        <input
                          type="date"
                          name="validityTo"
                          id="validity_to"
                          value={formik.values.validityTo}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <hr />
                    <div className="p-3"></div>

                    {/* Field Array started------------------------------------------------- */}
                    <FormikProvider value={formik}>
                      <FieldArray name="mainBox">
                        {(arrayHelpers, i) => {
                          return (
                            <React.Fragment key={i}>
                              {formik.values.mainBox && formik.values.mainBox.length > 0 &&
                                formik.values.mainBox.map((item, index) => (
                                  <Card key={index} className={`sub_field_wrap `}>
                                    <CardBody>
                                      <div className="row mb-3" key={index}>
                                        {/* Charge Code */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Surcharge Code<span className='required_star'>*</span></label>
                                            <Select
                                              name={`mainBox[${index}].chargeCode`}
                                              value={surchargeCode_data ? surchargeCode_data.find((option) => option.value === formik.values.mainBox[index].chargeCode?.code) : ""}
                                              onChange={(e) => {
                                                if (e.label == "Add New") {
                                                  navigate("/freight/ocean/upload/fcl-pl/add-new", { state: { id: 'fcl-pl' } })
                                                }
                                                formik.setFieldValue(`mainBox[${index}].chargeCode`, e);
                                              }}
                                              options={(formik.values.chargeCategory?.value != "ALL") ? [...surchargeCode_data.filter(data => data?.surchargeCategory == formik.values.chargeCategory?.value) || [], { label: "Add New", value: "Add New" }] : [...surchargeCode_data, { label: "Add New", value: "Add New" }]}
                                              classNamePrefix="select2-selection form-select"
                                              onBlur={formik.handleBlur}
                                              invalid={
                                                formik.touched.mainBox &&
                                                  formik.touched.mainBox[index] &&
                                                  formik.errors.mainBox &&
                                                  formik.errors.mainBox[index] &&
                                                  formik.errors.mainBox[index].chargeCode
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {formik.touched.mainBox &&
                                              formik.touched.mainBox[index] &&
                                              formik.errors.mainBox &&
                                              formik.errors.mainBox[index] &&
                                              formik.errors.mainBox[index].chargeCode ? (
                                              <FormFeedback>{formik.errors.mainBox[index].chargeCode}</FormFeedback>
                                            ) : null}
                                          </div>
                                        </div>

                                        {/* Charge Basis */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Surcharge Basis<span className='required_star'>*</span></label>
                                            <Select
                                              name={`mainBox[${index}].chargeBasis`}
                                              value={UOM_data ? UOM_data.find((option) => option.value === formik.values.mainBox[index].chargeBasis?.code) : ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].chargeBasis`, e);
                                              }}
                                              options={UOM_data?.filter(data => data?.transportMode == "OCEAN") || []}
                                              classNamePrefix="select2-selection form-select"
                                              onBlur={formik.handleBlur}
                                              invalid={
                                                formik.touched.mainBox &&
                                                  formik.touched.mainBox[index] &&
                                                  formik.errors.mainBox &&
                                                  formik.errors.mainBox[index] &&
                                                  formik.errors.mainBox[index].chargeBasis
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {formik.touched.mainBox &&
                                              formik.touched.mainBox[index] &&
                                              formik.errors.mainBox &&
                                              formik.errors.mainBox[index] &&
                                              formik.errors.mainBox[index].chargeBasis ? (
                                              <FormFeedback>{formik.errors.mainBox[index].chargeBasis}</FormFeedback>
                                            ) : null}
                                          </div>
                                        </div>

                                        {/* Calculation Type */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Calculation Type<span className='required_star'>*</span></label>
                                            <Select
                                              name={`mainBox[${index}].calculationType`}
                                              value={optionCalculationType ? optionCalculationType.find((option) => option.value === formik.values.mainBox[index].calculationType) : ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].calculationType`, e.value);
                                              }}
                                              options={optionCalculationType}
                                              classNamePrefix="select2-selection form-select"
                                            />
                                          </div>
                                        </div>

                                        {/* Slab Basis */}
                                        {/* {formik.values.mainBox[index]
                                          .calculationType === "Slab" && (
                                            <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                              <div className="mb-3">
                                                <label className="form-label">
                                                  Slab Basis
                                                </label>
                                                <Select
                                                  name={`mainBox[${index}].slabBasis`}
                                                  value={slabBasis ? slabBasis.find((option) => option.value === formik.values.mainBox[index].slabBasis) : ""}
                                                  onChange={(e) => {
                                                    formik.setFieldValue(`mainBox[${index}].slabBasis`, e.value);
                                                  }}
                                                  options={slabBasis}
                                                  classNamePrefix="select2-selection form-select"
                                                />
                                              </div>
                                            </div>
                                          )} */}

                                        {/* Currency */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Currency<span className='required_star'>*</span></label>
                                            <Select
                                              name={`mainBox[${index}].currency`}
                                              value={currency_data ? currency_data.find((option) => option.currencyCode === formik.values.mainBox[index].currency?.currencyCode) : ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].currency`, e);
                                              }}
                                              options={currency_data}
                                              classNamePrefix="select2-selection form-select"
                                              onBlur={formik.handleBlur}
                                              invalid={
                                                formik.touched.mainBox &&
                                                  formik.touched.mainBox[index] &&
                                                  formik.errors.mainBox &&
                                                  formik.errors.mainBox[index] &&
                                                  formik.errors.mainBox[index].currency
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {formik.touched.mainBox &&
                                              formik.touched.mainBox[index] &&
                                              formik.errors.mainBox &&
                                              formik.errors.mainBox[index] &&
                                              formik.errors.mainBox[index].currency ? (
                                              <FormFeedback>{formik.errors.mainBox[index].currency}</FormFeedback>
                                            ) : null}
                                          </div>
                                        </div>

                                        {/* Min Value */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Min Value </label>
                                            <Input
                                              type="text"
                                              name={`mainBox[${index}].minValue`}
                                              placeholder="Enter minvalue"
                                              value={formik.values.mainBox[index].minValue}
                                              onChange={formik.handleChange}
                                            />
                                          </div>
                                        </div>

                                        {/* Tax Value */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Tax </label>
                                            <Input
                                              type="text"
                                              name={`mainBox[${index}].tax`}
                                              placeholder="Enter tax"
                                              value={formik.values.mainBox[index].tax}
                                              onChange={formik.handleChange}
                                            />
                                          </div>
                                        </div>

                                        {/* checkbox */}
                                        <div className="col-lg-12 d-flex align-items-center justify-content-between">
                                          <div className="form-check">
                                            <span
                                              className="fw-bold text-decoration-underline text-primary"
                                              onClick={(e) => {
                                                setAddTermsModal({
                                                  isOpen: true,
                                                  id: index,
                                                  addTerms: formik.values.mainBox[index].addTerms
                                                });
                                              }}
                                            >
                                              Add Terms
                                            </span>
                                          </div>
                                          <div>
                                            {formik.values.mainBox.length >
                                              1 && (
                                                <button
                                                  className="btn m-1 border"
                                                  onClick={() => { arrayHelpers.remove(index); }}
                                                >
                                                  <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                </button>
                                              )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* SUB Field Array started------------------------------------------------- */}
                                      {!(formik.values.mainBox[index].calculationType === "") && (
                                        <FieldArray name={`mainBox[${index}].subBox`} >
                                          {(arrayHelpersTwo, i) => {
                                            return (
                                              <Card key={i}>
                                                <CardBody>
                                                  {item.subBox && item.subBox.length > 0 && item.subBox.map((subItem, subIndex) => {
                                                    return (
                                                      <React.Fragment key={subIndex}>
                                                        {formik.values.mainBox[index].calculationType && (
                                                          <div className="field_wrap multiselect row mb-3">
                                                            {/* Cargo Type */}
                                                            {(formik.values.mainBox[index].calculationType === "FLAT" || formik.values.mainBox[index].calculationType === "PERCENTAGE") && (
                                                              <div className="col-md-4 mb-2">
                                                                <label className="form-label"> Cargo Type<span className='required_star'>*</span></label>
                                                                <Select
                                                                  isMulti
                                                                  value={formik.values.mainBox[index].subBox[subIndex].cargoType || []}
                                                                  name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                                                  onChange={(e) => {
                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].cargoType`, e);
                                                                  }}
                                                                  hideSelectedOptions={false}
                                                                  components={{ Option: CustomOption }}
                                                                  options={cargoType_data.filter(data => data.transportMode === "OCEAN")}
                                                                  closeMenuOnSelect={false}
                                                                  classNamePrefix="select2-selection form-select"
                                                                  menuPlacement="auto"
                                                                  onBlur={formik.handleBlur}
                                                                  invalid={
                                                                    formik.touched.mainBox &&
                                                                      formik.touched.mainBox[index] &&
                                                                      formik.errors.mainBox &&
                                                                      formik.errors.mainBox[index] &&
                                                                      formik.errors.mainBox[index].subBox &&
                                                                      formik.errors.mainBox[index].subBox[subIndex] &&
                                                                      formik.errors.mainBox[index].subBox[subIndex].cargoType
                                                                      ? true
                                                                      : false
                                                                  }
                                                                />
                                                                {formik.touched.mainBox &&
                                                                  formik.touched.mainBox[index] &&
                                                                  formik.errors.mainBox &&
                                                                  formik.errors.mainBox[index] &&
                                                                  formik.errors.mainBox[index].subBox &&
                                                                  formik.errors.mainBox[index].subBox[subIndex] &&
                                                                  formik.errors.mainBox[index].subBox[subIndex].cargoType ? (
                                                                  <FormFeedback>{formik.errors.mainBox[index].subBox[subIndex].cargoType}</FormFeedback>
                                                                ) : null}
                                                              </div>
                                                            )}
                                                            {/* Container Type */}
                                                            <div className="col-md-4 mb-2">
                                                              <label className="form-label"> Container Type<span className='required_star'>*</span></label>
                                                              <Select
                                                                isMulti
                                                                name={`mainBox[${index}].subBox[${subIndex}].containerType`}
                                                                value={container_data ? container_data.find((option) => option.value === formik.values.mainBox[index].subBox[subIndex].containerType.name) : ""}
                                                                onChange={(e) => {
                                                                  formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].containerType`, e);
                                                                }}
                                                                hideSelectedOptions={false}
                                                                components={{ Option: CustomOption }}
                                                                options={formik.values.mainBox[index].chargeBasis?.value =='PER_TEU' ? container_data.filter(data => data?.value == "20GP") : container_data}
                                                                classNamePrefix="select2-selection form-select"
                                                                closeMenuOnSelect={false}
                                                                menuPlacement="auto"
                                                                onBlur={formik.handleBlur}
                                                                invalid={
                                                                  formik.touched.mainBox &&
                                                                    formik.touched.mainBox[index] &&
                                                                    formik.errors.mainBox &&
                                                                    formik.errors.mainBox[index] &&
                                                                    formik.errors.mainBox[index].subBox &&
                                                                    formik.errors.mainBox[index].subBox[subIndex] &&
                                                                    formik.errors.mainBox[index].subBox[subIndex].containerType
                                                                    ? true
                                                                    : false
                                                                }
                                                              />
                                                              {formik.touched.mainBox &&
                                                                formik.touched.mainBox[index] &&
                                                                formik.errors.mainBox &&
                                                                formik.errors.mainBox[index] &&
                                                                formik.errors.mainBox[index].subBox &&
                                                                formik.errors.mainBox[index].subBox[subIndex] &&
                                                                formik.errors.mainBox[index].subBox[subIndex].containerType ? (
                                                                <FormFeedback>{formik.errors.mainBox[index].subBox[subIndex].containerType}</FormFeedback>
                                                              ) : null}
                                                            </div>

                                                            {/* From Slab */}
                                                            {formik.values.mainBox[index].calculationType === "SLAB" && (
                                                              <div className="col-md-2 mb-2">
                                                                <label className="form-label"> From Slab<span className='required_star'>*</span></label>
                                                                <Input
                                                                  type="text"
                                                                  name={`mainBox[${index}].subBox[${subIndex}].fromSlab`}
                                                                  value={formik.values.mainBox[index].subBox[subIndex].fromSlab || ''}
                                                                  onChange={
                                                                    formik.handleChange
                                                                  }
                                                                />
                                                              </div>
                                                            )}

                                                            {/* To Slab */}
                                                            {formik.values.mainBox[index].calculationType === "SLAB" && (
                                                              <div className="col-md-2 mb-2">
                                                                <label className="form-label"> To Slab<span className='required_star'>*</span></label>
                                                                <Input
                                                                  type="text"
                                                                  name={`mainBox[${index}].subBox[${subIndex}].toSlab`}
                                                                  value={formik.values.mainBox[index].subBox[subIndex].toSlab || ''}
                                                                  onChange={
                                                                    formik.handleChange
                                                                  }
                                                                />
                                                              </div>
                                                            )}

                                                            {/* Rate */}
                                                            <div className="col-md-2 mb-2">
                                                              <label className="form-label"> Rate<span className='required_star'>*</span></label>
                                                              <Input
                                                                type="text"
                                                                name={`mainBox[${index}].subBox[${subIndex}].rate`}
                                                                value={formik.values.mainBox[index].subBox[subIndex].rate || ''}
                                                                onChange={
                                                                  formik.handleChange
                                                                }
                                                                onBlur={formik.handleBlur}
                                                                invalid={
                                                                  formik.touched.mainBox &&
                                                                    formik.touched.mainBox[index] &&
                                                                    formik.errors.mainBox &&
                                                                    formik.errors.mainBox[index] &&
                                                                    formik.errors.mainBox[index].subBox &&
                                                                    formik.errors.mainBox[index].subBox[subIndex] &&
                                                                    formik.errors.mainBox[index].subBox[subIndex].rate
                                                                    ? true
                                                                    : false
                                                                }
                                                              />
                                                              {formik.touched.mainBox &&
                                                                formik.touched.mainBox[index] &&
                                                                formik.errors.mainBox &&
                                                                formik.errors.mainBox[index] &&
                                                                formik.errors.mainBox[index].subBox &&
                                                                formik.errors.mainBox[index].subBox[subIndex] &&
                                                                formik.errors.mainBox[index].subBox[subIndex].rate ? (
                                                                <FormFeedback>{formik.errors.mainBox[index].subBox[subIndex].rate}</FormFeedback>
                                                              ) : null}
                                                            </div>

                                                            {/* Add remove  */}
                                                            <div className="col-md-1 mt-2 d-flex justify-content-end align-items-center">
                                                              <div>
                                                                {formik.values.mainBox[index].subBox.length > 1 && (
                                                                  <button
                                                                    className="btn border"
                                                                    onClick={() => {
                                                                      arrayHelpersTwo.remove(subIndex);
                                                                    }}
                                                                  >
                                                                    <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                                  </button>
                                                                )}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}
                                                      </React.Fragment>
                                                    );
                                                  }
                                                  )}

                                                  <div>
                                                    <button
                                                      className="btn btn-primary me-2"
                                                      onClick={() => {
                                                        arrayHelpersTwo.push(
                                                          {
                                                            cargoType: "",
                                                            containerType:
                                                              "",
                                                            fromSlab: "",
                                                            toSlab: "",
                                                            rate: "",
                                                          }
                                                        );
                                                      }}
                                                    >
                                                      <i className="bx bx-plus"></i>
                                                    </button>
                                                  </div>
                                                </CardBody>
                                              </Card>
                                            );
                                          }}
                                        </FieldArray>
                                      )}
                                      {/* SUB Field Array ended------------------------------------------------- */}
                                    </CardBody>
                                  </Card>
                                )
                                )}
                              {/* add button of main box  */}
                              <div>
                                <button
                                  className="btn btn-primary m-1"
                                  onClick={() => {
                                    arrayHelpers.push({
                                      chargeCode: "",
                                      chargeBasis: "",
                                      calculationType: "FLAT",
                                      slabBasis: "",
                                      currency: "",
                                      minValue: "",
                                      tax: "",
                                      addTerms: false,
                                      subBox: [
                                        {
                                          cargoType: "",
                                          containerType: "",
                                          fromSlab: "",
                                          toSlab: "",
                                          rate: null,
                                        },
                                      ],
                                    });
                                  }}
                                  disabled={isAnyValueEmpty(formik.values, ['chargeCategory', 'terminalName', 'vendorName'])}
                                >
                                  <i className="bx bx-plus align-middle me-1"></i> Add
                                </button>
                              </div>
                            </React.Fragment>
                          );
                        }}
                      </FieldArray>
                    </FormikProvider>

                    <ModalAddTerm
                      modal={addTermsModal}
                      onCloseClick={onCloseClick}
                      setTermHandler={setTermHandler}
                    />
                    {/* {console.log(isAnyValueEmptyInArray(formik.values.mainBox, ['addTerms', 'minValue', 'subBox']), "port")}
                    {console.log(isAnyValueEmptyInArray(formik.values.mainBox[0].subBox, ['fromSlab','toSlab']), "port")}                */}
                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mt-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={isAnyValueEmpty(formik.values, ['chargeCategory', 'terminalName', 'vendorName'])}> Save </button>
                          {/* <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={!(!isAnyValueEmpty(formik.values.mainBox, ['minValue','addTerms']) && !isAnyValueEmptyInArray(formik.values.mainBox[0].subBox))}> Save </button> */}
                        </div>
                        <div className="mt-3 mx-3 d-flex justify-content-end">
                          <button
                            className=" btn btn-primary"
                            onClick={() => { navigate(-1); }}
                          >
                            Cancel
                          </button>
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

export default UploadPortLocalChargesData;
