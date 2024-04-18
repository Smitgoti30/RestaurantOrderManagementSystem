import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getMenu, deleteMenuItem } from "../../../api";

const DeleteItemModal = ({ item, show, handleClose }) => {
  const handleSubmit = async () => {
      const data = await deleteMenuItem(item);
      handleClose();
      window.location.reload()
    };
    

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation for Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to Delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteItemModal;