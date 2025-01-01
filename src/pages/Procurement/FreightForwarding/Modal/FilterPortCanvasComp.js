import React, { useCallback, useEffect, useState } from 'react';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { optionCarrierName, optionMovementType, optionPortlocalOrgPort, optionStatus } from '../../../../common/data/procurement';
import { useSelector } from 'react-redux';

export default function FilterPortCanvasComp({ isRight, toggleRightCanvas, filterDetails, setfilterDetails, applyFilterHandler, clearValueHandler }) {
    const [allVendors, setAllVendors] = useState([]);
    const { vendor_data, surchargeCategory_data, oceanPort_data } = useSelector((state) => state.globalReducer);

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
                                        <label htmlFor='from' className="form-label">Validity From</label>
                                        <input type="date" name="from" id="from" className='form-control' value={filterDetails.from} onChange={(e) => handleSelectGroup('from', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='to' className="form-label">Validity To</label>
                                        <input type="date" name="to" id="to" className='form-control' value={filterDetails.to} onChange={(e) => handleSelectGroup('to', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Surcharge Category</label>
                                        <Select
                                            value={filterDetails.sur_category}
                                            name='sur_category'
                                            onChange={(opt) => {
                                                handleSelectGroup('sur_category', opt);
                                            }}
                                            options={surchargeCategory_data || []}
                                            placeholder={'Select Category'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Carrier Name</label>
                                        <Select
                                            value={filterDetails.carriers}
                                            name='carriers'
                                            onChange={(opt) => {
                                                handleSelectGroup('carriers', opt)
                                            }}
                                            options={allVendors && allVendors?.filter((item) => item?.type === 'CARRIER') || []}
                                            placeholder={'Select carrier'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Port Name</label>
                                        <Select
                                            value={filterDetails.ports}
                                            name='ports'
                                            onChange={(opt) => {
                                                handleSelectGroup('ports', opt);
                                            }}
                                            options={oceanPort_data}
                                            placeholder={'Select Ports'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Movement Type</label>
                                        <Select
                                            value={filterDetails.movement}
                                            name='movement'
                                            onChange={(opt) => {
                                                handleSelectGroup('movement', opt)
                                            }}
                                            options={optionMovementType}
                                            placeholder={'Select movement type'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
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
                                <button className='btn btn-primary' type='button' onClick={applyFilterHandler} disabled={!(filterDetails.port_name !== '' && filterDetails.carrier_name !== '' && filterDetails.movement_type !== '')}>Apply Filter</button>
                            </div>
                        </div>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
