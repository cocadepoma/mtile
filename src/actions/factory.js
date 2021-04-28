import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/ui/ToastSuccess";


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

        // fetch the factories
        const resp = await fetch('http://localhost:8088/api/factory/factories');
        const { factories } = await resp.json();

        if (factories) {
            dispatch(setFactories(factories));
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

        // fetch the sections
        const resp = await fetch('http://localhost:8088/api/factory/sections');
        const { sections } = await resp.json();

        if (sections) {
            dispatch(setSections(sections));
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

        // fetch the machines
        const resp = await fetch('http://localhost:8088/api/factory/machines');
        const { machines } = await resp.json();

        if (machines) {
            dispatch(setMachines(machines));
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

        // fetch the section numbers
        const resp = await fetch('http://localhost:8088/api/factory/numbers');
        const { numbers } = await resp.json();

        if (numbers) {
            dispatch(setNumberSections(numbers));
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

        // fecth the docs
        // fetch the section numbers
        const resp = await fetch('http://localhost:8088/api/factory/docs');
        const { docs } = await resp.json();

        if (docs) {
            dispatch(setDocs(docs));
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

        // TODO: upload file (doc.file) and get the name of the repo

        // TODO: fetch the data to DB
        let docDb = {
            id: new Date().getTime(),
            name: doc.file.name,
            info: doc.info,
            sectionId: doc.section
        }

        dispatch(addDoc(docDb));

        setTimeout(() => {
            toast.success(<ToastSuccess text="Documento agregado con éxito!" />);
        }, 600);
    }

}

const addDoc = (doc) => ({
    type: types.factoryAddDoc,
    payload: doc
});

export const startDeleteDoc = () => {

    return async (dispatch, getState) => {

        //const { factory } = getState();
        //const doc = factory.activeDoc;


        // TODO: Delete from DB

        //if ok
        dispatch(deleteDoc());

        setTimeout(() => {
            toast.success(<ToastSuccess text="Documento eliminado con éxito!" />);

        }, 600);
    }
}

const deleteDoc = () => ({
    type: types.factoryDeleteDoc
});

export const clearFactory = () => ({
    type: types.factoryClearFactory
});

