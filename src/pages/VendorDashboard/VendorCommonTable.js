import React, { Fragment } from 'react'
import { useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { DefaultColumnFilter, Filter } from '../../components/Common/filters';
import TableCommonSkeleton from '../Skeleton/TableCommonSkeleton';
import ReactPaginate from 'react-paginate';
import { Row, Table } from 'reactstrap';

const VendorCommonTable = ({ columns, data, isGlobalFilter, customPageSize, toggleRightCanvas, component, loader }) => {
    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize, state, preGlobalFilteredRows, setGlobalFilter } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: customPageSize },
    },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,);

    return (
        <>
            <div className="table_pagination_wrap">
                <div className="table-responsive table_wrap">
                    <Table hover {...getTableProps()} className={'test'}>
                        <thead className="table-light table-nowrap">
                            {headerGroups.map(headerGroup => (
                                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th key={column.id}>
                                            <span className='d-flex align-items-center' {...column.getSortByToggleProps()}>
                                                {column.render("Header")}
                                                <i className='fas fa-sort'></i>
                                            </span>
                                            <Filter column={column} />
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <Fragment key={row.getRowProps().key}>
                                        <tr>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td key={cell.id} {...cell.getCellProps()} style={{ backgroundColor: cell?.row?.original?.is_active === false ? "#D3D3D3" : "" }}>
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </Fragment>
                                );
                            })}
                            {page?.length === 0 && (
                                <>
                                    {loader ? (
                                        <TableCommonSkeleton tdCount={headerGroups[0].headers.length} />
                                    ) :
                                        <tr>
                                            <td colSpan={headerGroups[0].headers.length}>
                                                <div className='no_table_data_found'>
                                                    <p>No Data Found.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </>
                            )}
                        </tbody>
                    </Table>
                </div>
                <Row className="align-items-center g-3 text-center text-sm-start pagination_wrap">
                    <div className="col-sm">
                        <div className='pagination_left_text'>Showing<span className="fw-normal ms-1">{page.length}</span> of <span className="fw-normal">{data.length}</span> entries
                        </div>
                    </div>
                    <div className="col-sm-auto">
                        <div className='react_pagination_wrap'>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next"
                                onPageChange={(item) => { gotoPage(item.selected) }}
                                pageRangeDisplayed={3}
                                pageCount={pageOptions.length}
                                previousLabel="previous"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default VendorCommonTable
