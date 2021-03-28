import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Big-Calendar dependencies
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from '../helpers/calendar-messages';

// Import Spanish texts for days and months
import "moment/locale/es";
import { CalendarEvent } from '../components/calendar/CalendarEvent';
import { CalendarModal } from '../components/calendar/CalendarModal';
import { uiOpenModal } from '../actions/ui';
import { setActiveEvent } from '../actions/calendar';
import { getEventColor } from '../helpers/getEventColor';
import { disableScroll } from '../helpers/disable-enable-scroll';
moment.locale("es");
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    // Get events array from Redux Store
    const { events } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    // Set active event on Redux Store calendar: events[], activeEvent = event
    // then => Open modal
    const handleEventClick = (event) => {
        dispatch(setActiveEvent(event));
        dispatch(uiOpenModal());
        disableScroll();
    };

    // Calendar events style
    const eventStyleGetter = (event, start, end, isSelected) => {

        const { backgroundColor, textColor } = getEventColor(event);

        const style = {
            backgroundColor: backgroundColor,
            borderRadius: "5px",
            opacity: 0.8,
            display: "block",
            color: textColor,
        };
        return {
            style,
        };
    };
    // Save last position in localStorage
    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    // When the view changes, save the position in localStorage
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    return (
        <div className='calendar-screen animate__animated animate__fadeIn'>
            <h1>Calendario</h1>
            <Calendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                eventPropGetter={eventStyleGetter}
                messages={messages}
                components={{ event: CalendarEvent }}
                onSelectEvent={handleEventClick}
                onView={onViewChange}
                view={lastView}
                startAccessor='start'
                endAccessor='end'
            />
            <CalendarModal />
        </div>
    )
}
