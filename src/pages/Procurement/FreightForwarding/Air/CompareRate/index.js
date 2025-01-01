import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import FilterOffCanvasComp from '../../Modal/FilterOffCanvasComp';
import TableCompareRate from './TableCompareRate';
import { CommonValue } from '../../partials/OceanCol';
import AirCompare from './AirCompare';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_CARGO_TYPE_DATA } from '../../../../../store/Global/actiontype';
import { airDummyData, comparetableData } from '../../../../../common/data/procurement';

const CompareRate = () => {
    document.title = "Air Master || Navigating Freight Costs with Precision || Ultimate Rate Management platform"
    const [modal, setModal] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);
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
    const dispatch = useDispatch();

    const onCloseClick = () => {
        setModal(false);
    }

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        console.log(filterDetails, "filterDetails Air MaterBill-----------------------")
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    

    const columns = useMemo(() => [
        {
            Header: 'Booking Mode',
            accessor: 'bookingMode',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <span>{cellProps.value ? cellProps.value : '-'}</span>
            }
        },
        {
            Header: 'Origin',
            accessor: 'origin',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <span>{cellProps.value ? cellProps.value : '-'}</span>
            }
        },
        {
            Header: 'Destination',
            accessor: 'destination',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <span>{cellProps.value ? cellProps.value : '-'}</span>
            }
        },
        {
            Header: 'Cargo Mode',
            accessor: 'cargoMode',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <span>{cellProps.value ? cellProps.value : '-'}</span>
            }
        },
        {
            Header: 'Cargo Type',
            accessor: 'cargoType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <span>{cellProps.value ? cellProps.value : '-'}</span>
            }
        },
        {
            Header: 'Weight',
            accessor: 'weight',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <span>{cellProps.value ? cellProps.value : '-'}</span>
            }
        },
        ...(headerData && headerData?.map(h => {
            return {
                Header: h.key,
                columns: [
                    {
                        Header: 'Carrier',
                        accessor: `${h.key}.airLines`,
                        filterable: true,
                        disableFilters: true,
                        Cell: (cellProps) => {
                            return <span>{cellProps.value ? cellProps.value : '-'}</span>
                        }
                    },
                    {
                        Header: 'Frght/Kg',
                        accessor: `${h.key}.freightAmount`,
                        filterable: true,
                        disableFilters: true,
                        Cell: (cellProps) => {
                            return <span>{cellProps.value ? cellProps.value : '-'}</span>
                        }
                    },
                    {
                        Header: 'Oth Chrgs/KG',
                        accessor: `${h.key}.otherPerKg`,
                        filterable: true,
                        disableFilters: true,
                        Cell: (cellProps) => {
                            return <CommonValue cellProps={cellProps} />
                        }
                    },
                    {
                        Header: 'Total/KG',
                        accessor: `${h.key}.totalAmount`,
                        filterable: true,
                        disableFilters: true,
                        Cell: (cellProps) => {
                            return <span>{cellProps.value ? cellProps.value : '-'}</span>
                        }
                    }
                ]
            }
        })),
    ]);

    useEffect(() => {
        const newArray = comparetableData

        const bodyData = newArray.map((ele) => ({
            ...ele,
            items: [],
            ...Object.fromEntries(ele.items.map((data, i) => [`L${i + 1}`, { key: `L${i + 1}`, ...data }])),
        }));

        const headers = [...new Set(newArray?.flatMap(val =>
            val?.items?.map((_, index) => `L${index + 1}`)
        ))].map(key => ({ key }));

        setBodyData(bodyData);
        setHeaderData(headers);

    }, [comparetableData]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        {/* Compare */}
                        <AirCompare />

                        <TableCompareRate
                            columns={columns}
                            data={bodyData || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'air-waybill'}
                            loader={false}
                        />

                        {/* modal */}
                        {/* <ModalAir modal={modal} onCloseClick={onCloseClick} viewData={waybillFreightData} modalType={'air_waybill'} /> */}
                    </div>
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}

export default CompareRate
