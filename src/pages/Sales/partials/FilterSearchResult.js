import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import CheckboxCommon from '../../Common/CheckboxCommon';
import Flatpickr from "react-flatpickr";

export default function FilterSearchResult({ isRight,filterLoader, toggleRightCanvas, filterDetails, setfilterDetails, applyFilterHandler, clearValueHandler,carriersList }) {
    const [AllVendors, setAllVendors] = useState([]);
    // const [carriersList, setCarriersList] = useState([]);
    const { vendor_data, currency_data } = useSelector((state) => state?.globalReducer);
    const {instantSearchResultCopy} = useSelector((state) => state.instantRate);

    useEffect(() => {
        const vendorMap = new Map();
        if (vendor_data?.content) {
            vendor_data.content.forEach((item) => {
                const vendorType = item.vendorType;
                const vendor = {
                    label: item.name,
                    value: item.name,
                    version: item.version,
                    id: item.id,
                };

                const vendorsForType = vendorMap.get(vendorType) || [];
                vendorsForType.push(vendor);
                vendorMap.set(vendorType, vendorsForType);
            });

            setAllVendors(vendorMap);
        }
    }, [vendor_data]);

    // useEffect(() => {
    //     let data = instantSearchResultCopy?.map((item) => {
    //         return item.carrierName
    //     })

    //     let uniqueArray = data.filter((value, index, self) => self.indexOf(value) === index);
    //     setCarriersList(uniqueArray);        
    // },[instantSearchResultCopy]);

    const formatDate = (date) => {
        // Format date as needed (e.g., "MM/DD/YYYY")
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-GB', options);
    };

    const handleDateChnage = (arr, value, target) => {
        let newObj = {
            ...filterDetails,
            validity: arr
        }
        setfilterDetails(newObj);
    }
    const handleCheckbox = (name, check, parentName) => {
        let arr = filterDetails?.[parentName] || [];
        if(check){
            arr.push(name);
        } else {
            arr = arr.filter(item => item !== name);
        }
        let newObj = {
            ...filterDetails,
            [parentName]: arr
        }
        setfilterDetails(newObj);
    }

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
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='carriers' className="form-label">Carriers</label>
                                        {carriersList && carriersList?.map((item, index) => (
                                            <CheckboxCommon label={item} id={item} name={item} className={'mb-3'} handleCheckbox={handleCheckbox} values={filterDetails.carriers} parentName={'carriers'} key={index} />                                            
                                        ))}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <label htmlFor='agents' className="form-label">Agents</label>
                                    <Select
                                        value={filterDetails.agents}
                                        name='agents'
                                        isMulti
                                        options={Array.from(AllVendors)?.filter(([key]) => key !== "CARRIER").flatMap(([, values]) => values) || []}
                                        onChange={(opt) => { handleSelectGroup('agents', opt, Array.from(AllVendors)?.filter(([key]) => key !== "CARRIER").flatMap(([, values]) => values) || []) }}
                                        className="basic-multi-select"
                                        classNamePrefix="select2-selection form-select"
                                        isDisabled={true}
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Charges</p>
                                    <div className="checkbox_wrap">
                                        <CheckboxCommon label={'Origin Inland Charges'} id={'ORIGIN_INLAND_CHARGES'} name={'ORIGIN_INLAND_CHARGES'} className={'mb-3'} handleCheckbox={handleCheckbox} values={filterDetails.charges} parentName={'charges'} />
                                        <CheckboxCommon label={'Origin Local Port Charges'} id={'ORIGIN_LOCAL_PORT_CHARGES'} name={'ORIGIN_LOCAL_PORT_CHARGES'} className={'mb-3'} handleCheckbox={handleCheckbox} values={filterDetails.charges} parentName={'charges'}  />
                                        <CheckboxCommon label={'Freight Charges'} id={'FREIGHT_CHARGES'} name={'FREIGHT_CHARGES'} className={'mb-3'} handleCheckbox={handleCheckbox} isDisabled={true} values={filterDetails.charges} parentName={'charges'}  />
                                        <CheckboxCommon label={'Destination Local Port Charges'} id={'DESTINATION_LOCAL_PORT_CHARGES'} name={'DESTINATION_LOCAL_PORT_CHARGES'} className={'mb-3'} handleCheckbox={handleCheckbox} values={filterDetails.charges} parentName={'charges'}  />
                                        <CheckboxCommon label={'Destination Inland Charges'} id={'DESTINATION_INLAND_CHARGES'} name={'DESTINATION_INLAND_CHARGES'} handleCheckbox={handleCheckbox} values={filterDetails.charges} parentName={'charges'} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Validity</p>
                                    <Flatpickr
                                        value={filterDetails?.validity || ''}
                                        className="form-control d-block"
                                        placeholder="Select Date"
                                        options={{
                                            mode: "range",
                                            dateFormat: "Y-m-d",
                                        }}
                                        onChange={handleDateChnage}
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='charge_currency' className="form-label">Currency</label>
                                        <Select
                                            value={currency_data ? currency_data?.find(obj => obj.currencyCode === filterDetails?.charge_currency) : ''}
                                            name='charge_currency'
                                            onChange={(opt) => {
                                                handleSelectGroup('charge_currency', opt);
                                            }}
                                            options={currency_data}
                                            classNamePrefix="select2-selection form-select"
                                            isDisabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="btn_wrap d-flex mt-auto">
                                <button className={`btn border ${filterLoader ? 'btn_loader btn_blue_loader' : ''}`} type='button' onClick={() => { clearValueHandler(); }}>Clear</button>
                                <button className={`btn btn-primary ${filterLoader ? 'btn_loader btn_blue_loader' : ''}`} type='button' onClick={applyFilterHandler}>Apply Filter</button>
                            </div>
                        </div>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
