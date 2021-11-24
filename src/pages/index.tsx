import { GetServerSideProps } from "next";
import { supabase } from "../services/supabase";
import {Subject, Activitie} from "../types/types"

import { Accordion } from "../components/Accordion";
import { Header } from "../components/Header";
import { useActivities } from "../hooks/useActivities";

import styles from "./../styles/home.module.scss"
import { useEffect, useState } from "react";

interface HomeProps {
  subjectsSSR: Subject[];
  activitiesSSR: Activitie[];
}

const Home = ({subjectsSSR, activitiesSSR}:HomeProps) => {

  const { activitiesData, subjects, setActivitiesData, setSubjects} = useActivities();
  const [activities, setActivities] = useState(activitiesData);

  function getActivitiesFromSubject(id: string){
    return activities.filter(activity => activity.subject_id === id);
  }

  useEffect(() => {
    setActivitiesData(activitiesSSR);
    setSubjects(subjectsSSR);
  },[])

  useEffect(() => {
    setActivities(activitiesData);
  }, [activitiesData]);

  return (
    <>
    <Header />
    <div className={styles.container}>
      {/* <ToggleCheckbox /> */}
      
      {subjects.map((subject, index) => {
        getActivitiesFromSubject(subject.id);
        return (<Accordion key={index} title={subject.name} activities={getActivitiesFromSubject(subject.id)} page={true} />)
      }
      )}
      <footer>
        <p>Development by</p>
        <p>Éverton Vargas &amp; Luca Rampinelli</p>
      </footer>
    </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let { data: subjectsSSR } = await supabase.from('Subjects').select('name, id')
  let { data: activitiesSSR, error } = await supabase.from('Activities').select('deadLine, link, subject_id, description')
  
  return {
    props: {
      subjectsSSR,
      activitiesSSR
    },
  };
}


