export const getOrdersStillOpen = (orders) => {

    if (!orders || orders.length < 1 || orders === 'undefined') {
        return [];
    }

    return orders.filter(order => !order.closed);

}