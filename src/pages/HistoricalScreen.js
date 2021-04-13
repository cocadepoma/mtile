import React, { useEffect, useState } from 'react'
import { getColumnsTableHistorical } from '../helpers/getColumnsTables';
import { useSelector } from 'react-redux';
import { TableHistorical } from '../components/historical/TableHistorical';



export const HistoricalScreen = () => {

    const columns = getColumnsTableHistorical;
    const { events } = useSelector(state => state.calendar);
    const [orderedEvents, setOrderedEvents] = useState([]);

    useEffect(() => {
        const aux = events.sort((a, b) => b.start - a.start);
        setOrderedEvents(aux);
    }, [events]);

    return (
        <div className='historical-main-container animate__animated animate__fadeIn'>
            <h1 className='h1-historical'>Histórico</h1>
            {
                orderedEvents.length > 0 && <TableHistorical columns={columns} data={events} />
            }
        </div>
    )
}
