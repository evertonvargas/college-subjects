import { GetServerSideProps } from "next";

import { FolderDrive } from "../components/FolderDrive";
import { supabase } from "../services/supabase";
import { Header } from "../components/Header";

import styles from "./../styles/drive.module.scss";

interface Subject {
  initials: string;
}

interface HomeProps {
  subjects: Subject[];
}

const Drive = ({ subjects }: HomeProps) => {
  console.log(subjects);

  return (
    <>
      <Header />
      <div className={styles.container}>
        {subjects.map((subject,index) => <FolderDrive key={index} name={subject.initials} />)}
      </div>
    </>
  );
};

export default Drive;

export const getServerSideProps: GetServerSideProps = async () => {
  let { data: subjects } = await supabase.from("Subjects").select("initials, driveLink").neq("driveLink", null);

  return {
    props: {
      subjects,
    },
  };
};
