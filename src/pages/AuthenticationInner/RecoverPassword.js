import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import * as Yup from "yup";

// import images
import logo from "../../assets/images/logo.png";
import CarouselPage from './CarouselPage';
import { useFormik } from 'formik';

const RecoverPassword = () => {
    //meta title
    document.title = "Reset Password | Minia - React Admin & Dashboard Template";

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
          email: Yup.string()
          .required("Please enter an email address")
          .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Please enter a valid email address"
          ),
        }),
        onSubmit: (values) => {
          dispatch(userForgetPassword(values, history));
        }
      });
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
                                                <h5 className="mb-0">Reset Password</h5>
                                            </div>
                                            <div className="alert alert-success text-center mb-4 mt-4 p-2" role="alert">
                                                Enter your Email and instructions will be sent to you!
                                            </div>
                                            <Form
                                                className="custom-form tf_common_form mt-4"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                            >
                                                <div className="mb-3">
                                                    <Label className="form-label">Email address</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email address"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                        validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3 mt-4"> 
                                                    <button className="btn btn-primary w-100 waves-effect waves-light" type="submit" disabled={!validation.isValid}>Reset Password</button>
                                                </div>
                                            </Form>

                                            <div className="mt-5 text-center login_account_text">
                                                <p className="text-muted mb-0">Remember It ?  <Link to="/login"
                                                    className="text-primary fw-semibold"> Sign In </Link> </p>
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

export default RecoverPassword;
