import React from 'react';
import Modal from 'react-bootstrap/Modal'; 
import {getAllCategory,  addCategory } from "../../../api";


const AddCategoryModal = ({ show, handleClose, setCategory }) => {
    const handleSubmitCategory = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const postData = {
          category_name: formData.get("CategoryName"),
          description: formData.get("Description"),
        };
        const data = await addCategory(postData);
        handleClose()
        const updatedData = await getAllCategory();
        setCategory(updatedData);
      };

  return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmitCategory}>
                <div className="mb-2">
                  <label htmlFor="CategoryName">Category Name:</label>
                  <input
                    type="text"
                    name="CategoryName"
                    id="CategoryName"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="categoryDescription">Description:</label>
                  <textarea
                    name="Description"
                    id="categoryDescription"
                    rows="2"
                    cols="26"
                    required
                  ></textarea>
                </div>
                <hr/>
                <input
                  className="btn-red p-2"  
                  type="submit"
                  value="ADD CATEGORY"
                />
              </form>
            </Modal.Body>
          </Modal>
  )
}

export default AddCategoryModal