import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { supabase } from "../services/supabase";
import { Activitie, Subject } from "../types/types";

interface ActivitieProviderProps {
  children: ReactNode;
}

interface FormData {
  date: string;
  textArea: string;
  link: string;
  subject: string;
}

interface ActivitiesContextData {
  activitiesData: Activitie[];
  subjects: Subject[];
  registerTask: ({ date, textArea, link }: FormData) => void;
  setSubjects: (subjects: Subject[]) => void;
  setActivitiesData: (activities: Activitie[]) => void;
}

const ActivitiesContext = createContext<ActivitiesContextData>(
  {} as ActivitiesContextData
);

export function ActivitiesProvider({ children }: ActivitieProviderProps) {
  const [activitiesData, setActivitiesData] = useState<Activitie[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const registerTask = async ({ date, textArea, link, subject }: FormData) => {
    console.log("aqui");
    console.log(date, link, textArea, subject);
    const { data, error } = await supabase.from("Activities").insert([
      {
        deadLine: date,
        link: link,
        description: textArea,
        subject_id: subject,
      },
    ]);

    if (data) {
      setActivitiesData((oldvalue) => [
        ...oldvalue,
        {
          deadLine: data[0].deadLine,
          description: data[0].description,
          id: data[0].id,
          link: data[0].link,
          subject_id: data[0].subject_id,
        },
      ]);
    }
  };

  return (
    <ActivitiesContext.Provider
      value={{
        activitiesData,
        setActivitiesData,
        subjects,
        setSubjects,
        registerTask,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivitiesContext);
}
