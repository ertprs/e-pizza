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

export { initialState, actions, pizzasInformations };
