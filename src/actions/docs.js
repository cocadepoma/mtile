import { types } from "../types/types";

export const startLoadFactory = () => {

    return async (dispatch) => {

        dispatch(startSetFactories());
        dispatch(startSetSections());
        dispatch(startSetMachines());
        dispatch(startSetDocs());

    }
}


/* FACTORIES */

const startSetFactories = () => {

    return async (dispatch) => {

        // fecth the factories

        const factories = [
            { id: '123a', name: '1' },
            { id: '123b', name: '2' },
            { id: '123c', name: '3' },
        ];

        dispatch(setFactories(factories));

    }
}
const setFactories = (factories) => ({
    type: types.factorySetFactories,
    payload: factories
});

/* FACTORY SECTIONS */

const startSetSections = () => {

    return async (dispatch) => {

        // fecth the sections

        const sections = [
            { id: '123d', name: "Hornos", factoryId: '123a' },
            { id: '123e', name: "Esmaltadoras", factoryId: '123a' },
            { id: '123f', name: "Clasificadoras", factoryId: '123a' },
            { id: '123g', name: "LGV", factoryId: '123b' },
            { id: '123h', name: "Prensas", factoryId: '123b' },
            { id: '123i', name: "Taller", factoryId: '123b' },
            { id: '123j', name: "Depuradora", factoryId: '123c' },
            { id: '123k', name: "Almacén", factoryId: '123c' },
            { id: '123l', name: "Taller", factoryId: '123c' },
        ];

        dispatch(setSections(sections));

    }
}
const setSections = (sections) => ({
    type: types.factorySetSections,
    payload: sections
});


/* SECTION'S MACHINES */

const startSetMachines = () => {

    return async (dispatch) => {

        // fecth the machines

        const machines = [
            { id: '123p', name: "Máquina de descarga", sectionId: '123d' },
            { id: '123q', name: "Inkjet", sectionId: '123e' },
            { id: '123r', name: "Falcon", sectionId: '123f' },
            { id: '123m', name: "LGV 3", sectionId: '123g' },
            { id: '123n', name: "Bancalino", sectionId: '123h' },
            { id: '123o', name: "Taladro de pie", sectionId: '123i' },
        ];

        dispatch(setMachines(machines));

    }
}
const setMachines = (machines) => ({
    type: types.factorySetMachines,
    payload: machines
});

/* DOCS */

const startSetDocs = () => {

    return async (dispatch) => {

        // fecth the machines

        const docs = [
            { id: '312r23f23f23', name: "test1.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f21', name: "test2.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f24', name: "test3.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f25', name: "test4.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f26', name: "test5.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f27', name: "test6.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f28', name: "test1.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f29', name: "test2.pdf", info: 'documento del horno 3', sectionId: '123d' },
            { id: '312r23f23f30', name: "test3.pdf", info: 'documento del horno 3', sectionId: '123d' },
        ];

        dispatch(setDocs(docs));

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

