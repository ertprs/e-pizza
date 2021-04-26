import { useEffect, useState } from "react";

const useStep = () => {
  const [currentStep, setStep] = useState(1);

  const increment = () => {
    if (currentStep < 2) {
      setStep(currentStep + 1);
    }
  };
  const decrement = () => {
    if (currentStep !== 1) {
      setStep(currentStep - 1);
    }
  };

  const resetSteps = () => setStep(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentItem = JSON.parse(localStorage.getItem("step"));
      if (currentItem > currentStep) setStep(currentItem);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      return localStorage.setItem("step", JSON.stringify(currentStep));
    }
  }, [currentStep]);

  return { currentStep, increment, decrement, resetSteps };
};

export { useStep };
