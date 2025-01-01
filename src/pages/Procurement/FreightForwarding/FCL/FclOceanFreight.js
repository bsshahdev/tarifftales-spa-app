import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'

import { edit_icon, eye_icon } from '../../../../assets/images'
import { fclBreadcrumb } from '../../../../common/data/procurement'
import TfBreadcrumbs from '../../../../components/Common/TfBreadcrumbs'
import { getFclData, getFclFreightViewAction, getFclSurchargeViewAction, uploadFclCarrierData } from '../../../../store/Procurement/actions'
import FilterOffCanvasComp from '../Modal/FilterOffCanvasComp'
import { ChargeId, CommonReplaceValue, ValidTill, VendorName } from '../partials/OceanCol'
import TableReact from '../partials/TableReact'
import ModalFCLFreight from './ModalFCLFreight'

export default function FclOceanFreight() {
    document.title = "FCL || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    const fclData = useSelector((state) => state.procurement.fcl_data);
    const fcl_loader = useSelector((state) => state.procurement.fcl_get_loader);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const inputArr = {
        vendor_name: '',
        carrier_name: '',
        validity_from: '',
        validity_to: '',
        status: 'ACTIVE',
        rate_type: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const dispatch = useDispatch();

    const viewPopupHandler = (data) => {
        if (data?.status === "ACTIVE") {
            setModal(true);
            setViewData(data);
            dispatch(getFclFreightViewAction(data?.id));
            dispatch(getFclSurchargeViewAction(data?.id));
        } else {
            console.log("Cannot view details for inactive data");
        }
    }

    const editPopupHandler = (data) => {
        console.log(data, "data");
        // navigate('/freight/ocean/fcl', { state: { data: data?.id } });
    }

    // modal
    const onCloseClick = () => {
        setModal(false);
    }

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        if(filterDetails.carrier_name !== '' || filterDetails.vendor_name !== '' || filterDetails.validity_from !== '' || filterDetails.validity_to !== '' || filterDetails.rate_type !== ''){
            let url = `?page=${currentPage}&size=10&`
            url+= `${filterDetails?.carrier_name?.id ? `carriers=${filterDetails?.carrier_name?.id}&` : ''}${filterDetails?.vendor_name?.id ? `vendors=${filterDetails?.vendor_name?.id}&` : ''}${filterDetails?.validity_from ? `validFrom=${filterDetails?.validity_from}&` : ''}${filterDetails?.validity_to ? `validTo=${filterDetails?.validity_to}&` : ''}${filterDetails?.rate_type?.value ? `rateType=${filterDetails?.rate_type?.value}&${filterDetails?.status ? `status=${filterDetails?.status}` : ''}&` : ''}`
            let newurl = url.substring(0, url.length - 1)
            dispatch(getFclData(newurl));
        }
    }
    const clearValueHandler = () => {
        setIsRight(false);
        dispatch(getFclData(`?page=${currentPage}&size=10`));
        setfilterDetails(inputArr)
    }

    // Activate deactivate table data
    const switchHandler = (data) => {
        let obj = {
            id: data.id,
            version: data.version,
            status: data.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }
        console.log(obj, "obj fcl");
        dispatch(uploadFclCarrierData({ ...obj }));
    }

    useEffect(() => {
        if(currentPage !== '' && currentPage !== undefined){
            let url = `?page=${currentPage}&size=10`;
            dispatch(getFclData(url));
        }
    }, [dispatch,currentPage]);

    // useEffect(() => {
    //     setCurrentPage(fclData?.pageNumber || '');
    // }, [fclData]);

    const columns = useMemo(() => [
        {
            Header: 'Charge ID',
            accessor: 'id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeId cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Name/Carrier Name',
            accessor: (row) => `${row.tenantVendor === null ? row.tenantCarrierVendor.name : row.tenantVendor.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <VendorName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Rate Type',
            accessor: 'rateType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Rate Source',
            accessor: 'rateSource',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Valid To',
            accessor: 'validTo',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Valid From',
            accessor: 'validFrom',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Validity Application',
            accessor: 'validityApplication',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Action',
            Cell: (cellProps) => {
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem onClick={(e) => { e.stopPropagation(); editPopupHandler(cellProps.row.original) }}>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
                            <DropdownItem onClick={(e) => { e.stopPropagation(); viewPopupHandler(cellProps.row.original) }}>View <img src={eye_icon} alt="Eye" /></DropdownItem>
                            <DropdownItem onClick={(e) => e.stopPropagation()}>
                                {cellProps.row.original?.status === "ACTIVE" ? "Activate" : "Deactive"}
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
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }
        },
    ]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">

                        {/* breadcrumbs && rate */}
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={fclBreadcrumb} />
                        </div>
                        {/* <TopBreadcrumbs breadcrumbs={fclBreadcrumb} data={fclRateData} /> */}
                        {/* React Table */}
                        <TableReact
                            columns={columns}
                            data={fclData?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'fcl'}
                            loader={fcl_loader}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={fclData?.totalPages || 0}
                            totalEntries={fclData?.totalElements || 0}
                            pageOffset={fclData?.offset || 0}
                        />

                        {/* modal */}
                        <ModalFCLFreight modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'fcl'} />
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}