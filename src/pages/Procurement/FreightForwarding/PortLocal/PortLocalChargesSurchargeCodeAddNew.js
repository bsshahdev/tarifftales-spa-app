import React, { useCallback, useState } from "react";
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
// import ModalAddNewAlias from "./Modal/ModalAddNewAlias";
// import ModalAddNewCategory from "./Modal/ModalAddNewCategory";
import ModalPLChargesAddNewAlias from "../Modal/ModalPLChargesAddNewAlias"

const surchargeCategory = [
//   { label: "OCEAN SURCHARGE", value: "freight_surcharge" },
  { label: "PORT SURCHARGE", value: "port_surcharge" },
  { label: "LOCAL SURCHARGE", value: "local_surcharge" },
//   { label: "ORIGIN TRANSPORTATION", value: "origin_transportation" },
//   { label: "DESTINATION TRANSPORTATION", value: "destination_transportation" },
  { label: "ANCILLARY CHARGES", value: "ancillary_charges" },
  { label: "VAS CHARGES", value: "vas_charges" },
  { label: "CUSTOMS", value: "custom" },
  // { label: "Add New", value: "Add New" },
];
const surchargeAliasCode = [
  { label: "OTHC", value: "OTHC" },
  { label: "DTHC", value: "DTHC" },
  { label: "FSC", value: "FSC" },
  { label: "OBS", value: "OBS" },
  { label: "EIS", value: "EIS" },
  { label: "WRC", value: "WRC" },
  { label: "OCR", value: "OCR" },
  { label: "ADDON", value: "ADDON" },
  { label: "LSF", value: "LSF" },
  { label: "ARD", value: "ARD" },
  { label: "DOC", value: "DOC" },
  { label: "BL FEE", value: "bl_fee" },
  { label: "CERTIFICATE FEE", value: "certificate_fee" },
  { label: "EMPTY CONTAINER LIFT FEE", value: "empty_container_lift_fee" },
  { label: "Add New", value: "Add New" },
];
const surchargeAliasDesc = [
  { label: "Original Terminal Handling Charge	", value: "OTHC" },
  { label: "Original Terminal Handling Charge", value: "DTHC" },
  { label: "One Bunker Surchage", value: "OBS" },
  { label: "Equipment Imbalance Surcharge", value: "EIS" },
  { label: "War Risk Surcharge", value: "WRC" },
  { label: "Origin Receiving Charges", value: "OCR" },
  { label: "Additional Charge	", value: "ADDON" },
  { label: "Low Sulphur Surcharge	", value: "LSF" },
  { label: "Import Haulage Charge	", value: "ARD" },
  { label: "Documentation Fee", value: "DOC" },  
];

export default function PortLocalChargesSurchargeCodeAddNew() {
  const [categoryModal, setCategoryModal] = useState(false);
  const [aliasModal, setAliasModal] = useState(false);
  const navigate = useNavigate();

  const customOptSurchargeCategory = [
    ...surchargeCategory,
    { label: "Add New", value: "Add New" },
  ];

  const inputArr = {
    surchargeCode: "",
    surchargeDesc: "",
    surchargeCategory: "",
    surchargeAliasCode: "",
    surchargeAliasDesc: "",
  };
  const [addDetails, setAddDetails] = useState(inputArr);

  // console.log(addDetails, "addDetails");

  const onCloseClick = () => {
    setCategoryModal(false);
    setAliasModal(false);
  };

  const handleSelectGroup = useCallback(
    (name, opt) => {
      // console.log(opt, "opt");
      if (name === "surchargeCategory" && opt.value === "Add New") {
        setCategoryModal(true);
      } else if (name === "surchargeAliasCode" && opt.value === "Add New") {
        setAliasModal(true);
      }
      setAddDetails((prev) => ({ ...prev, [name]: opt }));
    },
    [addDetails]
  );

  const handleSubmit = () => {
    console.log(addDetails, "value");
  };

  const handleCancel = ()=> {
    setAddDetails(inputArr);
  }

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
                              value={addDetails.surchargeCode}
                              onChange={(e) => {
                                handleSelectGroup( "surchargeCode", e.target.value );
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
                              value={addDetails.surchargeDesc}
                              onChange={(e) => {
                                handleSelectGroup( "surchargeDesc", e.target.value );
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
                              value={addDetails.surchargeCategory}
                              name="surchargeCategory"
                              onChange={(opt) => {
                                handleSelectGroup("surchargeCategory", opt);
                              }}
                              options={surchargeCategory}
                              placeholder={"Select Surcharge Category"}
                              classNamePrefix="select2-selection form-select"
                              // defaultMenuIsOpen
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
                              value={addDetails.surchargeAliasCode}
                              name="surchargeAliasCode"
                              onChange={(opt) => {
                                handleSelectGroup("surchargeAliasCode", opt);
                              }}
                              options={surchargeAliasCode}
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
                              value={surchargeAliasDesc ? surchargeAliasDesc.find(obj => obj.value === addDetails.surchargeAliasCode.value) : ''}
                              name="surchargeAliasDesc"
                              onChange={(opt) => {
                                handleSelectGroup("surchargeAliasDesc", opt);
                              }}
                              options={surchargeAliasDesc}
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
                          <button className=" btn btn-primary" onClick={handleSubmit}>Save</button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={handleCancel}>Cancel</button>
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
            <ModalPLChargesAddNewAlias modal={aliasModal} onCloseClick={onCloseClick} />
          </div>
        </Container>
      </div>
    </>
  );
}
