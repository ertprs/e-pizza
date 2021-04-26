import { useEffect, useState, useContext } from "react";
import { PizzaStoreContext } from "../../context/PizzaContext";
import { Container } from "../Container";
import { PizzaCard } from "../PizzaCard";

export const LinkedPizzas = ({ pizza }) => {
  const teste = useContext(PizzaStoreContext);
  const [flavors, setFlavours] = useState([]);
  useEffect(() => {
    fetch(`http://my-json-server.typicode.com/luancma/json-server/flavors`)
      .then((response) => response.json())
      .then((json) => setFlavours(json));
  }, [pizza]);

  // <p>{flavors[flavorId].name}</p>

  return (
    <Container>
      <span>
        <b>Pizzas sugeridas: </b>
      </span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {flavors.length &&
          pizza.linked.map((flavorId) => (
            <PizzaCard pizza={flavors[flavorId]} />
          ))}
      </div>
    </Container>
  );
};
