import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../services/supabase";

const ProtectedSSRoute = () => {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    router.push({
      pathname: "/login",
    });
  }

  useEffect(() => {
    const sessionStorage = localStorage.getItem("supabase.auth.token");
    const session = supabase.auth.session()

    if (sessionStorage !== null) {
      const { currentSession } = JSON.parse(sessionStorage);

      if (!(currentSession.user.id === session?.user?.id)) {
        router.push({
          pathname: "/login",
        });
      }
    }
  }, [router]);

  return (
    <div>
      <span>You are authenticated as: teste</span>
      <button onClick={signOut}>Sair</button>
    </div>
  );
};

export default ProtectedSSRoute;
