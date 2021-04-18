import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { startAddFile, startLoadFactory } from '../../actions/factory';
import { uiCloseModal } from '../../actions/ui';
import { checkFile } from '../../helpers/checkDocSizeAndType';
import { enableScroll } from '../../helpers/disable-enable-scroll';
import { getSectionsByFactoryId } from '../../helpers/getSectionsByFactoryId';


const initialState = {
    factory: 'default',
    section: 'default',
    info: ''
}

export const PdfModalAdd = ({ resetData }) => {
    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const { factories } = useSelector(state => state.factory);
    const { sections } = useSelector(state => state.factory);

    const [formValues, setFormValues] = useState(initialState)
    const { factory, section, info } = formValues;
    const [file, setFile] = useState(null);

    const [selectedSections, setSelectedSections] = useState([]);

    // Load and fecth factories, sections, machines and docs from DB
    useEffect(() => {
        dispatch(startLoadFactory());
    }, [dispatch]);

    const handleSubmit = (e) => {

        let formIsValid = true;
        e.preventDefault();

        if (factory === 'default' || factory.length === 0) {
            formIsValid = false;
            document.querySelector('select[name="factory"]').classList.add('border-red');
        } else {
            document.querySelector('select[name="factory"]').classList.remove('border-red');
        }

        if (section === 'default' || section.length === 0) {
            formIsValid = false;
            document.querySelector('select[name="section"]').classList.add('border-red');
        } else {
            document.querySelector('select[name="section"]').classList.remove('border-red');
        }

        if (info.length === 0) {
            formIsValid = false;
            document.querySelector('input[name="info"]').classList.add('border-red');
        } else {
            document.querySelector('input[name="info"]').classList.remove('border-red');
        }

        if (!file && formIsValid) {
            return toast.error('No se ha adjuntado ningún documento', { position: toast.POSITION.TOP_CENTER });
        }

        if (!formIsValid) {
            return toast.error('Revise los campos resaltados en rojo', { position: toast.POSITION.TOP_CENTER });
        }

        dispatch(startAddFile({ ...formValues, file }));
        enableScroll();
        resetData();
        dispatch(uiCloseModal());
    }

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });


        if (target.name === 'factory') {
            setFormValues({ ...formValues, factory: target.value, section: 'default' });
            const id = target.value;
            const factorySections = getSectionsByFactoryId(id, sections);
            setSelectedSections(factorySections);
        }
    }

    const handleFileChange = ({ target }) => {

        if (target.files.length > 0) {

            const tempFile = target.files[0];
            const check = checkFile(tempFile);

            if (!check.ok) {
                return toast.error(check.error, { position: toast.POSITION.TOP_CENTER });
            }

            document.querySelector('.file-name-wrapper').classList.add('show-file-name');
            setFile(target.files[0]);
        }
    }


    const handleCloseModal = () => {
        enableScroll();
        dispatch(uiCloseModal());

        setTimeout(() => {
            setFormValues(initialState);
        }, 200);
    }


    return (

        <div>

            <Modal
                isOpen={modalOpen}
                className='add-modal animate__animated animate__fadeIn animate__fast'
                onRequestClose={handleCloseModal}
                contentLabel='Calendar Modal'
                closeTimeoutMS={300}
                ariaHideApp={!process.env.NODE_ENV === 'test'}
            >

                <div className="frame">
                    <span className="close-event-modal" onClick={handleCloseModal}><i className="fas fa-times"></i></span>

                    <h1 className="h1-modal">Agregar PDF</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="thead-modal">
                            <div className="grid-items">
                                <label>Factoría: </label>
                                <select name="factory" value={factory} onChange={handleInputChange}>
                                    <option value="default" disabled>Seleccionar</option>
                                    {factories.map(factory =>
                                        <option key={factory.id} value={factory.id}>{factory.name}</option>)}
                                </select>
                            </div>

                            <div className="grid-items">
                                <label>Sección: </label>
                                <select name="section" value={section} onChange={handleInputChange} disabled={selectedSections.length === 0}>
                                    <option value="default" disabled>Seleccionar</option>
                                    {selectedSections.length > 0 &&
                                        selectedSections.map(section =>
                                            <option key={section.id} value={section.id}>{section.name}</option>)}
                                </select>
                            </div>

                            <div className="grid-items">
                                <label>Descripción: </label>
                                <input
                                    type="text"
                                    name="info"
                                    value={info}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder=" Descripción" />
                            </div>

                            <div className="grid-items file-name-wrapper">
                                <label>Archivo: </label>
                                <input type="text" defaultValue={file?.name} disabled />
                            </div>

                        </div>

                        <div className="form-wrapper-file">

                            <label className="btn-label-file">
                                <input type="file" name="img" onChange={handleFileChange} accept=".pdf" />
                                <i className="fas fa-cloud-upload-alt"></i> Subir PDF
                        </label>

                            <button type="submit" className="btn btn-form-agree">Guardar</button>
                        </div>

                    </form>
                </div>
                {modalOpen && <ToastContainer />}
            </Modal>
            {!modalOpen && <ToastContainer />}

        </div>
    )
}
