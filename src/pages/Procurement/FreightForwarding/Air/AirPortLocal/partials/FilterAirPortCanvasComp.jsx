import React, { useCallback } from 'react';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { optionCarrierName, optionMovementType, optionPortlocalOrgPort } from '../../../../../../common/data/procurement';

const surchargeCategory = [
    { label: "OCEAN SURCHARGE", value: "freight_surcharge" },
    { label: "PORT SURCHARGE", value: "port_surcharge" },
];
const FilterAirPortCanvasComp = ({isRight,toggleRightCanvas,filterDetails,setfilterDetails,applyFilterHandler,clearValueHandler}) => {
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
                                        <label className="form-label">Surcharge Category</label>
                                        <Select
                                            value={filterDetails.surcharge_category}
                                            name='surcharge_category'
                                            onChange={(opt) => {
                                                handleSelectGroup('surcharge_category', opt);
                                            }}
                                            options={surchargeCategory}
                                            placeholder={'Select Category'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Port Name</label>
                                        <Select
                                            value={filterDetails.port_name}
                                            name='port_name'
                                            onChange={(opt) => {
                                                handleSelectGroup('port_name', opt);
                                            }}
                                            options={optionPortlocalOrgPort}
                                            placeholder={'Select destination port'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Carrier Name</label>
                                        <Select
                                            value={filterDetails.carrier_name}
                                            name='carrier_name'
                                            onChange={(opt) => {
                                                handleSelectGroup('carrier_name', opt)
                                            }}
                                            options={optionCarrierName}
                                            placeholder={'Select carrier name'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>                     
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Movement Type</label>
                                        <Select
                                            value={filterDetails.movement_type}
                                            name='movement_type'
                                            onChange={(opt) => {
                                                handleSelectGroup('movement_type', opt)
                                            }}
                                            options={optionMovementType}
                                            placeholder={'Select movement type'}
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
    );
}

export default FilterAirPortCanvasComp;
