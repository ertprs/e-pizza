const Promocao = () => {
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
