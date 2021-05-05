import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { enableScroll } from '../../helpers/disable-enable-scroll';
import { ToastContainer, toast } from 'react-toastify';

export const OperationModalUpdate = ({ index, setIndex, formValues, setFormValues }) => {


    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [subFormValues, setSubFormValues] = useState({ operation: '', time: '' });
    // const [isModalOperation, setIsModalOperation] = useState(true);
    const { operation, time } = subFormValues;
    const { operations } = formValues;

    useEffect(() => {

        if (index != null && operations.length >= index) {
            setSubFormValues({ ...operations[index] });
        }

    }, [index, operations]);

    const handleCloseModal = () => {
        // setIsModalOperation(false);
        setIndex(null);
        dispatch(uiCloseModal());
        enableScroll();
    }

    const handleInputChange = ({ target }) => {
        setSubFormValues({
            ...subFormValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let isValid = true;
        var regexp = /^\d+(\.\d{1,2})?$/;

        if (operation.trim().length <= 2 || operation === '') {
            isValid = false
            document.querySelector('input[name="operation"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="operation"]').classList.remove('border-red');
        }

        if (isNaN(parseInt(time)) || time === '' || !regexp.test(time)) {
            isValid = false;
            document.querySelector('input[name="time"]').classList.add('border-red');
        } else {
            if (time.toString().indexOf('.') > 0) {
                const [, splitted] = time.split('.');

                if (splitted === '25' || splitted === '50' || splitted === '75' || splitted === '5') {
                    document.querySelector('input[name="time"]').classList.remove('border-red');
                } else {
                    isValid = false;
                    document.querySelector('input[name="time"]').classList.add('border-red');
                }
            } else {
                document.querySelector('input[name="time"]').classList.remove('border-red');
            }
        }

        if (!isValid) {
            return toast.error('Revise los campos marcados en rojo, el tiempo debe de ser números positivo enteros o .25, .50, .75', { position: 'top-center' });
        }

        setFormValues({
            ...formValues,
            operations: operations.map((operation, i) => i === index ? subFormValues : operation)
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

                <h1 className="h1-modal">Editar Operación</h1>
                <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                <form onSubmit={handleSubmit}>

                    <div className="grid-date">
                        <label>Operación: </label>
                        <input
                            value={operation}
                            type="text"
                            name="operation"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="grid-date">
                        <label>Tiempo: </label>
                        <input
                            value={time}
                            type="number"
                            name="time"
                            min="0.25"
                            step="0.01"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="button-wrapper">
                        <button className="btn btn-form-agree" type="submit">Guardar</button>
                    </div>
                </form>

            </div>

            <ToastContainer />

        </Modal>
    )
}
