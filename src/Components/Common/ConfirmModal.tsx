import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    showModal: boolean;
    initSVG: React.ReactNode;
    title: string;
    bodyText: string;
    matchId: string;
    idx1: number;
    idx2: number;
    approveAnswerTitle: string;
    declineAnswerTitle: string;
    confirmHandler: (response: string, idx1: number, idx2: number) => void;
}

export const ConfirmModal = ({ showModal, initSVG, title, bodyText, matchId, idx1, idx2, approveAnswerTitle, declineAnswerTitle, confirmHandler }: IProps) => {
    const [show, setShow] = useState(showModal);

    const handleClose = (response: boolean) => {
      setShow(false);
      console.log(response);

      // execute confirmHandler
      if (response)
        confirmHandler(matchId, idx1, idx2);
    }
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow} title={title}>
          {initSVG}
        </Button>
  
        <Modal show={show} onHide={()=>handleClose(false)} size='sm'>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{bodyText}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(true)}>
              {approveAnswerTitle}
            </Button>
            <Button variant="primary" onClick={() => handleClose(false)}>
              {declineAnswerTitle}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}