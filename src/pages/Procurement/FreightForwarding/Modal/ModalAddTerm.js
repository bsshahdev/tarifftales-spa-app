import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { optionIsStandard, optionPaymentType } from "../../../../common/data/procurement";
import { getAllIncoTerms } from "../../../../store/InstantRate/actions";

const commodity = [
  { label: "General", value: "General" },
  { label: "Electronics", value: "Electronics" },
  { label: "Perishable", value: "Perishable" },
  { label: "Fruits", value: "Fruits" },
  { label: "Pulses", value: "Pulses" },
];

const initialValue = {
  paymentTerm: "",
  incoTerm: [],
  isStandard: "",
  commodity: [],
  transportMode: [],
};

const ModalAddTerm = ({ modal, onCloseClick, setTermHandler }) => {
  const { incoterm } = useSelector((state) => state.instantRate);
  const dispatch = useDispatch();
  const changeHandler = (name, value) => {
    // const selectedValues = value.map((option) => option.value);
    formik.setFieldValue(name, value);
  };

 
  const formik = useFormik({
    initialValues:  {
      paymentTerm: modal?.addTerms?.paymentTerm,
      incoTerm: [],
      isStandard: modal?.addTerms?.standard == true ? "incidental" : 'standard_charge',
      commodity: [],
      transportMode: [],
    },
    onSubmit: async (value, { resetForm }) => {
      console.log(value, "value");
      setTermHandler(value);
      onCloseClick();
      resetForm();
    },
  });
  
  useEffect(() => {
    formik.setValues({
      paymentTerm: modal?.addTerms?.paymentTerm,
      incoTerm: modal?.addTerms?.incoTerm || [],
      isStandard: modal?.addTerms?.standard == true ? "incidental" : 'standard_charge',
      commodity: modal?.addTerms?.commodity || [],
      transportMode: [],
    });
  }, [modal,setTermHandler]);

  useEffect(() => {
    dispatch(getAllIncoTerms());
  }, [dispatch]);



  return (
    <>
      <Modal isOpen={modal.isOpen} toggle={onCloseClick} className="table_view_modal" >
        <ModalHeader tag="h4"> Add Terms <span className="close" onClick={onCloseClick}></span> </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              <div className="row mt-4 mb-2">
                {/* Payment Term */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Payment Term</label>
                  <Select
                    name="paymentTerm"
                    value={optionPaymentType ? optionPaymentType.find((option) => option.value === formik.values.paymentTerm) : ""}
                    onChange={(e) => {
                      formik.setFieldValue(`paymentTerm`, e.value);
                    }}
                    options={optionPaymentType}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Inco Term */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Incoterm</label>
                  <Select
                    name="incoTerm"
                    isMulti
                    value={incoterm ? incoterm.find((option) => option.value === formik.values.incoterm) : ""}
                    onChange={(e) => {
                      changeHandler(`incoTerm`, e);
                    }}
                    options={incoterm}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Is Standard */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Is Standard</label>
                  <Select
                    name="isStandard"
                    value={optionIsStandard ? optionIsStandard.find((option) => option.value === formik.values.isStandard) : ""}
                    onChange={(e) => {
                      formik.setFieldValue(`isStandard`, e.value);
                    }}
                    options={optionIsStandard}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Commodity */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Commodity</label>
                  <Select
                    name="commodity"
                    isMulti
                    value={commodity ? commodity.find((option) => option.value === formik.values.commodity) : ""}
                    onChange={(e) => {
                      changeHandler(`commodity`, e);
                    }}
                    options={commodity}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Service Type */}
                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Service Type</label>
                  <Select
                    name="transportMode"
                    isMulti
                    value={
                      optionServiceType
                        ? optionServiceType.find(
                          (option) =>
                            option.value === formik.values.transportMode
                        )
                        : ""
                    }
                    onChange={(e) => {
                      changeHandler(`transportMode`, e);
                    }}
                    options={optionServiceType}
                    classNamePrefix="select2-selection form-select"
                  />
                </div> */}
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary" onClick={formik.handleSubmit} > Save </button>
                  </div>
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button
                      className=" btn btn-primary"
                      onClick={() => {
                        onCloseClick();
                        formik.resetForm();
                      }}
                    >
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

export default ModalAddTerm;
