// CONTROLE DE ROTAS
// função para paginas que podem ser acessadas por visitantes
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { parseCookies } from "nookies";

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    // se o cara tentar acessar a pagina tendo um login, nos o redirecionamentos para o painel
    let cookies = parseCookies(context);
    let { "@nextauth.token": token } = cookies;
    if (/* cookies["@nextauth.token"] */ token) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await fn(context);
  };
}
