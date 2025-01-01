import React from 'react'

const TableHead = ({ column }) => {
    return (
        <>
            <thead className="table-light">
                <tr>
                    {column.map(({ label, accessor }) => (
                        <th key={accessor}><span className='d-flex align-items-center'>{label} <i className='fas fa-sort'></i></span></th>
                    ))}
                </tr>
            </thead>
        </>
    )
}

export default TableHead;