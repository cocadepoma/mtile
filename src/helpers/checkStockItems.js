export const checkStockItems = (items = []) => {

    const itemsToOrder = items.filter(item => item.quantity <= item.minStock);

    return itemsToOrder;
}