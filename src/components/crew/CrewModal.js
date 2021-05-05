import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveTechnician, startAddTechnician, startDeleteTechnician, startUpdateTechnician } from '../../actions/technician';
import { uiCloseModal } from '../../actions/ui';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import { enableScroll } from '../../helpers/disable-enable-scroll';
import { checkImageSizeAndType } from '../../helpers/checkImageSizeAndType';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import moment from 'moment';

import validator from 'validator';
import { ModalToastify } from '../ui/ModalToastify';

const initialState = {
    name: '',
    surname: '',
    birthDate: new Date(),
    identityDocument: '',
    phoneNumber: '',
    email: '',
    city: '',
    address: '',
    image: null,
    notes: '',
    schedule: 'default',
    factory: 'default',
}

export const CrewModal = () => {

    const [formValues, setFormValues] = useState(initialState);
    const [file, setFile] = useState(null);
    const {
        name, surname, birthDate, identityDocument, phoneNumber,
        email, city, address, image, notes, schedule, factory
    } = formValues;

    const { modalOpen } = useSelector(state => state.ui);
    const { activeTechnician } = useSelector(state => state.crew);

    const dispatch = useDispatch();

    // If there is an activeTechnician on Store, Modal is opened => disableScroll and set the data
    // If there is not activeTechnician, init the form with empty values
    useEffect(() => {
        if (activeTechnician) {
            setFormValues(activeTechnician);
        } else {
            setFormValues(initialState);
        }
    }, [activeTechnician]);

    // Update form values on type
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    // Detect when image file change and update picture 
    const handlePictureChange = async ({ target }) => {

        if (target.files.length > 0) {

            const tempFile = target.files[0];

            const check = await checkImageSizeAndType(tempFile);

            if (!check.ok) {
                return toast.error(check.error, { position: toast.POSITION.TOP_CENTER });
            }

            setFile(target.files[0]);
        }
    }

    // Update date on any change
    const handleDateChange = (date) => {
        setFormValues({
            ...formValues,
            birthDate: new Date(date)
        });
    }

    // Delete technician from the Store
    const handleDeleteTechnician = () => {
        enableScroll();
        dispatch(startDeleteTechnician());
        dispatch(uiCloseModal());
    }

    // Will call tostify first to confirm the option the user will choose. Cancel or Deny.
    const handleStartDelete = () => {
        toast.warn(<ModalToastify
            handleDeleteItem={handleDeleteTechnician}
            code={`${activeTechnician.name} ${activeTechnician.surname}`}
            message="Estás seguro de borrar el técnico con el nombre" />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    // Check form values and Update or Create technician
    const handleSubmit = (e) => {
        e.preventDefault();

        const dateValid = moment(birthDate).isValid();
        const scheduleArray = ['L-D M-T-N', 'L-V JP', 'L-V M-T-N'];
        const factoryArray = ['1', '2', '3'];

        let failed = false;

        if (!dateValid) {
            document.querySelector('.datetime-technician').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('.datetime-technician').classList.remove('border-red');
        }

        if (name.trim().length <= 2) {
            document.querySelector('input[name="name"]').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('input[name="name"]').classList.remove('border-red');
        }

        if (surname.trim().length <= 2) {
            document.querySelector('input[name="surname"]').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('input[name="surname"]').classList.remove('border-red');
        }

        if (phoneNumber.trim().length <= 6) {
            document.querySelector('input[name="surname"]').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('input[name="surname"]').classList.remove('border-red');
        }

        if (!validator.isEmail(email)) {
            document.querySelector('input[name="email"]').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('input[name="email"]').classList.remove('border-red');
        }

        if (!validator.isMobilePhone(phoneNumber, 'es-ES')) {
            document.querySelector('input[name="phoneNumber"]').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('input[name="phoneNumber"]').classList.remove('border-red');
        }

        if (!validator.isIdentityCard(identityDocument, 'ES')) {
            document.querySelector('input[name="identityDocument"]').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('input[name="identityDocument"]').classList.remove('border-red');
        }

        if (factoryArray.indexOf(factory.toString()) < 0) {
            document.querySelector('select[name="factory"]').classList.add('border-red');
            failed = true;
        } else {
            document.querySelector('select[name="factory"]').classList.remove('border-red');
        }

        if (scheduleArray.indexOf(schedule) < 0) {
            failed = true;
            document.querySelector('select[name="schedule"]').classList.add('border-red');
        } else {
            document.querySelector('select[name="schedule"]').classList.remove('border-red');
        }

        if (failed) {
            return toast.error('Revise los campos señalados en rojo', { position: toast.POSITION.TOP_CENTER });
        }

        // Add new technician
        if (!activeTechnician) {
            dispatch(startAddTechnician(formValues, file));
        } else {
            dispatch(startUpdateTechnician(formValues, file));
        }

        setFile(null);
        enableScroll();
        dispatch(uiCloseModal());


        setTimeout(() => {
            setFormValues(initialState);
        }, 150);
    }

    const handleCloseModal = () => {
        enableScroll();
        dispatch(uiCloseModal());

        setTimeout(() => {
            setFormValues(initialState);
            dispatch(clearActiveTechnician());
        }, 150);
    }


    return (
        <div>
            <Modal
                isOpen={modalOpen}
                className='modal animate__animated animate__fadeIn animate__faster'
                onRequestClose={handleCloseModal}
                contentLabel='Calendar Modal'
                closeTimeoutMS={300}
                ariaHideApp={!process.env.NODE_ENV === 'test'}
            >
                <div className="frame">

                    <h1 className="h1-modal">{!activeTechnician ? 'Nuevo técnico' : 'Editar Técnico'}</h1>
                    <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                    <form className="crew-form" onSubmit={handleSubmit}>

                        <div className="form-wrapper-1">

                            <div className="img-wrapper">
                                <img className="technician-img"
                                    src={image === null ? `${process.env.PUBLIC_URL}/assets/images/user-default.png` : `${process.env.PUBLIC_URL}/assets/images/${image}`}
                                    alt={`mtile-technician`}
                                    onChange={handleInputChange} />
                            </div>

                            <div className="form-wrapper-data">

                                <div className="form-wrapper-name">
                                    <label>Nombre: </label>
                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        value={name}
                                        onChange={handleInputChange} />
                                </div>

                                <div className="form-wrapper-surname">
                                    <label>Apellidos: </label>
                                    <input
                                        type="text"
                                        name="surname"
                                        autoComplete="off"
                                        value={surname}
                                        onChange={handleInputChange} />
                                </div>

                                <div className="form-wrapper-birthdate">
                                    <label>Fecha Nac.: </label>

                                    <Datetime
                                        className="datetime-technician"
                                        value={moment(birthDate).format('DD-MM-yyyy')}
                                        dateFormat="DD-MM-YYYY"
                                        timeFormat={false}
                                        onChange={handleDateChange}
                                        closeOnSelect={true} />
                                </div>

                                <div className="form-wrapper-identitydocument">
                                    <label>DNI: </label>
                                    <input
                                        type="text"
                                        name="identityDocument"
                                        autoComplete="off"
                                        value={identityDocument}
                                        onChange={handleInputChange} />
                                </div>

                                <div className="form-wrapper-phone">
                                    <label>Tel. Móvil: </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        autoComplete="off"
                                        value={phoneNumber}
                                        onChange={handleInputChange} />
                                </div>

                                <div className="form-wrapper-mail">
                                    <label>Email: </label>
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={handleInputChange} />
                                </div>
                                <div className="form-wrapper-city">
                                    <label>Localidad: </label>
                                    <input
                                        type="text"
                                        name="city"
                                        autoComplete="off"
                                        value={city}
                                        onChange={handleInputChange} />
                                </div>

                            </div>
                        </div>

                        <div className="form-wrapper-2">

                            <div className="form-wrapper-data-2-child">
                                <label>Dirección: </label>
                                <input
                                    type="text"
                                    name="address"
                                    autoComplete="off"
                                    value={address}
                                    onChange={handleInputChange} />
                            </div>

                            <div className="form-wrapper-data-2-child">
                                <label>Horario: </label>
                                <select
                                    name="schedule"
                                    value={schedule}
                                    onChange={handleInputChange}>
                                    <option value="default" disabled>Seleccione Horario</option>
                                    <option value="L-V M-T-N">L-V M-T-N</option>
                                    <option value="L-V JP">L-V JP</option>
                                    <option value="L-D M-T-N">L-D M-T-N</option>
                                </select>
                            </div>

                            <div className="form-wrapper-data-2-child">
                                <label>Factoría: </label>
                                <select
                                    name="factory"
                                    value={factory}
                                    onChange={handleInputChange}>
                                    <option value="default" disabled>Seleccione Factoría</option>
                                    <option value="1">Factoría 1</option>
                                    <option value="2">Factoría 2</option>
                                    <option value="3">Factoría 3</option>
                                </select>
                            </div>

                            <div className="form-wrapper-textarea">
                                <label>Observaciones: </label>
                                <textarea
                                    name="notes"
                                    value={notes}
                                    onChange={handleInputChange}></textarea>
                            </div>

                            <div className={`form-wrapper-submit ${activeTechnician ? 'wrapper-flex-between' : 'wrapper-flex-end'}`}>

                                {activeTechnician && <p className="btn btn-form-cancel" onClick={handleStartDelete}>Borrar</p>}

                                <div className="form-wrapper-file">

                                    <label className="btn-label-file">
                                        <input
                                            type="file"
                                            name="img"
                                            onChange={handlePictureChange}
                                            accept=".jpg, .jpeg, .png" />
                                        <i className="fas fa-cloud-upload-alt"></i> Subir imagen
                                    </label>

                                    <button type="submit" className="btn btn-form-agree">{!activeTechnician ? 'Crear' : 'Actualizar'}</button>
                                </div>

                            </div>
                        </div>

                    </form>
                </div>
                {modalOpen && <ToastContainer />}
            </Modal>
            {!modalOpen && <ToastContainer />}

        </div>
    )
}
