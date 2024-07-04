import style from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import { useState, FormEvent } from "react";

import { api } from "../../services/apiClient";
import { toast } from "react-toastify";

export default function Category() {
  let [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      toast.warning("Preecha o campo!");
      return;
    }

    await api.post("/category", {
      name: name,
    });

    toast.success("Categoria cadastrada!");
    setName("");
  }

  return (
    <>
      <Head>
        <title>Nova Categoria</title>
      </Head>

      <Header />

      <main className={style.container}>
        <h1>Cadastrar Categorias</h1>

        <form className={style.form} onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            className={style.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className={style.buttonAdd} type="submit">
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}

// faz com que somente usuarios logados tenha acesso a pagina
export const getServerSideProps = canSSRAuth(async (constext) => {
  return {
    props: {},
  };
});
