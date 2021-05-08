import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchWithToken } from '../helpers/fetch';
import validator from 'validator';
import Switch from "react-switch";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalToastify } from '../components/ui/ModalToastify';
import { AdminModal } from '../components/admin/AdminModal';
import { uiOpenModal } from '../actions/ui';
import { disableScroll } from '../helpers/disable-enable-scroll';
import { startDeleteOrderEvent } from '../actions/calendar';
import { ToastSuccess } from '../components/ui/ToastSuccess';
import { ToastError } from '../components/ui/ToastError';
import { startAddUser, startDeleteUser } from '../actions/auth';

export const AdminScreen = () => {

    const [formValuesUser, setFormValuesUser] = useState({ email: '', name: '', password: '' });
    const { email, name, password } = formValuesUser;

    const [formValuesOrder, setFormValuesOrder] = useState({ orderId: '' });
    const { orderId } = formValuesOrder;

    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [idUser, setIdUser] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadUsers() {
            const resp = await fetchWithToken('users/', undefined, 'GET');
            const { users } = await resp.json();
            if (users) {
                setUsers([...users]);
            }
        }
        loadUsers();
    }, [])


    const handleInputChangeUser = ({ target }) => {
        const name = target.name;
        document.querySelector(`input[name="${name}"]`).classList.remove('border-red');

        setFormValuesUser({
            ...formValuesUser,
            [target.name]: target.value
        });
    }

    const handleInputSwitch = () => {
        setIsAdmin(!isAdmin)
    }

    // Will call tostify first to confirm the option the user will choose. Cancel or Deny.
    const handleStartDeleteUser = (id, name) => {
        toast.warn(<ModalToastify
            handleDeleteItem={() => handleDeleteUser(id)}
            code={name}
            message="Estás seguro de borrar el usuario" />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    const handleDeleteUser = async (id) => {
        const resp = await dispatch(startDeleteUser(id));

        if (resp?.ok) {
            setUsers(users.map(user => user.id === resp.user.id ? resp.user : user));
            toast.success(<ToastSuccess text={resp.msg} />, { position: toast.POSITION.TOP_CENTER });
        } else {
            toast.error(<ToastError text={resp.msg} />, { position: toast.POSITION.TOP_CENTER });
        }
    }

    const handleUpdateUser = (id) => {
        setIdUser(id);
        disableScroll();
        dispatch(uiOpenModal());
    }

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;
        let message = '';

        if (!validator.isEmail(email)) {
            document.querySelector('input[name="email"]').classList.add('border-red');
            isValid = false;
            message += 'El email debe de ser un email válido. \n';
        } else {
            document.querySelector('input[name="email"]').classList.remove('border-red');
        }

        if (name.trim().length < 4) {
            document.querySelector('input[name="name"]').classList.add('border-red');
            isValid = false;
            message += 'El nombre debe de tener al menos 4 caracteres. \n';
        } else {
            document.querySelector('input[name="name"]').classList.remove('border-red');
        }

        if (password.trim().length < 6) {
            document.querySelector('input[name="password"]').classList.add('border-red');
            isValid = false;
            message += 'La password debe de tener al menos 4 caracteres. \n';
        } else {
            document.querySelector('input[name="password"]').classList.remove('border-red');
        }

        if (!isValid) {
            return toast.error(message, { position: toast.POSITION.TOP_CENTER });
        }

        const resp = await dispatch(startAddUser({ ...formValuesUser, admin: isAdmin }))

        if (resp?.ok) {
            setUsers([...users, resp.user]);
            toast.success(<ToastSuccess text={resp.msg} />, { position: toast.POSITION.TOP_CENTER });
            setFormValuesUser({ email: '', name: '', password: '' });
            setIsAdmin(false);
        } else {
            const message = resp.msg || 'Error al crear el usuario, inténtelo más tarde';
            toast.error(<ToastError text={message} />, { position: toast.POSITION.TOP_CENTER });
        }

    }

    const handleInputChangeOrder = ({ target }) => {

        document.querySelector(`input[name="${target.name}"]`).classList.remove('border-red');
        setFormValuesOrder({
            ...formValuesUser,
            [target.name]: target.value
        });
    }

    // Will call tostify first to confirm the option the user will choose. Cancel or Deny.
    const handleStartDeleteOrder = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (orderId !== '') {
            toast.warn(<ModalToastify
                handleDeleteItem={handleSubmitOrder}
                code={orderId}
                message="Estás seguro de borrar la order con el número" />,
                {
                    position: toast.POSITION.TOP_CENTER,
                    closeOnClick: false,
                    autoClose: false,
                    toastId: '1'
                });
        } else {
            document.querySelector('input[name="orderId"]').classList.add('border-red');
            return toast.error('Debes indicar el número de orden', { position: toast.POSITION.TOP_CENTER });
        }
    }

    const handleSubmitOrder = async () => {

        let isValid = true;
        let message = '';

        if (!Number.isInteger(Number(orderId)) || orderId.trim().length === 0 || !validator.isNumeric(orderId)) {
            document.querySelector('input[name="orderId"]').classList.add('border-red');
            isValid = false;
            message += 'El id es obligatorio y debe de ser numérico. \n';
        } else {
            document.querySelector('input[name="orderId"]').classList.remove('border-red');
        }

        if (!isValid) {
            return toast.error(message, { position: toast.POSITION.TOP_CENTER });
        }

        const resp = await dispatch(startDeleteOrderEvent(orderId));

        if (resp.ok) {
            toast.success(<ToastSuccess text={resp.msg} />, { position: toast.POSITION.TOP_CENTER });
        } else {
            toast.error(<ToastError text={resp.msg} />, { position: toast.POSITION.TOP_CENTER });
        }

        setFormValuesOrder({ orderId: '' });

    }


    return (
        <div className='admin-screen animate__animated animate__fadeIn'>
            {idUser && <AdminModal
                setIdUser={setIdUser}
                idUser={idUser}
                users={users}
                setUsers={setUsers} />}
            <ToastContainer />
            <h1>Administración</h1>

            <div className="users-main-wrapper">

                <div className="wrapper-users-table">
                    <h3>Usuarios registrados</h3>
                    <div className="users-header">
                        <div>ID</div>
                        <div>Email</div>
                        <div>Nombre</div>
                        <div>Admin</div>
                        <div>Activo</div>
                        <div>Opciones</div>
                    </div>

                    {
                        users && users.length > 0 &&

                        users.map(user => {

                            return (
                                <div key={user.id} className="users-body">
                                    <div>{user.id}</div>
                                    <div>{user.email}</div>
                                    <div>{user.name}</div>
                                    <div>{user.admin ? "Si" : "No"}</div>
                                    <div className="user-status">
                                        {user.active
                                            ? <i className="fas fa-check"></i>
                                            : <i className="fas fa-times"></i>
                                        }
                                    </div>
                                    <div className="options-user">
                                        <i className="fas fa-wrench" onClick={() => { handleUpdateUser(user.id) }}></i>

                                        {user.active
                                            ? <i className="fas fa-user-minus" onClick={() => { handleStartDeleteUser(user.id, user.name) }}></i>
                                            : <i className="fas fa-user-plus" onClick={() => { handleStartDeleteUser(user.id, user.name) }}></i>
                                        }

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="forms-wrapper" onSubmit={handleSubmitUser}>
                    <form className="form-add-users">
                        <h3>Agregar nuevo usuario</h3>

                        <div className="main-wrapper-inputs">

                            <div className="wrapper-input">
                                <label>Admin: </label>
                                <Switch
                                    onChange={handleInputSwitch}
                                    checked={isAdmin}
                                    onColor="#ffa600"
                                    height={20}
                                    width={42} />
                            </div>

                            <div className="wrapper-input">
                                <label>Email: </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChangeUser}
                                    placeholder="Email"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="wrapper-input">
                                <label>Nombre: </label>
                                <input
                                    type="name"
                                    name="name"
                                    value={name}
                                    onChange={handleInputChangeUser}
                                    placeholder="Nombre"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="wrapper-input">
                                <label>Password: </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChangeUser}
                                    placeholder="Password"
                                    autoComplete="off"
                                />
                            </div>

                        </div>

                        <div className="main-wrapper-submit">
                            <button className="btn btn-order" type="submit">Crear</button>
                        </div>

                    </form>

                    <form className="form-remove-orders" onSubmit={handleStartDeleteOrder}>
                        <h3>Eliminar orden</h3>

                        <div className="wrapper-input">
                            <label>Número Orden: </label>
                            <input
                                type="text"
                                value={orderId}
                                onChange={handleInputChangeOrder}
                                placeholder="Número"
                                autoComplete="off"
                                name="orderId"
                            />
                        </div>
                        <div className="main-wrapper-submit">
                            <button className="btn btn-order-cancel" type="submit">Eliminar</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}
