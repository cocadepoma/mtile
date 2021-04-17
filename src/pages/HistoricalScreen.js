import React from 'react'
import { getColumnsTableHistorical } from '../helpers/getColumnsTables';
import { useSelector } from 'react-redux';
import { TableHistorical } from '../components/historical/TableHistorical';


export const HistoricalScreen = () => {

    const columns = getColumnsTableHistorical;
    const { events } = useSelector(state => state.calendar);

    return (
        <div className='historical-main-container animate__animated animate__fadeIn'>
            <h1 className='h1-historical'>Histórico de órdenes</h1>
            {
                events.length > 0 && <TableHistorical columns={columns} data={events} />
            }
        </div>
    )
}
