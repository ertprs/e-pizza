import { useContext, useEffect, useState } from "react";
import { PizzaStoreContext } from "../../context/PizzaContext";
import { PizzaDetailsContext } from "../../context/PizzaDetailsContext";
import { StepContext } from "../../context/stepContext";
import styles from "./pizzaSize.module.scss";
import { convertPrice } from "../../utils/convertPrice";
import { urls } from "../../utils/urls";
import { DialogModal } from "../DialogModal";

export const PizzaSize = ({ pizza }) => {
  const step = useContext(StepContext);
  const pizzaDetailsContext = useContext(PizzaDetailsContext);
  const pizzaContext = useContext(PizzaStoreContext);
  const pizzasStore = pizzaContext.pizzasStore.store;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stateLocal, setStateLocal] = useState({
    currentStep: 1,
    sizes: [],
    borders: [],
    daily: [],
    isDaily: false,
  });
  const [pizzaOrder, setPizzaOrder] = useState({
    total: 0,
    border: {},
    size: {},
  });

  useEffect(() => {
    if (!pizzasStore?.pizzasDetails) {
      return fetch(urls.all)
        .then((response) => response.json())
        .then((json) =>
          setStateLocal({
            ...stateLocal,
            sizes: json.sizes,
            borders: json.borders,
            daily: json.daily,
          })
        );
    } else {
      setStateLocal({
        ...stateLocal,
        sizes: pizzasStore.pizzasDetails.sizes,
        borders: pizzasStore.pizzasDetails.borders,
        daily: pizzasStore.pizzasDetails.daily,
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

  const finishValidation = () =>
    pizzaDetailsContext.pizzaDetails.size.price &&
    pizzaDetailsContext.pizzaDetails.border.price &&
    step.currentStep === 2;

  const handleDecrement = () => step.decrement();
  const handleIncrement = () => {
    if (finishValidation()) {
      handleOpenModal();
    }
    step.increment();
  };

  const isDaily = () => {
    const founded = stateLocal.daily.filter((item) => item === pizza.id);
    if (founded.length) {
      return true;
    }
  };

  const checkIsDaily = () => {
    if (isDaily()) {
      const dailyPromotion = pizza.price - pizza.price * 0.2;
      return dailyPromotion;
    }
    return pizza.price;
  };

  const getTotal = () => {
    const total =
      pizzaDetailsContext.pizzaDetails.size.price +
      pizzaDetailsContext.pizzaDetails.border.price +
      checkIsDaily();

    if (!isNaN(total)) {
      return convertPrice(total);
    }
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <DialogModal
        isOpen={modalIsOpen}
        closeModal={handleCloseModal}
        pizzaDetails={{
          total: getTotal(),
          border: {
            name: pizzaDetailsContext.pizzaDetails.border.name,
            price: pizzaDetailsContext.pizzaDetails.border.price,
          },
          size: {
            name: pizzaDetailsContext.pizzaDetails.size.name,
            price: pizzaDetailsContext.pizzaDetails.size.price,
          },
          pizza: {
            pizza,
          },
        }}
      />
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

        <div className={styles.order__container}>
          {isDaily() && (
            <p className={styles.daily}>
              <b>Seu desconto do dia foi aplicado (20%) </b>
            </p>
          )}
          <p>
            <b>Resumo do seu Pedido</b>
          </p>
          <p>
            Sabor: {pizza.name} - {convertPrice(checkIsDaily(pizza.price))}
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
          {finishValidation() ? "Finalizar" : "Próximo"}
        </button>
      </div>
    </div>
  );
};
