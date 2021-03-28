import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { navReducer } from "./navReducer";
import { crewReducer } from "./crewReducer";
import { uiReducer } from "./uiReducer";
import { warehouseReducer } from "./warehouseReducer";
import { factoryReducer } from "./factoryReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    nav: navReducer,
    calendar: calendarReducer,
    ui: uiReducer,
    crew: crewReducer,
    warehouse: warehouseReducer,
    factory: factoryReducer
});