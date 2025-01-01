import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, DropdownItem, FormGroup, Input } from "reactstrap";
import TopBreadcrumbs from "../Surcharge/TopBreadcrumbs";
import { GET_ALL_MODULES_BY_ROLE_TYPE, GET_MODULE_TYPE, GET_ROLE_TYPE } from "../../../store/Global/actiontype";
import { RolesBreadcrumb } from "../../../common/data/parties";
import RoleTable from "./RoleTable";
import { Permissions, RoleName, Edit } from "./RolesCol";
import { cloud_upload_icon, download_icon, find_book_icon, folder_plus_icon, web_search_icon, read_book_icon, task_minus_icon, writing_icon } from "../../../assets/images";
import { setNewPermission } from "../../../store/Global/actions";

const Roles = () => {
  const [resetModal, setResetModal] = useState(false);
  const dispatch = useDispatch();
  const navidate = useNavigate()

  const resetHandler = (data) => {
    setResetModal(true);
  }

  const { roleData, role_loader, module_data_by_role, moduleData } = useSelector((state) => state.globalReducer);

  const onCloseClick = () => {
    setResetModal(false);
  }

  const viewPopupHandler = (data) => {
    console.log("popup");
  };
  const editHandler = (data) => {
    let permission = [];
    data?.moduleData?.forEach(data => {
      const namesArray = data?.actionNames.split(',').map(name => name.trim());
      const actionNamesArray = namesArray.map(name => ({ name }));
      actionNamesArray.forEach(action => {
        permission.push({ roleId: data.roleId, moduleId: data.id, actionName: action.name })
      })
    })
    dispatch(setNewPermission(permission))
    navidate(`/settings/addRole`, {
      state: {
        id: data?.id || '',
        data: data || '',
        permissions: permission || '',
      },
    });
  };


  const switchHandler = (data) => {
    // dispatch(updateUserSwitchData(data.id, data.is_active));
  }

  useEffect(() => {
    dispatch({ type: GET_ROLE_TYPE });
    dispatch({ type: GET_MODULE_TYPE });
    dispatch({ type: GET_ALL_MODULES_BY_ROLE_TYPE });
    dispatch(setNewPermission([]))

  }, [dispatch]);

  roleData?.forEach(element => {
    element.moduleData = module_data_by_role?.filter(module => module.roleId == element.id);
  });

  const columns = useMemo(() => ([
    {
      Header: "Role Name",
      accessor: "label",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <RoleName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    // {
    //   Header: "Modules",
    //   accessor: "modulsedData",
    //   filterable: true,
    //   enableRowSpan: true,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             {module.name}
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={read_book_icon} alt="Upload" title="Read" height={20} className="p-0" />,
    //   accessor: "demo",
    //   filterable: true,
    //   enableRowSpan: true,
    //   width: 2,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //             checked={module.actionNames?.includes("READ") || false} />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={folder_plus_icon} alt="Upload" title="ADD" height={20} className="p-0" />,
    //   accessor: "ADD",
    //   filterable: true,
    //   enableRowSpan: true,
    //   width: 2,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //               checked={module.actionNames?.includes("ADD") || false} id="chk19" />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={writing_icon} alt="Upload" title="EDIT" height={20} className="p-0" />,
    //   accessor: "EDIT",
    //   filterable: true,
    //   enableRowSpan: true,
    //   width: 2,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //               checked={module.actionNames?.includes("EDIT") || false} id="chk19" />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={task_minus_icon} alt="Upload" title="DELETE" height={20} className="p-0" />,
    //   accessor: "DELETE",
    //   filterable: true,
    //   enableRowSpan: true,
    //   width: 2,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //               checked={module.actionNames?.includes("DELETE") || false} id="chk19" />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={find_book_icon} alt="Upload" title="SEARCH" height={20} className="p-0" />,
    //   accessor: "SEARCH",
    //   filterable: true,
    //   enableRowSpan: true,
    //   width: 2,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //               checked={module.actionNames?.includes("SEARCH") || false} id="chk19" />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={cloud_upload_icon} alt="Upload" title="UPLOAD" height={20} className="p-0" />,
    //   accessor: "UPLOAD",
    //   filterable: true,
    //   enableRowSpan: true,
    //   width: 2,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //               checked={module.actionNames?.includes("UPLOAD") || false} id="chk19" />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={download_icon} alt="Upload" title="DOWNLOAD" height={20} className="p-0" />,
    //   accessor: "DOWNLOAD",
    //   filterable: true,
    //   width: 2,
    //   enableRowSpan: true,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //               checked={module.actionNames?.includes("DOWNLOAD") || false} id="chk19" />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },
    // {
    //   Header: <img src={web_search_icon} alt="Upload" title="APPROVE" height={20} className="p-0" />,
    //   accessor: "APPROVE",
    //   filterable: true,
    //   width: 2,
    //   enableRowSpan: true,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <>
    //         {cellProps.row.original.moduleData.map((module, index) => (
    //           <div key={index}>
    //             <Input type="checkbox" className="custom-checkbox" readOnly
    //               checked={module.actionNames?.includes("APPROVE") || false} id="chk19" />
    //             {index !== cellProps.row.original.moduleData.length - 1 && <hr className="module-divider" />}
    //           </div>
    //         ))}
    //         {cellProps.row.original.moduleData.length == 0 &&
    //           <Input type="checkbox" className="custom-checkbox" readOnly checked={false} />
    //         }
    //       </>
    //     );
    //   },
    // },

    {
      Header: "No.of Users",
      accessor: "totalUsers",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <RoleName cellProps={cellProps} />
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
                  checked={cellProps.row.original?.status === "ACTIVE" || false}
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
    {
      Header: "Edit",
      Cell: (cellProps) => {
        return <Edit cellProps={cellProps} viewPopupHandler={editHandler} />
      },
    },
  ]), [roleData]);

  return (
    <>
      <div className="page-content settings_users_wrapper">
        <Container fluid>
          <div className="main_freight_wrapper">
            <TopBreadcrumbs breadcrumbs={RolesBreadcrumb} />
            <RoleTable
              columns={columns}
              data={roleData || []}
              isFilterable={true}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              component={"Roles"}
              loader={role_loader || false}
            />
          </div>
        </Container>
      </div>
    </>
  );

};

export default Roles;
