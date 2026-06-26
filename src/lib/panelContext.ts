import { createContext, useContext } from "react";

export interface PanelContextValue {
  currentPanel: number;
  goToPanel: (index: number) => void;
}

export const PanelContext = createContext<PanelContextValue>({
  currentPanel: 0,
  goToPanel: () => {},
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
] as const;
