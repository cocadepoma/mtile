import { types } from "../types/types";
import { toast } from 'react-toastify';


export const setActiveTechnician = (tech) => ({
    type: types.crewSetActive,
    payload: tech
});

export const clearActiveTechnician = () => ({
    type: types.crewClearActive
});

export const startAddTechnician = (technician) => {

    return (dispatch) => {
        // TODO: upload picture
        // TODO: fetch to add new technician with the picture URL

        delete technician.file;

        dispatch(addNewTechnician(technician));
        setTimeout(() => {
            toast.info('Técnico actualizado con éxito!', {
                position: "top-right",
            });
        }, 600);
    }


}

const addNewTechnician = (technician) => ({
    type: types.crewAddNewTechnician,
    payload: technician
});

export const startDeleteTechnician = () => {

    return (dispatch) => {
        // TODO: fetch to delete from DB

        dispatch(deleteTechnician());

        setTimeout(() => {
            toast.info('Técnico borrado con éxito!', {
                position: "top-right",
            });
        }, 600);
    }

}
const deleteTechnician = () => ({
    type: types.crewDeleteTechnician
});

export const startUpdateTechnician = (technician) => {

    return (dispatch, getState) => {


        // TODO: fetch the data and handle succes or error

        dispatch(updateTechnician(technician));
        setTimeout(() => {
            toast.info('Técnico actualizado con éxito!', {
                position: "top-right",
            });
        }, 600);
    }

}

const updateTechnician = (technician) => ({
    type: types.crewUpdateTechnician,
    payload: technician
})