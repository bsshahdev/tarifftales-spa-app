import React, { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal, ModalBody, ModalHeader } from 'reactstrap'

const ModalFreight = ({ viewData, modal, onCloseClick, modalType }) => {
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
                                <AccordionHeader targetId={`view_detail_${viewData?.charge_id}`}>
                                    <div className="top_details">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Charge ID:</span>
                                                    <span className="data">{viewData?.charge_id || '-'}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Carrier Name:</span>
                                                    <span className="data">{viewData?.carrier_name || '-'}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Vendor Name:</span>
                                                    <span className="data">{viewData?.vendor_name || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionHeader>
                                <AccordionBody accordionId={`view_detail_${viewData?.charge_id}`}>
                                    <div className="view_data_wrap d-flex flex-wrap">
                                        <div className="details">
                                            <span className="title">Valid From:</span>
                                            <span className="data">{viewData?.valid_from || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Valid To:</span>
                                            <span className="data">{viewData?.valid_till || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Created By:</span>
                                            <span className="data">{viewData?.created_by || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Created On:</span>
                                            <span className="data">{viewData?.created_on || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Rate Type:</span>
                                            <span className="data">{viewData?.rate_type || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Rate Source:</span>
                                            <span className="data">{viewData?.rate_source || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Updated By:</span>
                                            <span className="data">{viewData?.last_update_by || '-'}</span>
                                        </div>                                        
                                        <div className="details">
                                            <span className="title">Detention Free Org:</span>
                                            <span className="data">{viewData?.org_detention_free || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Detention Free Dest:</span>
                                            <span className="data">{viewData?.dest_detention_free || '-'}</span>
                                        </div>
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='freigth_details_wrap'>
                                <AccordionHeader targetId={`freight_detail_${viewData?.charge_id}`}>
                                    <h3 className="sub_modal_title">Freight Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`freight_detail_${viewData?.charge_id}`}>
                                    <div className="view_data_wrap d-flex align-items-start">
                                        <div className="left_freight_details">
                                            <div className="details">
                                                <span className="title">Origin Port:</span>
                                                <span className="data">{viewData?.org_port || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Cargo type:</span>
                                                <span className="data">{viewData?.cargo_type || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Dest Port:</span>
                                                <span className="data">{viewData?.dest_port || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Cargo Class:</span>
                                                <span className="data">{viewData?.cargo_class || '-'}</span>
                                            </div>

                                            <div className="details">
                                                <span className="title">Via Port:</span>
                                                <span className="data">{viewData?.via_port || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Commodity:</span>
                                                <span className="data">{viewData?.commodity || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Currency:</span>
                                                <span className="data">{viewData?.currency || '-'}</span>
                                            </div>
                                        </div>
                                        <div className="right_freight_details">
                                            {modalType === 'lcl' ? (
                                                <>
                                                    <div className="details">
                                                        <span className="title">Min Charge</span>
                                                        <span className="data">{viewData?.fre_min_charge || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">Currency</span>
                                                        <span className="data">{viewData?.fre_currency || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">Rate</span>
                                                        <span className="data">{viewData?.fre_rate || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">Rate Basis</span>
                                                        <span className="data">{viewData?.rate_basis || '-'}</span>
                                                    </div>
                                                </>
                                            ) : null}
                                            {viewData?.fre_gp && (
                                                <div className="details">
                                                    <span className="title">20 GP:</span>
                                                    <span className="data">{viewData?.fre_gp || '-'}</span>
                                                </div>
                                            )}
                                            {viewData?.fre_gp2 && (
                                                <div className="details">
                                                    <span className="title">40 GP:</span>
                                                    <span className="data">{viewData?.fre_gp2 || '-'}</span>
                                                </div>
                                            )}
                                            {viewData?.fre_hq2 && (
                                                <div className="details">
                                                    <span className="title">45 HQ:</span>
                                                    <span className="data">{viewData?.fre_hq2 || '-'}</span>
                                                </div>
                                            )}
                                            {viewData?.fre_hq && (
                                                <div className="details">
                                                    <span className="title">40 HQ:</span>
                                                    <span className="data">{viewData?.fre_hq || '-'}</span>
                                                </div>
                                            )}
                                            {viewData?.fre_rf && (
                                                <div className="details">
                                                    <span className="title">20 RF:</span>
                                                    <span className="data">{viewData?.fre_rf || '-'}</span>
                                                </div>
                                            )}
                                            {viewData?.fre_rf2 && (
                                                <div className="details">
                                                    <span className="title">40 RF:</span>
                                                    <span className="data">{viewData?.fre_rf2 || '-'}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='charge_details'>
                                <AccordionHeader targetId={`charge_detail_${viewData?.charge_id}`}>
                                    <h3 className="sub_modal_title">{modalType === 'inland' ? 'SurCharge' : 'Charge'} Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`charge_detail_${viewData?.charge_id}`}>
                                    {modalType === 'inland' ? (
                                        <>
                                            {viewData?.surcharges !== undefined && viewData?.surcharges?.map((item) => (
                                            <div className="view_data_wrap" key={item?.id}>
                                                <div className="details">
                                                    <span className="title">Surcharge Name:</span>
                                                    <span className="data">{item?.name || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Charge Basis:</span>
                                                    <span className="data">{item?.charge_basis || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Calculation Type:</span>
                                                    <span className="data">{item?.calculation_type || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Rate:</span>
                                                    <span className="data">{item?.rate || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Tax:</span>
                                                    <span className="data">{item?.tax || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Currency:</span>
                                                    <span className="data">{item?.currency || '-'}</span>
                                                </div>
                                            </div>
                                            ))}
                                        </>
                                    ) : (
                                    <div className="view_data_wrap">
                                        <div className="details">
                                            <span className="title">Charge Name:</span>
                                            <span className="data">{viewData?.charge_name || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Payment Term:</span>
                                            <span className="data">{viewData?.payment_term || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Currency:</span>
                                            <span className="data">{viewData?.charge_currency || '-'}</span>
                                        </div>
                                        {modalType === 'lcl' ? (
                                            <>
                                                {/* <div className="details">
                                                    <span className="title">Currency</span>
                                                    <span className="data">{viewData?.charge_currency || '-'}</span>
                                                </div> */}
                                                <div className="details">
                                                    <span className="title">Charge Basis</span>
                                                    <span className="data">{viewData?.charge_basis || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Min Charge</span>
                                                    <span className="data">{viewData?.charge_mincharge || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Rate</span>
                                                    <span className="data">{viewData?.charge_rate || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Ratio</span>
                                                    <span className="data">{viewData?.charge_ratio || '-'}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="details">
                                                    <span className="title">20 GP:</span>
                                                    <span className="data">{viewData?.charge_gp || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">40 GP:</span>
                                                    <span className="data">{viewData?.charge_gp2 || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">40 HC:</span>
                                                    <span className="data">{viewData?.charge_hc || '-'}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    )} 
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalFreight
