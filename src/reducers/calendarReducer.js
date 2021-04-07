
import { types } from "../types/types";


const initialState = {
    events: [],
    types: [],
    breakdowns: [],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.loadOrderEvents: {
            return {
                ...state,
                events: [...action.payload]
            }
        }

        case types.loadOrderTypes: {
            return {
                ...state,
                types: [...action.payload]
            }
        }
        case types.loadBreakdownTypes: {
            return {
                ...state,
                breakdowns: [...action.payload]
            }
        }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.addOrderEvent:
            return {
                ...state,
                events: [...state.events, action.payload],
            };

        case types.updateOrderEvent:
            return {
                ...state,
                events: state.events.map((e) => (e.id === action.payload.id ? action.payload : e)),
            };

        case types.deleteOrderEvent:
            return {
                ...state,
                events: state.events.filter((e) => {
                    return e.id !== state.activeEvent.id;
                }),
                activeEvent: null,
            };

        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventCleaner:
            return {
                ...initialState
            }

        default:
            return state;
    }
};
