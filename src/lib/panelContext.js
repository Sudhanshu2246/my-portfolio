import { createContext, useContext } from "react";
export const PanelContext = createContext({
    currentPanel: 0,
    goToPanel: () => { },
});
export function usePanels() {
    return useContext(PanelContext);
}
export const PANEL_COUNT = 7;
export const PANEL_IDS = [
    "home",
    "about",
    "experience",
    "projects",
    "techstack",
    "skills",
    "contact",
];
