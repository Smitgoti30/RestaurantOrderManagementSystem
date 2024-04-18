import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateCategoryStatus } from "../../../api";

const StatusModal = ({ id, status, show, handleClose }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCategoryStatus(id, status);
    handleClose();
    window.location.reload("/admin/category");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to change the status?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusModal;
