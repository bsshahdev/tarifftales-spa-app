import React, { useCallback } from 'react'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import Select from "react-select";
import {alias_code, optionCarrierName, optionMultiDestination, optionVendorName, status, surcharge_category, surcharge_code, surcharge_desc} from "../../../../common/data/rate"

export default function FilterOffCanvasComp({isRight,toggleRightCanvas,filterDetails,setfilterDetails,applyFilterHandler,filterType,clearValueHandler}) {
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
                        <div className="fcl_filter_sidebar_wrap d-flex flex-column h-100">
                            <div className="row">
                                
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <Select
                                            value={filterDetails.status}
                                            name='status'
                                            onChange={(opt) => {
                                                handleSelectGroup('status', opt);
                                            }}
                                            options={status}
                                            placeholder={'Select Status'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Surcharge Code</label>
                                        <Select
                                            value={filterDetails.surcharge_code}
                                            name='surcharge_code'
                                            onChange={(opt) => {
                                                handleSelectGroup('surcharge_code', opt);
                                            }}
                                            options={surcharge_code}
                                            placeholder={'Select Surcharge Code'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Surcharge Desc</label>
                                        <Select
                                            value={filterDetails.surcharge_desc}
                                            name='surcharge_desc'
                                            onChange={(opt) => {
                                                handleSelectGroup('surcharge_desc', opt)
                                            }}
                                            options={surcharge_desc}
                                            placeholder={'Select Surcharge Desc'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Surcharge Category</label>
                                        <Select
                                            value={filterDetails.surcharge_category}
                                            name='surcharge_category'
                                            onChange={(opt) => {
                                                handleSelectGroup('surcharge_category', opt)
                                            }}
                                            options={surcharge_category}
                                            placeholder={'Select Surcharge Category'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>                            
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Alias Code</label>
                                        <Select
                                            value={filterDetails.alias_code}
                                            name='alias_code'
                                            onChange={(opt) => {
                                                handleSelectGroup('alias_code', opt)
                                            }}
                                            options={alias_code}
                                            placeholder={'Select Alias Code'}
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
