import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { uiOpenModal } from '../../actions/ui';
import { setActiveItem } from '../../actions/warehouse';


export const Table = ({ columns, data }) => {

    const { items } = useSelector(state => state.warehouse);
    const dispatch = useDispatch();

    const tableInstance = useTable({ columns, data }, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        pageOptions,
        page,
        state: { pageIndex },
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage
    } = tableInstance;

    const handleRowClick = ({ target }) => {
        const refElement = target.parentNode.childNodes[0].innerText;

        const item = items.find(item => item.code === refElement);

        dispatch(setActiveItem(item));
        dispatch(uiOpenModal());
    }

    return (
        <div className="table-wrapper">
            <table {...getTableProps()} >
                <thead>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()}>
                                            {// Render the header
                                                column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                        page.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()} onClick={handleRowClick}>
                                    {// Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {// Render the cell contents
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div className="table-page-controls">

                <div className="table-buttons-wrapper">
                    <button className="btn btn-table" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="btn btn-table" onClick={() => nextPage()} disabled={!canNextPage}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div className="table-page">
                    Página {pageIndex + 1} de {pageOptions.length}
                </div>

            </div >

        </div>
    )
}
