import { types } from "../types/types";

const initialState = {
    navExtended: false,
    showResponsive: false,
}

export const navReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.toggleNav:
            return {
                ...state,
                navExtended: !state.navExtended
            }

        case types.toggleResponsiveNav:
            return {
                ...state,
                showResponsive: !state.showResponsive
            }
        default:
            return state;
    }


}