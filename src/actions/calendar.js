import { types } from "../types/types";

import { fetchWithToken } from "../helpers/fetch";

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

export const startAddOrderEvent = (event) => {

    return async (dispatch) => {

        // fetch the event, get the id and push to store
        // const newEvent = {
        //     id: new Date().getTime(), ...event
        // }
        dispatch(addOrderEvent(event));

        //TODO: SHOW Alert if error or ok
        return {
            ok: true,
            message: 'Orden creada correctamente!'
        }

        //error
        // return {
        //     ok: false,
        //     message: 'Ha ocurrido un error!'
        // }

    }
}

const addOrderEvent = (event) => ({
    type: types.addOrderEvent,
    payload: event
});

export const startUpdateOrderEvent = (event) => {

    return async (dispatch) => {

        // fetch the events
        dispatch(updateOrderEvent(event));

        return {
            ok: true,
            message: 'Orden actualizada correctamente!'
        }

        //error
        // return {
        //     ok: false,
        //     message: 'Ha ocurrido un error!'
        // }
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




