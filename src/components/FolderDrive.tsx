import styles from "../styles/components/folderDrive.module.scss";

interface FolderDriveProps {
  name:string;
}

export const FolderDrive = ({name}:FolderDriveProps) => {
  return (
    <a href="#" className={styles.container}>
      {/* <img src="folder.svg" alt="folderDrive" /> */}
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 0 45 44"
      >
        <path
          fill="#0172cb"
          d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
        />
        <path
          fill="#00b3d7"
          d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
        />
      </svg>
      <h2>{name}</h2>
    </a>
  );
};
