import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/ui/ToastSuccess";
import { fetchWithToken } from "../helpers/fetch";

export const setActiveTechnician = (tech) => ({
    type: types.crewSetActive,
    payload: tech
});

export const clearActiveTechnician = () => ({
    type: types.crewClearActive
});

export const startLoadingCrew = () => {

    return async (dispatch) => {

        try {
            const resp = await fetchWithToken("crew/");
            const { technicians } = await resp.json();

            if (technicians) {
                dispatch(loadCrew(technicians));
            }
        } catch (error) {
            console.log(error);
        }

    }
}

const loadCrew = (crew) => ({
    type: types.crewLoadTechnicians,
    payload: crew
});



export const startAddTechnician = (technician) => {

    return async (dispatch) => {
        // TODO: upload picture
        // TODO: fetch to add new technician with the picture URL

        delete technician.file;

        dispatch(addNewTechnician(technician));
        setTimeout(() => {
            toast.success(<ToastSuccess text="Técnico agregado con éxito!" />);
        }, 600);
    }


}

const addNewTechnician = (technician) => ({
    type: types.crewAddNewTechnician,
    payload: technician
});

export const startDeleteTechnician = () => {

    return async (dispatch) => {
        // TODO: fetch to delete from DB

        dispatch(deleteTechnician());

        setTimeout(() => {
            toast.success(<ToastSuccess text="Técnico eliminado con éxito!" />);
        }, 600);
    }

}
const deleteTechnician = () => ({
    type: types.crewDeleteTechnician
});

export const startUpdateTechnician = (technician) => {

    return async (dispatch, getState) => {


        // TODO: fetch the data and handle succes or error

        dispatch(updateTechnician(technician));
        setTimeout(() => {
            toast.success(<ToastSuccess text="Técnico actualizado con éxito!" />);
        }, 600);
    }

}

const updateTechnician = (technician) => ({
    type: types.crewUpdateTechnician,
    payload: technician
});

export const clearTechnicians = () => ({
    type: types.crewClearTechnician
});
