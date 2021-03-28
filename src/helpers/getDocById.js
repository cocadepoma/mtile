export const getDocById = (id, docs) => {

    return docs.find(doc => doc.id === id);
}