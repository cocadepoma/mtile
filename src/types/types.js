export const types = {

    /* login */
    authLogin: '[auth] User Login',
    authLogout: '[auth] User Logout',
    authCheckingFinish: '[auth] Checking Finish',
    authLoadingStart: '[auth] Loading Start',
    authLoadingFinish: '[auth] Loading Finish',

    /* show/hide extended nav */
    toggleNav: '[nav] Toggle Nav',

    /* modal */
    uiOpenModal: "[UI] Open Modal",
    uiCloseModal: "[UI] Close Modal",

    /* calendar */
    eventSetActive: "[event] Set Active",
    eventClearActive: "[event] Clear Active",
    eventCleaner: "[event] Clean events",

    /* crew */
    crewSetActive: "[crew] Set active",
    crewClearActive: "[crew] Clear active",
    crewAddNewTechnician: "[crew] Add new technician",
    crewUpdateTechnician: "[crew] Update technician",
    crewDeleteTechnician: "[crew] Delete technician",

    /* warehouse */
    warehouseLoaded: "[warehouse] Loaded Data",
    warehouseRemoveItem: "[warehouse] Remove Item",
    warehouseAddItem: "[warehouse] Add Item",
    warehouseUpdateItem: "[warehouse] Update Item",
    warehouseSetActiveItem: "[warehouse] Set Active Item",
    warehouseRemoveActiveItem: "[warehouse] Remove Active Item",

    /* factory */
    factorySetFactories: "[factories] Set Factories",
    factorySetSections: "[factories] Set Sections",
    factorySetMachines: "[factories] Set Machines",
    factorySetDocs: "[factories] Set Docs",
    factorySetActiveDoc: "[factories] Set Active Doc",
    factoryClearActiveDoc: "[factories] Clear Active Doc",

}