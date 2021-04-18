import { types } from "../types/types";

/* Actions to be called from a dispatch */

// Extend and Reduce Nav => toggle
export const toggleNav = () => ({
    type: types.toggleNav,
});

// Show and Hide Responsive Nav => toggle
export const toggleResponsive = () => ({
    type: types.toggleResponsiveNav,
});
