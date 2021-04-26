import { createContext } from "react";
import { useStep } from "./reducers/index";

export const StepContext = createContext({});

export function StepProvider({ children }) {
  const step = useStep();
  return <StepContext.Provider value={step}>{children}</StepContext.Provider>;
}
