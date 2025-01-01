import React, { useState } from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";
import SimpleBar from "simplebar-react";

const ModalSurchargeValue = ({ viewData, modal, onCloseClick, modalType }) => {
    const [open, setOpen] = useState("");

    const toggle = (id) => {
        if (open === id) {
            setOpen("");
        } else {
            setOpen(id);
        }
    };
    return (
        <>
            <Modal
                isOpen={modal}
                toggle={onCloseClick}
                className="table_view_modal"
                style={{ maxWidth: "1345px" }}
            >
                <ModalHeader tag="h4">
                    Surcharge value
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <SimpleBar>
                        <div
                            className="table_view_data_wrap port_local_view_wrap"
                            style={{ minWidth: "1000px", overflow: "auto" }}
                        >
                            <div className="view_details_wrap">
                                <div className="top_details">
                                    <div className="row mx-4">
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Charge Code</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Charge Basis</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Calculation Type</span>
                                            </div>
                                        </div>
                                        {/* <div className="col">
                                            <div className="details">
                                                <span className="title">Slab Basis</span>
                                            </div>
                                        </div> */}
                                        {/* <div className="col">
                                            <div className="details">
                                                <span className="title">Currency</span>
                                            </div>
                                        </div> */}
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Min Value</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Tax</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Is Standard</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -------------- */}
                                <div className="row view_data_wrap">
                                    {viewData?.tenantVendorFCLSurchargeDetails?.length !== 0 ?
                                        <Accordion
                                            flush
                                            open={open}
                                            toggle={toggle}
                                            className="main_accordion common_accordion_wrap"
                                        >
                                            {viewData?.tenantVendorFCLSurchargeDetails?.map((item, index) => (
                                                <AccordionItem key={item.id}>
                                                    <AccordionHeader targetId={`main_${viewData?.id}_${index}`}>
                                                        <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.surchargeCode?.code || "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.unitOfMeasurement?.code?.split("_").join(" ") || "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.calculationType || "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.slabBasis || "-"}
                                                                </span>
                                                            </div>
                                                        </div> */}
                                                        {/* <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.currency || "-"}
                                                                </span>
                                                            </div>
                                                        </div> */}
                                                        <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.minimumValue || "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.applicableTax || "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="">
                                                                <span className="">
                                                                    {item?.standard === false ? "Incidental" : "Standard" || "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody
                                                        style={{ fontSize: "13px" }}
                                                        accordionId={`main_${viewData?.id}_${index}`}
                                                    >
                                                        <Card style={{ borderRadius: "12px" }}>
                                                            <CardHeader>
                                                                <div style={{ fontWeight: "500" }} className="row text-center" >
                                                                    <div className="col-2">
                                                                        <span className="">Cargo Type</span>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <span className="">Container Type</span>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <span className="">Currency</span>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <span className="">From Slab</span>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <span className="">To Slab</span>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <span className="">Rate</span>
                                                                    </div>
                                                                </div>
                                                            </CardHeader>
                                                            <CardBody>
                                                                {item?.tenantVendorFCLSurchargeValues?.map((sub, index) => (
                                                                    <div className="row text-center" key={`sub_${index}`}>
                                                                        <div className="col-2 mb-2">
                                                                            <div className="p-2">
                                                                                <span className="">
                                                                                    {sub?.cargoType?.type || "-"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2 mb-2">
                                                                            <div className="p-2">
                                                                                <span className="">
                                                                                    {sub?.oceanContainer?.name || "-"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2 mb-2">
                                                                            <div className="p-2">
                                                                                <span className="">
                                                                                    {sub?.currency?.currencyCode || "-"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2 mb-2">
                                                                            <div className="p-2">
                                                                                <span className="">
                                                                                    {sub?.fromSlab || "0"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2 mb-2">
                                                                            <div className="p-2">
                                                                                <span className="">
                                                                                    {sub?.toSlab || "0"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2 mb-2">
                                                                            <div className="p-2">
                                                                                <span className="">
                                                                                    {sub?.value || "-"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {(item?.tenantVendorFCLSurchargeValues?.length === 0 || item?.tenantVendorFCLSurchargeValues === undefined) && (                                                                    
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="text-center py-4"><b>No Record Found</b></div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </CardBody>
                                                        </Card>
                                                        <Card style={{ borderRadius: "12px" }}>
                                                            <CardHeader>
                                                                <div style={{ fontWeight: "500" }} className="row text-center" >
                                                                    <div className="col-3">
                                                                        <span className="">Payment Term</span>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <span className="">Incoterms</span>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <span className=""> Applicable Commodity </span>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <span className=""> Applicable Service Type </span>
                                                                    </div>
                                                                </div>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <div className="row text-center">
                                                                    <div className="col-3 py-2">
                                                                        <div className="p-2">
                                                                            <span className="">
                                                                                {item?.paymentTerm?.split("_").join(" ") || "-"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-3 border-end border-start py-2">
                                                                        {item?.tenantVendorFCLSurchargeDetailIncoterms?.map(
                                                                            (val, key) => (
                                                                                <div key={key} className="p-2">
                                                                                    <span key={key} className="">
                                                                                        {val?.incoterm?.name || "-"}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <div className="col-3 border-end py-2">
                                                                        {item?.tenantVendorFCLSurchargeDetailCommodities?.map(
                                                                            (val, key) => (
                                                                                <div key={key} className="p-2">
                                                                                    <span key={key} className="data">
                                                                                        {val?.commodity?.name || "-"}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <div className="col-3 py-2">
                                                                        {/* {item.addTerms.transportMode.map(
                                                                            (val, key) => (
                                                                                <div key={key} className="p-2 mb-2">
                                                                                    <span key={key} className="data">
                                                                                        {val || "-"}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )} */}
                                                                    </div>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                        : (
                                            <div className="modal_no_data_wrap">
                                                <p><b>There is no charges added!</b></p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalSurchargeValue;
