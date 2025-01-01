import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container
} from "reactstrap";
import { getAllPartiesCustomerData } from "../../store/Parties/Customer/action";
import { getCustomersCityData, updateCustomerSwitchData } from "../../store/Parties/actions";
import ModalCustomerValue from "./Modal/ModalCustomerValue";
import {
  City,
  CommonValue,
  ConatctNo,
  ContactName,
  Country,
  CustomerName,
  CustomerType,
  EmailId
} from "./PartiesCol";
import TableCustomers from "./TableCustomers";
import TopBreadcrumbs from "../Settings/Surcharge/TopBreadcrumbs";
import { customersBreadcrumb } from "../../common/data/parties";
import { Edit } from "../Settings/SettingsCol";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [modal, setModal] = useState(false);
  const [viewData, setViewData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);

  const { customer_data, customer_loader } = useSelector((state) => state?.customer);

  const viewPopupHandler = (data) => {
    setModal(true);
    setViewData(data);
  };

  const onCloseClick = () => {
    setModal(false);
  }

  const switchHandler = (data) => {
    dispatch(updateCustomerSwitchData(data.id, data.is_active));
  }
  const editHandler = (data) => {
    console.log(data);
    navigate(`/customers/add-customer`, {
      state: {
        id: data?.id || '',
        data: data
      },
    });
  };

  useEffect(() => {
    dispatch(getCustomersCityData())
  }, [dispatch]);

  useEffect(() => {
    if(currentPage !== '' && currentPage !== undefined){
      let url = `?page=${currentPage}&size=10`;
      dispatch(getAllPartiesCustomerData(url))
    }
  }, [dispatch,currentPage]);

  const columns = useMemo(
    () => [
      {
        Header: "Customer Code",
        accessor: "customerCode",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CommonValue
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Customer Name",
        accessor: "name",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CustomerName
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Customer Type",
        accessor: "type",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CustomerType
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Contact Name",
        accessor: "contactName",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ContactName
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Contact No",
        accessor: "contactNo",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ConatctNo
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Email Id",
        accessor: "contactEmail",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <EmailId
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "City",
        accessor: "city.cityName",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <City cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
          );
        },
      },
      {
        Header: "Country",
        accessor: "country.countryName",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <Country
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Sales Manager",
        accessor: "salesUser.firstName",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CommonValue
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Edit",
        Cell: (cellProps) => {
          return <Edit cellProps={cellProps} viewPopupHandler={editHandler} />
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="page-content settings_users_wrapper">
        <Container fluid>
          <div className="main_freight_wrapper">
            {/* breadcrumbs */}
            <TopBreadcrumbs breadcrumbs={customersBreadcrumb} />

            {/* React Table */}
            <TableCustomers
              columns={columns}
              data={customer_data?.content || []}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              // toggleRightCanvas={toggleRightCanvas}
              component={"Customers"}
              loader={customer_loader || false}
              setCurrentPage={setCurrentPage}
              totalPages={customer_data?.totalPages || 0}
              totalEntries={customer_data?.totalElements || 0}
            />

            {/* modal */}
            <ModalCustomerValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'customer'} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Customers;
