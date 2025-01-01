import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, FormFeedback, Input, Modal, Row, } from "reactstrap";
import { isAnyValueEmpty } from "../../components/Common/CommonLogic";
import { GET_ROLE_TYPE } from "../../store/Global/actiontype";
import { getAllTenantLocationData, getUsersData } from "../../store/Settings/actions";
import useAddUser from "./hook/useAddUser";
import TopBreadcrumbs from "./Surcharge/TopBreadcrumbs";
import { addUserBreadcrumb, EditUserBreadcrumb } from "../../common/data/parties";

export default function AddUserData() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { settings_users_data, tenant_all_location_data } = useSelector((state) => state.settings);
    const { roleData } = useSelector((state) => state.globalReducer);
    const navigateState = useLocation();
    const [locations, setLocation] = useState([]);


    useEffect(() => {
        if (roleData?.length === 0 || roleData === undefined) {
            dispatch({ type: GET_ROLE_TYPE });
        }
        dispatch(getUsersData());
        dispatch(getAllTenantLocationData())
    }, []);



    useEffect(() => {
        const newLocation = tenant_all_location_data?.content?.map(location => ({
            value: location.id,
            label: location.name,
            id: location.id,
        })) || [];

        const addNewItem = {
            value: 'add_new',
            label: 'Add New',
        };
        console.log(tenant_all_location_data);
        setLocation([...newLocation, addNewItem]);
    }, [tenant_all_location_data]);

    const managerInfo = Array.isArray(settings_users_data.content)
        ? settings_users_data.content.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id.toString(),
            id: user.id,
            version: user.version,
        }))
        : [];

    const { initialValues, schema, handleAddUser } = useAddUser(navigateState?.state);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: handleAddUser,
    });

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <TopBreadcrumbs breadcrumbs={!!navigateState?.state?.id ? EditUserBreadcrumb : addUserBreadcrumb} />

                        {/* back button */}
                        <button type="button" className="btn border mb-3" onClick={() => { navigate(-1); }} > Back </button>

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <form>
                                            <div className="row">
                                                {/* First name */}
                                                <div className="col-md-6 col-lg-4 mb-4">
                                                    <label className="form-label">First Name<span className='required_star'>*</span></label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="firstName"
                                                            id="firstName"
                                                            value={formik.values.firstName}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            className="form-control"
                                                            placeholder="Enter First Name"
                                                            invalid={formik.touched.firstName && formik.errors.firstName ? true : false}
                                                        />
                                                        {formik.touched.firstName && formik.errors.firstName ? (
                                                            <FormFeedback> {formik.errors.firstName} </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                {/* Last name */}
                                                <div className="col-md-6 col-lg-4 mb-4">
                                                    <label className="form-label">Last Name</label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="lastName"
                                                            id="lastName"
                                                            value={formik.values.lastName}
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                            placeholder="Enter Last Name"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="col-md-6 col-lg-4 mb-4">
                                                    <label className="form-label">Email Id<span className='required_star'>*</span></label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            className="form-control"
                                                            placeholder="Enter Email id"
                                                            invalid={formik.touched.email && formik.errors.email ? true : false}
                                                        />
                                                        {formik.touched.email && formik.errors.email ? (
                                                            <FormFeedback> {formik.errors.email} </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                {/* Select Role */}
                                                <div className="col-md-6 col-lg-4 mb-4">
                                                    <label className="form-label">Role<span className='required_star'>*</span></label>
                                                    <div className="">
                                                        <Select
                                                            value={roleData?.filter((role) => formik.values.roles.includes(role.id))}
                                                            onChange={(selectedOptions) => {
                                                                const selectedValues = selectedOptions.map((option) => option.id);
                                                                formik.setFieldValue("roles", selectedValues);
                                                            }}
                                                            name="roles"
                                                            id="roles"
                                                            options={roleData}
                                                            onBlur={formik.handleBlur}
                                                            isMulti
                                                            placeholder="Select Role"
                                                            classNamePrefix="select2-selection form-select"
                                                            invalid={formik.touched.roles && formik.errors.roles ? true : false}
                                                            autoComplete="off"
                                                        />
                                                        {formik.touched.roles && formik.errors.roles ? (
                                                            <FormFeedback> {formik.errors.roles} </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                {/* Password */}
                                                {!(!!navigateState?.state?.id) &&
                                                    < div className="col-md-6 col-lg-4 mb-4">
                                                        <label className="form-label">Enter Password<span className='required_star'>*</span></label>
                                                        <div className="">
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
                                                                <FormFeedback> {formik.errors.password} </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                }

                                                {/* Re-Enter Password */}
                                                {!(!!navigateState?.state?.id) &&
                                                    <div className="col-md-6 col-lg-4 mb-4">
                                                        <label className="form-label"> Re-Enter Password<span className='required_star'>*</span></label>
                                                        <div className="">
                                                            <Input
                                                                type="password"
                                                                name="reEnterdPassword"
                                                                // id="password2"
                                                                value={formik.values.reEnterdPassword}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                className="form-control"
                                                                placeholder="Re-Enter Password"
                                                                invalid={formik.touched.reEnterdPassword && formik.errors.reEnterdPassword ? true : false}
                                                                autoComplete="off"
                                                            />
                                                            {formik.touched.reEnterdPassword && formik.errors.reEnterdPassword ? (
                                                                <FormFeedback> {formik.errors.reEnterdPassword} </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                }

                                                {/* Manager */}
                                                <div className="col-md-6 col-lg-4 mb-4">
                                                    <label className="form-label">Manager</label>
                                                    <div className="">
                                                        <Select
                                                            name="roleNames"
                                                            id="roleNames"
                                                            value={managerInfo ? managerInfo.find((option) => option.value === formik.values.roleNames) || "" : ""}
                                                            onChange={(e) => { formik.setFieldValue("roleNames", e.value); }}
                                                            onBlur={formik.handleBlur}
                                                            options={managerInfo}
                                                            placeholder="Select Employee"
                                                            classNamePrefix="select2-selection form-select"
                                                            invalid={formik.touched.roleNames && formik.errors.roleNames ? true : false}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Location */}
                                                <div className="col-md-6 col-lg-4 mb-4">
                                                    <label className="form-label">Location</label>
                                                    <div className="">
                                                        <Select
                                                            name="location"
                                                            id="location"
                                                            value={locations ? locations.find((option) => option.value === formik.values.location) || "" : ""}
                                                            onChange={(e) => {
                                                                if (e.label == "Add New") {
                                                                    navigate("/Settings/AddTanentLocation")
                                                                } else {
                                                                    formik.setFieldValue("location", e.value);
                                                                }
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            options={locations}
                                                            placeholder={"Select locations"}
                                                            classNamePrefix="select2-selection form-select"
                                                            invalid={formik.touched.location && formik.errors.location ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="d-flex justify-content-center">
                                                    <div className="mb-3 mx-3 d-flex justify-content-end">
                                                        <button className=" btn btn-primary" type="submit" onClick={formik.handleSubmit} disabled={isAnyValueEmpty(formik?.values, ["lastName", "roleNames", "location"])}> Save </button>
                                                    </div>
                                                    <div className="mb-3 mx-3 d-flex justify-content-end">
                                                        <button className=" btn btn-primary" type="button" onClick={() => { formik.resetForm(); }}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container >
            </div >

            {/* modal */}
            {/* <Modal
                isOpen={openSaveModal}
                toggle={() => { setOpenSaveModal(!openSaveModal); }}
                className='confirm_modal_wrap'
            >
                <div className="modal-header">
                    <button
                        type="button"
                        onClick={() => { setOpenSaveModal(false); }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body pb-5">
                    <h4 className='text-center'>Are you sure?</h4>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenSaveModal(!openSaveModal);
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button type="button" onClick={() => { setFinalSaveButton(true); }} className="btn btn-primary ">
                        Save changes
                    </button>
                </div>
            </Modal> */}
        </>
    );
}
