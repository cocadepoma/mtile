export const getDocsBySectionId = (id, docs) => {

    if (!id || id.length < 1) {
        return false;
    }

    return docs.filter(docs => docs.sectionId.toString() === id.toString());

}