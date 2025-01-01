import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { formatDate } from "../../../../components/Common/CommonLogic";
import { useSelector } from "react-redux";

const ModalFclInlandCharge = ({ viewData, modal, onCloseClick }) => {
    const ref = useRef();
    const ref2 = useRef();
    const [open, setOpen] = useState("");
    const [subopen, setSubOpen] = useState("");
    const fclInlandFreightView = useSelector((state) => state?.procurement?.fclInlandFreightView);
    const fclInlandSurchargeView = useSelector((state) => state?.procurement?.fclInlandSurchargeView);
    const toggle = (id) => {
        if (open === id) {
            setOpen("");
        } else {
            setOpen(id);
        }
    };
    const subtoggle = useCallback((id) => {
        if (subopen === id) {
            setSubOpen("");
        } else {
            setSubOpen(id);
        }
    }, [subopen]);
    return (
        <>
            <Modal
                isOpen={modal}
                toggle={onCloseClick}
                className="table_view_modal"
                style={{ maxWidth: "1345px" }}
            >
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
                                                    <span className="data">{viewData?.tenantCarrier?.name || '-'}</span>
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
                                            <span className="data">{viewData?.rateSource?.split("_").join(" ") || '-'}</span>
                                        </div>
                                        {/* <div className="details">
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
                                        </div> */}
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='freigth_details_wrap view_details_wrap'>
                                <AccordionHeader targetId={`freight_detail_${viewData?.id}`}>
                                    <h3 className="sub_modal_title">Freight Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`freight_detail_${viewData?.id}`}>
                                    {fclInlandFreightView?.content && (
                                        <Accordion flush open={subopen} toggle={subtoggle} className='sub_accordion'>

                                            {fclInlandFreightView?.content && fclInlandFreightView?.content?.map((item, index) => (
                                                <AccordionItem key={index}>
                                                    <AccordionHeader targetId={`freight_detail_${item?.id}`}>
                                                        <div className="top_details">
                                                            <div className="row">
                                                                <div className="col-lg-3">
                                                                    <div className="details">
                                                                        <span className="title">Origin:</span>
                                                                        <span className="data">{item?.originCity !== null ? item?.originCity?.cityName :
                                                                            item?.originOceanIcd !== null ? item?.originOceanIcd?.code :
                                                                                item?.originOceanPort !== null ? item?.originOceanPort?.code : ''}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="details">
                                                                        <span className="title">Destination:</span>
                                                                        <span className="data">
                                                                            {item?.destinationCity !== null ? item?.destinationCity?.cityName :
                                                                                item?.destinationOceanIcd !== null ? item?.destinationOceanIcd?.code :
                                                                                    item?.destinationOceanPort !== null ? item?.destinationOceanPort?.code : ''}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="details">
                                                                        <span className="title">Charge Basis:</span>
                                                                        <span className="data">{item?.unitOfMeasurement?.code?.split("_").join(" ") || '-'}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="details">
                                                                        <span className="title">Currency:</span>
                                                                        <span className="data">{item?.currency?.currencyCode || '-'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`freight_detail_${item?.id}`}>
                                                        <div className="table_view_popup_table">
                                                            <SimpleBar style={{ maxWidth: '100%' }} ref={ref2}>
                                                                <table style={{ minWidth: '800px' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Container Type</th>
                                                                            <th>Cargo Type</th>
                                                                            <th>Cargo Wt Min (MT)</th>
                                                                            <th>Cargo Wt Max (MT)</th>
                                                                            <th>Transport Mode</th>
                                                                            <th>Rate</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {item?.inlandVendorFreightValues?.length !== 0 && item?.inlandVendorFreightValues?.map((data, index) => (
                                                                            <tr key={index}>
                                                                                <td>{data?.oceanContainer?.name || ''}</td>
                                                                                <td>{item?.cargoType?.type || ''}</td>
                                                                                <td>{data?.fromSlab || 0}</td>
                                                                                <td>{data?.toSlab || 0} </td>
                                                                                <td>{item?.transportMode || ''}</td>
                                                                                <td>{data?.value || 0}</td>
                                                                                
                                                                            </tr>
                                                                        ))}
                                                                        {(item?.inlandVendorFreightValues?.length === 0 || item?.inlandVendorFreightValues === undefined) && (
                                                                            <tr>
                                                                                <td colSpan={5} className="text-center py-4"><b>No Record Found</b></td>
                                                                            </tr>
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </SimpleBar>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    )}
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='charge_details'>
                                <AccordionHeader targetId={`charge_detail_${viewData?.id}`}>
                                    <h3 className="sub_modal_title">SurCharge Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`charge_detail_${viewData?.id}`}>
                                    {fclInlandSurchargeView?.content !== undefined && fclInlandSurchargeView?.content?.map((item, index) => (
                                        <div className="view_data_wrap" key={index}>
                                            <div className="details">
                                                <span className="title">Surcharge Name:</span>
                                                <span className="data">{item?.surchargeCode?.code || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Charge Basis:</span>
                                                <span className="data">{item?.unitOfMeasurement?.code?.split("_").join(" ") || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Calculation Type:</span>
                                                <span className="data">{item?.calculationType || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Rate:</span>
                                                <span className="data">{item?.value || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Tax:</span>
                                                <span className="data">{item?.applicableTax || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Currency:</span>
                                                <span className="data">{item?.currency?.currencyName || '-'}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {(fclInlandSurchargeView?.content?.length === 0 || fclInlandSurchargeView?.content === undefined) && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="text-center border rounded py-3"><b>No Record Found</b></div>
                                            </div>
                                        </div>
                                    )}
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalFclInlandCharge;
