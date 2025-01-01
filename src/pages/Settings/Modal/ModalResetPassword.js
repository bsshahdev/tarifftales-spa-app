import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormFeedback, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { addUsersData } from "../../../store/Settings/actions";
import { useDispatch } from "react-redux";

// Define the validation schema using Yup
const schema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string(),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  reEnterdPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Re-enter Password is required'),
});

const ModalResetPassword = ({ viewData, modal, onCloseClick }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: viewData ? viewData.firstName : "",
      lastName: viewData ? viewData.lastName : "",
      email: viewData ? viewData.email : "",
      password: "",
      reEnterdPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      viewData.password=values?.password
      dispatch(addUsersData(viewData));
      formik.resetForm();
      onCloseClick();
    },
  });
  return (
    <>
      <Modal
        isOpen={modal}
        toggle={onCloseClick}
        className="table_view_modal"
      >
        <ModalHeader tag="h4">
          Reset Password
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>

        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  {/* First Name */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <label className="form-label">First Name<span className='required_star'>*</span></label>
                    <div>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly
                        className="form-control"
                        placeholder="Enter First Name"
                        invalid={formik.touched.firstName && formik.errors.firstName ? true : false}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <FormFeedback>{formik.errors.firstName}</FormFeedback>
                      ) : null}
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <label className="form-label">Last Name</label>
                    <div>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        readOnly
                        className="form-control"
                        placeholder="Enter Last Name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <label className="form-label">Email Id<span className='required_star'>*</span></label>
                    <div>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        readOnly
                        placeholder="Enter Email id"
                        invalid={formik.touched.email && formik.errors.email ? true : false}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <FormFeedback>{formik.errors.email}</FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row mt-4 mb-2">
                  {/* Enter Password */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <label className="form-label">Enter Password<span className='required_star'>*</span></label>
                    <div>
                      <Input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        placeholder="Enter Password"
                        invalid={formik.touched.password && formik.errors.password ? true : false}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <FormFeedback>{formik.errors.password}</FormFeedback>
                      ) : null}
                    </div>
                  </div>

                  {/* Re-Enter Password */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <label className="form-label">Re-Enter Password<span className='required_star'>*</span></label>
                    <div>
                      <Input
                        type="password"
                        name="reEnterdPassword"
                        value={formik.values.reEnterdPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        placeholder="Re-Enter Password"
                        invalid={formik.touched.reEnterdPassword && formik.errors.reEnterdPassword ? true : false}
                        autoComplete="off"
                      />
                      {formik.touched.reEnterdPassword && formik.errors.reEnterdPassword ? (
                        <FormFeedback>{formik.errors.reEnterdPassword}</FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex justify-content-center">
                    <div className="mb-3 mx-3 d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                    <div className="mb-3 mx-3 d-flex justify-content-end">
                      <button type="button" className="btn btn-secondary" onClick={onCloseClick}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalResetPassword;
