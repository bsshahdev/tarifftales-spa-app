import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, DropdownItem, FormGroup, Input } from "reactstrap";
import { usersBreadcrumb } from "../../common/data/parties";
import { getUsersData, updateUserSwitchData } from "../../store/Settings/actions";
import ModalResetPassword from "./Modal/ModalResetPassword";
import { Edit, FirstName, LastActive, LastName, ResetPassword, Role, UserName } from "./SettingsCol";
import TopBreadcrumbs from "./Surcharge/TopBreadcrumbs";
import TableUsers from "./TableUsers";
import { GET_ROLE_TYPE } from "../../store/Global/actiontype";

const Users = () => {
  const [resetModal, setResetModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navidate = useNavigate();
  const [viewData, setViewData] = useState();

  const resetHandler = (data) => {
    setViewData(data)
    setResetModal(true);
  }

  const { settings_users_data, users_loader } = useSelector((state) => state.settings);
  const { roleData } = useSelector((state) => state.globalReducer);

  const onCloseClick = () => {
    setResetModal(false);
  }

  const viewPopupHandler = (data) => {
    console.log("popup");
  };
  const editHandler = (data) => {
    navidate(`/settings/users/addUser`, {
      state: {
        id: data?.id || '',
      },
    });
  };

  const switchHandler = (data) => {
    dispatch(updateUserSwitchData(data.id, data.is_active));
  }

  useEffect(() => {
    if (currentPage !== '' && currentPage !== undefined) {
      let url = `?page=${currentPage}&size=10`;
      dispatch(getUsersData(url));
    }
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch({ type: GET_ROLE_TYPE });
  }, [dispatch]);

  const columns = useMemo(() => ([
    {
      Header: "User Name",
      accessor: "email",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <UserName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "First Name",
      accessor: "firstName",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <FirstName
            cellProps={cellProps}
            viewPopupHandler={viewPopupHandler}
          />
        );
      },
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <LastName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Role",
      accessor: "roles",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <Role cellProps={cellProps} viewPopupHandler={viewPopupHandler} roleData={roleData} />
        );
      },
    },
    {
      Header: "Last Active",
      accessor: "lastLoggedIn",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <LastActive cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Reset Password",
      accessor: "reset_password",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <ResetPassword
            cellProps={cellProps}
            viewPopupHandler={resetHandler}
          />
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
            {/* breadcrumbs && rate */}
            <TopBreadcrumbs breadcrumbs={usersBreadcrumb} />

            {/* React Table */}
            <TableUsers
              columns={columns}
              data={settings_users_data?.content || []}
              isFilterable={true}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              component={"Users"}
              loader={users_loader || false}
              setCurrentPage={setCurrentPage}
              totalPages={settings_users_data?.totalPages || 0}
              totalEntries={settings_users_data?.totalElements || 0}
            />

            {/* modal */}
            {/* <ModalSurchargeValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'PortLocalCharges'} /> */}
            <ModalResetPassword modal={resetModal} onCloseClick={onCloseClick} viewData={viewData} />

          </div>
        </Container>
      </div>
    </>
  );
};

export default Users;
