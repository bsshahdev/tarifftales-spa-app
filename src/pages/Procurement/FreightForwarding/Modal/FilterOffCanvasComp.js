import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { optionRateType, optionStatus } from '../../../../common/data/procurement';

export default function FilterOffCanvasComp({isRight,toggleRightCanvas,filterDetails,setfilterDetails,applyFilterHandler,filterType,clearValueHandler}) {
    const [allVendors, setAllVendors] = useState([]);
    const { vendor_data } = useSelector((state) => state?.globalReducer);
    const dispatch = useDispatch();

    const handleSelectGroup = useCallback((name, opt) => {
        let newObj = {
            ...filterDetails,
            [name]: opt
        }
        setfilterDetails(newObj);
    }, [filterDetails]);

    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType }
        })
        setAllVendors(vendorlist);
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
                        <div className="fcl_filter_sidebar_wrap d-flex flex-column h-100">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='validity_from' className="form-label">Validity From</label>
                                        <input type="date" name="validity_from" id="validity_from" className='form-control' value={filterDetails.validity_from} onChange={(e) => handleSelectGroup('validity_from', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='validity_to' className="form-label">Validity To</label>
                                        <input type="date" name="validity_to" id="validity_to" className='form-control' value={filterDetails.validity_to} onChange={(e) => handleSelectGroup('validity_to', e.target.value)} />
                                    </div>
                                </div>
                                {/* <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Origin Port</label>
                                        <Select
                                            value={filterDetails.org_port}
                                            name='org_port'
                                            onChange={(opt) => {
                                                handleSelectGroup('org_port', opt);
                                            }}
                                            options={optionOrgPort}
                                            placeholder={'Select origin port'}
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
                                            options={optionDestPort}
                                            placeholder={'Select destination port'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div> */}
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Carrier Name</label>
                                        <Select
                                            value={filterDetails.carrier_name}
                                            name='carrier_name'
                                            onChange={(opt) => {
                                                handleSelectGroup('carrier_name', opt)
                                            }}
                                            options={allVendors && allVendors?.filter((item) => item?.type === 'CARRIER') || []}
                                            placeholder={'Select carrier name'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Vendor Name</label>
                                        <Select
                                            value={filterDetails.vendor_name}
                                            name='vendor_name'
                                            onChange={(opt) => {
                                                handleSelectGroup('vendor_name', opt)
                                            }}
                                            options={allVendors && allVendors?.filter((item) => item?.type !== 'CARRIER') || []}
                                            placeholder={'Select vendor name'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>                            
                                {/* <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Cargo Type</label>
                                        <Select
                                            value={filterDetails.cargo_type}
                                            name='cargo_type'
                                            onChange={(opt) => {
                                                handleSelectGroup('cargo_type', opt)
                                            }}
                                            options={cargoType_data || []}
                                            placeholder={'Select cargo type'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>      */}                                    
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Rate Type</label>
                                        <Select
                                            value={filterDetails.rate_type}
                                            name='rate_type'
                                            onChange={(opt) => {
                                                handleSelectGroup('rate_type', opt)
                                            }}
                                            options={optionRateType}
                                            placeholder={'Select rate type'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>     
                                {/* {filterType === 'inland' && (
                                    <>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Container Type</label>
                                                <Select
                                                    value={filterDetails.container_type}
                                                    name='container_type'
                                                    onChange={(opt) => {
                                                        handleSelectGroup('container_type', opt)
                                                    }}
                                                    options={optionVendorName}
                                                    placeholder={'Select container type'}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Unit Type</label>
                                                <Select
                                                    value={filterDetails.unit_type}
                                                    name='unit_type'
                                                    onChange={(opt) => {
                                                        handleSelectGroup('unit_type', opt)
                                                    }}
                                                    options={optionVendorName}
                                                    placeholder={'Select unit type'}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>
                                        </div>
                                    </> 
                                )}   */}
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <Select
                                            value={optionStatus && optionStatus?.find(val => val.value === filterDetails.status) || ''}
                                            name='status'
                                            onChange={(opt) => {
                                                handleSelectGroup('status', opt.value)
                                            }}
                                            options={optionStatus}
                                            placeholder={'Select Status'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>                      
                            </div>                        
                            <div className="btn_wrap d-flex mt-auto">
                                <button className='btn border' type='button' onClick={clearValueHandler}>Clear</button>
                                <button className='btn btn-primary' type='button' onClick={applyFilterHandler}>Apply Filter</button>
                            </div>
                        </div>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
