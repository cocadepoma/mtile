import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, finishLoadingLogin } from '../actions/auth';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { toggleShowPassword } from '../helpers/toggleShowPassword';
import { checkLoginPassword, checkLoginUser } from '../helpers/inputChecks';
import { LoadingPopup } from '../components/ui/LoadingPopup';
import { toast, ToastContainer } from 'react-toastify';
import { ToastError } from "../components/ui/ToastError";
import Switch from "react-switch";


export const LoginScreen = () => {

    const [formValues, setFormValues] = useState({ user: 'test@test.com', password: 'testuser*123' });
    const [rememberMe, setRememberMe] = useState(false);
    const { user, password } = formValues;
    const { loadingLogin } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {

        const email = localStorage.getItem('user_mail') || '';
        if (email) {
            setFormValues({ user: email, password: '' });
            setRememberMe(true);
        }
    }, []);


    const handleInputSwitch = () => {
        setRememberMe(!rememberMe);
    }

    const handleInputChange = ({ target }) => {

        const name = target?.name;

        document.querySelector(`input[name="${name}"]`).classList.remove('border-red');
        document.querySelector(`.message-error-login-${name}`).classList.remove('show-error');

        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const handleSubmitLogin = async (e) => {
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

        if (rememberMe) {
            localStorage.setItem('user_mail', user);
        } else {
            localStorage.removeItem('user_mail');
        }

        const resp = await dispatch(authLogin(user, password));

        if (resp?.ok === false) {
            dispatch(finishLoadingLogin());

            setTimeout(() => {
                document.querySelector(`input[name="user"]`).classList.add('border-red');
                document.querySelector(`input[name="password"]`).classList.add('border-red');
                return toast.error(<ToastError text={resp.msg} />);
            }, 200);

        }
    }

    return (

        <div className='login-wrapper'>

            {loadingLogin && <LoadingPopup />}

            <AnimatedBackground />

            <ToastContainer />
            <div className="form-login-wrapper">
                <img src={`${process.env.PUBLIC_URL}/assets/images/mtile_login.png`} alt="logo_mtile" />

                <form onSubmit={handleSubmitLogin}>

                    <div className="data-form-login">
                        <div className="login-grid">
                            <label>Email:</label>
                            <input
                                type="text"
                                name="user"
                                value={user}
                                onChange={handleInputChange}
                                autoComplete="off" />
                        </div>
                        <span className="message-error-login-user">El email no es un email válido.</span>

                        <div className="login-grid">
                            <label>Password:</label>
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

                            <div className="remember-me-wrapper">
                                <Switch
                                    onChange={handleInputSwitch}
                                    checked={rememberMe}
                                    onColor="#ffa600"
                                    height={20}
                                    width={42} />
                                <label>Remember me?</label>
                            </div>
                            <button className="btn btn-login" type="submit">Login</button>
                        </div>
                    </div>

                </form>

            </div>
        </div>

    )
}
