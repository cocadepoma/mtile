import React from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../actions/auth';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { toggleShowPassword } from '../helpers/toggleShowPassword';
import { checkLoginPassword, checkLoginUser } from '../helpers/inputChecks';
import { LoadingPopup } from '../components/ui/LoadingPopup';

export const LoginScreen = () => {

    const [values, handleInputChange] = useForm({ user: 'pacors88@gmail.com', password: 'admin123456' });
    const { user, password } = values;
    const dispatch = useDispatch();

    const { loadingLogin } = useSelector(state => state.auth)

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        let valid = true;

        if (!checkLoginUser(user)) {
            valid = false;
        }
        if (!checkLoginPassword(password)) {
            valid = false;
        }

        if (!valid) {
            return;
        }

        dispatch(authLogin(user, password));
    }

    return (

        <div className='login-wrapper'>

            {loadingLogin && <LoadingPopup />}

            <AnimatedBackground />


            <div className="form-login-wrapper">
                <img src={`${process.env.PUBLIC_URL}/assets/images/mtile_login.png`} alt="logo_mtile" />
                {/* <h1>Acceso M-tile</h1> */}

                <form onSubmit={handleSubmitLogin}>

                    <div className="data-form-login">
                        <div className="login-grid">
                            <label>Email</label>
                            <input
                                type="text"
                                name="user"
                                value={user}
                                onChange={handleInputChange}
                                autoComplete="off" />
                        </div>
                        <span className="message-error-login-user">El email no es un email válido.</span>

                        <div className="login-grid">
                            <label>Password</label>
                            <div className="login-password-wrapper">
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                    autoComplete="off" />
                                <i className="fas fa-eye-slash icon-pwd" onClick={toggleShowPassword}></i>
                            </div>
                        </div>
                        <span className="message-error-login-password">La contraseña es demasiado corta.</span>

                        <div className="login-button-wrapper">
                            <button className="btn btn-login" type="submit">Login</button>
                        </div>
                    </div>

                </form>

            </div>
        </div>

    )
}
