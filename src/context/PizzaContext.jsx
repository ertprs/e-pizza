import { createContext, useCallback, useReducer, useState } from "react";
import {
  actions,
  initialState,
  pizzasInformations,
} from "./reducers/pizzasInformationsReducer";

export const PizzaStoreContext = createContext({
  selectedPizza: {},
  generalState: {},
  pizzasStore: {},
});

export function PizzaStorePrivder({ children }) {
  const [state, dispatch] = useReducer(pizzasInformations, initialState);

  const [generalState, setState] = useState([]);
  const [selectedPizzaState, setSelectedPizzaState] = useState({});

  function setPizzaStoreAction(pizzaStoreResponse) {
    dispatch({
      type: actions.INCREMENT_PIZZAS_STATE,
      payload: pizzaStoreResponse,
    });
  }

  const setPizza = useCallback((selectedPizza) => {
    setSelectedPizzaState(selectedPizza);
  }, []);

  const selectedPizza = {
    selectedPizzaState,
    setPizza,
  };

  const pizzasStore = {
    store: state,
    setPizzaStoreAction,
  };

  return (
    <PizzaStoreContext.Provider
      value={{ generalState, selectedPizza, pizzasStore }}
    >
      {children}
    </PizzaStoreContext.Provider>
  );
}
