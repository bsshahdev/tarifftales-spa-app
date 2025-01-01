import React, { Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAsyncDebounce, useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { Row, Table } from 'reactstrap';
import { filter_icon, upload_icon } from '../../../../assets/images';
import { DefaultColumnFilter, Filter } from '../../../../components/Common/filters';
import { updateFCLActiveTab } from '../../../../store/Procurement/actions';
import { BLANK_CARRIER_DATA, BLANK_FCL_CARRIER_DATA, BLANK_SURCHARGE_DATA, GET_FCL_CHARGE_ID, GET_FCL_INLAND_CHARGE_ID, UPDATE_INLAND_ACTIVE_TAB } from '../../../../store/Procurement/actiontype';
import TableCommonSkeleton from '../../../Skeleton/TableCommonSkeleton';
import { useSelector } from 'react-redux';

// Define a default UI for filtering
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

const TableReact = ({ columns, data, isGlobalFilter, customPageSize, toggleRightCanvas, component, loader, currentPage, setCurrentPage, totalPages, totalEntries, pageOffset }) => {
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
    const dispatch = useDispatch();
    const { addFCL, addInland } = useSelector((state) => state?.procurement);

    const blankDataHandler = () => {
        console.log(component);
        if (component === 'fcl_upload') {
            navidate(`/freight/ocean/fcl/upload/form`);
        } else {
            if (component === 'fcl') {
                console.log("iffffffffffffffff table..")
                dispatch({ type: BLANK_SURCHARGE_DATA, payload: { name: 'addFCL', data: { ...addFCL, surcharges: [] } } });
                dispatch({ type: GET_FCL_CHARGE_ID, payload: '' });
            } else if (component === 'inland') {
                dispatch({ type: BLANK_SURCHARGE_DATA, payload: { name: 'addInland', data: { ...addInland, surcharges: [] } } });
                dispatch({ type: UPDATE_INLAND_ACTIVE_TAB, payload: { tab: 3 } });
                dispatch({ type: GET_FCL_INLAND_CHARGE_ID, payload: '' });
            }
            navidate(`/freight/upload/${component}`, { state: { id: component } });
            dispatch(updateFCLActiveTab(1));
        }
    }

    return (
        <>
            <div className="freight_filter_wrap d-flex align-items-center">
                <p className="label flex-grow-1 m-0">Filters :</p>

                <div className="right_actions_wrap flex-shrink-0 d-flex align-items-center">
                    {isGlobalFilter && (
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    )}
                    <div className="filter_wrap">
                        <button className='bg-transparent' onClick={toggleRightCanvas}><img src={filter_icon} alt="filter" /></button>
                    </div>
                    <div className="upload_wrap">
                        <button className='bg-transparent' onClick={() => { component === 'fcl_upload' ? navidate(`/freight/ocean/fcl/upload/form`) : navidate(`/freight/upload/${component}`, { state: { id: component } }); }}>
                            <img src={upload_icon} alt="Upload" />Upload file
                        </button>
                    </div>
                    <div className="add_btn">
                        {/* <button className='border-0' onClick={() => {navidate(`/freight/upload/${component}`);}}> */}
                        <button className='border-0' onClick={() => { component === 'fcl_upload' ? "" : blankDataHandler(); }}>
                            <i className='bx bx-plus align-middle'></i> Add
                        </button>
                    </div>
                </div>
            </div>
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
                            {loader ? (
                                <TableCommonSkeleton tdCount={headerGroups[0].headers.length} />
                            ) : (
                                <React.Fragment>
                                    {page.map((row, index) => {
                                        prepareRow(row);
                                        return (
                                            <Fragment key={row.getRowProps().key}>
                                                <tr>
                                                    {row.cells.map(cell => {
                                                        return (
                                                            <>
                                                                <td key={cell.id} {...cell.getCellProps()} style={{ backgroundColor: cell?.row?.original?.is_active === false ? "#D3D3D3" : "" }}>
                                                                    {cell.render("Cell")}
                                                                </td>
                                                            </>
                                                        );
                                                    })}
                                                </tr>
                                                <div style={{ marginBottom: index === page.length - 1 && page.length <=4  ? '150px' : '0' }}></div>
                                            </Fragment>
                                        );
                                    })}
                                    {page?.length === 0 && (
                                        <tr>
                                            <td colSpan={headerGroups[0].headers.length}>
                                                <div className='no_table_data_found'>
                                                    <p>No Data Found.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )}
                        </tbody>
                    </Table>
                </div>
                <Row className="align-items-center g-3 text-center text-sm-start pagination_wrap">
                    <div className="col-sm">
                        <div className='pagination_left_text'>Showing<span className="fw-normal ms-1">{page.length}</span> of <span className="fw-normal">{totalEntries}</span> entries
                        </div>
                        {/* <div className='pagination_left_text'>Showing <span className="fw-normal ms-1">{currentPage > 1 ? (currentPage - 1) + '1' : (currentPage - 1)}</span> to <span className="fw-normal">{pageOffset}</span> of <span className="fw-normal">{totalEntries}</span> entries
                        </div> */}
                    </div>
                    <div className="col-sm-auto">
                        <div className='react_pagination_wrap'>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next"
                                onPageChange={(item) => { setCurrentPage(item.selected); gotoPage(item.selected); }}
                                pageRangeDisplayed={3}
                                pageCount={totalPages}
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

export default TableReact
