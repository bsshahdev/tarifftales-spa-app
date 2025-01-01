import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllTableVendor, getCustomersCityData, getCustomersData, getVendorsData, updateCustomerSwitchData, updateVendorSwitchData } from '../../store/Parties/actions';
import { useSelector } from 'react-redux';
import TableVenders from './TableVenders';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap';
import { City, CityV, CommonReplaceValue, CommonValue, ConatctName, ConatctNo, ConatctNoV, CreatedOn, CreatedOnV, EmailId, EmailIdV, LastTransactionV, ServiceType, VendorCode, VendorName, VendorType } from './PartiesCol';
import { edit_icon } from '../../assets/images';
import ModalVendorValue from './Modal/ModalVendorValue';
import { getVendorDataListAction, getVendorListAction } from '../../store/Parties/Vendor/action';
import TopBreadcrumbs from '../Settings/Surcharge/TopBreadcrumbs';
import { vendorsBreadcrumb } from '../../common/data/parties';
import { Edit } from '../Settings/SettingsCol';
import { useNavigate } from 'react-router-dom';
import { VENDOR_TAB_ACTIVE_TYPE } from '../../store/Parties/Vendor/actiontype';

const Vendors = () => {
  const [modal, setModal] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { vendor_loader, vendors_data_list } = useSelector((state) => state?.vendor);

  const viewPopupHandler = (data) => {
    setModal(true);
    setViewData(data);
  };

  const onCloseClick = () => {
    setModal(false);
  }
  const editHandler = (data) => {
    console.log(data);
    navigate(`/vendor/add-vendor`, {
      state: {
        id: data?.id || '',
        data: data
      },
    });
  };

  useEffect(() => {
    dispatch(getCustomersCityData())
    dispatch({ type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 1, details: 'pending', contact: 'pending', document: 'pending' } })
  }, []);

  useEffect(() => {
    let url = `?page=${currentPage}&size=10`;
    dispatch(getVendorDataListAction(url));
  }, [dispatch, currentPage]);

  const columns = useMemo(() => [
    {
      Header: "Vendor Code",
      accessor: "vendorCode",
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
      Header: "Vendor Name",
      accessor: "name",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Vendor Type",
      accessor: "vendorType",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Service Type",
      accessor: "transportMode",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "City",
      accessor: 'city.cityName',
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Created On",
      accessor: 'createdDate',
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CreatedOn cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
            {/* breadcrumbs && rate */}
            <TopBreadcrumbs breadcrumbs={vendorsBreadcrumb} />

            {/* React Table */}
            <TableVenders
              columns={columns}
              data={vendors_data_list?.content || []}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              //   toggleRightCanvas={toggleRightCanvas}
              component={"Customers"}
              loader={vendor_loader || false}
              setCurrentPage={setCurrentPage}
              totalPages={vendors_data_list?.totalPages || 0}
              totalEntries={vendors_data_list?.totalElements || 0}
            />

            {/* modal */}
            <ModalVendorValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'vendor'} />
          </div>
        </Container>
      </div>
    </>
  )
}

export default Vendors
