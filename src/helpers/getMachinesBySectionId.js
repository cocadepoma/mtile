export const getMachinesBySectionId = (id, machines) => {

    if (!id || id.length < 1 || machines.length < 1 || machines === 'undefined') {
        return false;
    }

    return machines.filter(machine => id === machine.sectionId);

}
