import Image from "next/image";
import { Container } from "../../components/Container";
import { LinkedPizzas } from "../../components/LinkedPizzas";
import { PizzaSize } from "../../components/PizzaSize";
import styles from "./details.module.scss";

const PizzaDetails = ({ pizza }) => {
  return (
    <Container>
      <div className={styles.container__wrapper}>
        <div className={styles.pizza__title}>
          <h1>{pizza.name}</h1>
          <Image src={pizza.image} width={320} height={320} />
          <p className={styles.ingredients}>
            <b>Ingredientes:</b> <p>{pizza.ingredients}</p>
          </p>
        </div>

        <PizzaSize pizza={pizza} />
      </div>
      <LinkedPizzas pizza={pizza} />
    </Container>
  );
};

export default PizzaDetails;

export async function getStaticPaths() {
  const res = await fetch(
    "http://my-json-server.typicode.com/luancma/json-server/flavors"
  );
  const flavors = await res.json();
  const paths = flavors.map((flavor) => ({
    params: { slug: flavor.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://my-json-server.typicode.com/luancma/json-server/flavors`
  );
  const pizzaJSON = await res.json();
  const pizza = pizzaJSON.filter((pizza) => pizza.slug === params.slug)[0];
  return { props: { pizza } };
}
