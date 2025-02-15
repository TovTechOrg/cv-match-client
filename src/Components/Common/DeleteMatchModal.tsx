import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    showModal: boolean;
    bodyText: string;
    matchId: string;
    confirmHandler: (response: string) => void;
}

export const DeleteMatchModal = ({ showModal, bodyText, matchId, confirmHandler }: IProps) => {
    const [show, setShow] = useState(showModal);

    const handleClose = (response: boolean) => {
      setShow(false);
      console.log(response);

      // execute confirmHandler
      if (response)
        confirmHandler(matchId);
    }
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Delete
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
              Yes, delete it
            </Button>
            <Button variant="primary" onClick={() => handleClose(false)}>
              No, keep it
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}