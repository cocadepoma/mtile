import { fetchDataWeeksSections, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startloadingStatistics = () => {

    return async (dispatch) => {
        await dispatch(startLoadWeeks());
        await dispatch(startLoadThreeWeeksSections());
        await dispatch(startLoadlastWeekByOrderType());
    }
}

const startLoadWeeks = () => {

    return async (dispatch) => {
        const resp = await fetchWithToken('statistics/14dayssagobyweeks', undefined, 'GET');
        const { weeks } = await resp.json();

        const dataWeeks = []
        if (weeks) {
            for (const week of weeks) {
                dataWeeks.push(week.week);
            }
        }
        dispatch(loadWeeks(dataWeeks))
    }
}

const loadWeeks = (weeks) => ({
    type: types.statisticsLoadWeeks,
    payload: weeks
});


const startLoadThreeWeeksSections = () => {

    return async (dispatch, getState) => {

        const { weeks } = getState().statistics;

        const arrayDatos = [];

        const sectionsArray = [
            'Prensas',
            'Esmaltadoras',
            'Hornos',
            'Clasificación',
            'Parque Box',
            'Tierras',
            'Almacén',
            'Taller',
            'Otros'
        ]

        for (const section of sectionsArray) {
            const data = await fetchDataWeeksSections(section, weeks);
            arrayDatos.push(data);
        }

        dispatch(loadThreeWeeksSections(arrayDatos));
    }
}

const loadThreeWeeksSections = (data) => ({
    type: types.statisticsLoadThreeWeeksSections,
    payload: data
});



const startLoadlastWeekByOrderType = () => {

    return async (dispatch) => {

        const resp = await fetchWithToken('statistics/lastweekbyordertype', undefined, 'GET');
        const { orderTypeWeeks } = await resp.json();

        const quantities = [];
        const names = [];

        if (orderTypeWeeks) {
            for (const orderTypeWeek of orderTypeWeeks) {
                quantities.push(orderTypeWeek.total);
                names.push(orderTypeWeek.name);
            }
            dispatch(loadLastWeekByOrderType({ quantities, names }));
        }

    }
}

const loadLastWeekByOrderType = (data) => ({
    type: types.statisticsLoadlastWeekByOrderType,
    payload: data
});

