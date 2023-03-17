import { FC, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type ModalWrapperType = {
  title: string;
  handleClose: () => void;
  children: ReactNode;
};

const ModalWrapper: FC<ModalWrapperType> = ({ children, title, handleClose }) => {
  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWrapper;
