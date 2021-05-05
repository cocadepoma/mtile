import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/ui/ToastSuccess";
import { fetchWithFile, fetchWithToken } from "../helpers/fetch";

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



export const startAddTechnician = (technicianValues, file) => {

    return async (dispatch) => {

        let fileName = null;

        // If there is a File, save it to hosting
        if (file) {

            try {
                const formData = new FormData();
                formData.append('file', file);
                const resp = await fetchWithFile('uploads/technician/', formData);

                fileName = await resp.json();

            } catch (error) {
                console.log('Error uploading image', error);
            }
        }

        // If the file was saved, add to technicianValues
        if (fileName) {
            technicianValues.image = fileName.name;
        }

        // Saved the new technician to DB
        try {

            const resp = await fetchWithToken('crew/', technicianValues, 'POST');
            const { technician } = await resp.json();

            if (technician) {
                dispatch(addNewTechnician(technician));

                setTimeout(() => {
                    toast.success(<ToastSuccess text="Técnico agregado con éxito!" />);
                }, 200);

            } else {
                console.log('Error the technician was not saved');
            }

        } catch (error) {
            console.log('Error while saving the technician', error);
        }
    }
}

const addNewTechnician = (technician) => ({
    type: types.crewAddNewTechnician,
    payload: technician
});

export const startUpdateTechnician = (technicianValues, file) => {

    return async (dispatch) => {

        const { id } = technicianValues;
        let fileName = null;

        // If there is a File, save it to hosting
        if (file) {

            try {
                const formData = new FormData();
                formData.append('file', file);
                const resp = await fetchWithFile('uploads/technician/', formData);

                fileName = await resp.json();

            } catch (error) {
                console.log('Error uploading image', error);
            }
        }

        // If the file was saved, add to technicianValues
        if (fileName) {
            technicianValues.image = fileName.name;
        }

        try {
            const resp = await fetchWithToken(`crew/${id}`, technicianValues, 'PUT');
            const { technician } = await resp.json();

            if (technician) {

                dispatch(updateTechnician(technician));
                setTimeout(() => {
                    toast.success(<ToastSuccess text="Técnico actualizado con éxito!" />);
                }, 200);

            } else {
                console.log('Tthe technician was not saved');
            }
        } catch (error) {
            console.log('Error while updating the technician');
        }
    }
}

const updateTechnician = (technician) => ({
    type: types.crewUpdateTechnician,
    payload: technician
});


export const startDeleteTechnician = () => {

    return async (dispatch, getState) => {

        try {
            const { crew } = getState();
            const { id } = crew.activeTechnician;

            if (id) {

                const resp = await fetchWithToken(`crew/${id}`, undefined, 'DELETE');
                const { technician } = await resp.json();

                if (technician) {
                    dispatch(deleteTechnician());

                    setTimeout(() => {
                        toast.success(<ToastSuccess text="Técnico eliminado con éxito!" />);
                    }, 200);
                }
            } else {
                console.log('Error, There is no id');
            }
        } catch (error) {
            console.log('Error while deleting', error);
        }
    }
}

const deleteTechnician = () => ({
    type: types.crewDeleteTechnician
});


export const clearTechnicians = () => ({
    type: types.crewClearTechnician
});
