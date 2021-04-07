import { types } from "../types/types";
import { toast } from 'react-toastify';


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
            { id: '125p', name: "Máquina de carga", sectionId: '123d' },
            { id: '128p', name: "Mesa de salida", sectionId: '123d' },
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

const startSetNumberSections = () => {

    return async (dispatch) => {

        // fecth the machines

        const numbers = [
            { id: '12312e12e', number: "1", sectionId: '123d' },
            { id: '125e12e21', number: "2", sectionId: '123d' },
            { id: '12812e21e1', number: "3", sectionId: '123d' },
            { id: '123e12e12edsd', number: "4", sectionId: '123d' },
            { id: '123e12e12e', number: "5", sectionId: '123d' },
            { id: '123fwefwef', number: "1", sectionId: '123e' },
            { id: '123dqwdwqd', number: "2", sectionId: '123e' },
            { id: '123fwefwefw', number: "3", sectionId: '123e' },
            { id: '123fwefwefv', number: "4", sectionId: '123e' },
            { id: '123fwefwefb', number: "5", sectionId: '123e' },
            { id: '123fwefwefuik', number: "6", sectionId: '123e' },
            { id: '123fwefwefwef', number: "7", sectionId: '123e' },
            { id: '123fwefweffwe', number: "12", sectionId: '123e' },
        ];

        dispatch(setNumberSections(numbers));

    }
}
const setNumberSections = (numbers) => ({
    type: types.factorySetNumberSections,
    payload: numbers
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

export const startAddFile = (doc) => {

    return async (dispatch) => {
        console.log(doc);

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
            toast.info('Documento agregado correctamente!', {
                position: "top-right",
            });
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
            toast.info('Documento borrado correctamente!', {
                position: "top-right",
            });
        }, 600);
    }
}

const deleteDoc = () => ({
    type: types.factoryDeleteDoc
})

