import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, FormFeedback, Input, Label, Row, } from "reactstrap";

// Formik Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// action
import { apiError, registerUser } from "../../store/actions";

//redux
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

// import images
import logo from "../../assets/images/logo-sm.png";
import { isAnyValueEmpty } from "../../components/Common/CommonLogic";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const Register = (props) => {
    //meta title
    document.title="Register || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordShow2, setPasswordShow2] = useState(false);
    const [toast, setToast] = useState(false);
    const dispatch = useDispatch();

    const { user, registrationError } = useSelector((state) => ({
        user: state.Account.user,
        registrationError: state.Account.registrationError,
        loading: state.Account.loading,
    }));

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
        email: "",
        password: "",
        confirm_password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Please enter an email address")
                .matches(
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                "Please enter a valid email address"
                ),
            password: Yup.string()
                .required("Please enter a password")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
                ),
            confirm_password: Yup.string()
                .required("Please enter a password")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
                )
                .oneOf(
                [Yup.ref("password"), null],
                "The password you entered does not match the password."
                ),
        }),
        onSubmit: (values) => {
        dispatch(registerUser(values));
        },
    });

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

  return (
    <React.Fragment>
      <div className="auth-page login_auth_wrap">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-4">
              <div className="auth-full-page-content d-flex">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="64" />
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                        <div className="text-center">
                            <h5 className="mb-0">Create your account 👋</h5>
                            <p className="text-muted mt-2 sub_text">
                            Please enter your details to create an account.
                            </p>
                        </div>

                        <Form
                            className="needs-validation custom-form tf_common_form mt-4 pt-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}
                        >
                            {user && user ? (
                            <Alert color="success" className="p-2 text-center">
                                Register User Successfully
                            </Alert>
                            ) : null}

                            {registrationError && registrationError ? (
                            <Alert color="danger">{registrationError}</Alert>
                            ) : null}

                            <div className="mb-3">
                                <Label className="form-label">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    type="email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={
                                    validation.touched.email &&
                                        validation.errors.email
                                        ? true
                                        : false
                                    }
                                />
                                {validation.touched.email && validation.errors.email ? (
                                    <FormFeedback type="invalid">
                                    {validation.errors.email}
                                    </FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label className="form-label">Password</Label>
                                <div className="input-group auth-pass-inputgroup">
                                    <Input
                                        name="password"
                                        value={validation.values.password || ""}
                                        type={passwordShow ? "text" : "password"}
                                        placeholder="Enter password"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                            validation.touched.password && validation.errors.password ? true : false
                                        }
                                    />
                                    <button onClick={() => setPasswordShow(!passwordShow)} className={`btn btn-light shadow-none ms-0 ${passwordShow ? 'show' : ''}`} type="button" id="password-addon"></button>
                                    {validation.touched.password && validation.errors.password ? (
                                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                    ) : null}
                                </div>
                            </div> 
                            <div className="mb-3">
                                <Label className="form-label">Confirm Password</Label>
                                <div className="input-group auth-pass-inputgroup">
                                    <Input
                                        name="confirm_password"
                                        value={validation.values.confirm_password || ""}
                                        type={passwordShow2 ? "text" : "password"}
                                        placeholder="Enter confirm password"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                            validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                                        }
                                    />
                                    <button onClick={() => setPasswordShow2(!passwordShow2)} className={`btn btn-light shadow-none ms-0 ${passwordShow2 ? 'show' : ''}`} type="button" id="password-addon"></button>
                                    {validation.touched.confirm_password && validation.errors.confirm_password ? (
                                        <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback>
                                    ) : null}
                                </div>
                            </div> 
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="register_terms" id="remember-check" />
                                <label className="form-check-label" htmlFor="remember-check" > By clicking on this checkbox you agree to our Terms and you acknowledge having read our Privacy Notice </label>
                            </div>
                            <div className="mt-3 pt-3">
                            <button
                                className={`btn btn-primary w-100 waves-effect waves-light ${isAnyValueEmpty(validation.values) && "disabled"
                                }`}
                                type="submit"
                                disabled={!(validation.isValid && validation.dirty)}
                            >                            
                                Create Account
                            </button>
                            </div>
                        </Form>

                        <div className="text-center login_account_text">
                            <p className="text-muted mb-0">
                            Already have an account ?
                            <Link to="/login" className="text-primary fw-semibold" > Login </Link>
                            </p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
