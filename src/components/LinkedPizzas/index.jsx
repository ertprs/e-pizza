import { useEffect, useState } from "react";
import { PizzaCard } from "../PizzaCard";
import styles from "./linked.module.scss";
export const LinkedPizzas = ({ pizza }) => {
  const [flavors, setFlavours] = useState([]);
  useEffect(() => {
    fetch(`http://my-json-server.typicode.com/luancma/json-server/flavors`)
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
            <PizzaCard pizza={flavors[flavorId]} />
          ))}
      </div>
    </div>
  );
};
