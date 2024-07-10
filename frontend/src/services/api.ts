import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  let { "@nextauth.token": token } = cookies;

  let api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${/* cookies["@nextauth.token"] */ token}`,
    },
  });

  // middleware
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // qualquer erro 401 (não autorizado) devemos deslogar o usuario
        if (typeof window !== undefined) {
          // chama a função para deslogar o usuario
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.resolve(error);
    }
  );
  return api;
}
