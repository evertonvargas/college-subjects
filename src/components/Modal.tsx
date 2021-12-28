import ReactModal from 'react-modal';
import { ReactNode } from 'react';

import styles from "../styles/components/modal.module.scss"

interface ModalProps{
  children: ReactNode;
  setIsOpen(): void;
  isOpen: boolean;
}
export const Modal = ({ children, setIsOpen, isOpen}: ModalProps) => {

  return(
    <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={isOpen}
        className={styles.modal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
  );
}
