import { useFormik } from "formik";
import React from "react";
import { Form, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import * as schema from "../../../api/global-schema";
import { isAnyValueEmpty } from "../../../components/Common/CommonLogic";

const ModalAddNewSalesEmployee = ({ modal, onCloseClick }) => {

  const salesFormik = useFormik({
    initialValues: {
      sales_employee: '',
    },
    validationSchema: Yup.object({
      sales_employee: schema.name,
    }),
    onSubmit: (values) => {
      console.log(values, "values")
    }
  })

  return (
    <>
      <Modal isOpen={modal} toggle={onCloseClick} className="table_view_modal">
        <ModalHeader tag="h4">
          Add New Sales Employee
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              <Form
                className="custom-form mt-4 pt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  salesFormik.handleSubmit();
                  return false;
                }}
              >
                <div className="row mt-4 mb-2">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4">
                    <label className="form-label">Sales Employee Name</label>
                    <Input
                      type="text"
                      name="sales_employee"
                      value={salesFormik.values.sales_employee || ''}
                      onChange={salesFormik.handleChange}
                      onBlur={salesFormik.handleBlur}
                      invalid={
                        salesFormik.touched.sales_employee && salesFormik.errors.sales_employee ? true : false
                      }
                      className="form-control"
                      placeholder="Enter Sales Employee Name"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex justify-content-center">
                    <div className="mb-3 mx-3 d-flex justify-content-end">
                      <button className=" btn btn-primary" type="submit" disabled={isAnyValueEmpty(salesFormik.values)}>Save</button>
                    </div>
                    <div className="mb-3 mx-3 d-flex justify-content-end">
                      <button className=" btn btn-primary" type="button" onClick={() => { onCloseClick(); salesFormik.resetForm(); }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalAddNewSalesEmployee;
