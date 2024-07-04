import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import { useState } from "react";
import style from "./style.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";

import Modal from "react-modal";

type OrdersProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: OrdersProps[];
}

export default function Dashboard({ orders }: HomeProps) {
  let [orderList, setOrderList] = useState(orders || []);
  let [modalItem, setModalItem] = useState();

  function handleOpenModalVew(id: string) {
    alert("Open Modal " + id);
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
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={style.listOrders}>
            {orders.map((itens) => {
              return (
                <section
                  key={itens.id}
                  className={style.orderItem}
                  onClick={() => handleOpenModalVew(itens.id)}
                >
                  <button>
                    <div className={style.tag}></div>
                    <span>Mesa {itens.table}</span>
                  </button>
                </section>
              );
            })}
          </article>
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
