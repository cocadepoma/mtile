import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetWarehouseItems } from '../actions/warehouse';
import { ButtonNew } from '../components/ui/ButtonNew';
import { Table } from '../components/warehouse/Table';
import { WarehouseModal } from '../components/warehouse/WarehouseModal';
import { getColumnsTableWarehouse } from '../helpers/getColumnsTables';


export const WarehouseScreen = () => {

    // Header columns for the table of items
    const columns = getColumnsTableWarehouse;

    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const { items } = useSelector(state => state.warehouse);
    const { modalOpen } = useSelector(state => state.ui);
    const { activeItem } = useSelector(state => state.warehouse);

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

    // Input search value will update the State on every change
    const handleInputChange = ({ target }) => {
        setSearch(target.value);
    }

    // State for animation input show/hide
    const [showed, setShowed] = useState(false);

    const showIn = () => {
        setShowed(true);
        if (!modalOpen) {
            document.querySelector('.finder').focus();
        }
    }
    const hideOut = () => {
        if (search.length === 0) {
            setShowed(false);
        }
    }

    // Button Add new Item
    const iconData = {
        icon: <i className="far fa-plus-square"></i>,
        className: 'button-new new',
    }

    return (
        <div className='animate__animated animate__fadeIn'>
            <h1 className="h1-warehouse">Almacén</h1>

            <div className="wrapper-stock-finder">
                <input
                    type="search"
                    name="search"
                    className={`finder ${showed && 'showw'}`}
                    onBlur={hideOut}
                    value={search}
                    onChange={handleInputChange}
                    autoComplete="off"
                />

                <i className={`fas fa-search ${showed && 'hidee'}`} onClick={showIn} ></i>
            </div>
            <div className="separator"></div>

            {
                (searchResults.length > 0 && columns.length > 0)
                    ? <Table columns={columns} data={searchResults} />
                    :
                    <h3 className="h3-warehouse animate__animated animate__fadeInUpBig animate__faster">{
                        search.length === 0
                            ? 'Pulsa la lupa para comenzar la búsqueda'
                            : 'No se han encontrado coincidencias'}
                    </h3>
            }

            {!activeItem && <ButtonNew iconData={iconData} />}

            <WarehouseModal setSearch={setSearch} />
        </div>


    )
}
