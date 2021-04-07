export const getSectionNumbersBySectionId = (id, numbers) => {

    return numbers.filter(number => number.sectionId === id);

}