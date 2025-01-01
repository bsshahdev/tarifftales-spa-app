import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'

import { edit_icon, eye_icon } from '../../../../assets/images'
import { fclBreadcrumb } from '../../../../common/data/procurement'
import TfBreadcrumbs from '../../../../components/Common/TfBreadcrumbs'
import { getFclData, getFclFreightViewAction, getFclSurchargeViewAction, getOceanDetails, getOceanTableData, uploadFclCarrierData } from '../../../../store/Procurement/actions'
import FilterOffCanvasComp from '../Modal/FilterOffCanvasComp'
import { ChargeId, CommonReplaceValue, ValidTill, VendorName } from '../partials/OceanCol'
import TableReact from '../partials/TableReact'
import { useNavigate } from 'react-router-dom'
import AddSurchargesModal from './AddSurchargesModal'
import { GET_CARGO_TYPE_DATA, GET_UOM_DATA } from '../../../../store/Global/actiontype'
import { GET_AIR_LOCATION_TYPE } from '../../../../store/InstantRate/actionType'
import { GET_ALL_TENANT_CARGO_MODE } from '../../../../store/Procurement/actiontype'

export default function FclOceanFreightUpload() {
    document.title = "FCL || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    const { fcl_table_data, fcl_get_freight_view_loader } = useSelector((state) => state.procurement);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState();
    const navigate = useNavigate();
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
    const dispatch = useDispatch();

    const viewPopupHandler = (data) => {
        console.log(data);
        navigate(`/freight/ocean/fcl/Details`, {
            state: {
                data: data || '',
            },
        })
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

    useEffect(() => {
        if (!(fcl_table_data.content && fcl_table_data.content.length > 0)) {
            dispatch({ type: GET_CARGO_TYPE_DATA });
            dispatch({ type: GET_AIR_LOCATION_TYPE });
            dispatch({ type: GET_UOM_DATA });
            dispatch({ type: GET_ALL_TENANT_CARGO_MODE });
        }
    }, [])

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
        if (currentPage !== '' && currentPage !== undefined) {
            let url = `?page=${currentPage}&size=10`;
            dispatch(getOceanTableData(url));
        }
    }, []);


    const columns = useMemo(() => [
        {
            Header: 'Agent',
            accessor: "agentName",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Carrier name',
            accessor: "carrierName",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        // {
        //     Header: 'Vendor Type',
        //     accessor: "vendorType",
        //     filterable: true,
        //     disableFilters: true,
        //     Cell: (cellProps) => {
        //         return <VendorName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        //     }
        // },
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
            Header: 'Valid From',
            accessor: 'validFrom',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
            Header: 'Port of Loading',
            accessor: 'originPort',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Total Destination Pairs',
            accessor: 'totalCount',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
                            {/* <DropdownItem onClick={(e) => { e.stopPropagation(); editPopupHandler(cellProps.row.original) }}>Edit <img src={edit_icon} alt="Edit" /></DropdownItem> */}
                            <DropdownItem onClick={(e) => { e.stopPropagation(); setModal(true); setViewData(cellProps.row.original) }}>Add Additional Surcharges</DropdownItem>
                            <DropdownItem onClick={(e) => { e.stopPropagation(); viewPopupHandler(cellProps.row.original) }}>View Freight<img src={eye_icon} alt="Eye" /></DropdownItem>
                            <DropdownItem onClick={(e) => { e.stopPropagation(); navigate(`/freight/ocean/fcl/surcharge/Details`, { state: { data: cellProps.row.original || '', }, }) }}>View Surcharges<img src={eye_icon} alt="Eye" /></DropdownItem>
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
    ], []);

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
                            data={fcl_table_data?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'fcl_upload'}
                            loader={fcl_get_freight_view_loader}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={fcl_table_data?.totalElements/10 || 0}
                            totalEntries={fcl_table_data?.totalElements || 0}
                            pageOffset={fcl_table_data?.offset || 0}
                        />

                        {/* modal */}
                        <AddSurchargesModal modal={modal} onCloseClick={onCloseClick} data={viewData} />
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            {/* <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} /> */}
        </>
    )
}