import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseModal } from '../../actions/ui';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import moment from "moment";

import { getTechnicianNameById } from '../../helpers/getTechnicianNameById';
import { ToastContainer, toast } from 'react-toastify';
import { enableScroll } from '../../helpers/disable-enable-scroll';

export const ClockInOutModalAdd = ({ setShowAddModal, formValues, setFormValues }) => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { technicians } = useSelector(state => state.crew);

    const [subFormValues, setSubFormValues] = useState(
        {
            userId: '0',
            start: new Date(),
            end: moment().add('1', 'hours').toDate()
        });

    const { userId, start, end } = subFormValues;
    const { clocks, startWork } = formValues;

    const handleCloseModal = () => {
        enableScroll();
        setShowAddModal(false);
        dispatch(uiCloseModal());
    }

    // This function only will change user select
    const handleInputChange = ({ target }) => {

        const id = target.value;
        const { name } = getTechnicianNameById(id, technicians);

        if (name) {
            setSubFormValues({
                ...subFormValues,
                userId: id,
                user: name
            });
        }
    }

    // Listen for changes on start clock Date
    const handleDateStartChange = (e) => {
        setSubFormValues({
            ...subFormValues,
            start: e
        });
    }

    // Listen for changes on end clock Date
    const handleDateEndChange = (e) => {
        setSubFormValues({
            ...subFormValues,
            end: e
        });
    }

    // Submit the form. Check values and Dates with momentJS
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let isValid = true;

        if (userId === '' || userId <= 0) {
            isValid = false;
            document.querySelector('.select-user-clock').classList.add('border-red');
        } else {
            document.querySelector('.select-user-clock').classList.remove('border-red');
        }

        if (!moment(start).isValid) {
            isValid = false;
            document.querySelector('.clock-start-modal').classList.add('border-red');
        } else {
            document.querySelector('.clock-start-modal').classList.remove('border-red');
        }

        if (!moment(end).isValid) {
            isValid = false;
            document.querySelector('.clock-end-modal').classList.add('border-red');
        } else {
            document.querySelector('.clock-end-modal').classList.remove('border-red');
        }

        if (moment(start).isSameOrAfter(end)) {
            isValid = false;
            document.querySelector('.clock-start-modal').classList.add('border-red');
            document.querySelector('.clock-end-modal').classList.add('border-red');
        }
        if (!isValid) {
            return toast.error('Revise los campos marcados en rojo', { position: toast.POSITION.TOP_CENTER });
        }

        setFormValues({
            ...formValues,
            clocks: [...clocks, subFormValues]
        });

        handleCloseModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            className='modal-clock animate__animated animate__fadeIn animate__fast'
            onRequestClose={handleCloseModal}
            contentLabel='Calendar Modal'
            closeTimeoutMS={300}
            ariaHideApp={!process.env.NODE_ENV === 'test'}
        >
            <div className="frame">

                <h1 className="h1-modal">Nuevo Fichaje</h1>
                <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                <form onSubmit={handleSubmit}>
                    <div className="grid-date">
                        <label>Técnico: </label>
                        <select className="select-user-clock" name="user" value={userId} onChange={handleInputChange}>
                            <option value="0" disabled>Elige Técnico</option>
                            {technicians.length > 0
                                && technicians.map(technician =>
                                    <option key={technician.id} value={technician.id}>{technician.name}</option>)}
                        </select>
                    </div>
                    <div className="grid-date">
                        <label>Hora Inicio: </label>
                        <DatePicker
                            className="clock-start-modal"
                            selected={start}
                            timeInputLabel="Hora:"
                            dateFormat="dd/MM/yyyy HH:mm"
                            onChange={handleDateStartChange}
                            locale={es}
                            minDate={startWork}
                            timeIntervals={15}
                            showTimeSelect
                            scrollableYearDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>
                    <div className="grid-date">
                        <label>Hora Fin: </label>
                        <DatePicker
                            className="clock-end-modal"
                            selected={end}
                            timeInputLabel="Hora:"
                            dateFormat="dd/MM/yyyy HH:mm"
                            onChange={handleDateEndChange}
                            minDate={start}
                            locale={es}
                            timeIntervals={15}
                            showTimeSelect
                            scrollableYearDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>
                    <div className="button-wrapper">
                        <button className="btn btn-form-agree" type="submit">Aceptar</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </Modal >
    )
}
