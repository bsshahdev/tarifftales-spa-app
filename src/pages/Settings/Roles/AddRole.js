import { Card, CardBody, Container, FormFeedback, Input } from "reactstrap";
import { addRoleBreadcrumb, editRoleBreadcrumb } from "../../../common/data/parties";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBreadcrumbs from "../Surcharge/TopBreadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { RoleName } from "./RolesCol";
import ModuleTable from "./ModuleTable";
import * as Yup from "yup";
import { cloud_upload_icon, download_icon, find_book_icon, folder_plus_icon, web_search_icon, read_book_icon, task_minus_icon, writing_icon } from "../../../assets/images";
import { useDispatch } from "react-redux";
import { DropdownItem, FormGroup } from "reactstrap";
import { useFormik } from "formik";
import { DELETE_PERMISSIONS_TYPE, GET_ROLE_BY_ID_TYPE_SUCCEESS, SAVE_PERMISSIONS_TYPE, SET_NEW_PERMISSION } from "../../../store/Global/actiontype";
import { deletePermissions, savePermissions, saveRole, setNewPermission } from "../../../store/Global/actions";
import { showErrorToast } from "../../../components/Common/CustomToast";

const AddRole = () => {
    const navigate = useNavigate();
    const { roleData, moduleData, new_Permission, module_loader, role_data_By_id } = useSelector((state) => state.globalReducer);
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const [permissions, setPermissions] = useState(navigateState?.state?.permissions ? navigateState?.state?.permissions : []);
    const selectAllRefs = useRef(navigateState?.state?.permissions ? navigateState?.state?.permissions : []);
    const viewPopupHandler = (data) => {
        console.log("popup");
    };

    useEffect(() => {
        dispatch({ type: GET_ROLE_BY_ID_TYPE_SUCCEESS, payload: [] })
        // dispatch( setNewPermission( navigateState?.state?.permissions ? navigateState?.state?.permissions : []))
    }, [])
    const switchHandler = (data) => {

    }

    useEffect(() => {
        console.log(new_Permission);
        selectAllRefs.current = []
        selectAllRefs.current = new_Permission;

        console.log("cheking");
        console.log(selectAllRefs.current, 'chskfdjslkfj');

    }, [new_Permission])

    let newPermission = [] = navigateState?.state?.permissions ? navigateState?.state?.permissions : [];
    const onClickSave = async (event, rowData, actionName) => {
        if (rowData && actionName) {
            if (event) {
                newPermission.push({ roleId: roleFormik.values.roleCode, moduleId: rowData.id, actionName: actionName });
            } else {
                newPermission = newPermission.filter(permission => !(
                    permission.roleId === roleFormik.values.roleCode &&
                    permission.moduleId === rowData.id &&
                    permission.actionName === actionName
                ));
            }
            await dispatch(setNewPermission(newPermission))
            setPermissions(newPermission)
        }
        else {
            if (!!navigateState?.state?.data || role_data_By_id?.id) {
                dispatch(savePermissions(permissions, ((role_data_By_id?.id) ? role_data_By_id?.id : roleFormik.values.roleCode)));
            } else
                showErrorToast("Please Save Role")
        }
    }

    function checkPermission(roleId, moduleId, actionName) {
        const permission = selectAllRefs.current
            .filter(data => data.moduleId === moduleId && data.roleId === roleId)
            .some(data => data.actionName === actionName)
        return permission;
    }


    const roleFormik = useFormik({
        initialValues: {
            roleCode: navigateState?.state?.data?.id,
            roleName: navigateState?.state?.data?.value || "",
            version: navigateState?.state?.data?.version || 0,
        },
        validationSchema: Yup.object({
            // roleCode: Yup.string().required("Please enter role code"),
            roleName: Yup.string().required("Please select role name"),
        }),
        onSubmit: (values) => {
            const role = {
                id: (role_data_By_id?.id) ? role_data_By_id?.id : navigateState?.state?.data?.id ? navigateState?.state?.data?.id : roleFormik.values.roleCode || '',
                name: values.roleName,
                version: (role_data_By_id?.version) ? role_data_By_id?.version : navigateState?.state?.data?.version || 0
            }
            dispatch(saveRole(role))
        },
    })
    const columns = useMemo(() => ([
        {
            Header: "Modules",
            accessor: "label",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <RoleName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                );
            },
        },
        {
            Header: "Sub Modules",
            accessor: "modules",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                {module.name}
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        ))}
                    </>
                );
            },
        },
        {
            Header: "Select All",
            accessor: "selectAll",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                <Input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    onChange={(e) => { onClickSave(e.target.checked, module, "ALL") }}
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id,"READ") || false}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        )) :
                            <Input
                                type="checkbox"
                                className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "ALL")}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                            />
                        }
                    </>
                );
            },
        },
        {
            Header: <img src={read_book_icon} alt="read" title="READ" height={20} className="p-0" />,
            accessor: "Read",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                <Input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    onChange={(e) => onClickSave(e.target.checked, module, "READ")}
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module?.id, "READ") || false}
                                />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        )) :
                            <Input
                                type="checkbox"
                                className="custom-checkbox"
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "READ")}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "READ") || false}
                            />
                        }
                    </>
                );
            },
        },
        {
            Header: <img src={folder_plus_icon} alt="Upload" title="ADD" height={20} className="p-0" />,
            accessor: "ADD",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                <Input type="checkbox" className="custom-checkbox"
                                    onChange={(e) => onClickSave(e.target.checked, module, "ADD")}
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module.id, "ADD") || false} id="chk19" />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        ))
                            :
                            <Input type="checkbox" className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "ADD")}
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original.id, "ADD") || false} id="chk19" />}
                    </>
                );
            },
        },
        {
            Header: <img src={writing_icon} alt="Upload" title="EDIT" height={20} className="p-0" />,
            accessor: "EDIT",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                <Input type="checkbox" className="custom-checkbox"
                                    onChange={(e) => onClickSave(e.target.checked, module, "EDIT")}
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module.id, "EDIT") || false} id="chk19" />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        )) :
                            <Input type="checkbox" className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "EDIT")}
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original.id, "EDIT") || false} id="chk19" />
                        }
                    </>
                );
            },
        },
        {
            Header: <img src={task_minus_icon} alt="Upload" title="DELETE" height={20} className="p-0" />,
            accessor: "DELETE",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                <Input type="checkbox" className="custom-checkbox"
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    onChange={(e) => onClickSave(e.target.checked, module, "DELETE")}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module.id, "DELETE") || false} id="chk19" />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        )) :
                            <Input type="checkbox" className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "DELETE")}
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original.id, "DELETE") || false} id="chk19" />

                        }
                    </>
                );
            },
        },
        {
            Header: <img src={find_book_icon} alt="Upload" title="SEARCH" height={20} className="p-0" />,
            accessor: "SEARCH",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (

                            <div key={index}>
                                <Input type="checkbox" className="custom-checkbox"
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    onChange={(e) => onClickSave(e.target.checked, module, "SEARCH")}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module.id, "SEARCH") || false} id="chk19" />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        )) :
                            <Input type="checkbox" className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "SEARCH")}
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original.id, "SEARCH") || false} id="chk19" />
                        }
                    </>
                );
            },
        },
        {
            Header: <img src={cloud_upload_icon} alt="Upload" title="UPLOAD" height={20} className="p-0" />,
            accessor: "UPLOAD",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (

                            <div key={index}>
                                <Input type="checkbox" className="custom-checkbox"
                                    onChange={(e) => onClickSave(e.target.checked, module, "UPLOAD")}
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module.id, "UPLOAD") || false} id="chk19" />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        )) :
                            <Input type="checkbox" className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "UPLOAD")}
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original.id, "UPLOAD") || false} id="chk19" />
                        }
                    </>
                );
            },
        },
        {
            Header: <img src={download_icon} alt="Upload" title="DOWNLOAD" height={20} className="p-0" />,
            accessor: "DOWNLOAD",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                <Input type="checkbox" className="custom-checkbox"
                                    onChange={(e) => onClickSave(e.target.checked, module, "DOWNLOAD")}
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module.id, "DOWNLOAD") || false} id="chk19" />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        ))
                            : <Input type="checkbox" className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "DOWNLOAD")}
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original.id, "DOWNLOAD") || false} id="chk19" />
                        }
                    </>
                );
            },
        },
        {
            Header: <img src={web_search_icon} alt="Upload" title="APPROVE" height={20} className="p-0" />,
            accessor: "APPROVE",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <>
                        {cellProps.row.original.subModules && cellProps.row.original.subModules.length > 0 ? cellProps.row.original.subModules?.map((module, index) => (
                            <div key={index}>
                                <Input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    onChange={(e) => onClickSave(e.target.checked, module, "APPROVE")}
                                    disabled={checkPermission(roleFormik.values.roleCode, module?.id, "ALL") || false}
                                    defaultChecked={checkPermission(roleFormik.values.roleCode, module.id, "APPROVE") || false}
                                    id="chk19"
                                />
                                {index !== cellProps.row.original.subModules?.length - 1 && <hr className="module-divider" />}
                            </div>
                        )) :
                            <Input
                                type="checkbox"
                                className="custom-checkbox"
                                onChange={(e) => onClickSave(e.target.checked, cellProps.row.original, "APPROVE")}
                                disabled={checkPermission(roleFormik.values.roleCode, cellProps.row.original?.id, "ALL") || false}
                                defaultChecked={checkPermission(roleFormik.values.roleCode, cellProps.row.original.id, "APPROVE") || false}
                                id="chk19"
                            />
                        }
                    </>

                );
            },
        },
        {
            Header: "Status",
            accessor: "status",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <DropdownItem onClick={(e) => e.stopPropagation()}>
                        <div className="switch_wrap">
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={cellProps.row.original?.status == "ACTIVE" || false}
                                    onClick={() => {
                                        switchHandler(cellProps.row.original);
                                    }}
                                    readOnly
                                />
                            </FormGroup>
                        </div>
                    </DropdownItem>
                );
            },
        },
    ]), []);

    return (
        <>
            <div className="page-content settings_users_wrapper">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <TopBreadcrumbs breadcrumbs={!!(navigateState.state?.data) ? editRoleBreadcrumb : addRoleBreadcrumb} />
                        <button type="button" className="btn border mb-3" onClick={() => { navigate(-1); }} > Back </button>
                    </div>
                </Container>
                <div className="mb-1 mt-2">
                    <h5>Add Role</h5>
                </div>
                <Card >
                    <CardBody>
                        <div className='row'>
                            {/* <div className="col-12 col-md-4">
                                <div className="mb-2">
                                    <label className="form-label">Role Code</label>
                                    <Input
                                        type="number"
                                        name="roleCode"
                                        value={roleFormik.values.roleCode}
                                        onChange={roleFormik.handleChange}
                                        readOnly={navigateState?.state?.data?.id ? true : false}
                                        onBlur={roleFormik.handleBlur}
                                        className="form-control"
                                        placeholder="Role Code"
                                        invalid={roleFormik.touched.roleCode && roleFormik.errors.roleCode ? true : false}
                                    />
                                    {roleFormik.touched.roleCode && roleFormik.errors.roleCode ? (
                                        <FormFeedback>{roleFormik.errors.roleCode}</FormFeedback>
                                    ) : null}
                                </div>
                            </div> */}
                            <div className="col-12 col-md-4">
                                <div className="mb-2">
                                    <label className="form-label">Role Name</label>
                                    <Input
                                        type="text"
                                        name="roleName"
                                        value={roleFormik.values.roleName}
                                        onChange={roleFormik.handleChange}
                                        onBlur={roleFormik.handleBlur}
                                        className="form-control"
                                        placeholder="Role Name"
                                        invalid={roleFormik.touched.roleName && roleFormik.errors.roleName ? true : false}
                                    />
                                    {roleFormik.touched.roleName && roleFormik.errors.roleName ? (
                                        <FormFeedback>{roleFormik.errors.roleName}</FormFeedback>
                                    ) : null}
                                </div>
                            </div>
                            {/* <div className="col-12 col-md-4">
                                <div className="mb-2">
                                    <label className="form-label">Role Name</label>
                                    <Select
                                        placeholder="Role Name"
                                        name="roleName"
                                        value={
                                            roleData
                                                ? roleData.find(
                                                    (option) =>
                                                        option.value ===
                                                        roleFormik?.values?.roleName
                                                )
                                                : ""
                                        }
                                        onChange={(e) => {
                                            roleFormik.setFieldValue(`roleName`, e.value);
                                        }}
                                        onBlur={roleFormik.handleBlur}
                                        options={roleData || []}
                                        classNamePrefix="select2-selection form-select"
                                        invalid={roleFormik.touched.roleName && roleFormik.errors.roleName ? true : false}
                                    />
                                    {roleFormik.touched.roleName && roleFormik.errors.roleName ? (
                                        <FormFeedback>{roleFormik.errors.roleName}</FormFeedback>
                                    ) : null}
                                </div>
                            </div> */}
                        </div>
                    </CardBody>
                </Card>

                <div className="row">
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" onClick={roleFormik.handleSubmit} type="submit"> Save </button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" onClick={roleFormik.resetForm} type="button" >Cancel</button>
                        </div>
                    </div>
                </div>
                <ModuleTable
                    columns={columns}
                    data={moduleData || []}
                    isFilterable={true}
                    isGlobalFilter={true}
                    isAddInvoiceList={true}
                    customPageSize={10}
                    component={"Modules"}
                    loader={module_loader || false}
                />

                <div className="row mt-4">
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" onClick={onClickSave} type="submit"> Save </button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" type="button" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddRole;