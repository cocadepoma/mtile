import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/ui/ToastSuccess";
import { fetchWithToken } from "../helpers/fetch";


export const startLoadFactory = () => {

    return async (dispatch) => {

        dispatch(startSetFactories());
        dispatch(startSetSections());
        dispatch(startSetMachines());
        dispatch(startSetNumberSections());
        dispatch(startSetDocs());

    }
}

/* FACTORIES */
const startSetFactories = () => {

    return async (dispatch) => {

        try {
            // fetch the factories
            const resp = await fetchWithToken("factory/factories");
            const { factories } = await resp.json();

            if (factories) {
                dispatch(setFactories(factories));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const setFactories = (factories) => ({
    type: types.factorySetFactories,
    payload: factories
});

/* FACTORY SECTIONS */
const startSetSections = () => {

    return async (dispatch) => {

        try {
            // fetch the sections
            const resp = await fetchWithToken("factory/sections");
            const { sections } = await resp.json();

            if (sections) {
                dispatch(setSections(sections));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const setSections = (sections) => ({
    type: types.factorySetSections,
    payload: sections
});


/* SECTION'S MACHINES */
const startSetMachines = () => {

    return async (dispatch) => {

        try {
            // fetch the machines
            const resp = await fetchWithToken("factory/machines");
            const { machines } = await resp.json();

            if (machines) {
                dispatch(setMachines(machines));
            }
        } catch (error) {
            console.log(error);
        }

    }
}
const setMachines = (machines) => ({
    type: types.factorySetMachines,
    payload: machines
});


/* SECTION'S NUMBERS */

const startSetNumberSections = () => {

    return async (dispatch) => {

        try {
            // fetch the section numbers
            const resp = await fetchWithToken("factory/numbers");
            const { numbers } = await resp.json();

            if (numbers) {
                dispatch(setNumberSections(numbers));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const setNumberSections = (numbers) => ({
    type: types.factorySetNumberSections,
    payload: numbers
});



/* DOCS */

const startSetDocs = () => {

    return async (dispatch) => {

        try {
            // fetch the docs
            const resp = await fetchWithToken("factory/docs");
            const { docs } = await resp.json();

            if (docs) {
                dispatch(setDocs(docs));
            }
        } catch (error) {
            console.log(error);
        }

    }
}

const setDocs = (docs) => ({
    type: types.factorySetDocs,
    payload: docs
});

export const setActiveDoc = (doc) => ({
    type: types.factorySetActiveDoc,
    payload: doc
});

export const clearActiveDoc = () => ({
    type: types.factoryClearActiveDoc
});

export const startAddFile = (doc) => {

    return async (dispatch) => {

        // Upload File to public folder, and save the name, info and sectionID in DB

        try {
            const token = localStorage.getItem('token') || '';

            const formData = new FormData();
            formData.append('file', doc.file)
            formData.append('info', doc.info)
            formData.append('section', doc.section)

            const resp = await fetch(`${process.env.REACT_APP_URL}/uploads/doc`, {
                method: 'POST',
                headers: {
                    'x-token': token
                },
                body: formData
            });

            const { uploadedDoc } = await resp.json();

            if (uploadedDoc) {
                dispatch(addDoc(uploadedDoc));

                setTimeout(() => {
                    toast.success(<ToastSuccess text="Documento agregado con éxito!" />);
                }, 200);
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const addDoc = (doc) => ({
    type: types.factoryAddDoc,
    payload: doc
});

export const startDeleteDoc = () => {

    return async (dispatch, getState) => {

        const { factory } = getState();
        const { id } = factory.activeDoc;

        if (id) {

            // delete
            try {
                const resp = await fetchWithToken(`uploads/doc/${id}`, undefined, 'DELETE');
                const data = await resp.json();

                if (data) {
                    dispatch(deleteDoc());

                    setTimeout(() => {
                        toast.success(<ToastSuccess text="Documento eliminado con éxito!" />);

                    }, 600);
                }
            } catch (error) {
                console.log(error);
            }

        }
    }
}

const deleteDoc = () => ({
    type: types.factoryDeleteDoc
});

export const clearFactory = () => ({
    type: types.factoryClearFactory
});

