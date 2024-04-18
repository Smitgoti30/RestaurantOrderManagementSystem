import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { getAllCategory, updateCategory } from "../../../api";

const UpdateCategoryModal = ({
  id,
  name,
  desc,
  show,
  handleClose,
  setCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      setCategoryName(name);
      setDescription(desc);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }, [name, desc]);

  const handleSubmitCategory = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const postData = {
      category_name: formData.get("CategoryName"),
      description: formData.get("Description"),
    };
    const data = await updateCategory(id, postData);
    handleClose();
    const updatedData = await getAllCategory();
    setCategory(updatedData);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitCategory} method="POST">
          <div className="mb-2">
            <label htmlFor="CategoryName" className="text-red text-decoration-underline">Category Name:</label>
            <input
              type="text"
              name="CategoryName"
              id="CategoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="categoryDescription" className="text-red text-decoration-underline">Description:</label>
            <input
              name="Description"
              id="categoryDescription"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <hr />
          <div className="text-end">
          <input className="btn-red p-2" type="submit" value="UPDATE" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCategoryModal;
