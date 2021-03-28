
// This component needs a function, and ID or Name to show in, and a message

export const ModalToastify = ({ closeToast, handleDeleteItem, code, message }) => {

    return (
        <div className="toast-wrapper-container">
            <p>{message} <b>{code}</b>?</p>
            <div className="toast-wrapper-buttons">
                <button onClick={closeToast} className="btn btn-cancel-toast">Cancelar</button>
                <button onClick={handleDeleteItem} className="btn btn-agree-toast">Aceptar</button>
            </div>
        </div>
    )
}