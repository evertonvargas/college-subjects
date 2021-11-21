import Link from "next/link";

import styles from "../styles/components/header.module.scss";

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
        <Link href="/login">
          <a className={styles.login}>
            <div className={styles.mainDiv}>
              <div></div>
              <button> Login </button>
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
};
