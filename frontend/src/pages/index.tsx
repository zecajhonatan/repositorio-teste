import Head from "next/head";
import style from "../../style/home.module.scss";
import Image from "next/image";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { useContext, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { canSSRGuest } from "../utils/canSSRGuest";

import logoImage from "../../public/logo.svg";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  let { signIn, user } = useContext(AuthContext);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    if (email === "" || password === "") {
      toast.error("Preencha os campos!");
      return;
    }
    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

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
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu E-Mail"
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
              Acessar
            </Button>
          </form>

          <Link className={style.text} href="/signup">
            Não possui uma conta? cadastre-se!
          </Link>
        </div>
      </div>
    </>
  );
}

// controla o acesso dos usuarios não logados na aplicação
export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
