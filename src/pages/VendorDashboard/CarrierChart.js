import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const CarrierChart = () => {
    const [labelText, setLabelText] = useState('By Volume');

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
            title: {
                text: 'Vendor',
                offsetX: 0,
                offsetY: 90,
                style: {
                    cssClass: 'apexcharts-xaxis-title',
                },
            },
            labels: {
                rotate: -45,
                style: {
                    fontWeight: "600",
                    fontSize: "12px",
                    color: ["#000000"],
                },
            },
            categories: ['Air Asia', 'Air India', 'Indigo Airlines', 'Spicejet', 'Air India-Index', 'Indigo Balaji'],
            tickPlacement: 'on'
        },
        yaxis: {
            min: 0,
            max: 300,
            tickAmount: 4,
            title: {
                text: labelText === 'By Weight' ? 'Weight (MT)' : 'Spend (Lacs)',
                offsetX: 0,
                offsetY: 0,
                style: {
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
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
    const Volumnseries = [{
        name: 'Weight(MT)',
        data: [83.3, 104.2, 166.7, 20.8,20.8,20.8]
    }]
    const series = [{
        name: 'Spend(Lacs)',
        data: [40, 50, 80, 10, 10, 10]
    }]
    return (
        <>
            <div className="sh_revenue_chart_wrap mb-3">
                <div className="title_select_wrap">
                    <h3 className="sub_title">Carrier Distribution</h3>
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
                                {/* <DropdownItem to="#" onClick={() => { dropHandler('By Volume') }}>By Volume</DropdownItem> */}
                                <DropdownItem to="#" onClick={() => { dropHandler('By Weight') }}>By Weight</DropdownItem>
                                <DropdownItem to="#" onClick={() => { dropHandler('By Spend') }}>By Spend</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="chart_wrap">
                    <ReactApexChart options={options} series={labelText === "By Weight" ? Volumnseries : series} type="bar" height={422} />
                </div>
            </div>
        </>
    );
}

export default CarrierChart;
