export const getSectionsByFactoryId = (id, sections) => {

    if (!id || id.length < 1 || sections.length < 1 || sections === 'undefined') {
        return false;
    }

    return sections.filter(section => section.factoryId.toString() === id.toString())

}
