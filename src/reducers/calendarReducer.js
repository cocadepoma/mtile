
import { types } from "../types/types";
import moment from "moment";


const initialState = {
    events: [{
        id: new Date().getTime(),
        desc: "descripción de la avería ",
        section: "Hornos",
        factory: "1",
        number: '5',
        machine: "máquina descarga",
        start: moment().toDate(),
        end: moment().add(2, "hours").toDate(),
        totalMins: '130min',
        orderType: 'Directiva',
        breakdown: 'Eléctrica',
        technician: 'Ivan'
    }, {
        id: new Date().getTime(),
        desc: "descripción breve de la avería",
        section: "Prensas",
        factory: "1",
        number: '3',
        machine: "Bancalino",
        start: moment().add(2, "hours").toDate(),
        end: moment().add(3, "hours").toDate(),
        totalMins: '150min',
        orderType: 'Planificada',
        breakdown: 'Eléctrica',
        technician: 'Ivan'
    }, {
        id: new Date().getTime(),
        desc: "descripción breve de la avería",
        section: "Esmaltadora",
        factory: "1",
        number: '3',
        machine: "Inkjet",
        start: moment().add(5, "hours").toDate(),
        end: moment().add(6, "hours").toDate(),
        totalMins: '130min',
        orderType: 'Mant. Preventivo',
        breakdown: 'Eléctrica',
        technician: 'Ivan'

    }, {
        id: new Date().getTime(),
        desc: "descripción breve de la avería",
        section: "Clasificación",
        factory: "1",
        number: '6',
        machine: "Qualitron",
        start: moment().add(9, "day").toDate(),
        end: moment().add(9, "day").add(4, "hours").toDate(),
        totalMins: '130min',
        orderType: 'Mant. Correctivo',
        breakdown: 'Eléctrica',
        technician: 'Ivan'
    }, {
        id: new Date().getTime(),
        desc: "descripción breve de la avería",
        section: "Parque Box",
        factory: "1",
        number: '-',
        machine: "LGV",
        start: moment().add(3, "day").toDate(),
        end: moment().add(3, "day").add(2, "hours").toDate(),
        totalMins: '130min',
        orderType: 'Varios',
        breakdown: 'Eléctrica',
        technician: 'Ivan'
    },
    {
        id: new Date().getTime(),
        desc: "descripción breve de la avería",
        section: "Túnel de Flejado",
        factory: "1",
        number: '-',
        machine: "Encapuchonadora",
        start: moment().add(1, "day").toDate(),
        end: moment().add(1, "day").add(2, "hours").toDate(),
        totalMins: '130min',
        orderType: 'Directiva',
        breakdown: 'Eléctrica',
        technician: 'Ivan'

    },],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        // case types.eventAddNew:
        //     return {
        //         ...state,
        //         events: [...state.events, action.payload],
        //     };

        // case types.eventUpdate:
        //     return {
        //         ...state,
        //         events: state.events.map((e) => (e.id === action.payload.id ? action.payload : e)),
        //     };

        // case types.eventDelete:
        //     return {
        //         ...state,
        //         events: state.events.filter((e) => {
        //             return e.id !== state.activeEvent.id;
        //         }),
        //         activeEvent: null,
        //     };

        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventCleaner:
            return {
                ...initialState
            }

        default:
            return state;
    }
};
