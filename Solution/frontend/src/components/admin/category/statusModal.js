import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getAllCategory, updateCategory } from "../../../api";

const StatusModal = ({ id, status, show, handleClose, setCategory }) => {
  const handleSubmit = async () => {
    const postData = {
      status: status,
    };
    const data = await updateCategory(id, postData);
    handleClose();
    const updatedData = await getAllCategory();
    setCategory(updatedData);
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
