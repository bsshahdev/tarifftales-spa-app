import React, { useMemo } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import AnimatedCounter from '../Dashboard/Partials/AnimatedCounter';
import CarrierChart from './CarrierChart';
import { CommonValue, TrendValue } from './DashboardCol';
import VendorCommonTable from './VendorCommonTable';
import { lansbySpendTableData, lansbyWeightTableData } from '../../common/data/dashboard';

const VendorDashboard = () => {    
    const columnsLansbyWeight = useMemo(() => [
        {
            Header: 'Lane',
            accessor: 'lane',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Total Weight',
            accessor: 'weight',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Trend',
            accessor: 'rate',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <TrendValue cellProps={cellProps} />
            }
        }
    ]);
    const columnsLansbySpend = useMemo(() => [
        {
            Header: 'Lane',
            accessor: 'lane',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Total Spends',
            accessor: 'spend',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Trend',
            accessor: 'rate',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <TrendValue cellProps={cellProps} />
            }
        }
    ]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="main_dashboard_wrapper vendor_dashboard_wrapper">
                        <div className="row">
                            <div className="col-xl-4">
                                <div>
                                    <Card>
                                        <CardBody>
                                            <h3 className="sub_title">Vendor Spend</h3>
                                            <div className="sh_box_wrap d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Total Vendors'>Total Vendors</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={10} />
                                                        <div className="text-nowrap fs-5">
                                                            {/* <span className={`${20 < 0 ? 'red_text' : 'green_text'}`}>20%</span> */}
                                                            <span className={"badge badge-soft-" + `${20 < 0 ? "danger" : "success"}` + " text-" + `${20 < 0 ? "danger" : "success"}`}>
                                                                20%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Total Spend MTD (Lacs)'>Total Spend MTD (Lacs)</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={200} />INR
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Total Spend Projected (Lacs)'>Total Spend Projected (Lacs)</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={500} />INR
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Top Vendor Spend (Lacs)'>Top Vendor Spend (Lacs)</p>
                                                    <b className='d-block text-primary'>Indigo Airlines</b>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">                                                        
                                                        <AnimatedCounter rate={80} />INR
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div>
                                    <h3 className="sub_title">Weight Exceptions</h3>
                                    <Card>
                                        <CardBody>
                                            <div className="sh_box_wrap d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Total Wt Exception (MT)'>Total Wt Exception (MT)</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={0.54} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${20 < 0 ? "danger" : "success"}` + " text-" + `${20 < 0 ? "danger" : "success"}`}>
                                                                20%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Spend Impact (Lacs)'>Spend Impact (Lacs)</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={2.5} />INR
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div>
                                    <h3 className="sub_title">Flight Exceptions</h3>
                                    <Card>
                                        <CardBody>
                                            <div className="sh_box_wrap d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Total Flight Changes'>Total Flight Changes</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={15} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${20 < 0 ? "danger" : "success"}` + " text-" + `${20 < 0 ? "danger" : "success"}`}>
                                                                20%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Spend Impact(Lacs)'>Spend Impact(Lacs)</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={	1.5 } />INR
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div>
                                    <CarrierChart />
                                </div>
                                <div>
                                    <h3 className="sub_title">Shipment Status</h3>
                                    <Card>
                                        <CardBody>
                                            <div className="sh_box_wrap sh_box-4 d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Total Shipments'>Total Shipments</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={340} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${20 < 0 ? "danger" : "success"}` + " text-" + `${20 < 0 ? "danger" : "success"}`}>
                                                                20%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Delivered'>Delivered</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={272} />
                                                        <div className="text-nowrap fs-5">
                                                            {/* <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span> */}
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='In Transit'>In Transit</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={61} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title" title='Exceptions'>Exceptions</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={7} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${15 < 0 ? "danger" : "success"}` + " text-" + `${15 < 0 ? "danger" : "success"}`}>
                                                                15%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        {/* dashboard tables */}
                        <Row className="sh_dashboar_table_wrap">
                            {/* Export Summary table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Top 10 Lanes by Weight(MT)</h3>
                                    <VendorCommonTable
                                        columns={columnsLansbyWeight}
                                        data={lansbyWeightTableData || []}
                                        customPageSize={8}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Top 10 Lanes by Spend(Lacs)</h3>
                                    <VendorCommonTable
                                        columns={columnsLansbySpend}
                                        data={lansbySpendTableData || []}
                                        customPageSize={8}
                                    />
                                </div>
                            </Col>
                            {/* <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Top 10 Customer</h3>
                                    <VendorCommonTable 
                                        columns={columns}
                                        data={[]}
                                        customPageSize={10}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Customerwise Inquiries</h3>
                                    <VendorCommonTable 
                                        columns={columns}
                                        data={[]}
                                        customPageSize={10}
                                    />
                                </div>
                            </Col> */}
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default VendorDashboard;
