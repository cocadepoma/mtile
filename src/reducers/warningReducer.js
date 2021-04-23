import { types } from "../types/types";

const initialState = {
    warnings: []
}


export const warningReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.warningLoadWarnings:
            return {
                ...state,
                warnings: [...action.payload]
            }

        case types.warningAddWarning:
            return {
                ...state,
                warnings: [action.payload, ...state.warnings]
            }

        case types.warningRemoveWarning:
            return {
                ...state,
                warnings: state.warnings.filter(warning => warning.id !== action.payload)
            }

        case types.warningClear:
            return {
                ...initialState
            }

        default:
            return state;
    }


}