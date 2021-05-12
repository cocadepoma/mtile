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
                const { name, uid, token, admin } = body;
                setTimeout(() => {

                    dispatch(finishLoadingLogin());

                    localStorage.setItem('token', token);
                    localStorage.setItem("token-init-date", new Date().getTime());

                    dispatch(login({
                        uid,
                        name,
                        admin
                    }));

                    return {
                        ok: true
                    }
                }, 500);

            } else {
                return {
                    ok: false,
                    msg: 'Usuario y/o password incorrectos'
                }
            }

        } catch (error) {
            console.log(error)
            return {
                ok: false,
                msg: 'Error con la conexión, contacte con el administrador'
            }
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

export const finishLoadingLogin = () => ({
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

                dispatch(finishChecking());

                return dispatch(
                    login({
                        uid: body.uid,
                        name: body.name,
                        admin: body.admin
                    })
                );
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('token-init-date');
                dispatch(finishChecking());
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            localStorage.removeItem('token-init-date');
            dispatch(finishChecking());
        }
    }
}

// If the token is outdated or doesn't exist, this function will set auth.checking to false
export const finishChecking = () => ({
    type: types.authCheckingFinish,
});

export const startAddUser = (user) => {

    return async () => {

        try {
            const resp = await fetchWithToken('users/new', user, 'POST');
            const data = await resp.json();
            const msg = data?.msg;


            if (data?.ok) {

                return ({
                    user: data.user,
                    ok: true,
                    msg: 'Usuario creado correctamente'
                });

            } else {
                return ({
                    ok: false,
                    msg
                });
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const startUpdateUser = (userData) => {

    return async () => {

        try {

            const resp = await fetchWithToken(`users/${userData.id}`, userData, 'PUT');
            const { user } = await resp.json();

            if (user) {
                return ({
                    ok: true,
                    msg: 'Usuario editado correctamente',
                    user
                });
            } else {
                return ({
                    ok: false,
                    msg: 'Error al actualizar el usuario, inténtelo de nuevo más tarde',
                });
            }
        } catch (error) {
            console.log(error);
            return ({
                ok: false,
                msg: 'Error al conectar con la BBDD, contacte con el administrador',
            });
        }


    }

}

export const startDeleteUser = (id) => {

    return async () => {

        try {

            const resp = await fetchWithToken(`users/${id}`, undefined, 'DELETE');
            const { user } = await resp.json();


            if (user && !user.active) {
                return ({
                    ok: true,
                    msg: 'Usuario desactivado correctamente',
                    user,
                });
            } else if (user && user.active) {
                return ({
                    ok: true,
                    msg: 'Usuario activado correctamente',
                    user,
                });
            } else {
                return ({
                    ok: false,
                    msg: 'Error al borrar el usuario, inténtelo de nuevo más tarde',
                    user,
                });
            }

        } catch (error) {
            console.log(error);
            return ({
                ok: false,
                msg: 'Error al borrar el usuario, inténtelo de nuevo más tarde',
            });
        }

    }

}