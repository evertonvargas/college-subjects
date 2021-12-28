import { FormEvent, useState } from "react";
import { MdClose } from "react-icons/md";

import { Modal } from "./Modal";
import { useActivities } from "../hooks/useActivities";

import styles from "../styles/components/modalAddTask.module.scss";

interface ModalAddFoodProps {
  modalOpen: boolean;
  setModalOpen(): void;
}

export const ModalAddTask = ({
  modalOpen,
  setModalOpen,
}: ModalAddFoodProps) => {
  const {subjects, registerTask} = useActivities();
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [textArea, setTextArea] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerTask({date, link, textArea, subject});
    setModalOpen();
    setLink("");
    setDate("");
    setTextArea("");
    setSubject("");
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <MdClose onClick={setModalOpen} />
        </div>
        <label>
          Data de entrega: <span>*</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>
          Descrição: <span>*</span>
        </label>
        <textarea
          name="msg"
          id="msg"
          value={textArea}
          required
          onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
        <label>Link do arquivo:</label>
        <input
          type="text"
          name="link"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <label>Materia: <span>*</span></label>
        <select name="subjects" onChange={(e)=> setSubject(e.target.value)}>
          {subjects.map((subject) => <option key={subject.id} value={subject.id} >{subject.name}</option>)}
        </select>
        <button>Cadastrar</button>
      </form>
    </Modal>
  );
};
