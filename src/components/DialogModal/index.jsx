import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "./modal.module.scss";
export const DialogModal = ({ isOpen, closeModal, pizzaDetails }) => {
  const router = useRouter();
  const confimOrder = () => {
    router.push("/");
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div>
        <p className={styles.title}>Resumo: </p>
        <p>Sabor: {pizzaDetails.pizza.pizza.name}</p>
        <p>Tamanho: {pizzaDetails.size.name}</p>
        <p>Borda: {pizzaDetails.border.name}</p>
        <p>Total: {pizzaDetails.total}</p>
      </div>
      <div className={styles.button_wrap}>
        <button className={styles.button} onClick={closeModal}>
          Cancelar
        </button>
        <button className={styles.button} onClick={confimOrder}>
          Confirmar
        </button>
      </div>
    </Modal>
  );
};
