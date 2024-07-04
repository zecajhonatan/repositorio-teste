import styles from "./styles.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <>
      <header className={styles.headerConteiner}>
        <div className={styles.headerContent}>
          <Link href="/dashboard">
            <img src="/logo.svg" width={190} height={90} />
          </Link>
          <nav className={styles.menuNav}>
            <Link href="/category">Categorias</Link>
            <Link href="/product">Cardapio</Link>
            <button onClick={signOut}>
              <FiLogOut size={25} color={"#fff"} />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
