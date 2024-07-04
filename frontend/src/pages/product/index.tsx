import Head from "next/head";
import { Header } from "../../components/Header"; // componente do cabeçario
import styles from "./style.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import { useState, ChangeEvent, FormEvent } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Router from "next/router";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [imageAvatar, setImageAvatar] = useState(null);
  let [avatarUrl, setAvatarUrl] = useState("");

  let [categories, setCategories] = useState(categoryList || []);
  let [categorySelected, setCategorySelected] = useState(0);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      let data = new FormData();

      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      console.log(data + "Register");

      let apiClient = setupAPIClient();
      await apiClient.post("/product", data);

      setName("");
      setPrice("");
      setDescription("");
      setImageAvatar(null);
      setAvatarUrl("");

      toast.success("Cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao Cadastrar!");
    }
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    // isso e um array de arquivos
    if (!event.target.files) {
      return;
    }
    let image = event.target.files[0];
    if (!image) {
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  }
  // quando você seleciona uma nova categoria na lista
  function handleChangeCategory(event) {
    // posição da categoria selecionada
    setCategorySelected(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizza</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo Produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={35} color={"#fff"} />
              </span>

              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do Produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto!"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Preço do produto!"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Descreva seu produto"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className={styles.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

// diz que somente usuarios logados podem ter acesso a essa rota
export const getServerSideProps = canSSRAuth(async (context) => {
  let apiClient = setupAPIClient(context);
  let response = await apiClient.get("/listCategory");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
