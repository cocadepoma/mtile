export const getMachinesBySectionId = (id, machines) => {

    if (!id || id.length < 1) {
        return false;
    }

    return machines.filter(machine => id === machine.sectionId);

}