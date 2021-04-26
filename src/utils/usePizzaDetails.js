import { useEffect, useState } from "react";

const usePizzaDetails = () => {
  const [pizzaDetails, setPizzaDetails] = useState({
    size: 0,
    border: 0,
  });

  const setBorder = (borderId) => {
    setPizzaDetails({
      ...pizzaDetails,
      border: borderId,
    });
  };
  const setSize = (sizeId) => {
    setPizzaDetails({
      ...pizzaDetails,
      size: sizeId,
    });
  };

  const resetPizzaDetails = () =>
    setPizzaDetails({
      size: 0,
      border: 0,
    });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentItem = JSON.parse(localStorage.getItem("pizzaDetails"));
      if (currentItem?.size > 0)
        setStep({
          ...pizzaDetails,
          size: pizzaDetails.size,
        });
      if (currentItem?.border > 0)
        setStep({
          ...pizzaDetails,
          border: pizzaDetails.border,
        });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pizzaDetails.size || pizzaDetails.border)
        return localStorage.setItem(
          "pizzaDetails",
          JSON.stringify(pizzaDetails)
        );
    }
  }, [pizzaDetails.size, pizzaDetails.border]);

  return { pizzaDetails, setBorder, setSize, resetPizzaDetails };
};

export { usePizzaDetails };
