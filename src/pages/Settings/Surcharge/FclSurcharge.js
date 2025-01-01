import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { edit_icon } from '../../../assets/images'
import { fclSurchargeBreadcrumb } from '../../../common/data/procurement'
import { getAllTableSurcharge } from '../../../store/Settings/actions'
import FilterOffCanvasComp from "./Modal/FilterOffCanvasComp"
import { ChargeAliasCode, ChargeCategory, ChargeCode, ChargeDesc } from './SurchargeCol'
import TableReact from "./TableReact"
import TopBreadcrumbs from './TopBreadcrumbs'


export default function FclSurcharge() {
    const { settings_surcharges_table_data } = useSelector((state) => state?.settings);
    const [isRight, setIsRight] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const inputArr = {
        status: '',
        surcharge_code: '',
        surcharge_desc: '',
        surcharge_category: '',
        alias_code: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const dispatch = useDispatch();

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        console.log(filterDetails, "filterDetails fcl-----------------------")
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    useEffect(() => {
        if(currentPage !== '' && currentPage !== undefined){
            let url = `?page=${currentPage}&size=10`;
            dispatch(getAllTableSurcharge(url));
        }
    }, [dispatch,currentPage]);

    const columns = useMemo(() => [
        {
            Header: 'Surcharge Code',
            accessor: 'code',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeCode cellProps={cellProps} />
            }
        },
        {
            Header: 'Surcharge Desc',
            accessor: 'description',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeDesc cellProps={cellProps} />
            }
        },
        {
            Header: 'Surcharge Category',
            accessor: 'surchargeCategory.name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {

                return <ChargeCategory cellProps={cellProps} />
            }
        },
        {
            Header: 'SurchargeAliasCode',
            accessor: "surchargeAlias.name",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeAliasCode cellProps={cellProps} />
            }
        },
        {
            Header: 'Action',
            Cell: (cellProps) => {
                // console.log(cellProps, "cellProps in actions")
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem> 
                                <Link to="/settings/surcharge/add" state= {{ id: cellProps.row.original.id }} className='d-flex w-100'>Edit <img src={edit_icon} alt="Edit" className='ms-auto' /></Link>
                            </DropdownItem>
                            <DropdownItem onClick={(e) => e.stopPropagation()}>
                                Activate
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
    ]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">

                        {/* breadcrumbs && rate */}
                        <TopBreadcrumbs breadcrumbs={fclSurchargeBreadcrumb} />

                        {/* React Table */}
                        <TableReact
                            columns={columns}
                            data={settings_surcharges_table_data?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'fclSurcharge'}
                            setCurrentPage={setCurrentPage}
                            totalPages={settings_surcharges_table_data?.totalPages || 0}
                            totalEntries={settings_surcharges_table_data?.totalElements || 0}
                        />

                        {/* modal */}
                        {/* <ModalAddNew modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'fclSurcharge'} /> */}
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}