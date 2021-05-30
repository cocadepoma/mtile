import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';

import { enableScroll } from '../../helpers/disable-enable-scroll';

import { ToastContainer, toast } from 'react-toastify';

import validator from 'validator';
import 'react-toastify/dist/ReactToastify.css';
import Switch from "react-switch";
import { fetchWithToken } from '../../helpers/fetch';
import { startUpdateUser } from '../../actions/auth';
import { ToastSuccess } from '../ui/ToastSuccess';
import { ToastError } from '../ui/ToastError';

const initialState = {
    name: '',
    email: '',
    password: '',
    admin: false
}

export const AdminModal = ({ idUser, setIdUser, users, setUsers }) => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);

    const [formValues, setFormValues] = useState(initialState);
    const [show, setShow] = useState(false);
    const { name, email, password, admin } = formValues;

    useEffect(() => {

        async function getUser() {
            if (!idUser) {
                return;
            }
            const resp = await fetchWithToken(`users/${idUser}`, undefined, 'GET');
            const { user } = await resp.json();

            if (user) {
                setFormValues({ ...formValues, ...user });
                setShow(true);
            }
        }
        getUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    const handleInputSwitch = () => {
        setFormValues({
            ...formValues,
            admin: !admin
        });
    }

    // Update form values on type
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    // Check form values and Update or Create technician
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;
        let message = '';

        if (!validator.isEmail(email)) {
            document.querySelector('.email-modal').classList.add('border-red');
            isValid = false;
            message += 'El email debe de ser un email válido. \n';
        } else {
            document.querySelector('.email-modal').classList.remove('border-red');
        }

        if (name.trim().length < 4) {
            document.querySelector('.name-modal').classList.add('border-red');
            isValid = false;
            message += 'El nombre debe de tener al menos 4 caracteres. \n';
        } else {
            document.querySelector('.name-modal').classList.remove('border-red');
        }

        if (password.trim().length < 6) {
            document.querySelector('.password-modal').classList.add('border-red');
            isValid = false;
            message += 'La password debe de tener al menos 4 caracteres. \n';
        } else {
            document.querySelector('.password-modal').classList.remove('border-red');
        }

        if (!isValid) {
            return toast.error(message, { position: toast.POSITION.TOP_CENTER });
        }

        const resp = await dispatch(startUpdateUser({ ...formValues, id: idUser }));

        if (resp.ok) {
            toast.success(<ToastSuccess text={resp.msg} />, { position: toast.POSITION.TOP_CENTER });
            const newUsers = users.map(user => user.id === resp.user.id ? resp.user : user)
            setUsers([...newUsers]);
        } else {
            toast.error(<ToastError text={resp.msg} />, { position: toast.POSITION.TOP_CENTER });
        }

        handleCloseModal();

    }

    const handleCloseModal = () => {
        enableScroll();
        setFormValues(initialState);
        setIdUser(null);

        setTimeout(() => {
            dispatch(uiCloseModal());
        }, 200);
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                className='admin-modal animate__animated animate__fadeIn animate__faster'
                onRequestClose={handleCloseModal}
                contentLabel='Calendar Modal'
                closeTimeoutMS={300}
                ariaHideApp={!process.env.NODE_ENV === 'test'}
            >
                <div className="frame">
                    <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                    <h1 className="h1-modal">Editar Usuario</h1>

                    {
                        show === true &&
                        <form className="form-main-wrapper" onSubmit={handleSubmit}>

                            <div className="grid-items2">
                                <label>Admin: </label>
                                <Switch
                                    onChange={handleInputSwitch}
                                    checked={admin}
                                    onColor="#ffa600"
                                    height={14}
                                    width={30} />
                            </div>

                            <div className="grid-items">
                                <label>Email: </label>
                                <input
                                    className="email-modal"
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange}
                                    placeholder="Email" />
                            </div>

                            <div className="grid-items">
                                <label>Nombre: </label>
                                <input
                                    className="name-modal"
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    value={name}
                                    onChange={handleInputChange}
                                    placeholder="Nombre" />
                            </div>

                            <div className="grid-items">
                                <label>Password: </label>
                                <input
                                    className="password-modal"
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={handleInputChange}
                                    placeholder="Password" />
                            </div>

                            <div className="wrapper-button">
                                <button className="btn btn-order" type="submit">Guardar</button>
                            </div>

                        </form>
                    }


                </div>
                {modalOpen && <ToastContainer />}
            </Modal>

        </div>
    )
}
