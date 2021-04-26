import { createContext } from "react";
import { usePizzaDetails } from "../utils/usePizzaDetails";

export const PizzaDetailsContext = createContext({});

export function PizzaDetailsProvider({ children }) {
  const pizzaDetails = usePizzaDetails();
  return (
    <PizzaDetailsContext.Provider value={pizzaDetails}>
      {children}
    </PizzaDetailsContext.Provider>
  );
}
