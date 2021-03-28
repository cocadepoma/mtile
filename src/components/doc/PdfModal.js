import React, { useEffect } from 'react'
import { enableScroll } from '../../helpers/disable-enable-scroll';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { clearActiveDoc } from '../../actions/docs';
import { PdfPage } from './PdfPage';



export const PdfModal = () => {
    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { activeDoc } = useSelector(state => state.factory);

    const handleCloseModal = () => {
        enableScroll();
        dispatch(uiCloseModal());
        dispatch(clearActiveDoc());
    }

    useEffect(() => {
        if (modalOpen && activeDoc) {
            console.log(document.querySelector('.ReactModal__Overlay'))
        }
    }, [modalOpen, activeDoc]);

    return (
        <div className="pdf-modal">

            {activeDoc && modalOpen
                &&
                <div className="nav-prueba">
                    <i className="fas fa-arrow-left" onClick={handleCloseModal}></i>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/pdf.png`} alt="pdf-icon" />
                    <span>{activeDoc.name}</span>
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
            </Modal>
        </div>
    )
}
