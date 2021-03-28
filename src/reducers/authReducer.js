import { types } from "../types/types";

const initialState = {
    checking: true,
    loadingLogin: false,
    uid: null,
    name: null,
    admin: true
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }

        case types.authLogout:
            return {
                initialState
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLoadingStart:
            return {
                ...state,
                loadingLogin: true
            }

        case types.authLoadingFinish:
            return {
                ...state,
                loadingLogin: false
            }

        default:
            return state;
    }

}