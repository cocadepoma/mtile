import React, { useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';

import { enableScroll } from '../../helpers/disable-enable-scroll';
import { ToastContainer, toast } from 'react-toastify';
import { startAddWarning } from '../../actions/warnings';

const initialState = { description: '' };

export const ModalWarning = ({ setShowWarningModal }) => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initialState);
    const { description } = formValues;

    const handleCloseModal = () => {
        dispatch(uiCloseModal());
        setShowWarningModal(false);
        setFormValues(initialState);
        enableScroll();
    }

    // Check inputs and dispatch Update or New, depends on activeItem
    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (description.trim().length < 5) {
            isValid = false;
            document.querySelector('input[name="description"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="description"]').classList.remove('border-red');
        }


        if (!isValid) {
            return toast.error('Debes introducir al menos 5 caracteres', {
                position: toast.POSITION.TOP_CENTER
            });
        }

        dispatch(startAddWarning(formValues));
        dispatch(uiCloseModal());
        setShowWarningModal(false);
        setFormValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    return (
        <div>

            <Modal
                isOpen={modalOpen}
                className='modal-warning animate__animated animate__fadeIn animate__fast'
                onRequestClose={handleCloseModal}
                contentLabel='Warning Modal'
                closeTimeoutMS={300}
                ariaHideApp={!process.env.NODE_ENV === 'test'}
            >

                <div className="frame">
                    <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                    <h1 className="h1-modal">Generar Aviso</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="grid-warning">
                            <label>Aviso:</label>
                            <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>

                        <div className="warning-button-wrapper">
                            <button className="btn btn-detail">Guardar</button>
                        </div>

                    </form>
                </div>

                {modalOpen && <ToastContainer />}
            </Modal>
            {!modalOpen && <ToastContainer />}
        </div>
    )
}



