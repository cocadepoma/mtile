import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';

import { clearActiveEvent } from '../../actions/calendar';
import { enableScroll } from '../../helpers/disable-enable-scroll';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const initialState = {
    id: '',
    factory: '',
    section: '',
    machine: '',
    technician: '',
    breakdown: '',
    description: '',
    start: '',
    end: ''
}

export const CalendarModal = ({ setTableModal }) => {

    const { factories } = useSelector(state => state.factory);
    const { sections } = useSelector(state => state.factory);
    const { machines } = useSelector(state => state.factory);
    const { numbers } = useSelector(state => state.factory);
    const { types } = useSelector(state => state.calendar);
    const { breakdowns } = useSelector(state => state.calendar);
    const { technicians } = useSelector(state => state.crew);
    const { modalOpen } = useSelector(state => state.ui);


    const [formValues, setFormValues] = useState(initialState);

    const { activeEvent } = useSelector(state => state.calendar);
    const { id,
        breakdown,
        description,
        section,
        factory,
        machine,
        start,
        end,
        technician,
        number,
        orderType,
        totalMins
    } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }
    }, [activeEvent]);

    const history = useHistory();

    const dispatch = useDispatch();


    const showOrderDetail = () => {

        const modal = document.querySelector('.modal-calendar')
        modal.classList.remove('animate__fadeIn');
        modal.classList.add('animate__fadeOut');

        enableScroll();
        dispatch(uiCloseModal());
        const path = `/order`;
        history.push(path);

    }

    const handleCloseModal = () => {

        enableScroll();
        dispatch(uiCloseModal());
        dispatch(clearActiveEvent());

        if (setTableModal) {
            setTableModal(false);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalOpen}
                className='modal-calendar animate__animated animate__fadeIn animate__faster'
                onRequestClose={handleCloseModal}
                contentLabel='Calendar Modal'
                closeTimeoutMS={300}
                ariaHideApp={!process.env.NODE_ENV === 'test'}
            >
                <div className="frame">
                    <h1 className="h1-modal">Orden de trabajo</h1>

                    <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                    <div className="modal-event-form">

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>N.º Orden: </label>
                                <input type='text' name="id" disabled value={id} />
                            </div>

                            <div className="event-input-2">

                                <label>Tipo orden: </label>
                                <select name="orderType" value={orderType} disabled>
                                    <option value="default" disabled>Elige Tipo</option>
                                    {types.length > 0
                                        && types.map(type =>
                                            <option key={type.id} value={type.id}>{type.name}</option>)}
                                </select>

                            </div>
                        </div>

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>Factoría: </label>
                                <select
                                    name="factory"
                                    value={factory}
                                    disabled>
                                    <option value="default" disabled>Factoría</option>
                                    {factories.map(factory =>
                                        <option key={factory.id} value={factory.id}>{factory.name}</option>)}
                                </select>
                            </div>

                            <div className="event-input-2">
                                <label>Sección:</label>
                                <select
                                    name="section"
                                    value={section}
                                    disabled
                                >
                                    <option value="default" disabled>Elige</option>
                                    {sections.length > 0
                                        && sections.map(section =>
                                            <option key={section.id} value={section.id}>{section.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="event-input-wrapper-1">

                            <div className="event-input-1">

                                <label>Máquina:</label>
                                <select
                                    name="machine"
                                    value={machine}
                                    disabled
                                >

                                    <option value="default" disabled>Elige Máquina</option>
                                    {machines.length > 0
                                        && machines.map(machine =>
                                            <option key={machine.id} value={machine.id}>{machine.name}</option>)}
                                </select>

                            </div>

                            <div className="event-input-2">
                                <label>Número: </label>
                                <select
                                    name="number"
                                    value={number}
                                    disabled
                                >
                                    <option value="default" disabled>Elige Sección</option>
                                    {numbers.length > 0
                                        && numbers.map(number =>
                                            <option key={number.id} value={number.id}>{number.number}</option>)}
                                </select>

                            </div>
                        </div>

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>Técnico: </label>
                                <select
                                    name="technician"
                                    value={technician}
                                    disabled
                                >
                                    <option value="default" disabled>Elige Técnico</option>
                                    {technicians.length > 0
                                        && technicians.map(technician =>
                                            <option key={technician.id} value={technician.id}>{technician.name}</option>)}
                                </select>

                            </div>

                            <div className="event-input-2">
                                <label>Tipo avería: </label>
                                <select
                                    name="breakdown"
                                    value={breakdown}
                                    disabled
                                >
                                    <option value="default" disabled>Elige Avería</option>
                                    {breakdowns.length > 0
                                        && breakdowns.map(breakdown =>
                                            <option key={breakdown.id} value={breakdown.id}>{breakdown.name}</option>)}
                                </select>

                            </div>
                        </div>

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>F. Inicio:</label>
                                <DatePicker
                                    selected={start}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showTimeInput
                                    name="start"
                                    disabled />
                            </div>
                            <div className="event-input-2">
                                <label>F. Fin:</label>
                                <DatePicker
                                    selected={end}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showTimeInput
                                    name="end" />
                            </div>
                        </div>

                        <div className="event-input-wrapper-3">
                            <label>Descripción:</label>
                            <textarea name="description" disabled value={description} ></textarea>
                        </div>

                        <div className="event-input-wrapper-single">
                            <div className="event-input">
                                <label>Total tiempo de trabajo:</label>
                                <input type="text" name="totalMins" disabled value={totalMins} />
                            </div>
                        </div>
                        <div className="event-button-wrapper">
                            <button className="btn btn-detail" onClick={showOrderDetail}>Ver orden</button>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    )
}
