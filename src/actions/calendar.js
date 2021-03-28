import { types } from "../types/types";

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