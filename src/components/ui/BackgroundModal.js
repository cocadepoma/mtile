import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from 'react-toastify';
import { clearActiveEvent } from '../../actions/calendar';
import { enableScroll } from '../../helpers/disable-enable-scroll';
import { ToastError } from './ToastError';
import { ToastSuccess } from './ToastSuccess';


export const BackgroundModal = ({ result, setShowModal }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    // On first render create and execute toast of SUCCES or ERROR
    useEffect(() => {

        if (Object.keys(result).length > 0) {

            const { message, ok: isOk } = result;

            if (isOk) {
                return toast.success(<ToastSuccess text={message} />, { autoClose: 2000, toastId: 1, position: 'top-center', onClose: () => handleCloseModal() });
            } else {
                return toast.error(<ToastError text={message} />, { autoClose: 2000, toastId: 1, position: 'top-center', onClose: () => handleError() });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    // If the operation failed, close modal
    const handleError = () => {
        setShowModal(false);
        enableScroll();
    }

    // If the operation succeded and after the toast disappears, will close the modal and redirect to /calendar
    const handleCloseModal = () => {
        setShowModal(false);
        enableScroll();
        dispatch(clearActiveEvent());
        const path = `/calendar`;
        history.push(path);
    }

    return (
        <div className="modal-advise animate__animated animate__fadeIn animate__fast">
            <ToastContainer transition={Flip} />
        </div>
    )
}
