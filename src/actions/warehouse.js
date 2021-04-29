import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/ui/ToastSuccess";

export const startGetWarehouseItems = () => {

    return async (dispatch) => {

        // fetch items from db
        const resp = await fetch('http://localhost:8088/api/warehouse');
        const { items } = await resp.json();

        if (items) {
            dispatch(loadWarehouseItems(items));
        }

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
});

export const clearWarehouse = () => ({
    type: types.warehouseClear
});