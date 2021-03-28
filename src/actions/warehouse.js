import { types } from "../types/types";
import { toast } from 'react-toastify';

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
                code: '8TRBH',
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
                code: '8TRBH',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
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
                code: '8TRBH',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
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
                code: '8TRBH',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
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
                code: '8TRBH',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
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
                code: '8TRBH',
                description: 'Mandrino B&T',
                quantity: '10',
                minStock: '5',
                place: 'Estantería 4J',
            },
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
                code: '8TRBH12312',
                description: 'Mierda B&T',
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
            toast.info('Item Actualizado con éxito!', {
                position: "top-right",
            });
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
            toast.info('Item agregado con éxito!', {
                position: "top-right",
            });
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
            toast.info('Item borrado con éxito!', {
                position: "top-right",
            });
        }, 600);
    }
}

const removeItem = () => ({
    type: types.warehouseRemoveItem
})