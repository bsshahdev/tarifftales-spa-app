import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'reactstrap'
import { salesEnquiryData } from '../../../common/data/dashboard'
import { inquiryBreadcrumb } from '../../../common/data/sales'
import TfBreadcrumbs from '../../../components/Common/TfBreadcrumbs'
import { getInquirySummeryData, getSalesInquiryData } from '../../../store/Sales/actions'
import { QueriesColVal } from "../partials/SalesCol";
import SalesCommonTable from '../partials/SalesCommonTable';
import FilterSalesInquiryComp from '../partials/FilterSalesInquiryComp';
import { FILTER_INQUIRY_DATA, GET_INQUIRY_DATA_SUCCESS } from '../../../store/Sales/actiontype';
export default function QueriesComp() {
    document.title = "Inquiry || Navigating Freight Costs with Precision||Ultimate Rate Management platform"

    const { inquiry_data_loader, inquiry_data } = useSelector((state) => state?.sales);
    const [isRight, setIsRight] = useState(false);
    const { inquiry_summary_data } = useSelector((state) => state?.sales);
    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();
    const inputArr = {
        org_port: '',
        dest_port: '',
        status: '',
        // quote_value: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        let newArr = [...inquiryData];
        const filteredDataArr = newArr.filter(item => {
            const originNameMatch = filterDetails?.org_port?.value === '' ||
                item?.org_port?.toLowerCase().includes(filterDetails?.org_port?.value?.toLowerCase());

            const isDestPortMatch = filterDetails?.dest_port?.value === '' ||
                item?.dest_port?.toLowerCase().includes(filterDetails?.dest_port?.value?.toLowerCase());

            const statusMatch = filterDetails?.status?.value === '' ||
                item?.status?.toLowerCase().includes(filterDetails?.status?.value?.toLowerCase());

            return originNameMatch && isDestPortMatch && statusMatch;
        });
        console.log(filteredDataArr, "filterDetails lcl-----------------------");
        dispatch({ type: GET_INQUIRY_DATA_SUCCESS, payload: filteredDataArr })
    }

    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    useEffect(() => {
        dispatch(getInquirySummeryData());
    }, []);

    useEffect(() => {
        let url = `?page=${currentPage}&size=10`;
        dispatch(getSalesInquiryData(url));
    },[dispatch,currentPage])

    const columns = useMemo(() => [
        {
            Header: 'Inquiry ID',
            accessor: 'inquiryId',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Inquiry Dt',
            accessor: 'inquiryDate',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Customer Name',
            accessor: 'customerName',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        // {
        //     Header: 'Customer Contact No',
        //     accessor: 'customerContactNo',
        //     filterable: true,
        //     disableFilters: true,
        //     Cell: (cellProps) => {
        //         return <QueriesColVal cellProps={cellProps} />
        //     }
        // },
        {
            Header: 'Origin',
            accessor: 'origin',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Destination',
            accessor: 'destination',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Ready Date',
            accessor: 'cargoDate',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Type',
            accessor: 'cargoType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Container type',
            accessor: 'containerTypes',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Weight',
            accessor: 'weight',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Value',
            accessor: 'cargoValue',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Incoterms',
            accessor: 'incoterm',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Sales Emp',
            accessor: 'salesEmp',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Status',
            accessor: 'status',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        }
    ]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        {/* breadcrumbs && rate */}
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={inquiryBreadcrumb} />
                            <div className="tf_box_wrap d-flex">
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Total Inquires</p>
                                    <div className="sh_inquiry_rate">{inquiry_summary_data?.totalCount}
                                        {inquiry_summary_data?.actionedCount !== undefined ? (
                                            <span className={`${inquiry_summary_data?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{inquiry_summary_data?.totalCountPercentage}%</span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Inquires Actioned</p>
                                    <div className="sh_inquiry_rate">{inquiry_summary_data?.actionedCount}
                                        {inquiry_summary_data?.compare_rate !== '' ? (
                                            <span className={`${inquiry_summary_data?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{inquiry_summary_data?.actionedCountPercentage}%</span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Pending Inquires</p>
                                    <div className="sh_inquiry_rate">{inquiry_summary_data?.pendingCount}
                                        {inquiry_summary_data?.compare_rate !== '' ? (
                                            <span className={`${inquiry_summary_data?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{inquiry_summary_data?.pendingCountPercentage}%</span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">SLA breached</p>
                                    <div className="sh_inquiry_rate">{inquiry_summary_data?.slaBreachedCount}
                                        <span className={`${inquiry_summary_data?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{inquiry_summary_data?.slaBreachedCountPercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* sales table && filter */}
                        <SalesCommonTable
                            columns={columns}
                            data={!!inquiry_data.content ? inquiry_data.content : []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            loader={inquiry_data_loader}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'inquiry'}
                            setCurrentPage={setCurrentPage}
                            totalPages={inquiry_data?.totalPages || 0}
                            totalEntries={inquiry_data?.totalElements || 0}
                        />
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterSalesInquiryComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}
