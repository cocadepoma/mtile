export const getTechnicianNameById = (id, technicians) => {

    return technicians.find(technician => technician.id.toString() === id);

}