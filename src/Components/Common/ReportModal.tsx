import { init } from 'i18next';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {showReportModalSVG } from 'Components/SVG/index';


interface IProps {
    showModal: boolean;
    initSVG: React.ReactNode;
    isConfirm: boolean;
    bodyText: string;
    title: string;
}


export const ReportModal = ({ showModal, initSVG, isConfirm, bodyText, title }: IProps) => {
    const [show, setShow] = useState(showModal);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow} title={title}>
          {initSVG}
        </Button>
  
        <Modal show={show} onHide={handleClose} size='xl'>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body dangerouslySetInnerHTML={{ __html: bodyText }}></Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}