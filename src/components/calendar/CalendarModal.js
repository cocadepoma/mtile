import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';


import { clearActiveEvent } from '../../actions/calendar';
import { enableScroll } from '../../helpers/disable-enable-scroll';
import moment from 'moment';


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

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);

    const [formValues, setFormValues] = useState(initialState);

    const { activeEvent } = useSelector(state => state.calendar);
    const { id, breakdown, desc, section, factory, machine, start, end, technician, number, orderType, totalMins } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }
    }, [activeEvent]);

    const history = useHistory();

    const dispatch = useDispatch();


    const showOrderDetail = () => {
        const path = `/order/${id}`;
        history.push(path);
    }

    const handleCloseModal = () => {
        enableScroll();
        dispatch(uiCloseModal());
        dispatch(clearActiveEvent());
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
                                <label>Tipo Orden: </label>
                                <input type='text' name="orderType" disabled value={orderType} />
                            </div>
                        </div>

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>Factoría:</label>
                                <input type='text' name="factory" disabled value={factory} />
                            </div>

                            <div className="event-input-2">
                                <label>Sección:</label>
                                <input type='text' name="section" disabled value={section} />
                            </div>
                        </div>

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>Máquina:</label>
                                <input type='text' name="machine" disabled value={machine} />
                            </div>

                            <div className="event-input-2">
                                <label>Número:</label>
                                <input type='text' name="machine" disabled value={number} />
                            </div>
                        </div>

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>Técnico:</label>
                                <input type='text' name="technician" disabled value={technician} />
                            </div>

                            <div className="event-input-2">
                                <label>Incidencia:</label>
                                <input type='text' name="breakdown" disabled value={breakdown} />
                            </div>
                        </div>

                        <div className="event-input-wrapper-1">
                            <div className="event-input-1">
                                <label>F. Inicio:</label>
                                <input
                                    type="text"
                                    value={moment(start).format('DD/MM/YYYY HH:MM')}
                                    name="start"
                                    disabled
                                />
                            </div>
                            <div className="event-input-2">
                                <label>F. Fin:</label>
                                <input
                                    type="text"
                                    value={moment(end).format('DD/MM/YYYY HH:MM')}
                                    name="end"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="event-input-wrapper-3">
                            <label>Descripción:</label>
                            <textarea name="description" disabled value={desc} ></textarea>
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
