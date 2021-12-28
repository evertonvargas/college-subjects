import { createContext, useContext, ReactNode, useState } from "react";

import { supabase } from "../services/supabase";
import { SessionType } from "../types/types";

interface SessionProviderProps {
  children: ReactNode;
}

interface SessionContextData{
  session: SessionType | null;
  setSessionData: (session: any) => void;
}

const SessionContext = createContext<SessionContextData>({} as 
SessionContextData);

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<any>(supabase.auth.session());

  function setSessionData(session: any) {
    setSession(session);
  }

  return (
    <SessionContext.Provider value={{ session, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(){
  return useContext(SessionContext);
}