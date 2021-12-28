import { format } from 'date-fns';

import { useActivities } from "../hooks/useActivities";
import { supabase } from "../services/supabase";
import { Activitie } from "../types/types";

import styles from "./../styles/components/card.module.scss";

interface CardProps extends Omit<Activitie, "subject_id"> {
  page: boolean;
}

export const Card = ({ deadLine, link, description, page, id }: CardProps) => {
  const { activitiesData, setActivitiesData } = useActivities();

  async function handleDelete(id: string){
    const { data } = await supabase.from('Activities').delete().match({ id })

    const activitieFiltered = activitiesData.filter( activitie => activitie.id !== id)
    setActivitiesData(activitieFiltered);
  }

  return (
    <div className={styles.card}>
      {page ? (
        <>
          <div>
            Data de entrega:{" "}
            <span>
              {format(new Date(deadLine), "dd/MM/yyyy")}{" "}
              <img src="calendar.svg" alt="calendar" />
            </span>{" "}
          </div>
        </>
      ) : (
        <div className={styles.iconContent}>
          <div>
            Data de entrega:
            <span>
              {format(new Date(deadLine), "dd/MM/yyyy")}
              <img src="calendar.svg" alt="calendar" />
            </span>
          </div>
          <div>
            <button type="button" className="icon" onClick={()=>handleDelete(id)}>
              <img src="garbage.svg" alt="lixeira" />
            </button>
          </div>
        </div>
      )}
      <p>{description}</p>
      {link && <a href={link}>Link Arquivo</a>}
    </div>
  );
};
