import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap';

import { edit_icon, eye_icon } from '../../../../assets/images';
import { consoleBreadcrumb, consoleRateData } from '../../../../common/data/procurement';
import { getAirConsoleDataById, getAirConsoleData, updateAirConsoleSwitchData } from '../../../../store/Procurement/actions';
import FilterOffCanvasComp from '../Modal/FilterOffCanvasComp';
import ModalAirConsole from './ModalAirConsole';
import { CargoType, CarrierName, ChargeId, DestPort, DetentionFree, OrgPort, TransitTime, ValidTill, VendorName, ViaPort } from '../partials/OceanCol';
import TopBreadcrumbs from '../partials/TopBreadcrumbs';
import TableAirwayConsoleData from './TableAirwayConsoleData'
import { useNavigate } from 'react-router-dom';

export default function AirConsoleComp() {
    document.title = "Air Console || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const navigate = useNavigate();
    const inputArr = {
        vendor_name: '',
        carrier_name: '',
        validity_from: '',
        validity_to: '',
        org_port: '',
        dest_port: '',
        cargo_type: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const { consoleData, consoleDataLoader } = useSelector((state) => state?.procurement);
    const dispatch = useDispatch();

    const viewPopupHandler = (data) => {
        navigate(`/freight/air/masterConsole/details`, {
            state: {
                data: data || '',
            },
        })
        // if (data?.status == "ACTIVE") {
        //     dispatch(getAirConsoleDataById(data?.id));
        //     setModal(true);
        //     setViewData(data);
        // } else {
        //     console.log("Cannot view details for inactive data");
        // }
    }

    const onCloseClick = () => {
        setModal(false);
    }

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        console.log(filterDetails, "filterDetails Air Console -----------------------")
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    // Activate deactivate table data
    const switchHandler = (data) => {
        dispatch(updateAirConsoleSwitchData(data.id, data.is_active));
    }

    useEffect(() => {
        dispatch(getAirConsoleData());
    }, [dispatch])

    const columns = useMemo(() => [
        {
            Header: 'Agent',
            accessor: "agentName",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CarrierName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Carrier Name',
            accessor: "carrierName",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CarrierName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Type',
            accessor: "vendorType",
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
            Header: 'Total Port Pairs',
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
                            <DropdownItem>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
                            <DropdownItem onClick={(e) => { e.stopPropagation(); viewPopupHandler(cellProps.row.original) }}>View <img src={eye_icon} alt="Eye" /></DropdownItem>
                            <DropdownItem onClick={(e) => e.stopPropagation()}>
                                {cellProps.row.original?.is_active ? "Activate" : "Deactivate"}
                                <div className="switch_wrap">
                                    <FormGroup switch>
                                        <Input
                                            type="switch"
                                            checked={cellProps.row.original?.is_active || false}
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
                        <TopBreadcrumbs breadcrumbs={consoleBreadcrumb} data={consoleRateData} />

                        {/* React Table */}
                        <TableAirwayConsoleData
                            columns={columns}
                            data={consoleData?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'console'}
                            loader={consoleDataLoader}
                        />

                        {/* modal */}
                        <ModalAirConsole modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'air_console'} />
                    </div>
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}
