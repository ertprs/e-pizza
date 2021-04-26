import { useContext, useEffect, useState } from "react";
import { PizzaStoreContext } from "../../context/PizzaContext";
import { PizzaDetailsContext } from "../../context/PizzaDetailsContext";
import { StepContext } from "../../context/stepContext";
import styles from "./pizzaSize.module.scss";
import { convertPrice } from "../../utils/convertPrice";

export const PizzaSize = ({ pizza }) => {
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

  const handleDecrement = () => step.decrement();
  const handleIncrement = () => step.increment();

  const getTotal = () => {
    const total =
      pizzaDetailsContext.pizzaDetails.size.price +
      pizzaDetailsContext.pizzaDetails.border.price +
      pizza.price;

    if (!isNaN(total)) {
      return convertPrice(total);
    }
  };

  return (
    <div>
      <div>
        <div className={styles.list}>
          <p className={styles.list__title}>
            Por favor, selecione {setCurrentStep[step.currentStep || 1]} da sua
            Pizza:
          </p>
          {currentStepMap[step.currentStep || 1].map((pizzaInfoDetails) => (
            <label key={pizzaInfoDetails.id}>
              {pizzaInfoDetails.name}
              {step.currentStep === 1 &&
                ` - (${pizzaInfoDetails.splices} fatias)`}
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
          <p>
            <b>Resumo do seu Pedido</b>
          </p>
          <p>
            Sabor: {pizza.name} - {convertPrice(pizza.price)}
          </p>

          {!!pizzaDetailsContext.pizzaDetails?.size && (
            <p>
              Tamanho: {pizzaDetailsContext.pizzaDetails.size.name} -{" "}
              {convertPrice(pizzaDetailsContext.pizzaDetails.size.price)}
            </p>
          )}

          {!!pizzaDetailsContext.pizzaDetails.border && (
            <p>
              Borda {pizzaDetailsContext.pizzaDetails.border.name} -{" "}
              {convertPrice(pizzaDetailsContext.pizzaDetails.border.price)}{" "}
            </p>
          )}

          {getTotal() && <p>Total :{getTotal()}</p>}
        </div>
      </div>
      <div className={styles.button__wrapper}>
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
