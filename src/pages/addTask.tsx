import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Accordion } from "../components/Accordion";
import styles from "../styles/addTask.module.scss";
import { Header } from "../components/Header";
import { useSession } from "../hooks/useSession";
import { FiPlusSquare } from "react-icons/fi";
import { ModalAddTask } from "../components/ModalAddTask";
import { useActivities } from "../hooks/useActivities";

import { GetServerSideProps } from "next";
import { supabase } from "../services/supabase";
import {Subject, Activitie} from "../types/types"

interface ProtectedSSRouteProps {
  subjectsSSR: Subject[];
  activitiesSSR: Activitie[];
}

const ProtectedSSRoute = ({ subjectsSSR, activitiesSSR }: ProtectedSSRouteProps) => {
  const router = useRouter();
  const { setSubjects, setActivitiesData, activitiesData, subjects} = useActivities();
  const [activities, setActivities] = useState(activitiesData);
  const { session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  useEffect(() => {
    setActivitiesData(activitiesSSR);
    setSubjects(subjectsSSR);

    if (!session) {
      router.push({
        pathname: "/login",
      });
    }
  }, []);

  useEffect(() => {
    setActivities(activitiesData);
  }, [activitiesData]);

  function getActivitiesFromSubject(id: string) {
    return activities.filter((activity) => activity.subject_id === id);
  }

  return (
    <div>
      <Head>
        <title>Add Task</title>
      </Head>
      {session && (
        <>
          <Header />
          <div className={styles.container}>
            <div className={styles.newTask}>
              <button type="button" onClick={toggleModal}>
                <div className={styles.text}>Nova tarefa</div>
                <div className={styles.icon}>
                  <FiPlusSquare size={24} />
                </div>
              </button>
            </div>
            {subjects.map((subject, index) => {
              getActivitiesFromSubject(subject.id);
              return (
                <Accordion
                  key={index}
                  title={subject.name}
                  activities={getActivitiesFromSubject(subject.id)}
                  page={false}
                />
              );
            })}

            <ModalAddTask modalOpen={modalOpen} setModalOpen={toggleModal} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProtectedSSRoute;

export const getServerSideProps: GetServerSideProps = async () => {
  let { data: subjectsSSR } = await supabase.from("Subjects").select("name, id");
  let { data: activitiesSSR } = await supabase
    .from("Activities")
    .select("deadLine, link, subject_id, description, id");

  return {
    props: {
      subjectsSSR,
      activitiesSSR,
    },
  };
};