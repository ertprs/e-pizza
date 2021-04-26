import { useContext, useEffect } from "react";
import { Container } from "../components/Container";
import { ProductList } from "../components/ProductList";
import { PizzaStoreContext } from "../context/PizzaContext";
import { StepContext } from "../context/stepContext";

export default function Home({ data }) {
  const teste = useContext(PizzaStoreContext);
  const step = useContext(StepContext);

  useEffect(() => {
    step.resetSteps();
  }, []);

  if (!data) {
    return <p>Carregando...</p>;
  }

  teste.pizzasStore.setPizzaStoreAction(data);

  return (
    <Container>
      <ProductList pizzas={data} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "http://my-json-server.typicode.com/luancma/json-server/db"
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
