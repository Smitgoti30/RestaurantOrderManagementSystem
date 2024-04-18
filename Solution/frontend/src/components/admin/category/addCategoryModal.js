import React from 'react';
import Modal from 'react-bootstrap/Modal'; 
import {getAllCategory,  addCategory } from "../../../api";
import { useNavigate } from 'react-router-dom';


const AddCategoryModal = ({ show, handleClose, setCategory }) => {
  const navigate = useNavigate();

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
        // navigate('/admin/category');
        window.location.reload()
        const updatedData = await getAllCategory();
        setCategory(updatedData);
      };

  return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
              <form onSubmit={handleSubmitCategory}>
                <div className="mb-2">
                  <label htmlFor="CategoryName" className='text-decoration-underline text-red'>Category Name:</label>
                  <input
                    type="text"
                    name="CategoryName"
                    id="CategoryName"
                    className='col-6'
                    required
                  />
                </div>
                <br/>
                <div className="mb-2">
                  <label htmlFor="categoryDescription" className='text-decoration-underline text-red'>Description:</label>
                  <input
                    name="Description"
                    id="categoryDescription"
                    type='text'
                    required
                  />
                </div>
                <hr/>
                <div className='text-end'>
                <input
                  className="btn-red p-2"  
                  type="submit"
                  value="ADD CATEGORY"
                />
                </div>
              </form>
            </Modal.Body>
          </Modal>
  )
}

export default AddCategoryModal

// [9:09 am, 05/04/2024] Smit????: for staff - staff@roms.com/Staff@123
// for admin - info@roms.com/Admin@123
// [9:09 am, 05/04/2024] Smit????: Smit@gmail.com
// Smit@1234