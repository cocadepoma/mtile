import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

import { disableScroll } from '../../helpers/disable-enable-scroll';

import { ClockInOutModalAdd } from './ClockInOutModalAdd';
import { ClockInOutModalUpdate } from './ClockInOutModalUpdate';
import { toast } from 'react-toastify';
import { ModalToastify } from '../ui/ModalToastify';


export const TabClockInOut = ({ formValues, setFormValues, disabled }) => {

    const dispatch = useDispatch();
    const { technicians } = useSelector(state => state.crew)

    const [showAddModal, setShowAddModal] = useState(false);
    const [index, setIndex] = useState(null);

    const { clocks } = formValues;

    const handleAddModal = () => {
        // Open modal to add new
        disableScroll();
        setShowAddModal(true);
        dispatch(uiOpenModal());
    }

    const handleUpdateModal = (index) => {

        // Open Modal to edit
        disableScroll();
        setIndex(index);
        dispatch(uiOpenModal());
    }

    // Show modal confirmation before deleting a technician clock
    const handleDelete = (i) => {
        toast.warn(<ModalToastify
            handleDeleteItem={() => handleDeleteClockInOut(i)}
            code={clocks[i].user}
            message="Estás seguro de borrar el fichaje de " />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    // Delete and technician clock from array
    const handleDeleteClockInOut = (index) => {

        const newClocks = clocks.filter((clock, i) => i !== index && clock)

        setFormValues({
            ...formValues,
            clocks: newClocks
        });

    }


    return (
        <div className="tab-table-wrapper">
            <div>

                <div className="header-tab-table header-tab-table2">
                    <div>
                        <p>Técnico</p>
                    </div>
                    <div>
                        <p>H. Inicio</p>
                    </div>
                    <div>
                        <p>H. Fin</p>
                    </div>
                </div>

                {
                    clocks.length > 0
                    &&
                    clocks.map((clock, i) =>
                        <div className="header-tab-body header-tab-body2" key={i}>

                            <select className="select-tab-user-clock" name="user" value={clock.userId} disabled>
                                {technicians.length > 0
                                    && technicians.map(technician =>
                                        <option key={technician.id} value={technician.id}>{technician.name}</option>)}
                            </select>

                            <div>
                                <DatePicker
                                    selected={new Date(clock.start)}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showTimeInput
                                    disabled
                                />
                            </div>
                            <div>
                                <DatePicker
                                    selected={new Date(clock.end)}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showTimeInput
                                    disabled
                                />
                            </div>
                            <div>
                                {
                                    !disabled &&
                                    <>
                                        <i className="far fa-trash-alt" onClick={() => { handleDelete(i) }}></i>
                                        <i className="far fa-edit" onClick={() => { handleUpdateModal(i) }}></i>
                                    </>
                                }

                            </div>
                        </div>
                    )
                }
                {showAddModal
                    &&
                    <ClockInOutModalAdd
                        setShowAddModal={setShowAddModal}
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />
                }
                {index >= 0 && !showAddModal
                    &&
                    <ClockInOutModalUpdate
                        setIndex={setIndex}
                        index={index}
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />
                }
            </div>
            {
                !disabled &&

                <div className="button-add-tab-wrapper" onClick={handleAddModal}>
                    <i className="far fa-clock"></i>
                    <span>Fichar</span>
                </div>

            }

        </div>
    )
}
