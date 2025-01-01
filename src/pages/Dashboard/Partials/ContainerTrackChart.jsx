import React, { useRef, useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
// //Import Scrollbar
import SimpleBar from "simplebar-react"
import DashboardVector from './DashboardVector';

const ContainerTrackChart = () => {
    const ref = useRef();
    const [labelText, setLabelText] = useState('Delivered');

    const dropHandler = (label) => {
        setLabelText(label);
    };
    return (
        <>
            <div className="sh_container_tracking_wrap" style={{filter:"blur(3px)"}}>
                <div className="title_select_wrap">
                    <h3 className="sub_title">Container Tracking</h3>
                    <div className="common_dropdown">
                        <span>Status:</span>
                        <UncontrolledDropdown>
                            <DropdownToggle
                                className="btn btn-secondary"
                                type="button"
                                tag="a"
                            >
                                {labelText}
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-end dropdown-menu-lg-start'>
                                <DropdownItem to="#" onClick={() => { dropHandler('Delivered') }}>Delivered</DropdownItem>
                                <DropdownItem to="#" onClick={() => { dropHandler('Stuck') }}>Stuck</DropdownItem>
                                <DropdownItem to="#" onClick={() => { dropHandler('In Transit') }}>
                                    In Transit
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>

                {/* Charts Details */}
                <div className="chart_info_wrap">
                    <div className="chart_wrap">
                        <DashboardVector />
                    </div>
                    <div className="map_info_wrap">
                        <SimpleBar style={{ maxHeight: "320px" }} ref={ref}>
                            <ul>
                                <li className='active'>
                                    <div className="map_info">
                                        <span className="status delivered">Delivered</span>
                                        <p className="name">Maria Jenson</p>
                                        <p className="location">Port of Houston</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="map_info">
                                        <span className="status stuck">Stuck</span>
                                        <p className="name">Vironica lexus</p>
                                        <p className="location">Port of Long Beach</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="map_info">
                                        <span className="status transit">In Transit</span>
                                        <p className="name">Mia toreto</p>
                                        <p className="location">Port of New Orleans</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="map_info">
                                        <span className="status transit">In Transit</span>
                                        <p className="name">Mia toreto</p>
                                        <p className="location">Port of New Orleans</p>
                                    </div>
                                </li>
                            </ul>
                        </SimpleBar>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContainerTrackChart
