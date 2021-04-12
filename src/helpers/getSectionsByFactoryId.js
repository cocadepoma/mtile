export const getSectionsByFactoryId = (id, sections) => {

    console.log(id);
    if (!id || id.length < 1 || sections.length < 1 || sections === 'undefined') {
        return false;
    }
    return sections.filter(section => section.factoryId === id)

}
