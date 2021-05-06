import { fetchDataWeeksSections, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startloadingStatistics = () => {

    return async (dispatch) => {
        await dispatch(startLoadWeeks());
        await dispatch(startLoadThreeWeeksSections());
        await dispatch(startLoadlastWeekByOrderType());
        await dispatch(startLoadIntervetionsWeeks());
        await dispatch(startLoadTotalTimeByWeek());
        await dispatch(startLoadlastWeekByBreakdown());
        await dispatch(startLoadlastWeekByTechnician());
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
        console.log(dataWeeks)
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

const startLoadlastWeekByBreakdown = () => {

    return async (dispatch) => {

        const resp = await fetchWithToken('statistics/lastweekbybreakdown', undefined, 'GET');
        const { breakdownWeeks } = await resp.json();

        const quantities = [];
        const names = [];

        if (breakdownWeeks) {
            for (const orderTypeWeek of breakdownWeeks) {
                quantities.push(orderTypeWeek.total);
                names.push(orderTypeWeek.name);
            }
            dispatch(loadLastWeekByBreakdown({ quantities, names }));
        }

    }
}

const loadLastWeekByBreakdown = (data) => ({
    type: types.statisticsLoadlastWeekByBreakdown,
    payload: data
});


const startLoadlastWeekByTechnician = () => {

    return async (dispatch) => {

        const resp = await fetchWithToken('statistics/lastweekbytechnician', undefined, 'GET');
        const { techniciansWeeks } = await resp.json();

        const quantities = [];
        const names = [];

        if (techniciansWeeks) {
            for (const technicianWeek of techniciansWeeks) {
                quantities.push(technicianWeek.total);
                names.push(technicianWeek.name);
            }
            dispatch(loadLastWeekByTechnician({ quantities, names }));
        }
    }
}

const loadLastWeekByTechnician = (data) => ({
    type: types.statisticsLoadlastWeekByTechnician,
    payload: data
});

const startLoadIntervetionsWeeks = () => {

    return async (dispatch) => {

        const resp = await fetchWithToken('statistics/interventionsweeks', undefined, 'GET');
        const { interventionsWeeks } = await resp.json();

        const weeksIntervetions = [];
        const weeksInterventionsCounts = [];

        if (interventionsWeeks) {
            for (const intervetionWeek of interventionsWeeks) {
                weeksIntervetions.push(intervetionWeek.week);
                weeksInterventionsCounts.push(intervetionWeek.count);
            }
            dispatch(loadInterventionsWeeks({ weeksIntervetions, weeksInterventionsCounts }));
        }

    }
}

const loadInterventionsWeeks = (data) => ({
    type: types.statisticsLoadInterventionsWeeks,
    payload: data
});


const startLoadTotalTimeByWeek = () => {

    return async (dispatch) => {

        const resp = await fetchWithToken('statistics/totaltimebyweek', undefined, 'GET');
        const { totalTimeWeeks } = await resp.json();

        const weeksTime = [];
        const weeksTotalTime = [];

        if (totalTimeWeeks) {
            for (const timeWeek of totalTimeWeeks) {
                weeksTime.push(timeWeek.week);
                weeksTotalTime.push(timeWeek.totalMins / 60);
            }
            dispatch(loadTotalTimeByWeek({ weeksTime, weeksTotalTime }));
        }

    }
}

const loadTotalTimeByWeek = (data) => ({
    type: types.statisticsLoadTotalTimeByWeek,
    payload: data
});


export const statisticsClear = () => ({
    type: types.statisticsClear
});
