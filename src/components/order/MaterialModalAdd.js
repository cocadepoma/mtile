import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseModal } from '../../actions/ui';


import { ToastContainer, toast } from 'react-toastify';
import { enableScroll } from '../../helpers/disable-enable-scroll';
import { startGetWarehouseItems } from '../../actions/warehouse';

export const MaterialModalAdd = ({ formValues, setFormValues, setShowAddModal }) => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { items } = useSelector(state => state.warehouse);
    const { materials } = formValues;

    const [subFormValues, setSubFormValues] = useState({ code: '', description: '', quantity: '1' });
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');

    const [itemSelected, setItemSelected] = useState(false);

    const { description, quantity } = subFormValues;


    useEffect(() => {
        dispatch(startGetWarehouseItems());
    }, [dispatch]);

    useEffect(() => {
        // When input search have text, will check value of column code and description
        // looking for matches.

        // When the input is empty, will return an empty array.
        if (search) {
            const rows = items.filter((value) => {
                if (
                    (value.code !== '' && value.code.toLowerCase().includes(search.toLowerCase()))
                    ||
                    (value.description !== '' && value.description.toLowerCase().includes(search.toLowerCase()))) {

                    return value;
                } else {
                    return false;
                }

            });
            setSearchResults(rows);
        } else {
            setSearchResults([]);
        }

    }, [search, items]);


    const handleCloseModal = () => {
        enableScroll();
        setShowAddModal(false);
        dispatch(uiCloseModal());
    }

    const handleSearch = ({ target }) => {
        setSearch(target.value);
    }

    const handleAdd = (code, description) => {
        setItemSelected(true);
        setSearch('');
        setSubFormValues({
            ...subFormValues,
            code,
            description
        });
    }

    // This function changes subFormValues
    const handleInputChange = ({ target }) => {

        setSubFormValues({
            ...subFormValues,
            [target.name]: target.value
        });
    }


    // Submit the form.
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (description.trim().length === 0 || description === '') {
            return toast.error('Debes elegir un material', { position: toast.POSITION.TOP_CENTER });
        }

        if (!Number.isInteger((Number)(quantity)) || parseInt(quantity) <= 0 || parseInt(quantity) >= 100) {
            document.querySelector('input[name="quantity"]').classList.add('border-red');
            return toast.error('Debes de elegir como mínimo 1 unidad y máximo 100',
                { position: toast.POSITION.TOP_CENTER });
        } else {
            document.querySelector('input[name="quantity"]').classList.remove('border-red');
        }

        setFormValues({
            ...formValues,
            materials: [...materials, subFormValues]
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

                <h1 className="h1-modal">Agregar Material</h1>
                <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                <form onSubmit={handleSubmit}>

                    <div className="grid-date">
                        <label>Buscar: </label>
                        <div className="custom-input-searcher">
                            <input
                                placeholder="Buscar Material"
                                name="search"
                                onChange={handleSearch}
                                value={search}
                                autoComplete="off"
                            />
                            {searchResults &&

                                <ul onChange={handleAdd} className={`${searchResults.length > 0 ? 'go' : ''}`}>
                                    {searchResults.map(result =>
                                        <li
                                            key={result.code}
                                            onClick={() => handleAdd(result.code, result.description)}
                                        >
                                            {result.description}
                                        </li>
                                    )}
                                </ul>
                            }
                        </div>
                    </div>

                    {itemSelected

                        &&
                        <>
                            <div className="grid-date">
                                <label>Material: </label>
                                <input
                                    value={description}
                                    type="text"
                                    name="item"
                                    disabled
                                />
                            </div>
                            <div className="grid-date">
                                <label>Cantidad: </label>
                                <input
                                    value={quantity}
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    step="1"
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </div>
                        </>
                    }

                    <div className="button-wrapper">
                        <button className="btn btn-form-agree" type="submit">Agregar</button>
                    </div>

                </form>
            </div>
            <ToastContainer />
        </Modal >
    )
}
