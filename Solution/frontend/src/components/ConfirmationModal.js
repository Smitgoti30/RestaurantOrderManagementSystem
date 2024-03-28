import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmationModal({ isOpen, message, onClose, onConfirm }) {
  return (
    <Modal show={isOpen} onHide={onClose} className="centered-modal">
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
