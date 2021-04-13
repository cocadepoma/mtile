import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { setActiveEvent } from '../../actions/calendar';
import { uiOpenModal } from '../../actions/ui';
import { disableScroll } from '../../helpers/disable-enable-scroll';
import { getOrderById } from '../../helpers/getOrderById';
import { getNameBreakdown, getNameFactory, getNameNumber, getNameOrderType, getNameSection } from '../../helpers/helpersHistorical';
import { CalendarModal } from '../calendar/CalendarModal';


export const TableHistorical = ({ columns, data }) => {

    const { events } = useSelector(state => state.calendar);
    const { types } = useSelector(state => state.calendar);
    const { breakdowns } = useSelector(state => state.calendar);
    const { factories } = useSelector(state => state.factory);
    const { sections } = useSelector(state => state.factory);
    const { numbers } = useSelector(state => state.factory);
    const { machines } = useSelector(state => state.factory);

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
        const orderId = target.attributes[0].nodeValue;

        if (!orderId) {
            return;
        }

        const order = getOrderById(orderId, events);

        dispatch(setActiveEvent(order));
        dispatch(uiOpenModal());
        disableScroll();
        // const refElement = target.parentNode.childNodes[0].innerText;

        // const item = items.find(item => item.code === refElement);

        // dispatch(setActiveItem(item));
        // dispatch(uiOpenModal());
    }


    return (
        <div className="table-wrapper">
            <CalendarModal />

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

                {
                    types && breakdowns && factories && sections && numbers && machines

                    &&
                    <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                            page.map(row => {
                                // Prepare the row for display
                                prepareRow(row)
                                return (
                                    // Apply the row props
                                    <tr {...row.getRowProps()} onClick={handleRowClick}>
                                        {// Loop over the rows cells
                                            row.cells.map((cell, i) => {
                                                console.log(cell.row.original.id)
                                                switch (cell.column.id) {
                                                    case 'start':
                                                        return <td key={i} data-id={cell.row.original.id}>{moment(cell.value).format("DD-MM-YYYY HH:mm").toString()}</td>;
                                                    case 'orderType':
                                                        const { name: orderType } = getNameOrderType(cell.value, types);
                                                        return <td key={i} data-id={cell.row.original.id}>{orderType}</td>;
                                                    case 'breakdown':
                                                        const { name: breakdownType } = getNameBreakdown(cell.value, breakdowns);
                                                        return <td key={i} data-id={cell.row.original.id}>{breakdownType}</td>;
                                                    case 'factory':
                                                        const { name: factoryName } = getNameFactory(cell.value, factories);
                                                        return <td key={i} data-id={cell.row.original.id}>{factoryName}</td>;
                                                    case 'section':
                                                        const { name: sectionName } = getNameSection(cell.value, sections);
                                                        return <td key={i} data-id={cell.row.original.id}>{sectionName}</td>;
                                                    case 'number':
                                                        const { number: sectionNumber } = getNameNumber(cell.value, numbers);
                                                        return <td key={i} data-id={cell.row.original.id}>{sectionNumber}</td>;
                                                    case 'machine':
                                                        const { name: machineName } = getNameNumber(cell.value, machines);
                                                        return <td key={i} data-id={cell.row.original.id}>{machineName}</td>;
                                                    default:
                                                        // Apply the cell props
                                                        return (
                                                            <td {...cell.getCellProps()}>
                                                                {// Render the cell contents
                                                                    cell.render('Cell')}
                                                            </td>
                                                        )
                                                }

                                            })}
                                    </tr>
                                )
                            })}
                    </tbody>

                }

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
