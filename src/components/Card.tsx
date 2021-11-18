const {format} = require('date-fns');

import styles from './../styles/components/card.module.scss'

interface CardProps {
  deadLine: string;
  link: string;
  description: string;
}

export const Card = ({deadLine, link, description}:CardProps) => {
  console.log("Description", description)

  return(
    <div className={styles.card}>
      <div>Data de entrega: <span>{format(new Date(deadLine),'dd/MM/yyyy')} <img src="calendar.svg" alt="calendar" /></span> </div>
      <p>{description}</p>
      <a href={link}>Link Arquivo</a>
    </div>
  )
}