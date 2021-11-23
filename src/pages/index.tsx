import { GetServerSideProps } from "next";
import { supabase } from "../services/supabase";

import { Accordion } from "../components/Accordion";
import { Header } from "../components/Header";
import {Subject, Activitie} from "../types/types"
import { useActivities } from "../hooks/useActivities";

import styles from "./../styles/home.module.scss"
import { useEffect } from "react";

interface HomeProps {
  subjects: Subject[];
  activities: Activitie[];
}

const Home = ({subjects, activities}:HomeProps) => {
  const { setSubjects, setActivities} = useActivities();

  function getActivitiesFromSubject(id: string){
    return activities.filter(activity => activity.subject_id === id);
  }

  useEffect (() => {
    setSubjects(subjects);
    setActivities(activities);
  } , []);

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
  let { data: subjects } = await supabase.from('Subjects').select('name, id')
  let { data: activities, error } = await supabase.from('Activities').select('deadLine, link, subject_id, description')
  
  return {
    props: {
      subjects,
      activities
    },
  };
}



