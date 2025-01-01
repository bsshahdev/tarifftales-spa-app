import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const RevenueChart = () => {
    const [labelText, setLabelText] = useState('Annual Run Rate');

    const dropHandler = (label) => {
        setLabelText(label);
    };
    // ------------------------ charts options-------------------------
    const options = {
        chart: {
            height: 270,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "20",
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: "#E6E6E6",
            strokeDashArray: 2,
        },
        xaxis: {
            labels: {
                rotate: -45,
                style: {
                    fontWeight: "600",
                    fontSize: "12px",
                    color: ["#000000"],
                },
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            tickPlacement: 'on'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                colorStops: [
                    {
                        offset: 40,
                        color: '#4848F7',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: '#4848F7',
                        opacity: 0.2
                    }

                ],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 0.2,
                stops: [50, 0, 100]
            },
        }
    };
    const series = [{
        name: 'Revenue',
        data: [44, 55, 41, 67, 35, 43, 50, 55, 45, 40, 87, 65]
    }]
    return (
        <>
            <div className="sh_revenue_chart_wrap" style={{filter:"blur(3px)"}}>

                <div className="title_select_wrap">
                    <h3 className="sub_title">Revenue Run Rate</h3>
                    <div className="common_dropdown">
                        <UncontrolledDropdown>
                            <DropdownToggle
                                className="btn btn-secondary"
                                type="button"
                                tag="a"
                            >
                            {labelText}
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-end dropdown-menu-lg-start'>
                                <DropdownItem to="#" onClick={() => { dropHandler('Annual Run Rate') }}>Annual Run Rate</DropdownItem>
                                <DropdownItem to="#" onClick={() => { dropHandler('Monthly Run Rate') }}>Monthly Run Rate</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="chart_wrap">
                    <ReactApexChart options={options} series={series} type="bar" height={270} />
                </div>
            </div>
        </>
    )
}

export default RevenueChart
