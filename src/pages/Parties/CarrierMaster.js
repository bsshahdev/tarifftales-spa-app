import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container
} from "reactstrap";
import { getCustomersCityData, updateCustomerSwitchData } from "../../store/Parties/actions";
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
import TopBreadcrumbs from "../Settings/Surcharge/TopBreadcrumbs";
import { carrierMasterBreadcrumb } from "../../common/data/parties";
import { Edit } from "../Settings/SettingsCol";
import { useNavigate } from "react-router-dom";
import { getVendorCarrierDataAction } from "../../store/Parties/Vendor/action";
import TableVenders from "./TableVenders";
import ModalVendorValue from "./Modal/ModalVendorValue";

const CarrierMaster = () => {
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);

    const { vendor_carrier_data, vendor_loader } = useSelector((state) => state?.vendor);

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
        // data.tenantVendor.vendorCode=data.tenantVendor.carrierCode;
        // data.tenantVendor.vendorType="CARRIER";
        navigate(`/vendor/add-vendor`, {
            state: {
                carrierMaster: data,
                id: data?.tenantVendor?.id || '',
                data: data.tenantVendor || ''
            },
        });
    };

    useEffect(() => {
        let url = `?page=${currentPage}&size=10`;
        dispatch(getVendorCarrierDataAction(url))
    }, [dispatch, currentPage]);

    const columns = useMemo(
        () => [
            {
                Header: "Carrier Code",
                accessor: "carrierCode",
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
                Header: "Carrier Name",
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
                Header: "Carrier Type",
                accessor: "carrierType",
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
                accessor: "tenantVendor.contactName",
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
                accessor: "tenantVendor.contactNo",
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
                accessor: "tenantVendor.contactEmail",
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
                accessor: "tenantVendor.city.cityName",
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return (
                        <City cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    );
                },
            },
            {
                Header: "Transport Mode",
                accessor: "transportMode",
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
                        <TopBreadcrumbs breadcrumbs={carrierMasterBreadcrumb} />

                        <TableVenders
                            columns={columns}
                            data={vendor_carrier_data.content && vendor_carrier_data.content.length > 0 ? vendor_carrier_data.content : [] || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            // toggleRightCanvas={toggleRightCanvas}
                            component={"carrierMaster"}
                            loader={vendor_loader || false}
                            setCurrentPage={setCurrentPage}
                            totalPages={vendor_carrier_data.totalPages || 0}
                            totalEntries={vendor_carrier_data?.totalElements || 0}
                        />

                        {/* modal */}
                        <ModalVendorValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'vendor'} />
                    </div>
                </Container>
            </div>
        </>
    );
};

export default CarrierMaster;
