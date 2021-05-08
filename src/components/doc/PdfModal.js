import React from 'react'
import { enableScroll } from '../../helpers/disable-enable-scroll';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { clearActiveDoc, startDeleteDoc } from '../../actions/factory';
import { PdfPage } from './PdfPage';
import { ToastContainer, toast } from 'react-toastify';
import { ModalToastify } from '../ui/ModalToastify';



export const PdfModal = ({ setShowModalDoc, resetData }) => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { activeDoc } = useSelector(state => state.factory);
    const { admin } = useSelector(state => state.auth);

    const handleCloseModal = () => {
        enableScroll();
        dispatch(uiCloseModal());
        dispatch(clearActiveDoc());
        setShowModalDoc(false);
    }

    const handleDeleteDoc = () => {
        dispatch(startDeleteDoc());
        enableScroll();
        dispatch(uiCloseModal());
        setShowModalDoc(false);
        resetData();
    }

    // Will call tostify first to confirm the option the user will choose. Cancel or Deny.
    const handleStartDelete = () => {
        toast.warn(<ModalToastify
            handleDeleteItem={handleDeleteDoc}
            code={`${activeDoc.name} ${activeDoc.info}`}
            message="Estás seguro de borrar el documento" />,
            {
                position: "top-center",
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    return (
        <div className="pdf-modal">

            {activeDoc && modalOpen
                &&
                <div className="info-wrapper">
                    <div className="pdf-header">
                        <i className="fas fa-arrow-left" onClick={handleCloseModal}></i>
                        <img src={`${process.env.PUBLIC_URL}/assets/images/pdf.png`} alt="pdf-icon" />
                        <span>{activeDoc.name}</span>
                    </div>
                    {
                        admin
                        && <div className="pdf-delete" onClick={handleStartDelete}>
                            <i className="far fa-trash-alt"></i>
                        </div>
                    }

                </div>
            }

            <Modal
                isOpen={modalOpen}
                className='modal-docs animate__animated animate__fadeIn animate__fast'
                onRequestClose={handleCloseModal}
                contentLabel='Calendar Modal'
                closeTimeoutMS={300}
                ariaHideApp={!process.env.NODE_ENV === 'test'}
            >
                {activeDoc && <PdfPage file={activeDoc.name} />}
                {modalOpen && <ToastContainer />}
            </Modal>
            {!modalOpen && <ToastContainer />}
        </div>
    )
}
