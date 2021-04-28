export const getMachinesByNumberId = (id, machines) => {

    if (!id || id.length < 1 || machines.length < 1 || machines === 'undefined') {
        return false;
    }

    return machines.filter(machine => id.toString() === machine.numberId.toString());

}
