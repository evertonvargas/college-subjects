import { useRouter } from "next/router";
import Link from "next/link";

import { useSession } from "../hooks/useSession";
import { supabase } from "../services/supabase";

import styles from "../styles/components/buttonLogin.module.scss";

export const ButtonLogin = () => {
  const router = useRouter();
  const { session, setSessionData } = useSession();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSessionData(supabase.auth.session());

    router.push({
      pathname: "/",
    });
  };

  return (
    <>
      {session ? (
        <span className={styles.login} onClick={handleSignOut}>
          <div className={styles.mainDiv}>
            <div></div>
            <button> Sair</button>
          </div>
        </span>
      ) : (
        <Link href="/login">
          <a className={styles.login}>
            <div className={styles.mainDiv}>
              <div></div>
              <button> Login </button>
            </div>
          </a>
        </Link>
      )}
    </>
  );
};
