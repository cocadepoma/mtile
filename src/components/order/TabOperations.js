import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

import { disableScroll } from '../../helpers/disable-enable-scroll';

import { OperationModalAdd } from './OperationModalAdd';
import { OperationModalUpdate } from './OperationModalUpdate';

import { toast } from 'react-toastify';
import { ModalToastify } from '../ui/ModalToastify';


export const TabOperations = ({ formValues, setFormValues }) => {

    const dispatch = useDispatch();
    const { operations } = formValues;
    const [showAddModal, setShowAddModal] = useState(false)
    const [index, setIndex] = useState(null);

    const handleAddOperation = () => {
        setShowAddModal(true);
        dispatch(uiOpenModal());
        disableScroll();
    }

    const handleDelete = (i) => {
        toast.warn(<ModalToastify
            handleDeleteItem={() => handleDeleteOperation(i)}
            code={operations[i].operation}
            message="Estás seguro de borrar la operación " />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    const handleDeleteOperation = (index) => {
        const newOperations = operations.filter((operation, i) => i !== index && operation)

        setFormValues({
            ...formValues,
            operations: newOperations
        });
    }

    const handleUpdateOperation = (i) => {
        setIndex(i);
        dispatch(uiOpenModal());
        disableScroll();
    }


    return (
        <div className="tab-table-wrapper">
            <div>

                <div className="header-tab-table header-tab-table1">

                    <div>
                        <p>Tiempo</p>
                    </div>
                    <div>
                        <p>Operaciones</p>
                    </div>
                </div>

                {
                    operations.length > 0
                    &&
                    operations.map((operation, i) =>
                    (
                        <div className="header-tab-body header-tab-body1" key={i}>
                            <div>
                                <p>{operation.time}</p>
                            </div>
                            <div>
                                <p>{operation.operation}</p>
                            </div>
                            <div>
                                <i className="far fa-trash-alt" onClick={() => handleDelete(i)}></i>
                                <i className="far fa-edit" onClick={() => handleUpdateOperation(i)}></i>
                            </div>
                        </div>
                    ))
                }

                {showAddModal
                    &&
                    <OperationModalAdd
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setShowAddModal={setShowAddModal}
                    />}

                {(index >= 0 && !showAddModal)
                    &&
                    <OperationModalUpdate
                        index={index}
                        setIndex={setIndex}
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />}

            </div>

            <div className="button-add-tab-wrapper" onClick={handleAddOperation}>
                <i className="fas fa-plus"></i><span>Agregar Operación</span>
            </div>

        </div>
    )
}
