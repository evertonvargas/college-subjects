import { format } from 'date-fns';
import { Activitie } from "../types/types";

import styles from "./../styles/components/card.module.scss";

interface CardProps extends Omit<Activitie, "subject_id"> {
  page: boolean;
}

export const Card = ({ deadLine, link, description, page }: CardProps) => {
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
            <button type="button" className="icon">
              <img src="pen.svg" alt="lixeira" />
            </button>

            <button type="button" className="icon">
              <img src="garbage.svg" alt="lixeira" />
            </button>
          </div>
        </div>
      )}
      <p>{description}</p>
      <a href={link}>Link Arquivo</a>
    </div>
  );
};
