export const getOrderById = (id, events) => {

    if (!id || id.length < 1 || !events || events.length < 1 || events === 'undefined') {
        return;
    }

    return events.find(event => event.id.toString() === id.toString());

}