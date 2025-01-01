import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import SimpleBar from "simplebar-react";
import { formatDate } from '../../../../components/Common/CommonLogic';

const ModalFCLFreight = ({ viewData, modal, onCloseClick, modalType }) => {
    const fcl_freight_view = useSelector((state) => state.procurement.fcl_freight_view);
    const fcl_surcharge_view = useSelector((state) => state.procurement.fcl_surcharge_view);
    const freight_loader = useSelector((state) => state.procurement.fcl_get_freight_view_loader);
    const surcharge_loader = useSelector((state) => state.procurement.fcl_get_surcharge_view_loader);
    const [open, setOpen] = useState('');
    const [mergeData, setMergeData] = useState([]);
    const ref = useRef();
    const ref2 = useRef();

    useEffect(() => {
        const newmergedData = fcl_freight_view?.reduce((acc, current) => {
            let existingItem = acc?.find(item => (item?.originPort === current?.originPort && item?.destinationPort === current?.destinationPort));

            if (existingItem) {
                existingItem = { ...existingItem };
            } else {
                acc.push(current);
            }          
            return acc;
        }, []);
        setMergeData(newmergedData);
    }, [fcl_freight_view])
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
                                                    <span className="title">Carrier Name:</span>
                                                    <span className="data">{viewData?.tenantCarrierVendor?.name || '-'}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Vendor Name:</span>
                                                    <span className="data">{viewData?.tenantVendor?.name || '-'}</span>
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
                                            <span className="data">{formatDate(viewData?.createdDate) || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Rate Type:</span>
                                            <span className="data">{viewData?.rateType || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Rate Source:</span>
                                            <span className="data">{viewData?.rateSource?.split('_').join(' ') || '-'}</span>
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
                                                        <th>Cargo Type</th>
                                                        <th>Commodity</th>
                                                        <th>Org Port</th>
                                                        <th>Dest Port</th>
                                                        <th>Via Port</th>
                                                        <th>Transit Time</th>
                                                        <th>Currency</th>
                                                        <th>20 GP</th>
                                                        <th>40 GP</th>
                                                        <th>20 RF</th>
                                                        <th>40 RF</th>
                                                        <th>40 HQ</th>
                                                        <th>45 HQ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {mergeData && mergeData?.map((item, index) => (
                                                        <tr key={index}>
                                                            {/* <td>{item?.oceanContainer?.name || '-'}</td> */}
                                                            <td>{item?.cargoType?.type?.toLowerCase() === 'haz' ? `${item?.cargoType?.type}(${item?.cargoClass || '-'})` : item?.cargoType || '-'}</td>
                                                            <td>{item?.commodity || '-'}</td>
                                                            <td>{item?.originPort || '-'}</td>
                                                            <td>{item?.destinationPort || '-'}</td>
                                                            <td>{item?.viaPorts?.length > 0 ? item?.viaPorts?.map((item) => item?.code).join(', ') : '-'}</td>
                                                            <td>{item?.transitTime || '-'}</td>
                                                            <td>{item?.currency || '-'}</td>
                                                            <td>{item?.gp20 || '-'}</td>
                                                            <td>{item?.gp40 || '-'}</td>
                                                            <td>{item?.rf20 || '-'}</td>
                                                            <td>{item?.rf40 || '-'}</td>
                                                            <td>{item?.hq40 || '-'}</td>
                                                            <td>{item?.hq45 || '-'}</td>
                                                        </tr>
                                                    ))}
                                                    {(fcl_freight_view?.length === 0) && (
                                                        <tr>
                                                            {freight_loader ? (
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
                            <AccordionItem className='charge_details'>
                                <AccordionHeader targetId={`charge_detail_${viewData?.id}`}>
                                    <h3 className="sub_modal_title">{modalType === 'inland' ? 'SurCharge' : 'Charge'} Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`charge_detail_${viewData?.id}`}>
                                    <div className="table_view_popup_table">
                                        <SimpleBar style={{ maxHeight: "400px", maxWidth: '100%' }} ref={ref2}>
                                            <table style={{ minWidth: '800px' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Surcharge Name</th>
                                                        <th>Surcharge Alias Code</th>
                                                        <th>Dest Port</th>
                                                        <th>UOM</th>
                                                        <th>Currency</th>
                                                        <th>20 GP</th>
                                                        <th>40 GP</th>
                                                        <th>40 HQ</th>
                                                        <th>45 HQ</th>
                                                        <th>20 RF</th>
                                                        <th>40 RF</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fcl_surcharge_view?.length !== 0 && fcl_surcharge_view?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item?.surchargeName}</td>
                                                            <td>{item?.surchargeCode || '-'}</td>
                                                            <td>{item?.destinationPort || '-'}</td>
                                                            <td>{item?.uomCode?.split('_').join(' ') || '-'}</td>
                                                            <td>{item?.currency || '-'}</td>
                                                            <td>{item?.gp20 || '-'}</td>
                                                            <td>{item?.gp40 || '-'}</td>
                                                            <td>{item?.hq40 || '-'}</td>
                                                            <td>{item?.hq45 || '-'}</td>
                                                            <td>{item?.rf20 || '-'}</td>
                                                            <td>{item?.rf40 || '-'}</td>
                                                        </tr>
                                                    ))}
                                                    {fcl_surcharge_view?.length === 0 && (
                                                        <tr>
                                                            {surcharge_loader ? (
                                                                <td colSpan={11} className="text-center">
                                                                    <div className='py-5'>
                                                                        <div className="spinner-border text-primary" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td colSpan={11} className="text-center py-4"><b>No Record Found</b></td>
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

export default ModalFCLFreight
