import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/ui/ToastSuccess";

export const startGetWarehouseItems = () => {

    return (dispatch) => {

        // TODO: fetch data from Server
        const items = [
            {
                code: '1ACD',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRET',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBH312',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACD4',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRET4',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBH5',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACD7',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRET76',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBH654',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACD754',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRET2345',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBH6346',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACD765',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRET6345',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBH457y',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACDsdfsd',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRETfsdf',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBHsdf',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACDfsdf',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRETdsfe',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBHeqw',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACDfcwdvc',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRETwedv',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBHdfhdf',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACD3242gfsv',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRETbvedfsd3',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBH321rvdf',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '1ACD23rgvf',
                description: 'Sensor inductivo NPN',
                quantity: '5',
                minStock: '1',
                place: 'Estantería 3',
            },
            {
                code: '1JRET123r24fgbv',
                description: 'Correa Termosoldable Tipo B con núcleo',
                quantity: '100',
                minStock: '20',
                place: 'Estantería 3B',

            },
            {
                code: '8TRBH1231223rf',
                description: 'Mierda B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
            {
                code: '8TRBH1dqwd23rf',
                description: 'Más Mierda B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
        ];

        dispatch(loadWarehouseItems(items));
    }
}
const loadWarehouseItems = (items) => ({
    type: types.warehouseLoaded,
    payload: items
});

export const setActiveItem = (item) => ({
    type: types.warehouseSetActiveItem,
    payload: item
});

export const removeActiveItem = () => ({
    type: types.warehouseRemoveActiveItem,
});


export const startUpdateItem = (item) => {

    return (dispatch) => {

        // TODO: update item on BBDD

        dispatch(updateItem(item));
        setTimeout(() => {
            toast.success(<ToastSuccess text="Item actualizado con éxito!" />);
        }, 600);
    }
}

const updateItem = (item) => ({
    type: types.warehouseUpdateItem,
    payload: item
});

export const startAddItem = (item) => {

    return (dispatch) => {

        // TODO Add item to DB

        dispatch(addItem(item));
        setTimeout(() => {
            toast.success(<ToastSuccess text="Item agregado con éxito!" />);

        }, 600);
    }
}

const addItem = (item) => ({
    type: types.warehouseAddItem,
    payload: item
});

export const startRemoveItem = () => {

    return (dispatch) => {

        // TODO Remove item from DB

        dispatch(removeItem());
        setTimeout(() => {
            toast.success(<ToastSuccess text="Item eliminado con éxito!" />);
        }, 600);
    }
}

const removeItem = () => ({
    type: types.warehouseRemoveItem
})