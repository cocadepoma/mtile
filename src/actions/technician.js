import { types } from "../types/types";
import { toast } from 'react-toastify';
import moment from 'moment';
import { ToastSuccess } from "../components/ui/ToastSuccess";

export const setActiveTechnician = (tech) => ({
    type: types.crewSetActive,
    payload: tech
});

export const clearActiveTechnician = () => ({
    type: types.crewClearActive
});

export const startLoadingCrew = () => {

    return async (dispatch) => {

        // TODO: fetch crew

        dispatch(loadCrew(mockCrew));

    }

}

const loadCrew = (crew) => ({
    type: types.crewLoadTechnicians,
    payload: crew
})



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


const mockCrew = [
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

]