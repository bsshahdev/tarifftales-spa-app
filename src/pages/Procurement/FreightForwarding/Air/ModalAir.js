import React, { useState,useRef } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal, ModalBody, ModalHeader } from 'reactstrap'
import SimpleBar from "simplebar-react";


const ModalAir = ({ viewData, modal, onCloseClick, modalType }) => {
    const ref = useRef();

    const [open, setOpen] = useState('');
    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };
    return (
        <>
            <Modal isOpen={modal} toggle={onCloseClick} className='table_view_modal'>
                <ModalHeader tag="h4">
                    View Details
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <div className="table_view_data_wrap">
                        <Accordion flush open={open} toggle={toggle} className='main_accordion'>
                            <AccordionItem className='view_details_wrap'>
                                <AccordionHeader targetId={`view_detail_${viewData?.id}`}>
                                    <div className="top_details">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Charge ID:</span>
                                                    <span className="data">{viewData?.id || '-'}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Vendor Name:</span>
                                                    <span className="data">{viewData?.tenantVendor?.name || '-'}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Carrier Name:</span>
                                                    <span className="data">{viewData?.tenantVendor?.vendorType || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionHeader>
                                <AccordionBody accordionId={`view_detail_${viewData?.id}`}>
                                    <div className="view_data_wrap d-flex flex-wrap">
                                        <div className="details">
                                            <span className="title">Valid From:</span>
                                            <span className="data">{viewData?.validFrom || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Valid To:</span>
                                            <span className="data">{viewData?.validTo || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Created By:</span>
                                            <span className="data">{viewData?.createdBy || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Created On:</span>
                                            <span className="data">{viewData?.createdDate || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Rate Type:</span>
                                            <span className="data">{viewData?.rateType || '-'}</span>
                                        </div>
                                  
                                        <div className="details">
                                            <span className="title">Updated By:</span>
                                            <span className="data">{viewData?.modifiedBy || '-'}</span>
                                        </div>                                        
                    
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='freigth_details_wrap'>
                                <AccordionHeader targetId={`freight_detail_${viewData?.id}`}>
                                    <h3 className="sub_modal_title">Freight Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`freight_detail_${viewData?.id}`}>
                                <div className="table_view_popup_table">
                                    <SimpleBar style={{ maxHeight: "400px", maxWidth: '100%' }} ref={ref}>
                                            <table style={{ minWidth: '800px' }}>
                                                <thead>
                                                    <tr>
                                                        {/* <th>Container Type</th> */}
                                                        <th>Cargo Mode</th>
                                                        <th>Cargo Type</th>
                                                        
                                                        <th>Cargo Class</th>
                                                        <th>Commodity</th>
                                                        <th>Carrier_name</th>
                                                        <th>Flight_No</th>
                                                        <th>ETD</th>
                                                        <th>ETA</th>
                                                        <th>Origin Port</th>
                                                        <th>Destination Port</th>
                                                        <th>Via Port</th>
                                                        <th>Currency</th>
                                                        <th>Min Rate</th>
                                                        <th>NRate</th>
                                                        <th>Freight Amount</th>
                                                        <th>Transit Time</th>
                                                        <th>Origin Detention Free</th>
                                                        <th>Destination Detention Free</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {viewData?.tenantMAWBFreightRPS !== undefined && viewData?.tenantMAWBFreightRPS?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item?.tenantCargoMode?.description?.toLowerCase()}</td>
                                                            <td>{item?.cargoType?.type?.toLowerCase() === 'haz' ? `${item?.cargoType?.type}(${item?.cargoClass || '-'})` : item?.cargoType?.type || '-'}</td>
                                                            <td>{item?.cargoClass?.code || '-'}</td>
                                                            <td>{item?.commodity?.name || '-'}</td>
                                                            <td>{item?.tenantVendor?.name || '-'}</td>
                                                            <td>{item?.tenantFlight?.flightNo || '-'}</td>
                                                            <td>{item?.tenantFlight?.etd || '-'}</td>
                                                            <td>{item?.tenantFlight?.eta || '-'}</td>
                                                            <td>{item?.originPort?.name || '-'}</td>
                                                            <td>{item?.destinationPort?.name || '-'}</td>
                                                            <td>{item?.viaPort?.name || '-'}</td>
                                                            <td>{item?.tenantMAWBFreightRate?.currency?.currencyName || '-'}</td>
                                                            <td>{item?.tenantMAWBFreightRate?.minimumRate || '-'}</td>
                                                            <td>{item?.tenantMAWBFreightRate?.rate || '-'}</td>
                                                            <td>{item?.tenantMAWBFreightRate?.freightAmount ||  '-'}</td>
                                                            <td>{item?.transitTime || '-'}</td>
                                                            <td>{item?.detentionFreeOrg || '-'}</td>
                                                            <td>{item?.detentionFreeDest || '-'}</td>                                                           
                                                        </tr>
                                                    ))}
                                                    {(viewData?.tenantMAWBFreightRPS?.length === 0 || viewData?.tenantMAWBFreightRPS === undefined) && (
                                                        <tr>
                                                            {viewData?.tenantMAWBFreightRPS ? (
                                                                <td colSpan={13} className="text-center">
                                                                    <div className='py-5'>
                                                                        <div className="spinner-border text-primary" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td colSpan={13} className="text-center py-4"><b>No Record Found</b></td>
                                                            )}
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </SimpleBar>
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            
                        </Accordion>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalAir
