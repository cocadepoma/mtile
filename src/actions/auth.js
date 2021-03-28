// We can use dispatch in this actions file, because the middleware *thunk*.
import { types } from "../types/types"


// TODO: Will call API with credentials
export const authLogin = (userEmail, userPassword) => {

    return async (dispatch) => {
        dispatch(startLoadingLogin());

        setTimeout(() => {

            dispatch(finishLoadingLogin());
            dispatch(login({
                uid: 'AKLJNCKLUJHALKJC',
                name: 'Paco'
            }));

        }, 1000);

    }
}
// login to authReducer
const login = (user) => ({
    type: types.authLogin,
    payload: user
});

// logout to authReducer
export const logout = (user) => ({
    type: types.authLogout
});


const startLoadingLogin = () => ({
    type: types.authLoadingStart
});

const finishLoadingLogin = () => ({
    type: types.authLoadingFinish
});

// On every Refresh, will check if usertoken is in localStorage and will renew it
export const startChecking = () => {

    return async (dispatch) => {
        //TODO: fetch with token to backend, if ok, dispatch(login), else finishChecking
        const ok = true;

        if (ok) {

            setTimeout(() => {
                dispatch(login({
                    uid: 'AKLJNCKLUJHALKJC',
                    name: 'Paco'
                }));
            }, 300);
        } else {
            dispatch(finishChecking());
        }
    }
}
// If the token is outdated or doesn't exist, this function will set auth.checking to false
const finishChecking = () => ({
    type: types.authCheckingFinish,
});