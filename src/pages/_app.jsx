import React from "react";
import { Header } from "../components/Header";
import "../styles/styles.scss";
import { PizzaStorePrivder } from "../context/PizzaContext";
import { StepProvider } from "../context/stepContext";
import { PizzaDetailsProvider } from "../context/PizzaDetailsContext";

function MyApp({ Component, pageProps }) {
  return (
    <PizzaStorePrivder>
      <PizzaDetailsProvider>
        <StepProvider>
          <Header />
          <Component {...pageProps} />
        </StepProvider>
      </PizzaDetailsProvider>
    </PizzaStorePrivder>
  );
}

export default MyApp;
