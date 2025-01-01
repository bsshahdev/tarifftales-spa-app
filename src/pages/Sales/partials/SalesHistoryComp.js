import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import React, { useCallback, useEffect, useState } from 'react';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { useSelector } from 'react-redux';

export default function SalesHistoryComp({ isRight, previewModalHand, filterDetails, setfilterDetails, applyFilterHandler, clearValueHandler }) {
    const [rangeValues, setRangeValues] = useState([45, 2500]); // Initial values for the range slider
    const [dateRange, setDateRange] = useState([new Date(2023, 0, 1), new Date(2023, 10, 5)]);
    const { vendor_data, cargoType_data, container_data } = useSelector((state) => state.globalReducer);
    const [optionVendorName, setOptionVendorName] = useState([]);
    const [optionCarrierName, setOptionCarrierName] = useState([]);
    const formatDate = (date) => {
        // Format date as needed (e.g., "MM/DD/YYYY")
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-GB', options);
    };

    const handleRangeChange = (values, handle) => {
        let newObj = {
            ...filterDetails,
            quote_value: values
        }
        setRangeValues(values);
        setfilterDetails(newObj);
    };

    const handleDateChange = (values, handle) => {
        let newDate = values.map((value) => new Date(Number(value)));
        setDateRange(newDate);
        let newObj = {
            ...filterDetails,
            expiration_date: newDate
        }
        setfilterDetails(newObj);
    };

    const handleSelectGroup = useCallback((name, opt) => {
        let newObj = {
            ...filterDetails,
            [name]: opt
        }
        setfilterDetails(newObj);
    }, [filterDetails]);

    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType, transportMode: item?.transportMode }
        });
        let carrierList = vendorlist?.filter((item) => item?.type === "CARRIER" && item?.transportMode == 'OCEAN');
        let vendorNewList = vendorlist?.filter((item) => item?.type !== "CARRIER" && item?.transportMode == 'OCEAN');
        setOptionVendorName(vendorNewList);
        setOptionCarrierName(carrierList);
    }, [vendor_data]);
    const timelineData = [
        {
            icon: '' ,
            title: "Quotation Approved",
            description: "for the #123456789",
            author: "Tanmoy Karmakar",
            time: "5 min ago",
        },
        {
            icon: '',
            title: "Quotation Sent",
            description: "for the #123456789",
            author: "Tanmoy Karmakar",
            time: "5 min ago",
        },
        {
            icon: '',
            title: "Quotation Created",
            description: "for the #123456789",
            author: "Tanmoy Karmakar",
            time: "5 min ago",
        },
    ];
    return (
        <>
            <Offcanvas
                isOpen={isRight}
                direction="end"
                toggle={previewModalHand}>
                <OffcanvasHeader toggle={previewModalHand}>
                    History
                </OffcanvasHeader>
                <OffcanvasBody>
                    <form className='h-100'>
                        <div className="fcl_filter_sidebar_wrap sales_filter_wrap d-flex flex-column h-100">
                            {timelineData.map((item, index) => (
                                <div key={index} className="timeline-item d-flex mb-4">
                                    <div className="timeline-icon">
                                        {item.icon}
                                    </div>
                                    <div className="timeline-content ms-3">
                                        <h6 className="fw-bold">{item.title}</h6>
                                        <p className="mb-1">
                                            {item.description}
                                        </p>
                                        <small className="text-muted">{item.author} • {item.time}</small>
                                    </div>
                                </div>
                            ))}
                            <div className="btn_wrap d-flex mt-auto">
                                <button className='btn border' type='button' onClick={previewModalHand}>Close</button>
                              
                            </div>
                        </div>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
