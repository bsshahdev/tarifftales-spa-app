import classnames from "classnames";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    Modal,
    ModalBody,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import TabOneVendorDetails from "./viewData/vendors/TabOneVendorDetails";
import TabTwoContacts from "./viewData/vendors/TabTwoContacts";
import TabThreeDocuments from "./viewData/vendors/TabThreeDocuments";

const ModalVendorValue = ({ viewData, modal, onCloseClick }) => {
    const [open, setOpen] = useState("");
    const [activeTab, toggleTab] = useState("1");

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
                    Vendor value
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <div className="col">
                            <Card>
                                <CardBody>
                                    <Nav className="nav-tabs-custom card-header-tabs justify-content-around">
                                        <NavItem>
                                            <NavLink href="#" className={classnames({ active: activeTab === "1", }, "px-3")} onClick={() => { toggleTab("1") }}>
                                                Vendor Details
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#" className={classnames({ active: activeTab === "2", }, "px-3")} onClick={() => { toggleTab("2") }} >
                                                Contacts
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#" className={classnames({ active: activeTab === "3", }, "px-3")} onClick={() => { toggleTab("3") }} >
                                                Documents
                                            </NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <NavLink href="#" className={classnames({ active: activeTab === "4", }, "px-3")} onClick={() => { toggleTab("4") }} >
                                                Communications
                                            </NavLink>
                                        </NavItem> */}
                                    </Nav>
                                </CardBody>
                            </Card>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <TabOneVendorDetails viewData={viewData} />

                                </TabPane>
                                <TabPane tabId="2">
                                    <TabTwoContacts viewData={viewData} />

                                </TabPane>
                                
                                <TabPane tabId="3">
                                    <TabThreeDocuments viewData={viewData} />
                                </TabPane>
                                {/* <TabPane tabId="4">
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                <b>Communications Details Not Found !</b>
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane> */}
                            </TabContent>
                        </div>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalVendorValue;
