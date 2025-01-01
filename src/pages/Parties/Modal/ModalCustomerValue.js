import classnames from "classnames";
import React, { useEffect, useState } from "react";
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
import TabOneCustomerDetails from "./viewData/customers/TabOneCustomerDetails";
import TabThreeDocuments from "./viewData/customers/TabThreeDocuments";
import TabTwoContacts from "./viewData/customers/TabTwoContacts";

const ModalCustomerValue = ({ viewData, modal, onCloseClick }) => {
    const [activeTab, toggleTab] = useState(`${viewData?.id}_1`);

    useEffect(() => {
        toggleTab(`${viewData?.id}_1`)
    }, [viewData?.id]);

    return (
        <>
            <Modal
                isOpen={modal}
                toggle={onCloseClick}
                className="table_view_modal"
                style={{ maxWidth: "1345px" }}
            >
                <ModalHeader tag="h4">
                    Customer value
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <div className="col">
                            <Card>
                                <CardBody>
                                    {/* Tabs */}
                                    <Nav className="nav-tabs-custom card-header-tabs justify-content-around">
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === `${viewData?.id}_1`,
                                                }, "px-3")}
                                                onClick={() => { toggleTab(`${viewData?.id}_1`) }}>
                                                Customer Details</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === `${viewData?.id}_2`,
                                                }, "px-3")}
                                                onClick={() => { toggleTab(`${viewData?.id}_2`) }}
                                            >Contacts</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === `${viewData?.id}_3`,
                                                }, "px-3")}
                                                onClick={() => { toggleTab(`${viewData?.id}_3`) }}
                                            >Documents</NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === `${viewData?.id}_4`,
                                                }, "px-3")}
                                                onClick={() => { toggleTab(`${viewData?.id}_4`) }}
                                            >Rates</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === `${viewData?.id}_5`,
                                                }, "px-3")}
                                                onClick={() => { toggleTab(`${viewData?.id}_5`) }}
                                            >Discounts</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === `${viewData?.id}_6`,
                                                }, "px-3")}
                                                onClick={() => { toggleTab(`${viewData?.id}_6`) }}
                                            >Invoice Settings</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === `${viewData?.id}_7`,
                                                }, "px-3")}
                                                onClick={() => { toggleTab(`${viewData?.id}_7`) }}
                                            >Communications</NavLink>
                                        </NavItem> */}
                                    </Nav>
                                </CardBody>
                            </Card>
                            <TabContent activeTab={activeTab}>
                                {/* Customer Details */}
                                <TabPane tabId={`${viewData?.id}_1`}>
                                    <TabOneCustomerDetails viewData={viewData} />
                                </TabPane>

                                {/* Customer Contacts */}
                                <TabPane tabId={`${viewData?.id}_2`}>
                                    <TabTwoContacts viewData={viewData} />
                                </TabPane>

                                {/* Customer Documents */}
                                <TabPane tabId={`${viewData?.id}_3`}>
                                    <TabThreeDocuments viewData={viewData} />
                                </TabPane>

                                {/* Customer Rates */}
                                {/* <TabPane tabId={`${viewData?.id}_4`}>
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                <b>Rate Details Not Found !</b>
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane> */}

                                {/* Customer discounts */}
                                {/* <TabPane tabId={`${viewData?.id}_5`}>
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                <b>Discount Details Not Found !</b>
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane> */}

                                {/* Customer Invoice */}
                                {/* <TabPane tabId={`${viewData?.id}_6`}>
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                <b>Invoice Details Not Found !</b>
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane> */}

                                {/* Customer Communication */}
                                {/* <TabPane tabId={`${viewData?.id}_7`}>
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                <b>Communication Details Not Found !</b>
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

export default ModalCustomerValue;
