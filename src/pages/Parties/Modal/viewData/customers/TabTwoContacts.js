import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const TabTwoContacts = ({ viewData }) => {
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
          {/* Contacts */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={"1"}>
              <h3 className="sub_modal_title">Contacts</h3>
            </AccordionHeader>
            <AccordionBody accordionId={"1"}>

              {viewData?.contacts?.map((item,index) => {
                return (
                  <div className="view_data_wrap d-flex align-items-start" key={index}>
                    <div className="left_freight_details">
                      <div className="details">
                        <span className="title">Contact Name:</span>
                        <span className="data"> {item?.contactName || "-"} </span>
                      </div>
                      <div className="details">
                        <span className="title">Phone Number:</span>
                        <span className="data"> {item?.contactNo || "-"} </span>
                      </div>
                      <div className="details">
                        <span className="title">Email Id:</span>
                        <span className="data">{item?.contactEmail || "-"}</span>
                      </div>
                      <div className="details">
                        <span className="title">Department:</span>
                        <span className="data">{item?.department || "-"}</span>
                      </div>
                      <div className="details">
                        <span className="title">Designation:</span>
                        <span className="data">{item?.designation?.split('_').join(' ') || "-"}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              {viewData?.contacts?.length === 0 && <b>No Data Found !</b>}
            </AccordionBody>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
};

export default TabTwoContacts;
