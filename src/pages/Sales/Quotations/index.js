import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { edit_icon, eye_icon } from '../../../assets/images'
import { airSearchData, quotationBreadcrumb } from '../../../common/data/sales'
import TfBreadcrumbs from '../../../components/Common/TfBreadcrumbs'
import { QUOTATION_RESULT_SELECTED } from '../../../store/InstantRate/actionType'
import { getSalesQuotationData } from '../../../store/Sales/actions'
import { FILTER_QUOTATION_DATA } from '../../../store/Sales/actiontype'
import QuotationModalComp from '../../InstantRate/partials/QuotationModalComp'
import FilterSalesComp from '../partials/FilterSalesComp'
import { CommonValue } from '../partials/SalesCol'
import SalesCommonTable from '../partials/SalesCommonTable'
import PreviewQuotationModal from '../../InstantRate/Preview/PreviewQuotationModal'
import QueriesCompDemo from '../Queries/BKP-quotation-draggable-index'
import SalesHistoryComp from '../partials/SalesHistoryComp'

export default function Quotations() {
    document.title = "Sales || Navigating Freight Costs with Precision||Ultimate Rate Management platform"

    const quotationData = useSelector((state) => state?.sales?.quotation_data);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);

    const inputArr = {
        quote_value: [],
        // expiration_date: [],
        quotation_from: '',
        quotation_to: '',
        org_port: '',
        dest_port: '',
        quote_mode: '',
        quote_status: '',
        // quote_value: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const navigateType = useLocation();
    const dispatch = useDispatch();
    console.log(navigateType, "navigateType");

    const viewPopupHandler = (data, type) => {
        setModal(true);
        // console.log(type,"type");
        setModalType(type);
        dispatch({ type: QUOTATION_RESULT_SELECTED, payload: data })
    }

    function QuoteModalHandler(type,data) {
        console.log(type,data);
        viewPopupHandler(airSearchData,type)
        setModal(!modal);
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
        let newArr = [...quotationData];
        const filteredDataArr = newArr.filter(item => {
            const originNameMatch = filterDetails?.org_port?.value === '' ||
                item?.org_port?.toLowerCase().includes(filterDetails?.org_port?.value?.toLowerCase());

            const isDestPortMatch = filterDetails?.dest_port?.value === '' ||
                item?.dest_port?.toLowerCase().includes(filterDetails?.dest_port?.value?.toLowerCase());

            const statusMatch = filterDetails?.quote_status?.value === '' ||
                item?.quote_status?.toLowerCase().includes(filterDetails?.quote_status?.value?.toLowerCase());

            return originNameMatch && isDestPortMatch && statusMatch;
        });
        console.log(filteredDataArr, "filterDetails lcl-----------------------");
        dispatch({ type: FILTER_QUOTATION_DATA, payload: filteredDataArr })
    }

    const clearValueHandler = () => {
        setfilterDetails(inputArr)
        dispatch(getSalesQuotationData());
    }

    // useEffect(() => {
    //     dispatch(getSalesQuotationData());
    // }, [dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Quotation Date',
            accessor: 'quotation_date',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Quotation ID',
            accessor: 'quotation_id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Customer Name',
            accessor: 'customer_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Origin',
            accessor: 'org_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Destination',
            accessor: 'dest_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Mode',
            accessor: 'quote_mode',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Transport By',
            accessor: 'transport_by',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Weight/Container Type',
            accessor: 'weight_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Quotation Value',
            accessor: 'quote_val',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Status',
            accessor: 'quote_status',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Sales Person',
            accessor: 'sales_person',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
                            <DropdownItem onClick={(e) => { e.stopPropagation(); viewPopupHandler(cellProps.row.original, 'view') }}>View <img src={eye_icon} alt="Eye" /></DropdownItem>
                            {cellProps?.row?.original?.quote_status.toLowerCase() === 'in progress' && <DropdownItem onClick={(e) => { e.stopPropagation(); viewPopupHandler(cellProps.row.original, 'edit') }}>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>}
                            {/* <DropdownItem onClick={(e) => e.stopPropagation()}>
                                Status Update <img src={status_update} alt="Status" />
                            </DropdownItem> */}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }
        },
    ]);

    // preview Modal
    const previewModalHand = () => {
        setPreviewModal(!previewModal);
    }

    // ----------------- quotation rate
    let wonCount = quotationData?.filter((obj) => obj?.quote_status?.toLowerCase() === 'won');
    let lotCount = quotationData?.filter((obj) => obj?.quote_status?.toLowerCase() === 'lost');
    let progressCount = quotationData?.filter((obj) => obj?.quote_status?.toLowerCase() === 'in progress');

    const quotationRateData = [
        {
            id: 1,
            title: 'Quotation Sent',
            rate: (quotationData?.length || 0),
            compare_rate: '50',
            rate_type: 'up'
        },
        {
            id: 2,
            title: 'Quotation Won',
            rate: (wonCount?.length || 0),
            compare_rate: '33',
            rate_type: 'up'
        },
        {
            id: 3,
            title: 'Quotation Lost',
            rate: (lotCount?.length || 0),
            compare_rate: (lotCount?.length * 100 / quotationData?.length),
            rate_type: (wonCount?.length > lotCount?.length ? 'down' : 'up')
        },
        {
            id: 4,
            title: 'Quotation In Progress',
            rate: (progressCount?.length || 0),
            compare_rate: '',
            rate_type: ''
        },
    ]

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper main_sales_wrapper">
                        {/* breadcrumbs && rate */}
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={quotationBreadcrumb} />
                            {/* <div className="tf_box_wrap d-flex">
                                {(quotationRateData || []).map((item) => (
                                    <div className="sh_box flex-grow-1" key={item?.id}>
                                        <p className="box_title">{item?.title}</p>
                                        <div className="sh_inquiry_rate">{item?.rate}
                                            {item?.compare_rate !== '' ? (
                                                <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </div>

                        {/* sales table && filter */}
                        {/* <SalesCommonTable
                            columns={columns}
                            // data={quotationData}
                            data={navigateType?.state?.id === 'Quotation Won' ? quotationData?.filter((item) => item?.quote_status?.toLowerCase() === 'won') : 
                                navigateType?.state?.id === 'Quotation Lost' ? quotationData?.filter((item) => item?.quote_status?.toLowerCase() === 'lost') :
                                navigateType?.state?.id === 'Quotation In progress' ? quotationData?.filter((item) => item?.quote_status?.toLowerCase() === 'in progress')
                                : quotationData}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'quotation'}
                        /> */}
                        <QueriesCompDemo  toggleRightCanvas={toggleRightCanvas} QuoteModalHandler={QuoteModalHandler} previewModalHand={previewModalHand}/>
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterSalesComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />

            {/* Quotation Modal */}
            <QuotationModalComp quoteModal={modal} setQuoteModal={setModal} QuoteModalHandler={QuoteModalHandler} viewData={modalType !== 'edit' && true} setPreviewModal={setPreviewModal} />

            {/* Preview Quotation Modal */}
            <SalesHistoryComp isRight={previewModal} previewModalHand={previewModalHand} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
           
        </>
    )
}
