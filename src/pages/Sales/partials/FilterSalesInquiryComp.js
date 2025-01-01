import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import React, { useCallback, useState } from 'react';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { optionDestQuote, optionModeQuote, optionOriginQuote, optionStatusInquiry, optionStatusQuote } from '../../../common/data/sales';

export default function FilterSalesInquiryComp({ isRight, toggleRightCanvas, filterDetails, setfilterDetails, applyFilterHandler, clearValueHandler }) {
    const [rangeValues, setRangeValues] = useState([45, 2500]); // Initial values for the range slider
    const [dateRange, setDateRange] = useState([new Date(2023, 0, 1), new Date(2023, 10, 5)]);

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

    return (
        <>
            <Offcanvas
                isOpen={isRight}
                direction="end"
                toggle={toggleRightCanvas}>
                <OffcanvasHeader toggle={toggleRightCanvas}>
                    Filter
                </OffcanvasHeader>
                <OffcanvasBody>
                    <form className='h-100'>
                        <div className="fcl_filter_sidebar_wrap sales_filter_wrap d-flex flex-column h-100">
                            <div className="row">
                                {/* <div className="col-lg-12">
                                    <p className="form-label">Quotation Date</p>
                                    <Nouislider
                                        range={{
                                            min: new Date(2023, 0, 1).getTime(),
                                            max: new Date(2023, 11, 31).getTime(),
                                        }}
                                        start={dateRange.map((date) => date.getTime())}
                                        step={24 * 60 * 60 * 1000}
                                        connect={true}
                                        tooltips={[
                                            {
                                                to: (value) => formatDate(new Date(value)),
                                                from: (value) => formatDate(new Date(value)),
                                            },
                                            {
                                                to: (value) => formatDate(new Date(value)),
                                                from: (value) => formatDate(new Date(value)),
                                            },
                                        ]}
                                        onChange={handleDateChange}
                                    />
                                    <div className='range_label'>
                                        {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </div>
                                </div> */}
                                {/* <div className="col-lg-12">
                                    <p className="form-label">Price</p>
                                    <Nouislider
                                        range={{ min: 45, max: 3000 }}
                                        step={5}
                                        start={rangeValues}
                                        onSlide={handleRangeChange}
                                        connect
                                    />
                                    <div className='range_label'>
                                        ${rangeValues[0]} - ${rangeValues[1]}
                                    </div>
                                </div> */}                          
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Origin</label>
                                        <Select
                                            value={filterDetails.org_port}
                                            name='org_port'
                                            onChange={(opt) => {
                                                handleSelectGroup('org_port', opt);
                                            }}
                                            options={optionOriginQuote}
                                            placeholder={'Select Origin'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Destination</label>
                                        <Select
                                            value={filterDetails.dest_port}
                                            name='dest_port'
                                            onChange={(opt) => {
                                                handleSelectGroup('dest_port', opt);
                                            }}
                                            options={optionDestQuote}
                                            placeholder={'Select Destination'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <label className="form-label">Status</label>
                                    <Select
                                        value={filterDetails.status}
                                        name='status'
                                        onChange={(opt) => {
                                            handleSelectGroup('status', opt);
                                        }}
                                        options={optionStatusInquiry}
                                        placeholder={'Select Status'}
                                        classNamePrefix="select2-selection form-select"
                                    />
                                </div>
                                {/* <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div> */}
                            </div>
                            <div className="btn_wrap d-flex mt-auto">
                                <button className='btn border' type='button' onClick={() => { clearValueHandler(); }}>Clear</button>
                                <button className='btn btn-primary' type='button' onClick={applyFilterHandler}>Apply Filter</button>
                            </div>
                        </div>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
