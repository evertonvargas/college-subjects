import ReactModal from 'react-modal';
import { ReactNode } from 'react';

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
        ariaHideApp={false}
        style={{
          content: {
            top: '52%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '600px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
  );
}
