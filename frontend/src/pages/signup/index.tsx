import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent, useContext } from "react";
import { toast } from "react-toastify";

import style from "../../../style/home.module.scss";
import { AuthContext } from "../../contexts/AuthContext";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import logoImage from "../../../public/logo.svg";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Signup() {
  let { signUp } = useContext(AuthContext);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.error("Preencha os campos!");
      return;
    }

    let data = {
      name,
      email,
      password,
    };

    setLoading(true);

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza</title>
      </Head>

      <div className={style.containerCenter}>
        <Image src={logoImage} alt="logo" />

        <div className={style.login}>
          <h1>Criando sua Conta!</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Digite seu e-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link className={style.text} href="/">
            Já possui uma conta? Faça login!
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
