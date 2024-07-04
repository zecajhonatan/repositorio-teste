// CONTROLE DE ROTAS
// somente usuarios logados podem acessar as rotas
// fução para paginas que só usuarios logados podem ter acesso
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    let cookies = parseCookies(context);
    let token = cookies["@nextauth.token"];
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    try {
      return await fn(context);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(context, "@nextauth.token");
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}
