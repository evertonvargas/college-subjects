import Link from "next/link";

import styles from "../styles/components/header.module.scss";
import { ButtonLogin } from "./ButtonLogin";

export const Header = () => {
  return (
    <header className={styles.container}>
      <div>
        <nav>
          <Link href="/">
            <a>Tarefas</a>
          </Link>
          <Link href="/drive">
            <a>Arquivos</a>
          </Link>
        </nav>
        <ButtonLogin />
      </div>
    </header>
  );
};
