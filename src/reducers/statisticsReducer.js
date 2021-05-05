import { types } from "../types/types"


const initialState = {
    weeks: [],
    threeWeekSections: [],
    lastWeekByOrderType: {}
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
        default:
            return state
    }


}