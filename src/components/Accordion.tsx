import { useState } from "react";

import { Activitie } from "../types/types"
import { Card } from "./Card";

import styles from "../styles/components/accordion.module.scss";

interface AccordionProps {
  title: string;
  activities: Activitie[] | null;
  page: boolean;
}

export const Accordion = ({ title, activities, page }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(false);

  return (
      <div className={styles.accordion}>
        <div
          className={styles.title}
          onClick={() => setActiveIndex(!activeIndex)}
        >
          <span>{title}</span>
          {activities?.length===1 ? <span>{activities?.length} atividade</span> :  <span>{activities?.length} atividades</span>}
          <div className={activeIndex?styles.active:styles.desactive}></div>
        </div>
        {activeIndex && <div className={styles.content}>
          {activities?.map((activity, index) => {
            return <Card key={index} id={activity.id} deadLine={activity.deadLine} link={activity.link} description={activity.description} page={page}/> 
          })}
        </div>}
      </div>
  );
};
