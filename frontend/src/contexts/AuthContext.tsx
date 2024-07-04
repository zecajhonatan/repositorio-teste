import { ReactNode, createContext, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContentData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export let AuthContext = createContext({} as AuthContentData); // criar contexto

// função responsavel por deslogar o usuario
export function signOut() {
  try {
    if (confirm("Deseja Sair")) {
      destroyCookie(undefined, "@nextauth.token");
      Router.push("/");
    }
  } catch (error) {
    console.log("Error ao deslogar!");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  let [user, setUser] = useState<UserProps>();
  let isAuthenticated = !!user;

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          let { id, name, email } = response.data;
          setUser({ id, name, email });
        })
        .catch(() => {
          // se dou erro delogamos o usuario
          signOut();
        });
    }
  }, []);

  // função responsavel pelo login
  async function signIn({ email, password }: SignInProps) {
    // endereço de login
    try {
      let response = await api.post("/session", {
        email,
        password,
      });
      let { id, name, token } = response.data;
      // adicionando o cookie
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 60 * 30, // tempo para expirar vai expirar em 1 mês
        path: "/", // quais caminhos teram acesso as cookie
      });

      setUser({ id, name, email });
      // passar para as proximas requisições o token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // redirecionar para a pagina deshboard
      Router.push("/dashboard");
      toast.success("Você esta logado!", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Error ao logar! verifique seu dados e tente novamente!");
      console.log("ERROR AO ACESSAR", error);
    }
  }

  // função responsavel pelo cadastro do usuario
  async function signUp({ name, email, password }: SignUpProps) {
    try {
      let response = await api.post("/users", {
        name,
        email,
        password,
      });
      toast.success("Cadastro feito com sucesso!!!");
      Router.push("/");
    } catch (error) {
      toast.error("Erro ao cadastrar!");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
