import { GetServerSideProps } from "next";
import { supabase } from "../services/supabase";

import styles from "./../styles/home.module.scss"

import { Accordion } from "../components/Accordion";
import { ToggleCheckbox } from "../components/ToggleCheckbox";
import { Header } from "../components/Header";

interface Subject{
  name: string;
  id: string;
}

interface Activitie{
    deadLine: string;
    link: string;
    subject_id: string;
    description: string;
}

interface HomeProps {
  subjects: Subject[];
  activities: Activitie[];
}

const Home = ({subjects, activities}:HomeProps) => {

  function getActivitiesFromSubject(id: string){
    return activities.filter(activity => activity.subject_id === id);
  }

  return (
    <>
    <Header />
    <div className={styles.container}>
      {/* <ToggleCheckbox /> */}
      
      {subjects.map((subject, index) => {
        getActivitiesFromSubject(subject.id);
        return (<Accordion key={index} title={subject.name} activities={getActivitiesFromSubject(subject.id)}/>)
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



