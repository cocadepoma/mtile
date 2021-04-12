import { types } from "../types/types";

const initialState = {
    technicians: [],
    activeTechnician: null
}


export const crewReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.crewLoadTechnicians: {
            return {
                ...state,
                technicians: action.payload
            }
        }


        case types.crewSetActive:
            return {
                ...state,
                activeTechnician: action.payload
            }

        case types.crewClearActive:
            return {
                ...state,
                activeTechnician: null
            }

        case types.crewAddNewTechnician:
            return {
                ...state,
                technicians: [...state.technicians, action.payload]
            }

        case types.crewDeleteTechnician:
            return {
                ...state,
                technicians: state.technicians.filter((t) => t.id !== state.activeTechnician.id),
            };

        case types.crewUpdateTechnician:
            return {
                ...state,
                technicians: state.technicians.map(t => t.id === state.activeTechnician.id ? action.payload : t)
            }

        case types.crewClearTechnician:
            return {
                ...initialState
            }

        default:
            return state;
    }
}
