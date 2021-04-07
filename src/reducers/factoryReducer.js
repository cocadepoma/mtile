import { types } from "../types/types"


const initialState = {
    factories: [],
    sections: [],
    machines: [],
    numbers: [],
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

        case types.factorySetNumberSections: {
            return {
                ...state,
                numbers: action.payload
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

        case types.factoryAddDoc: {
            return {
                ...state,
                docs: [...state.docs, action.payload]
            }
        }

        case types.factoryDeleteDoc: {
            return {
                ...state,
                docs: state.docs.filter(doc => doc.id !== state.activeDoc.id)
            }
        }
        default:
            return state;
    }


}