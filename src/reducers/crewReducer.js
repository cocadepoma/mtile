import { types } from "../types/types";
import moment from 'moment';

const initialState = {
    technicians: null,
    activeTechnician: null
}

const initialState2 = {

    technicians: [
        {
            id: new Date().getTime(),
            name: 'Paco',
            surname: 'Rodríguez Serrano',
            birthDate: moment('1988').toDate(),
            identityDocument: '53379410K',
            phoneNumber: '695904310',
            email: 'pp@ppp.com',
            city: 'Vila-real',
            address: 'Calle de la calle 11',
            image: `${process.env.PUBLIC_URL}/assets/images/technician.jpeg`,
            notes: 'Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, ',
            schedule: 'L-V JP',
            factory: '1'

        },
        {
            id: moment().add(4, 'hours').toDate().getTime(),
            name: 'Pepe',
            surname: 'Wey',
            birthDate: moment('1956').toDate(),
            identityDocument: '3122131F',
            phoneNumber: '1234124124',
            email: '412421412',
            city: 'Madrid',
            address: 'Calle los Manolos 24 5B',
            image: `${process.env.PUBLIC_URL}/assets/images/technician2.png`,
            notes: 'Vacaciones 23,24,25,26 Marzo 2020',
            schedule: 'L-V JP',
            factory: '2'

        },
        {
            id: moment().add(4, 'days').toDate().getTime(),
            name: 'Juan',
            surname: 'Comino',
            birthDate: moment('1978').toDate(),
            identityDocument: '312312P',
            phoneNumber: '695904310',
            email: '679925342',
            city: 'Alcora',
            address: 'Callen Angelo',
            image: `${process.env.PUBLIC_URL}/assets/images/technician3.jpg`,
            notes: 'No sabe que hacer',
            schedule: 'L-V M-T-N',
            factory: '1'

        },
        {
            id: moment().add(30, 'days').toDate().getTime(),
            name: 'Salva',
            surname: 'Salva',
            birthDate: moment('1980').toDate(),
            identityDocument: '3123312L',
            phoneNumber: '657657',
            email: '7657657',
            city: 'Figueroles',
            address: 'La única calle',
            image: `${process.env.PUBLIC_URL}/assets/images/technician4.jpg`,
            notes: 'Le gusta el surf',
            schedule: 'L-V M-T-N',
            factory: '1'

        },
        {
            id: moment().add(4, 'years').toDate().getTime(),
            name: 'Pepe',
            surname: 'Wey',
            birthDate: moment('1956').toDate(),
            identityDocument: '3122131F',
            phoneNumber: '1234124124',
            email: '412421412',
            city: 'Madrid',
            address: 'Calle los Manolos 24 5B',
            image: `${process.env.PUBLIC_URL}/assets/images/technician2.png`,
            notes: 'Vacaciones 23,24,25,26 Marzo 2020',
            schedule: 'L-D M-T-N',
            factory: '1'

        },
        {
            id: moment().add(14, 'years').toDate().getTime(),
            name: 'Paco',
            surname: 'Rodríguez Serrano',
            birthDate: moment('1988').toDate(),
            identityDocument: '53379410K',
            phoneNumber: '695904310',
            email: 'pp@ppp.com',
            city: 'Vila-real',
            address: 'Calle de la calle 11',
            image: `${process.env.PUBLIC_URL}/assets/images/technician.jpeg`,
            notes: 'Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, Le gusta el café sin mucho café, ',
            schedule: 'L-V JP',
            factory: '1'

        },
        {
            id: moment().add(31, 'days').toDate().getTime(),
            name: 'Salva',
            surname: 'Salva',
            birthDate: moment('1980').toDate(),
            identityDocument: '3123312L',
            phoneNumber: '657657',
            email: '7657657',
            city: 'Figueroles',
            address: 'La única calle',
            image: `${process.env.PUBLIC_URL}/assets/images/technician4.jpg`,
            notes: 'Le gusta el surf',
            schedule: 'L-V M-T-N',
            factory: '1'

        },
        {
            id: moment().add(1, 'year').toDate().getTime(),
            name: 'Juan',
            surname: 'Comino',
            birthDate: moment('1978').toDate(),
            identityDocument: '312312P',
            phoneNumber: '695904310',
            email: '679925342',
            city: 'Alcora',
            address: 'Callen Angelo',
            image: `${process.env.PUBLIC_URL}/assets/images/technician3.jpg`,
            notes: 'No sabe que hacer',
            schedule: 'L-V M-T-N',
            factory: '1'

        },
    ],
    activeTechnician: null
}


export const crewReducer = (state = initialState2, action) => {

    switch (action.type) {

        case types.crewSetActive:
            return {
                ...state,
                activeTechnician: action.payload
            }

        case types.crewClearActive:
            return {
                ...state,
                activeTechnician: null
            }

        case types.crewAddNewTechnician:
            return {
                ...state,
                technicians: [...state.technicians, action.payload]
            }

        case types.crewDeleteTechnician:
            return {
                ...state,
                technicians: state.technicians.filter((t) => t.id !== state.activeTechnician.id),
            };

        case types.crewUpdateTechnician:
            return {
                ...state,
                technicians: state.technicians.map(t => t.id === state.activeTechnician.id ? action.payload : t)
            }

        default:
            return state;
    }
}
