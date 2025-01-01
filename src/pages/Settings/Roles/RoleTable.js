import React, { Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useAsyncDebounce, useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { Row, Table } from 'reactstrap';
import { DefaultColumnFilter, Filter } from '../../../components/Common/filters';
import TableCommonSkeleton from '../../Skeleton/TableCommonSkeleton';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className="search_form">
            <form>
                <div className="position-relative">
                    <input
                        type="search"
                        onChange={e => {
                            e.preventDefault();
                            setValue(e.target.value);
                            onChange(e.target.value);
                            return false;
                        }}
                        className="form-control"
                        placeholder="Search"
                        value={value || ""}
                    />
                    <button className="btn" type="button">
                        <i className="bx bx-search-alt-2 align-middle"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

const RoleTable = ({ columns, data, isGlobalFilter, customPageSize, toggleRightCanvas, component, loader }) => {
    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize, state, preGlobalFilteredRows, setGlobalFilter, state: { pageIndex, pageSize }, } = useTable({
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
    const navidate = useNavigate();

    return (
        <>
            <div className="freight_filter_wrap d-flex align-items-center">
                <div className="right_actions_wrap flex-shrink-0 d-flex align-items-center ms-auto">
                    {isGlobalFilter && (
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    )}
                    <div className="add_btn">
                        <button className='border-0' onClick={() => { navidate(`/settings/addRole`); }}>
                            <i className='bx bx-plus align-middle'></i> Add
                        </button>
                    </div>
                </div>
            </div>
            <div className="table_pagination_wrap">
                <div className="table-responsive table_wrap_role">
                    <Table hover {...getTableProps()} className={'test'}>
                        <thead className="table-light table-nowrap">
                            {headerGroups.map(headerGroup => (
                                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th key={column.id} className={column.render("width") == 2 ? "px-0 " : "px-2"}>
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
                                        <tr className='th-reduce'>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td key={cell.id} {...cell.getCellProps()}>
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
                                        <tr >
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

export default RoleTable
