import { useEffect, useState } from "react";
import { PizzaCard } from "../PizzaCard";
import styles from "./linked.module.scss";
import { urls } from "../../utils/urls";
export const LinkedPizzas = ({ pizza }) => {
  const [flavors, setFlavours] = useState([]);
  useEffect(() => {
    fetch(urls.flavors)
      .then((response) => response.json())
      .then((json) => setFlavours(json));
  }, [pizza]);

  return (
    <div className={styles.container}>
      <p className={styles.container_title}>
        <b>Pizzas sugeridas: </b>
      </p>
      <div className={styles.linked_list_wrapper}>
        {flavors.length &&
          pizza.linked.map((flavorId) => (
            <PizzaCard key={flavorId} pizza={flavors[flavorId]} />
          ))}
      </div>
    </div>
  );
};
