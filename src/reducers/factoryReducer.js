import { types } from "../types/types"


const initialState = {
    factories: [],
    sections: [],
    machines: [],
    docs: [],
    activeDoc: null
}


export const factoryReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.factorySetFactories: {
            return {
                ...state,
                factories: action.payload
            }
        }

        case types.factorySetSections: {
            return {
                ...state,
                sections: action.payload
            }
        }

        case types.factorySetMachines: {
            return {
                ...state,
                machines: action.payload
            }
        }

        case types.factorySetDocs: {
            return {
                ...state,
                docs: action.payload
            }
        }

        case types.factorySetActiveDoc: {
            return {
                ...state,
                activeDoc: action.payload
            }
        }

        case types.factoryClearActiveDoc: {
            return {
                ...state,
                activeDoc: null
            }
        }

        default:
            return state;
    }


}