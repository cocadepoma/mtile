import { types } from "../types/types"


const initialState = {
    weeks: [],
    threeWeekSections: [],
    lastWeekByOrderType: {},
    lastWeekByBreakdown: {},
    lastWeekByTechnician: {},
    interventionsWeeks: {},
    totalTimeByWeek: {}
}

export const statisticsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.statisticsLoadWeeks: {
            return {
                ...state,
                weeks: [...action.payload]
            }
        }

        case types.statisticsLoadThreeWeeksSections: {
            return {
                ...state,
                threeWeekSections: [...action.payload]
            }
        }

        case types.statisticsLoadlastWeekByOrderType: {
            return {
                ...state,
                lastWeekByOrderType: { ...action.payload }
            }
        }

        case types.statisticsLoadlastWeekByBreakdown: {
            return {
                ...state,
                lastWeekByBreakdown: { ...action.payload }
            }
        }

        case types.statisticsLoadlastWeekByTechnician: {
            return {
                ...state,
                lastWeekByTechnician: { ...action.payload }
            }
        }

        case types.statisticsLoadInterventionsWeeks: {
            return {
                ...state,
                interventionsWeeks: { ...action.payload }
            }
        }

        case types.statisticsLoadTotalTimeByWeek: {
            return {
                ...state,
                totalTimeByWeek: { ...action.payload }
            }
        }

        case types.statisticsClear: {
            return {
                ...initialState
            }
        }

        default:
            return state
    }


}