import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalAlert: false
};

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true,
            };

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false,
            };

        case types.uiToggleAlerts:
            return {
                ...state,
                modalAlert: !state.modalAlert,
            };

        default:
            return state;
    }
};
