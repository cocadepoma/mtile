
// Count total amout of time in the operations of an order
export const countTotalTimeOperations = (eventData) => {

    let count = 0;

    if (eventData.operations && eventData.operations.length > 0) {
        for (const operation of eventData.operations) {
            count += parseFloat(operation.time * 60);
        }
    }

    return count;
}