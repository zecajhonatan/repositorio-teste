import Modal from "react-modal";
import style from "./style.module.scss";

import { FiX } from "react-icons/fi";

import { OrderItemProps } from "../../pages/dashboard"; // tipagem dos dados

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id: string) => void;
}

export function ModalOrder({
  isOpen,
  order,
  onRequestClose,
  handleFinishOrder,
}: ModalOrderProps) {
  console.log(order);
  let custonStyles = {
    content: {
      top: "50%",
      left: "50%",
      bottom: "auto",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };

  Modal.setAppElement("#__next");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={custonStyles}
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
          style={{
            backgroundColor: "transparent",
            border: 0,
          }}
        >
          <FiX size={30} color="#f34748" />
        </button>

        <div className={style.container}>
          <h2>Detalhes do Pedido</h2>
          <span className={style.table}>
            Mesa: <strong>{order[0].order.table}</strong>
          </span>

          {order.map((item) => (
            <section key={item.id} className={style.containerItem}>
              <span>
                {item.amount} - <strong>{item.product.name}</strong>
              </span>
              <span className={style.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <button
            type="button"
            className={style.buttomOrder}
            onClick={() => {
              handleFinishOrder(order[0].order_id);
            }}
          >
            Concluir Pedido
          </button>
        </div>
      </Modal>
      ;
    </>
  );
}
