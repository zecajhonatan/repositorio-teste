import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import { useState } from "react";
import style from "./style.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import { ModalOrder } from "../../components/ModalOrder";

import Modal from "react-modal";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string;
};

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    name: string | null;
  };
};

export default function Dashboard({ orders }: HomeProps) {
  let [orderList, setOrderList] = useState(orders || []);

  let [modalItem, setModalItem] = useState<OrderItemProps[]>();
  let [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {
    let apiClient = setupAPIClient();
    let response = await apiClient("/order/detail", {
      // rota
      params: {
        order_id: id,
      },
    });
    setModalItem(response.data);
    setModalVisible(true);
  }

  async function handleFinishItem(id: string) {
    let apiClient = setupAPIClient();
    await apiClient.put("/order/finish", {
      order_id: id,
    });

    let response = await apiClient.get("/orders");
    setOrderList(response.data);
    setModalVisible(false);
  }

  async function handleRefreshOrders() {
    let apiClient = setupAPIClient();
    let response = await apiClient.get("/orders");
    setOrderList(response.data);
  }

  Modal.setAppElement("#__next");
  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizza</title>
      </Head>
      <div>
        <Header />
        <main className={style.container}>
          <div className={style.containerHeader}>
            <h1>Ultimo Pedido</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
          <article className={style.listOrders}>
            {orderList.length === 0 && (
              <span className={style.emptyList}>
                Nenhum Pedido aberto foi encontrato
              </span>
            )}

            {orderList.map((itens) => {
              return (
                <section
                  key={itens.id}
                  className={style.orderItem}
                  onClick={() => handleOpenModalView(itens.id)}
                >
                  <button>
                    <div className={style.tag}></div>
                    <span>Mesa {itens.table}</span>
                  </button>
                </section>
              );
            })}
          </article>

          {modalVisible && (
            <ModalOrder
              isOpen={modalVisible}
              order={modalItem}
              onRequestClose={handleCloseModal}
              handleFinishOrder={handleFinishItem}
            />
          )}
        </main>
      </div>
    </>
  );
}

// faz a verificação se o usuario tem o token
export const getServerSideProps = canSSRAuth(async (context) => {
  let apiCLient = setupAPIClient(context);
  let response = await apiCLient.get("/orders");
  return {
    props: {
      orders: response.data,
    },
  };
});
