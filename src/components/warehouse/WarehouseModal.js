import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { removeActiveItem, startAddItem, startRemoveItem, startUpdateItem } from '../../actions/warehouse';

import { enableScroll } from '../../helpers/disable-enable-scroll';
import { getColumnsTableWarehouse } from '../../helpers/getColumnsTables';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ModalToastify } from '../ui/ModalToastify';

// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

const initialState = { id: '', code: '', description: '', quantity: '', minStock: '', place: '' };

export const WarehouseModal = ({ setSearch }) => {

    const { activeItem } = useSelector(state => state.warehouse);
    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const columns = getColumnsTableWarehouse;

    const [formValues, setFormValues] = useState(initialState);
    const { code, description, quantity, minStock, place } = formValues;

    useEffect(() => {
        if (activeItem) {
            setFormValues(activeItem);
        }
    }, [activeItem]);

    const handleCloseModal = () => {
        dispatch(uiCloseModal());
        enableScroll();

        setTimeout(() => {
            dispatch(removeActiveItem());
            cleanFormValues();
        }, 200);
    }

    // DeleteItem from Store and DB, closemodal and then clean form
    const handleDeleteItem = () => {

        if (activeItem) {
            dispatch(startRemoveItem());
        }

        dispatch(uiCloseModal());
        enableScroll();
        cleanFormValues();
        setSearch('');
    }

    // Will call tostify first to confirm the option the user will choose. Cancel or Deny.
    const handleStartDelete = () => {
        toast.warn(<ModalToastify handleDeleteItem={handleDeleteItem} code={activeItem.code} message="Estás seguro de borrar el Item con el código" />, { position: toast.POSITION.TOP_CENTER, closeOnClick: false, autoClose: false, toastId: '1' });
    }

    // Clean Formvalues
    const cleanFormValues = () => {
        setFormValues(initialState);
    }

    // Check inputs and dispatch Update or New, depends on activeItem
    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (code.length <= 2) {
            isValid = false;
            document.querySelector('input[name="code"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="code"]').classList.remove('border-red');
        }
        if (description.length <= 2) {
            isValid = false;
            document.querySelector('input[name="description"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="description"]').classList.remove('border-red');
        }
        if (quantity.length === 0 && !isNaN(parseInt(quantity))) {
            isValid = false;
            document.querySelector('input[name="quantity"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="quantity"]').classList.remove('border-red');
        }
        if (minStock.length === 0 && !isNaN(parseInt(minStock))) {
            isValid = false;
            document.querySelector('input[name="minStock"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="minStock"]').classList.remove('border-red');
        }
        if (place.length <= 0) {
            isValid = false;
            document.querySelector('input[name="place"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="place"]').classList.remove('border-red');
        }

        if (!isValid) {
            return toast.error('Revise los campos señalados en rojo', {
                position: toast.POSITION.TOP_CENTER
            });
        }

        if (activeItem) {
            dispatch(startUpdateItem(formValues));
        } else {
            dispatch(startAddItem(formValues));
        }

        dispatch(uiCloseModal());
        dispatch(removeActiveItem());
        setTimeout(() => {
            cleanFormValues();
        }, 300);

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
                className='modal-warehouse animate__animated animate__fadeIn animate__fast'
                onRequestClose={handleCloseModal}
                contentLabel='Calendar Modal'
                closeTimeoutMS={300}
                ariaHideApp={!process.env.NODE_ENV === 'test'}
            >

                <div className="frame">
                    <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                    <h1 className="h1-modal">{activeItem ? 'Editar Item' : 'Agregar Item'}</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="thead-modal">
                            <div className="grid-items">
                                <label>{columns[0].Header}:</label>
                                <input type="text" value={code} name="code" disabled={activeItem} onChange={handleInputChange} />
                            </div>
                            <div className="grid-items">
                                <label>{columns[1].Header}:</label>
                                <input type="text" value={description} name="description" onChange={handleInputChange} />
                            </div>
                            <div className="grid-items">
                                <label>{columns[2].Header}:</label>
                                <input type="number" value={quantity} name="quantity" onChange={handleInputChange} />
                            </div>
                            <div className="grid-items">
                                <label>{columns[3].Header}:</label>
                                <input type="number" value={minStock} name="minStock" onChange={handleInputChange} />
                            </div>
                            <div className="grid-items">
                                <label>{columns[4].Header}:</label>
                                <input type="text" value={place} name="place" onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className={`wrapper-buttons-warehouse ${!activeItem ? 'alone' : ''}`}>
                            {activeItem && <span className="btn btn-form-cancel" onClick={handleStartDelete}>Eliminar</span>}

                            <button type="submit" className="btn btn-form-agree">{activeItem ? 'Actualizar' : 'Guardar'}</button>
                        </div>

                    </form>
                </div>

                {modalOpen && <ToastContainer />}
            </Modal>
            {!modalOpen && <ToastContainer />}
        </div>
    )
}



