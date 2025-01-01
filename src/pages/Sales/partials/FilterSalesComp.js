import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import React, { useCallback, useEffect, useState } from 'react';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { optionDestQuote, optionModeQuote, optionOriginQuote, optionStatusQuote } from '../../../common/data/sales';
import { useSelector } from 'react-redux';

export default function FilterSalesComp({ isRight, toggleRightCanvas, filterDetails, setfilterDetails, applyFilterHandler, clearValueHandler }) {
    const [rangeValues, setRangeValues] = useState([45, 2500]); // Initial values for the range slider
    const [dateRange, setDateRange] = useState([new Date(2023, 0, 1), new Date(2023, 10, 5)]);
    const { vendor_data,cargoType_data,container_data } = useSelector((state) => state.globalReducer);
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
                                        <label htmlFor='quotation_from' className="form-label">Quotation From</label>
                                        <input type="date" name="quotation_from" id="quotation_from" className='form-control' value={filterDetails.quotation_from} onChange={(e) => handleSelectGroup('quotation_from', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='quotation_to' className="form-label">Quotation To</label>
                                        <input type="date" name="quotation_to" id="quotation_to" className='form-control' value={filterDetails.quotation_to} onChange={(e) => handleSelectGroup('quotation_to', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Origin Port</label>
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
                                        <label className="form-label">Destination Port</label>
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
                                    <div className="mb-3">
                                        <label className="form-label">Carrier Name</label>
                                        <Select
                                            value={filterDetails.dest_port}
                                            name='dest_port'
                                            onChange={(opt) => {
                                                handleSelectGroup('dest_port', opt);
                                            }}
                                            options={optionCarrierName}
                                            placeholder={'Select Destination'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Vendor Name</label>
                                        <Select
                                            value={filterDetails.quote_mode}
                                            name='quote_mode'
                                            onChange={(opt) => {
                                                handleSelectGroup('quote_mode', opt);
                                            }}
                                            options={optionVendorName}
                                            placeholder={'Select Mode'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Cargo Type</label>
                                        <Select
                                            value={filterDetails.quote_status}
                                            name='quote_status'
                                            onChange={(opt) => {
                                                handleSelectGroup('quote_status', opt);
                                            }}
                                            options={cargoType_data.filter(data => data.transportMode == "OCEAN")}
                                            placeholder={'Select Status'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">

                                        <label className="form-label">Container Type</label>
                                        <Select
                                            value={filterDetails.quote_status}
                                            name='quote_status'
                                            onChange={(opt) => {
                                                handleSelectGroup('quote_status', opt);
                                            }}
                                            options={container_data}
                                            placeholder={'Select Status'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">

                                        <label className="form-label">Quotation Status</label>
                                        <Select
                                            value={filterDetails.quote_status}
                                            name='quote_status'
                                            onChange={(opt) => {
                                                handleSelectGroup('quote_status', opt);
                                            }}
                                            options={optionStatusQuote}
                                            placeholder={'Select Status'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label"> Value</p>
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
                            </div>
                            <div className="btn_wrap d-flex mt-auto">
                                <button className='btn border' type='button' onClick={() => { setRangeValues([45, 2500]); setDateRange([new Date(2023, 0, 1), new Date(2023, 10, 5)]); clearValueHandler(); }}>Clear</button>
                                <button className='btn btn-primary' type='button' onClick={applyFilterHandler}>Apply Filter</button>
                            </div>
                        </div>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
