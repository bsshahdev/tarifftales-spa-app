import React, { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from "reactstrap";
import doc from "../../../../../assets/images/bg-1.jpg";

const TabOneVendorDetails = ({ viewData }) => {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  return (
    <div>
      <div className="table_view_data_wrap">
        <Accordion flush open={open} toggle={toggle} className="main_accordion">
          {/* Company Details */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={`vendor_${viewData?.id}1`}>
              <h3 className="sub_modal_title">Company Details</h3>
            </AccordionHeader>
            <AccordionBody accordionId={`vendor_${viewData?.id}1`}>
              <div className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  <div className="details">
                    <span className="title">Company Name:</span>
                    <span className="data">{viewData?.name || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Logo:</span>
                    <img src={viewData?.logo}  width={170} height={120} />
                  </div>
                  <div className="details">
                    <span className="title">Address:</span>
                    <span className="data">{viewData?.address || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">City:</span>
                    <span className="data">{viewData?.city?.cityName || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">State:</span>
                    <span className="data">{viewData?.state?.stateName || "-"}</span>
                  </div>

                  <div className="details">
                    <span className="title">Country:</span>
                    <span className="data">{viewData?.country?.countryName || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Zipcode:</span>
                    <span className="data">{viewData?.pinCode?.pin || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Website:</span>
                    <span className="data">{viewData?.website || "-"}</span>
                  </div>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>

          {/* Primary Contact Details */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={`vendor_${viewData?.id}2`}>
              <h3 className="sub_modal_title">Primary Contact Details</h3>
            </AccordionHeader>
            <AccordionBody accordionId={`vendor_${viewData?.id}2`}>
              <div className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  <div className="details">
                    <span className="title">Contact Name:</span>
                    <span className="data"> {viewData?.contactName || "-"} </span>
                  </div>
                  <div className="details">
                    <span className="title">Phone Number:</span>
                    <span className="data"> {viewData?.contactNo || "-"} </span>
                  </div>
                  <div className="details">
                    <span className="title">Email Id:</span>
                    <span className="data">{viewData?.contactEmail || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Department:</span>
                    <span className="data">{viewData?.department || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Designation:</span>
                    <span className="data">{viewData?.designation?.split('_').join(" ") || "-"}</span>
                  </div>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>

          {/* Company identification */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={`vendor_${viewData?.id}3`}>
              <h3 className="sub_modal_title">Company identification</h3>
            </AccordionHeader>
            <AccordionBody accordionId={`vendor_${viewData?.id}3`}>
              <div className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  <div className="details">
                    <span className="title">Vendor Type:</span>
                    <span className="data">{viewData?.vendorType || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Service Type:</span>
                    <span className="data">{viewData?.transportMode || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">CIN Number:</span>
                    <span className="data">{viewData?.cin || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">GST Number:</span>
                    <span className="data">{viewData?.gst || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">PAN Number:</span>
                    <span className="data">{viewData?.pan || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Entity Type:</span>
                    <span className="data">{viewData?.entityType?.split('_').join(" ") || "-"}</span>
                  </div>

                  <div className="details">
                    <span className="title">Industry Type:</span>
                    <span className="data"> {viewData?.industryType?.split('_').join(" ") || "-"} </span>
                  </div>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TabOneVendorDetails;
