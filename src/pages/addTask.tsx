import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../services/supabase";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Accordion } from "../components/Accordion";
import styles from "../styles/addTask.module.scss";
import { Header } from "../components/Header";
import {Subject, Activitie} from "../types/types"
import { useSession } from "../hooks/useSession";

interface ProtectedSSRouteProps {
  subjects: Subject[];
  activities: Activitie[];
}

const ProtectedSSRoute = ({ subjects, activities }: ProtectedSSRouteProps) => {
  const router = useRouter();
  const { session} = useSession();

  useEffect(() => {
    if (!session) {
      router.push({
        pathname: "/login",
      });
    }
  }, [router, session]);

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
          </div>
        </>
      )}
    </div>
  );
};

export default ProtectedSSRoute;

export const getServerSideProps: GetServerSideProps = async () => {
  let { data: subjects } = await supabase.from("Subjects").select("name, id");
  let { data: activities, error } = await supabase
    .from("Activities")
    .select("deadLine, link, subject_id, description");

  return {
    props: {
      subjects,
      activities,
    },
  };
};
