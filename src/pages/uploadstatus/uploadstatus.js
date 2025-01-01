import {
    Col,
    Container, Row
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getUploadData } from '../../store/Procurement/actions'

import React, { useRef, useEffect, useState, useMemo } from 'react';
import SimpleBar from "simplebar-react"
import { GET_ALL_FILES_DATA } from "../../store/Global/actiontype";
import { useNavigate } from "react-router-dom";
import { eye_icon } from "../../assets/images";
import TfBreadcrumbs from "../../components/Common/TfBreadcrumbs";
import { CommonValue } from "../Procurement/FreightForwarding/partials/OceanCol";
import TableReact from "../Procurement/FreightForwarding/partials/TableReact";
import TableAllFilesData from "./TableAllFiles";

const UploadStatus = () => {
    const dispatch = useDispatch();
    const uploadStatus = useSelector((state) => state?.procurement?.uploadStatus);
    const { files_data_loader, files_data } = useSelector((state) => state.globalReducer);
    useEffect(() => {
        dispatch({ type: GET_ALL_FILES_DATA });
    }, [dispatch]);

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);


    const columns = useMemo(() => [
        {
            Header: 'File Name',
            accessor: "name",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Created On',
            accessor: 'creationDate',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Type',
            accessor: 'type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        
        {
            Header: 'size',
            accessor: "size",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },

        {
            Header: 'Action',
            Cell: (cellProps) => {
                return (  <div >  <a href={cellProps.row?.original.downloadUrl} download={cellProps.row?.original.name} className='btn btn'><img src={eye_icon} alt="Eye"  /></a>  </div>)
            }
        },
    ], []);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">

                        {/* <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={fclBreadcrumb} />
                        </div> */}
                     
                        <TableAllFilesData
                            columns={columns}
                            data={files_data || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                           component={"Customers"}
                           loader={files_data_loader || false}
                           setCurrentPage={setCurrentPage}
                           totalPages={files_data?.length / 10 || 0}
                           totalEntries={files_data?.length || 0}
                        />
                    </div>
                </Container>
            </div>
        </>
    )
}


export default UploadStatus;