import Image from "next/image";
import Link from "next/link";
import styles from "./pizzaCard.module.scss";

export function PizzaCard({ pizza }) {
  return (
    <Link href={pizza.slug}>
      <div className={styles.card}>
        <p styles={styles.text}>{pizza.name}</p>
        <Image src={pizza.image} width={200} height={200} />
      </div>
    </Link>
  );
}
