export const getSectionNumbersBySectionId = (id, numbers) => {

    if (!id || id.length < 1 || numbers.length < 1 || numbers === 'undefined') {
        return false;
    }

    return numbers.filter(number => number.sectionId.toString() === id.toString());

}
