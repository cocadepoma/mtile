import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { uiOpenModal } from '../../actions/ui';
import { disableScroll } from '../../helpers/disable-enable-scroll';
import { ModalToastify } from '../ui/ModalToastify';
import { MaterialModalAdd } from './MaterialModalAdd';
import { MaterialModalUpdate } from './MaterialModalUpdate';

export const TabMaterials = ({ formValues, setFormValues, disabled }) => {

    const dispatch = useDispatch();
    const { materials } = formValues;
    const [showAddModal, setShowAddModal] = useState(false);
    const [index, setIndex] = useState(null);


    const handleAddItem = () => {
        setShowAddModal(true);
        dispatch(uiOpenModal());
        disableScroll();
    }

    const handleDelete = (i) => {

        toast.warn(<ModalToastify
            handleDeleteItem={() => handleDeleteItem(i)}
            code={materials[i].description}
            message="Estás seguro de borrar el item " />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    const handleDeleteItem = (index) => {
        const newMaterials = materials.filter((material, i) => i !== index && material)

        setFormValues({
            ...formValues,
            materials: newMaterials
        });
    }

    const handleUpdateItem = (i) => {
        setIndex(i);
        dispatch(uiOpenModal());
        disableScroll();
    }

    return (
        <div className="tab-table-wrapper">
            <div>


                <div className="header-tab-table header-tab-table3">
                    <div>
                        <p>Código</p>
                    </div>
                    <div>
                        <p>Descripción</p>
                    </div>
                    <div>
                        <p>Cantidad</p>
                    </div>

                </div>
                {
                    materials && materials.length > 0
                    &&
                    materials.map((material, i) =>
                    (<div className="header-tab-body header-tab-body3" key={i}>
                        <div>
                            <p>{material.code}</p>
                        </div>
                        <div>
                            <p>{material.description}</p>
                        </div>
                        <div>
                            <p>{material.quantity}</p>
                        </div>
                        <div className="action-icons">
                            {
                                !disabled &&
                                <>
                                    <i className="far fa-trash-alt" onClick={() => { handleDelete(i) }}></i>
                                    <i className="far fa-edit" onClick={() => { handleUpdateItem(i) }}></i>
                                </>
                            }
                        </div>
                    </div>)
                    )
                }

                {showAddModal
                    &&
                    <MaterialModalAdd
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setShowAddModal={setShowAddModal}
                    />}

                {(index >= 0 && !showAddModal)
                    &&
                    <MaterialModalUpdate
                        index={index}
                        setIndex={setIndex}
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />
                }

            </div>


            {
                !disabled &&

                <div className="button-add-tab-wrapper" onClick={handleAddItem}>
                    <i className="fas fa-boxes"></i><span>Nuevo item</span>
                </div>

            }

        </div>
    )
}
