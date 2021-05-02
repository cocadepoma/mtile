// We can use dispatch in this actions file, because the middleware *thunk*.
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types"


// Login fetch without token
export const authLogin = (email, password) => {

    return async (dispatch) => {
        dispatch(startLoadingLogin());

        try {
            const resp = await fetchWithoutToken('users/', { email, password }, 'POST');
            const body = await resp.json();

            if (body.ok) {
                const { name, uid, token } = body;

                setTimeout(() => {

                    dispatch(finishLoadingLogin());

                    localStorage.setItem('token', token);
                    dispatch(login({
                        uid,
                        name
                    }));

                }, 500);

            }
        } catch (error) {
            console.log(error)
            console.log('SHOW ERRORRRRRRR');
            dispatch(finishLoadingLogin());
        }

    }
}

// login to authReducer
const login = (user) => ({
    type: types.authLogin,
    payload: user
});

// logout to authReducer
export const logout = () => ({
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

        try {
            //fetch with token to backend, if ok, dispatch(login), else finishChecking
            const resp = await fetchWithToken("users/renew");
            const body = await resp.json();

            if (body.ok) {
                localStorage.setItem("token", body.token);
                localStorage.setItem("token-init-date", new Date().getTime());

                return dispatch(
                    login({
                        uid: body.uid,
                        name: body.name
                    })
                );
            }
        } catch (error) {
            console.log(error)
            dispatch(finishChecking());
        }


    }
}

// If the token is outdated or doesn't exist, this function will set auth.checking to false
const finishChecking = () => ({
    type: types.authCheckingFinish,
});