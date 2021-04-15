export const getNameOrderType = (id, types) => {

    return types.find(type => id === type.id);

}

export const getNameBreakdown = (id, breakdowns) => {

    return breakdowns.find(type => id === type.id);

}

export const getNameFactory = (id, factories) => {

    return factories.find(factory => id === factory.id);

}

export const getNameSection = (id, sections) => {

    return sections.find(section => id === section.id);

}

export const getNameNumber = (id, numbers) => {

    return numbers.find(number => id === number.id);

}

export const getNameMachine = (id, machines) => {

    return machines.find(machine => id === machine.id);

}