import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination, useSortBy } from 'react-table';
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

    const tableInstance = useTable({ columns, data, initialState: { pageSize: 15 } }, useSortBy, usePagination,);

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


    // Get the data-id attribute from the <td> and search the order in the store
    const handleRowClick = ({ target }) => {

        const orderId = target.attributes[0].nodeValue;

        if (!orderId || !events || events.length < 1 || events === undefined) {
            return;
        }
        const order = getOrderById(orderId, events);

        dispatch(setActiveEvent(order));
        dispatch(uiOpenModal());
        disableScroll();
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
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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

                                                // each case will call their own method to parse the data 
                                                // from an ID to the name property
                                                switch (cell.column.id) {

                                                    // The attribute data-id must be first of other attributes, or the method onClick 
                                                    // is possible that will fail
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
                                                        return <td key={i} data-id={cell.row.original.id} className="text-center">{factoryName}</td>;

                                                    case 'section':
                                                        const { name: sectionName } = getNameSection(cell.value, sections);
                                                        return <td key={i} data-id={cell.row.original.id}>{sectionName}</td>;

                                                    case 'number':
                                                        const { number: sectionNumber } = getNameNumber(cell.value, numbers);
                                                        return <td key={i} data-id={cell.row.original.id} className="text-center">{sectionNumber}</td>;

                                                    case 'machine':
                                                        const { name: machineName } = getNameNumber(cell.value, machines);
                                                        return <td key={i} data-id={cell.row.original.id}>{machineName}</td>;

                                                    case 'totalMins':
                                                        return <td key={i} data-id={cell.row.original.id} className="text-right">{cell.value} min.</td>;

                                                    case 'closed':
                                                        return <td key={i} data-id={cell.row.original.id} className="text-center padlocks-history">
                                                            {cell.value ? <i data-id={cell.row.original.id} className="fas fa-lock"></i> : <i data-id={cell.row.original.id} className="fas fa-lock-open"></i>}
                                                        </td>;

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
