export const getSectionsByFactoryId = (id, sections) => {

    if (!id || id.length < 1) {
        return false;
    }

    return sections.filter(section => section.factoryId === id)

}