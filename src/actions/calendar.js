import { types } from "../types/types";

import { fetchWithToken, fetchOperations } from "../helpers/fetch";
import { countTotalTimeOperations } from "../helpers/countTotalTimeOperations";

// Set the last clicked event to activeEvent
export const setActiveEvent = (event) => ({
    type: types.eventSetActive,
    payload: event
});

// Change activeEvent to NULL
export const clearActiveEvent = () => ({
    type: types.eventClearActive
});

// Return calendarReducer to its initialState
export const clearEvents = () => ({
    type: types.eventCleaner
});

export const startLoadOrderEvents = () => {

    return async (dispatch) => {

        // Call to load order types and breakdown types
        dispatch(startLoadOrderTypes());
        dispatch(startLoadBreakdownTypes());

        // fetch the events
        try {
            const resp = await fetchWithToken("events/events");
            const { eventsWithData: events } = await resp.json();

            if (events) {

                for (const event of events) {
                    event.end = new Date(event.end);
                    event.endFix = new Date(event.endFix);
                    event.start = new Date(event.start);
                    event.startFix = new Date(event.startFix);

                    for (const clock of event.clocks) {
                        clock.start = new Date(clock.start)
                        clock.end = new Date(clock.end)
                    }
                }
                dispatch(loadOrderEvents(events));
            }
        } catch (error) {
            console.log(error);
        }


    }
}

const loadOrderEvents = (events) => ({
    type: types.loadOrderEvents,
    payload: events
});

export const startAddOrderEvent = (eventData) => {

    return async (dispatch) => {

        try {
            const count = countTotalTimeOperations(eventData);
            eventData.totalMins = count;

            const { operations, materials, clocks, ...newEvent } = eventData;


            // fetch the event 
            const resp = await fetchWithToken("events/events", newEvent, 'POST');
            const { event } = await resp.json();

            if (event) {
                // Get the generated ID
                const { id } = event;

                // fetch the operations, clocks and materials with the eventID generated
                const array_operations = await fetchOperations(id, 'operation', operations);
                const array_clocks = await fetchOperations(id, 'clock', clocks);
                const array_materials = await fetchOperations(id, 'item', materials);

                // Add the operations, clocks, materials from backend to event
                event.operations = array_operations;
                event.clocks = array_clocks;
                event.materials = array_materials;

                // Add the new event to the state
                dispatch(addOrderEvent(event));

                return {
                    ok: true,
                    message: 'Orden creada correctamente!'
                }
            } else {
                //error
                return {
                    ok: false,
                    message: 'No se ha podido guardar la orden!'
                }
            }

        } catch (error) {
            console.log(error);
            return {
                ok: false,
                message: 'Error al guardar en la BBDD, contacte con el administrador!'
            }
        }
    }
}

const addOrderEvent = (event) => ({
    type: types.addOrderEvent,
    payload: event
});

export const startUpdateOrderEvent = (eventData) => {

    return async (dispatch) => {


        const { id, operations, materials, clocks, ...newEvent } = eventData;

        const count = countTotalTimeOperations(eventData);
        newEvent.totalMins = count;

        // If the order is closed, set confirmed to true
        if (eventData.closed === true) {
            newEvent.confirmed = true;
        }

        try {
            //fetch the event 
            const resp = await fetchWithToken(`events/events/${id}`, newEvent, 'PUT');
            const { event } = await resp.json();

            if (event) {

                // Remove previous operations, clocks, and items
                await fetchWithToken(`events/operation/${id}`, undefined, 'DELETE');
                await fetchWithToken(`events/clock/${id}`, undefined, 'DELETE');
                await fetchWithToken(`events/item/${id}`, undefined, 'DELETE');

                // fetch the operations with the eventID updated
                let array_operations = [];
                if (operations.length > 0) {
                    array_operations = await fetchOperations(id, 'operation', operations);
                }
                event.operations = array_operations;

                // fetch the clocks with the eventID updated
                let array_clocks = [];
                if (clocks.length > 0) {
                    array_clocks = await fetchOperations(id, 'clock', clocks);
                }
                event.clocks = array_clocks;

                // fetch the items with the eventID updated
                let array_materials = [];
                if (materials.length > 0) {
                    array_materials = await fetchOperations(id, 'item', materials);
                }
                event.materials = array_materials;

                // If the order is closed, confirm that discounting the items in the warehouse
                if (event.confirmed) {
                    console.log('discount items', event.materials)
                }
                // // Add the new event to the state
                dispatch(updateOrderEvent(event));

                return {
                    ok: true,
                    message: 'Orden creada correctamente!'
                }
            } else {
                //error
                return {
                    ok: false,
                    message: 'No se ha podido guardar la orden!'
                }
            }

        } catch (error) {
            console.log(error);
            return {
                ok: false,
                message: 'Error al guardar en la BBDD, contacte con el administrador!'
            }
        }
    }
}

const updateOrderEvent = (event) => ({
    type: types.updateOrderEvent,
    payload: event
});

export const startDeleteOrderEvent = () => {

    return async (dispatch) => {

        // fetch the events

        dispatch(deleteOrderEvent());

    }
}

const deleteOrderEvent = (event) => ({
    type: types.deleteOrderEvent,
    payload: event
});

const startLoadOrderTypes = () => {

    return async (dispatch) => {

        try {
            // fetch the types
            const resp = await fetchWithToken("events/types");
            const { types } = await resp.json();

            if (types) {
                dispatch(loadOrderTypes(types));
            }
        } catch (error) {
            console.log(error);
        }


    }
}
const loadOrderTypes = (orderTypes) => ({
    type: types.loadOrderTypes,
    payload: orderTypes
});

const startLoadBreakdownTypes = () => {

    return async (dispatch) => {

        try {
            // fetch the breakdowns
            const resp = await fetchWithToken("events/breakdowns");
            const { breakdowns } = await resp.json();

            if (breakdowns) {
                dispatch(loadBreakdownTypes(breakdowns));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const loadBreakdownTypes = (breakdownTypes) => ({
    type: types.loadBreakdownTypes,
    payload: breakdownTypes
});




