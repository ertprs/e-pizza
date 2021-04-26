import { useCallback, useContext, useEffect, useState } from "react";
import { PizzaStoreContext } from "../../context/PizzaContext";
import { PizzaDetailsContext } from "../../context/PizzaDetailsContext";
import { StepContext, StepProvider } from "../../context/stepContext";

export const PizzaSize = () => {
  const step = useContext(StepContext);
  const pizzaDetailsContext = useContext(PizzaDetailsContext);
  const pizzaContext = useContext(PizzaStoreContext);
  const pizzasStore = pizzaContext.pizzasStore.store;
  const [stateLocal, setStateLocal] = useState({
    currentStep: 1,
    sizes: [],
    borders: [],
  });

  useEffect(() => {
    if (!pizzasStore?.pizzasDetails) {
      return fetch("http://my-json-server.typicode.com/luancma/json-server/db")
        .then((response) => response.json())
        .then((json) =>
          setStateLocal({
            ...stateLocal,
            sizes: json.sizes,
            borders: json.borders,
          })
        );
    } else {
      setStateLocal({
        ...stateLocal,
        sizes: pizzasStore.pizzasDetails.sizes,
        borders: pizzasStore.pizzasDetails.borders,
      });
    }
  }, [pizzasStore]);

  const handleChangePizzaDetails = (details) => {
    if (step.currentStep === 1) {
      pizzaDetailsContext.setSize(details);
    }
    if (step.currentStep === 2) {
      pizzaDetailsContext.setBorder(details);
    }
  };

  const setCurrentStep = {
    1: "o tamanho",
    2: "a borda",
  };

  const currentStepMap = {
    1: stateLocal.sizes || [],
    2: stateLocal.borders || [],
  };

  const getCheckedValue = (id) => {
    if (step.currentStep === 1) {
      return pizzaDetailsContext.pizzaDetails.size.id === id;
    }
    if (step.currentStep === 2) {
      return pizzaDetailsContext.pizzaDetails.border.id === id;
    }
  };

  getCheckedValue();

  const handleDecrement = () => step.decrement();
  const handleIncrement = () => step.increment();

  return (
    <div>
      <p>
        Por favor, selecione {setCurrentStep[step.currentStep || 1]} da sua
        Pizza:
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {currentStepMap[step.currentStep || 1].map((pizzaInfoDetails) => (
          <label key={pizzaInfoDetails.id}>
            {pizzaInfoDetails.name}
            <input
              type="radio"
              name="radio"
              value={pizzaInfoDetails.id}
              checked={getCheckedValue(pizzaInfoDetails.id)}
              onChange={() => handleChangePizzaDetails(pizzaInfoDetails)}
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>

      <div>
        <button type="button" onClick={handleDecrement}>
          Voltar
        </button>
        <button type="button" onClick={handleIncrement}>
          Próximo
        </button>
      </div>
    </div>
  );
};
