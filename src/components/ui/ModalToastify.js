
// This component needs a function, and ID or Name to show in, and a message

export const ModalToastify = ({ closeToast, handleDeleteItem, code, message }) => {

    return (
        <div className="toast-wrapper-container">
            <p>{message} <b>{code}</b>?</p>
            <div className="toast-wrapper-buttons">
                <span onClick={closeToast} className="btn btn-cancel-toast">Cancelar</span>
                <span onClick={(e) => { e.stopPropagation(); closeToast(); handleDeleteItem(); }} className="btn btn-agree-toast">Aceptar</span>
            </div>
        </div>
    )
}