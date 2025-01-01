import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { postSurchargeAliseAction } from "../../../../store/Global/actions";

const ModalAddNewAlias = ({ modal, onCloseClick }) => {
  const dispatch = useDispatch();
  const surAliseFormik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    onSubmit: (values) => {
      const data = {
        ...values
      }
      dispatch(postSurchargeAliseAction(data));
      surAliseFormik.resetForm();
    }
  })
  return (
    <>
      <Modal isOpen={modal} toggle={onCloseClick} className="table_view_modal">
        <ModalHeader tag="h4">
          Add Surchare Alise Code
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              <div className="row mt-4 mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                    <label className="form-label">Surcharge Alias Code</label>
                      <Input
                        type="text"
                        name="name"
                        value={surAliseFormik.values.name}
                        onChange={surAliseFormik.handleChange}
                        id="name"
                        className="form-control"
                        placeholder="Enter Surcharge Code"
                      />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                    <label className="form-label">Alias Desc</label>
                      <Input
                        type="text"
                        name="description"
                        value={surAliseFormik.values.description}
                        onChange={surAliseFormik.handleChange}
                        id="description"
                        className="form-control"
                        placeholder="Enter Surcharge Desc"
                      />
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary" onClick={surAliseFormik.handleSubmit}>Save</button>
                  </div>
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary" onClick={() => { onCloseClick(); surAliseFormik.resetForm(); }}>
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

export default ModalAddNewAlias;
