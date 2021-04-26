import Image from "next/image";
import { Container } from "../Container";
import styles from "./productList.module.scss";
import { useRouter } from "next/router";

export const ProductList = ({ pizzas }) => {
  const flavors = pizzas.flavors;
  const daily = pizzas.daily;

  const router = useRouter();

  const handleSelectPizza = (pizza) => {
    return router.push(`/detalhes/${pizza.slug}`);
  };

  return (
    <Container>
      <span className={styles.title}>Cardápio de Pizzas</span>
      <div className={styles.wrapper}>
        <p className={styles.title}>Ofertas diárias com desconto</p>
        <div className={styles.content}>
          {daily.map((item) => (
            <div
              key={flavors[item]}
              className={styles.product__item}
              onClick={() => handleSelectPizza(flavors[item])}
            >
              <Image
                unoptimized={false}
                src={flavors[item].image}
                width={200}
                height={200}
                alt={`${flavors[item].image} sabor`}
              />
              <p className={styles.product__title}>{flavors[item].name}</p>
              <span>Ingredientes: </span>
              <p style={{ display: "inline-block" }}>
                {flavors[item].ingredients},
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.wrapper}>
        <div>
          <p className={styles.title}>Catálogo</p>
        </div>
        <div className={styles.content}>
          {flavors?.map((flavor) => (
            <div
              key={flavor.id}
              className={styles.product__item}
              onClick={() => handleSelectPizza(flavor)}
            >
              <Image
                unoptimized={false}
                src={flavor.image}
                width={200}
                height={200}
                alt={`${flavor.image} sabor`}
              />
              <p className={styles.product__title}>{flavor.name}</p>
              <span>Ingredientes: </span>
              <p style={{ display: "inline-block" }}>{flavor.ingredients},</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
