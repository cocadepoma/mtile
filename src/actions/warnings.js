import { toast } from "react-toastify";
import { ToastError } from "../components/ui/ToastError";
import { ToastSuccess } from "../components/ui/ToastSuccess";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLoadWarnings = () => {

    return async (dispatch) => {

        try {
            // fecth warnings
            const resp = await fetchWithToken("warnings/");
            const { warnings } = await resp.json();

            if (warnings) {
                dispatch(loadWarnings(warnings));
            }
        } catch (error) {
            console.log(error);
        }

    }
}

const loadWarnings = (warnings) => ({
    type: types.warningLoadWarnings,
    payload: warnings
});

export const startDeleteWarning = (id) => {

    return async (dispatch) => {

        try {
            // Delete warning from DB
            const resp = await fetchWithToken(`warnings/${id}`, {}, 'DELETE');
            const { destroyed } = await resp.json();

            if (destroyed) {
                dispatch(deleteWarning(id));
                toast.success(<ToastSuccess text="Aviso eliminado con éxito" />);
            } else {
                toast.error(<ToastError text="Error al eliminar el Item!" />);
            }
        } catch (error) {
            console.log(error);
            toast.error(<ToastError text="Error al conectar, contacte con el administrador!" />);
        }

    }
}

const deleteWarning = (id) => ({
    type: types.warningRemoveWarning,
    payload: id
});

export const startAddWarning = ({ description }) => {

    return async (dispatch) => {

        try {
            // Save warning to DB
            const resp = await fetchWithToken("warnings/", { description }, 'POST');
            const { warning } = await resp.json();

            if (warning) {
                dispatch(addWarning({ id: warning.id, description: warning.description }));
                toast.success(<ToastSuccess text="Aviso agregado con éxito" />);
            } else {
                toast.error(<ToastError text="Error al agregar el aviso!" />);
            }
        } catch (error) {
            console.log(error);
            toast.error(<ToastError text="Error al conectar, contacte con el administrador!" />);
        }
    }
}

const addWarning = (warning) => ({
    type: types.warningAddWarning,
    payload: warning
});

export const clearWarnings = () => ({
    type: types.warningClear
});
