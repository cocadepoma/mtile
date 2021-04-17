import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';
import { setActiveEvent } from '../../actions/calendar';
import { uiOpenModal } from '../../actions/ui';
import { disableScroll } from '../../helpers/disable-enable-scroll';
import { getOrderById } from '../../helpers/getOrderById';
import { getNameBreakdown, getNameOrderType, } from '../../helpers/helpersHistorical';
import { CalendarModal } from '../calendar/CalendarModal';


export const TableDashboard = ({ columns, data }) => {

    const { events } = useSelector(state => state.calendar);
    const { types } = useSelector(state => state.calendar);
    const { breakdowns } = useSelector(state => state.calendar);
    const { factories } = useSelector(state => state.factory);
    const { sections } = useSelector(state => state.factory);
    const { numbers } = useSelector(state => state.factory);
    const { machines } = useSelector(state => state.factory);

    const [tableModal, setTableModal] = useState(false);
    const dispatch = useDispatch();

    const tableInstance = useTable({ columns, data }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
    } = tableInstance;


    // Get the data-id attribute from the <td> and search the order in the store
    const handleRowClick = ({ target }) => {
        const orderId = target.attributes[0].nodeValue;

        if (!orderId || orderId === 'undefined' || orderId === 'cell' || !events || events.length < 1 || events === undefined) {
            return;
        }
        const order = getOrderById(orderId, events);

        setTableModal(true);
        dispatch(setActiveEvent(order));
        dispatch(uiOpenModal());
        disableScroll();
    }

    return (
        <div className="table-wrapper">

            {tableModal && <CalendarModal setTableModal={setTableModal} />}

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
                            rows.map(row => {
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

                                                    case 'start':
                                                        return <td key={i} data-id={cell.row.original.id}>{moment(cell.value).format("DD-MM-YYYY HH:mm").toString()}</td>;

                                                    case 'orderType':
                                                        const { name: orderType } = getNameOrderType(cell.value, types);
                                                        return <td key={i} data-id={cell.row.original.id}>{orderType}</td>;

                                                    case 'breakdown':
                                                        const { name: breakdownType } = getNameBreakdown(cell.value, breakdowns);
                                                        return <td key={i} data-id={cell.row.original.id}>{breakdownType}</td>;

                                                    case 'description':
                                                        return <td key={i} data-id={cell.row.original.id}>
                                                            {cell.value}
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
        </div>
    )
}
