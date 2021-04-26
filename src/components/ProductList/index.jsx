import Image from "next/image";
import { Container } from "../Container";
import styles from "./productList.module.scss";
import { useRouter } from "next/router";

export const ProductList = ({ pizzas }) => {
  const flavors = pizzas.flavors;

  const router = useRouter();

  const handleSelectPizza = (pizza) => {
    return router.push(`/detalhes/${pizza.slug}`);
  };

  return (
    <Container>
      <span className={styles.title}>Cardápio de Pizzas</span>
      <div className={styles.content}>
        {flavors?.map((flavor) => (
          <div className={styles.product__item}>
            <Image
              unoptimized={false}
              src={flavor.image}
              width={200}
              height={200}
              alt={`${flavor.image} saabor`}
            />
            <p
              onClick={() => handleSelectPizza(flavor)}
              style={{
                fontWeight: 600,
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              {flavor.name}
            </p>
            <span>Ingredientes: </span>
            <p style={{ display: "inline-block" }}>{flavor.ingredients},</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
