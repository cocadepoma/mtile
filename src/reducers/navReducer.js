import { types } from "../types/types";

const initialState = {
    navExtended: false
}

export const navReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.toggleNav:
            return {
                ...state,
                navExtended: !state.navExtended
            }

        default:
            return state;
    }


}