import React, { useEffect, useState } from 'react'
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

export const ClockInOutModalUpdate = ({ setIndex, index, formValues, setFormValues }) => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { technicians } = useSelector(state => state.crew);

    const [subFormValues, setSubFormValues] = useState(
        {
            userId: '',
            user: 'default',
            start: new Date(),
            end: moment().add('1', 'hours').toDate()
        });
    const { userId, user, start, end } = subFormValues;
    const { clocks, startWork } = formValues;

    // Get the values of the current CLOCKINOUT clicked
    useEffect(() => {
        if (index !== null && clocks.length >= index) {
            setSubFormValues({ ...clocks[index] })
        }
    }, [index, clocks]);

    const handleCloseModal = () => {
        enableScroll();
        setIndex(null);
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

        if (user === 'default' || user.trim().length === 0) {
            isValid = false;
            document.querySelector('select[name="user"]').classList.add('border-red');
        } else {
            document.querySelector('select[name="user"]').classList.remove('border-red');
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
            clocks: clocks.map((clock, i) => i === index ? subFormValues : clock)
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

                <h1 className="h1-modal">Editar Fichaje</h1>
                <span className="close-event-modal" onClick={handleCloseModal}>
                    <i className="fas fa-times"></i>
                </span>

                <form onSubmit={handleSubmit}>
                    <div className="grid-date">

                        <label>Técnico: </label>
                        <select name="user" value={userId} onChange={handleInputChange}>
                            <option value="default" disabled>Elige Técnico</option>
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
                            showTimeInput
                            onChange={handleDateStartChange}
                            locale={es}
                            minDate={startWork}
                        />
                    </div>
                    <div className="grid-date">
                        <label>Hora Fin: </label>
                        <DatePicker
                            className="clock-end-modal"
                            selected={end}
                            timeInputLabel="Hora:"
                            dateFormat="dd/MM/yyyy HH:mm"
                            showTimeInput
                            onChange={handleDateEndChange}
                            minDate={start}
                            locale={es}
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
