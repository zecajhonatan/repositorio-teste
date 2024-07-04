import { AppProps } from "next/app";
import "../../style/Globals.scss";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
      <ToastContainer autoClose={2000}></ToastContainer>
    </AuthProvider>
  );
}
