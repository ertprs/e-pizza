import { createContext, useCallback, useReducer, useState } from "react";

const initialState = {
  pizzasDetails:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("pizzaStore"))
      : {},
};

const actions = {
  INCREMENT_PIZZAS_STATE: "INCREMENT_PIZZAS_STATE",
};

function pizzasInformations(state, action) {
  switch (action.type) {
    case actions.INCREMENT_PIZZAS_STATE: {
      if (typeof window !== "undefined") {
        return localStorage.setItem(
          "pizzaStore",
          JSON.stringify(action.payload)
        );
      }
    }
    default:
      throw new Error();
  }
}

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
