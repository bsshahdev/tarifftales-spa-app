import PropTypes from "prop-types"
import React, { useState } from "react"

import { Row, Col, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap"
//redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"
import withRouter from "../../components/Common/withRouter"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

//Social Media Imports
// import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import logo from "../../assets/images/logo.png"

//Import config
import { facebook } from "../../config"
import CarouselPage from "../AuthenticationInner/CarouselPage"
import { google_icon, microsoft_icon } from "../../assets/images"
import { isAnyValueEmpty } from "../../components/Common/CommonLogic"
import * as schema from "../../api/global-schema"
import axios from "axios"
import { ToastWrapper } from "../../components/Common/CustomToast"

const Login = props => {
    const [passwordShow, setPasswordShow] = useState(false)    
    const dispatch = useDispatch()
    const { error } = useSelector(state => ({
        error: state.Login.error,
    }))

    const validation = useFormik({    
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            validateonmount: true,
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: schema.email,
            password: schema.password,
        }),
        onSubmit: async(values) => {
            let dataObj = {
                "user-name": values?.email,
                'password': values?.password,
                "remember-me": "false"            
            }   
            dispatch(loginUser(dataObj, props.router.navigate));
        }
    })

    const signIn = (res, type) => {
        if (type === "google" && res) {
        const postData = {
            name: res.profileObj.name,
            email: res.profileObj.email,
            token: res.tokenObj.access_token,
            idToken: res.tokenId,
        }
        dispatch(socialLogin(postData, props.history, type))
        } else if (type === "facebook" && res) {
        const postData = {
            name: res.name,
            email: res.email,
            token: res.accessToken,
            idToken: res.tokenId,
        }
        dispatch(socialLogin(postData, props.history, type))
        }
    }

    //handleGoogleLoginResponse
    const googleResponse = response => {
        signIn(response, "google")
    }

    //handleFacebookLoginResponse
    const facebookResponse = response => {
        signIn(response, "facebook")
    }
    document.title="Login || Navigating Freight Costs with Precision||Ultimate Rate Management platform"

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
                            <img src={logo} alt="Logo" height="64" />
                        </Link>
                        </div>
                        <div className="auth-content my-auto">
                            <div className="text-center">
                                <h5 className="mb-0">Welcome back 👋</h5>
                                <p className="text-muted mt-2 sub_text">Please enter your details to log in.</p>
                            </div>
                            <Form
                                className="custom-form tf_common_form mt-4 pt-2"
                                onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                                }}
                            >
                                {error ? <Alert color="danger">{error}</Alert> : null}

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
                                <div className="mb-3">
                                    <div className="d-flex align-items-start">
                                        <div className="flex-grow-1">
                                        <Label className="form-label">Password</Label>
                                        </div>
                                    </div>
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
                                    <div className="d-flex align-items-start">
                                        <div className="flex-grow-1">
                                        </div>
                                        <div className="flex-shrink-0">
                                        <div className="forgot_pass_text">
                                            <Link to="/page-recoverpw" className="text-muted">Forgot password?</Link>
                                        </div>
                                        </div>
                                    </div>
                                </div>                                
                                <div className="row mb-4">
                                <div className="col">
                                    <div className="mt-3 d-grid">
                                    <button className={`btn btn-primary btn-block ${isAnyValueEmpty(validation.values) && 'disabled'}`} type="submit" disabled={!validation.isValid} > Log In </button>
                                    </div>
                                </div>
                                </div>
                            </Form>
                        <div className="or mb-4"><span>or</span></div>
                        <button className="external_login disabled" disabled><img src={google_icon} alt="Google" />Log in with Google</button>
                        <button className="external_login disabled" disabled><img src={microsoft_icon} alt="Microsoft" />Log in with Microsoft</button>

                        {/* <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign in with</h5>

                            <ul className="list-inline">
                            <li className="list-inline-item">
                                <FacebookLogin
                                appId={facebook.APP_ID}
                                autoLoad={false}
                                callback={facebookResponse}
                                render={renderProps => (
                                    <Link
                                    to="#"
                                    className="social-list-item bg-primary text-white border-primary"
                                    onClick={renderProps.onClick}
                                    >
                                    <i className="mdi mdi-facebook" />
                                    </Link>
                                )}
                                />
                            </li>
                            </ul>
                        </div> */}

                        <div className="text-center login_account_text">
                            <p className="text-muted mb-0">Don&apos;t have an account ? <Link to="/register"
                            className="text-primary fw-semibold"> Create Account </Link> </p>
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
        <ToastWrapper />
        </React.Fragment>
    )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}