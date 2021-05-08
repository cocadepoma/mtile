import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/ui/ToastSuccess";
import { fetchWithToken } from "../helpers/fetch";
import { ToastError } from "../components/ui/ToastError";
import { checkStockItems } from "../helpers/checkStockItems";

export const startGetWarehouseItems = () => {

    return async (dispatch) => {

        try {
            // fetch items from db
            const resp = await fetchWithToken("warehouse/");
            const { items } = await resp.json();

            const itemsToOrder = checkStockItems(items);

            dispatch(loadItemsToOrder(itemsToOrder))

            if (items) {
                dispatch(loadWarehouseItems(items));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const loadWarehouseItems = (items) => ({
    type: types.warehouseLoaded,
    payload: items
});

const loadItemsToOrder = (items) => ({
    type: types.warehouseItemsToOrder,
    payload: items
})

export const setActiveItem = (item) => ({
    type: types.warehouseSetActiveItem,
    payload: item
});

export const removeActiveItem = () => ({
    type: types.warehouseRemoveActiveItem,
});


export const startUpdateItem = (item) => {

    return async (dispatch) => {

        try {
            // Update item on BBDD
            const { id, ...rest } = item;
            const resp = await fetchWithToken(`warehouse/${id}`, { ...rest }, 'PUT');
            const { newItem } = await resp.json();

            if (newItem) {
                dispatch(updateItem(newItem));
                dispatch(startGetWarehouseItems());

                setTimeout(() => {
                    toast.success(<ToastSuccess text="Item actualizado con éxito!" />);
                }, 200);
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const updateItem = (item) => ({
    type: types.warehouseUpdateItem,
    payload: item
});

export const startAddItem = (item) => {

    return async (dispatch) => {

        try {

            // TODO Add item to DB
            const resp = await fetchWithToken(`warehouse/`, { ...item }, 'POST');
            const { savedItem } = await resp.json();

            if (savedItem) {
                dispatch(addItem(item));
                dispatch(startGetWarehouseItems());

                setTimeout(() => {
                    toast.success(<ToastSuccess text="Item actualizado con éxito!" />);
                }, 200);
            } else {
                toast.error(<ToastError text="Error al guardar el item!" />);
            }

        } catch (error) {
            console.log(error);
            toast.error(<ToastError text="Error al conectar, contacte con el administrador!" />);
        }
    }
}

const addItem = (item) => ({
    type: types.warehouseAddItem,
    payload: item
});

export const startRemoveItem = () => {

    return async (dispatch, getState) => {

        try {
            const { activeItem } = getState()?.warehouse;
            const id = activeItem?.id;

            if (id) {

                // TODO Remove item from DB
                const resp = await fetchWithToken(`warehouse/${id}`, {}, 'DELETE');
                const data = await resp.json();
                if (data) {
                    dispatch(removeItem());
                    toast.success(<ToastSuccess text="Item eliminado con éxito!" />);
                } else {
                    toast.error(<ToastError text="Error al eliminar el item! !" />);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(<ToastError text="Error al conectar, contacte con el administrador!" />);
        }
    }
}

const removeItem = () => ({
    type: types.warehouseRemoveItem
});

export const clearWarehouse = () => ({
    type: types.warehouseClear
});