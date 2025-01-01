import React, { useRef, useState } from 'react'
import { profImg } from '../../../assets/images'
import { Table } from 'reactstrap'
// //Import Scrollbar
import SimpleBar from "simplebar-react"
const CommonTable = ({ column, data, type, handleSorting }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [showAll, setShowAll] = useState(false);
    const ref = useRef();

    const handleSortingChange = (accessor, type) => {
        const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder, type);
    };

    const handleExpandClick = () => {
        setShowAll(!showAll);
    };

    return (
        <>
            <div className="table_wrap">
                <SimpleBar style={{ maxWidth: "100%" }} ref={ref}>
                    <Table className="table mb-0">
                        <thead className="table-light">
                            <tr>
                                {column?.map(({ label, accessor },index) => (
                                    <th key={index} onClick={() => handleSortingChange(accessor, type)}>
                                        <span className='d-flex align-items-center'>{label} </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.slice(0, showAll ? data.length : 10).map((item) => (
                                <tr key={item?.id}>
                                    {column.map(({ accessor }) => {
                                        const tData = item[accessor] ? item[accessor] : item[accessor] === 0 ? 0 : "_";
                                        if (accessor === 'employee') {
                                            return (
                                                <td key={accessor}>
                                                    <div className="prof_wrap">
                                                        <span>{tData}</span>
                                                    </div>
                                                </td>
                                            );
                                        } else {
                                            return (
                                                <td key={accessor}>
                                                    {accessor === 'trend' ? (
                                                        <div className="text-nowrap">
                                                            <span className={"badge badge-soft-" +`${tData < 0 ? "danger" : "success"}` + " text-" + `${tData < 0 ? "danger" : "success"}`}>
                                                                {tData}%
                                                            </span>
                                                        </div>
                                                    ) : accessor === 'ratio' ? tData  : tData}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* <div className="text-center mt-2">
                        <button onClick={handleExpandClick} className="btn btn-primary btn-sm ms-2">
                            {showAll ? "Collapse" : "Expand to show all"}
                        </button>
                    </div> */}
                </SimpleBar>
            </div>
        </>
    );
};

export default CommonTable;