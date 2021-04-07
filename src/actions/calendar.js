import { types } from "../types/types";
import moment from "moment";

// Set the last clicked event to activeEvent
export const setActiveEvent = (event) => ({
    type: types.eventSetActive,
    payload: event
});

// Change activeEvent to NULL
export const clearActiveEvent = () => ({
    type: types.eventClearActive
});

// Return calendarReducer to its initialState
export const clearEvents = () => ({
    type: types.eventCleaner
});

export const startLoadOrderEvents = () => {

    return async (dispatch) => {

        // fetch the events

        dispatch(loadOrderEvents(mockEvents));
        dispatch(startLoadOrderTypes());
        dispatch(startLoadBreakdownTypes());

    }
}

const loadOrderEvents = (events) => ({
    type: types.loadOrderEvents,
    payload: events
});

export const startAddOrderEvent = () => {

    return async (dispatch) => {

        // fetch the events


    }
}

const addOrderEvent = (event) => ({
    type: types.addOrderEvent,
    payload: event
});

export const startUpdateOrderEvent = () => {

    return async (dispatch) => {

        // fetch the events


    }
}

const updateOrderEvent = (event) => ({
    type: types.updateOrderEvent,
    payload: event
});

export const startDeleteOrderEvent = () => {

    return async (dispatch) => {

        // fetch the events


    }
}

const deleteOrderEvent = (event) => ({
    type: types.deleteOrderEvent,
    payload: event
});


const startLoadOrderTypes = () => {

    return async (dispatch) => {
        //TODO: fetch the types

        dispatch(loadOrderTypes(mockTypes));

    }
}
const loadOrderTypes = (orderTypes) => ({
    type: types.loadOrderTypes,
    payload: orderTypes
});

const startLoadBreakdownTypes = () => {

    return async (dispatch) => {
        //TODO: fetch the types

        dispatch(loadBreakdownTypes(mockBreakdowns));

    }
}
const loadBreakdownTypes = (breakdownTypes) => ({
    type: types.loadBreakdownTypes,
    payload: breakdownTypes
});




const mockEvents =
    [
        {
            id: new Date().getTime(),
            factory: "1",
            section: "Hornos",
            machine: "máquina descarga",
            number: '5',
            technician: 'Ivan',
            worker: 'Manolo',
            orderType: 'Directiva',
            breakdown: 'Eléctrica',
            startWork: moment().toDate(),
            endWork: moment().add(2, "hours").toDate(),
            startFix: new Date(),
            endFix: new Date(),
            materials: [],
            operations: [],
            clocks: [],
            totalMins: '130min',
            description: "descripción de la avería",
        }, {
            id: new Date().getTime(),
            factory: "1",
            section: "Prensas",
            machine: "Bancalino",
            number: '3',
            technician: 'Ivan',
            worker: 'Pepe',
            orderType: 'Planificada',
            breakdown: 'Eléctrica',
            startWork: moment().add(2, "hours").toDate(),
            endWork: moment().add(3, "hours").toDate(),
            startFix: new Date(),
            endFix: new Date(),
            materials: [],
            operations: [],
            clocks: [],
            totalMins: '150min',
            description: "descripción breve de la avería",
        }, {
            id: new Date().getTime(),
            factory: "1",
            section: "Esmaltadora",
            machine: "Inkjet",
            number: '3',
            technician: 'Ivan',
            worker: 'Pepe',
            orderType: 'Mant. Preventivo',
            breakdown: 'Eléctrica',
            startWork: moment().add(5, "hours").toDate(),
            endWork: moment().add(6, "hours").toDate(),
            startFix: new Date(),
            endFix: new Date(),
            materials: [],
            operations: [],
            clocks: [],
            totalMins: '130min',
            description: "descripción breve de la avería",

        }, {
            id: new Date().getTime(),
            factory: "1",
            section: "Clasificación",
            machine: "Qualitron",
            number: '6',
            technician: 'Ivan',
            worker: 'Pepe',
            orderType: 'Mant. Correctivo',
            breakdown: 'Eléctrica',
            startWork: moment().add(9, "day").toDate(),
            endWork: moment().add(9, "day").add(4, "hours").toDate(),
            startFix: new Date(),
            endFix: new Date(),
            materials: [],
            operations: [],
            clocks: [],
            totalMins: '130min',
            description: "descripción breve de la avería",
        }, {
            id: new Date().getTime(),
            factory: "1",
            section: "Parque Box",
            machine: "LGV",
            number: '-',
            technician: 'Ivan',
            worker: 'Pepe',
            orderType: 'Varios',
            breakdown: 'Eléctrica',
            startWork: moment().add(3, "day").toDate(),
            endWork: moment().add(3, "day").add(2, "hours").toDate(),
            startFix: new Date(),
            endFix: new Date(),
            materials: [],
            operations: [],
            clocks: [],
            totalMins: '130min',
            description: "descripción breve de la avería",
        },
        {
            id: new Date().getTime(),
            factory: "1",
            section: "Túnel de Flejado",
            machine: "Encapuchonadora",
            number: '-',
            technician: 'Ivan',
            worker: 'Pepe',
            orderType: 'Directiva',
            breakdown: 'Eléctrica',
            startWork: moment().add(1, "day").toDate(),
            endWork: moment().add(1, "day").add(2, "hours").toDate(),
            startFix: new Date(),
            endFix: new Date(),
            materials: [],
            operations: [],
            clocks: [],
            totalMins: '130min',
            description: "descripción breve de la avería",

        },]

const mockTypes = [
    {
        id: '123e123',
        name: 'Directiva'
    },
    {
        id: '123e12312ed1',
        name: 'Planificada'
    },
    {
        id: '124124124',
        name: 'Preventiva'
    },
    {
        id: '345435345',
        name: 'Correctiva'
    },
    {
        id: '3456456346',
        name: 'Otros'
    },
]

const mockBreakdowns = [
    {
        id: 'fdsf43',
        name: 'Eléctrica'
    },
    {
        id: 'asfas',
        name: 'Mecánica'
    },
    {
        id: '32r23',
        name: 'Elec-Mec'
    },
    {
        id: '31233f',
        name: 'Regulación'
    },
]
