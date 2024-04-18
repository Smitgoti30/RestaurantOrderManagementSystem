import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getAllCategory, addMenu, getMenu } from "../../../api";
import Loading from "../../Loading";

const AddItemModal = ({ show, handleClose, setMenu }) => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategory();
      setCategory(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const category_name = formData.get("Category")
    const Image_name = formData.get("ItemName");
    const postData = 
        {
          name: formData.get("ItemName"),
          description: formData.get("Description"),
          price: parseFloat(formData.get("Price")),
          image: `${Image_name}.jpeg`,
          category_name:`${category_name}`,
        };
    const data = await addMenu(postData);
    handleClose();
    window.location.reload()
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <div className="menu-item">
            <div className="contactform">
              <div className="left">
                <div className="input-fields">
                  <label className="text-red text-decoration-underline" htmlFor="Category">Category:</label>
                  {loading ? (
                    <Loading />
                  ) : (
                    <select className="ms-4 px-2" name="Category" id="itemCategory" required>
                      {category
                      
                      .filter(category => category.status)
                      .map((category, index) => (
                        <option key={index} value={category.category_name}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <br/>
                <div className="input-fields">
                  <label className="text-red text-decoration-underline" htmlFor="ItemName">Item Name:</label>
                  <input type="text" name="ItemName" id="ItemName" required />
                </div>
                <br/>
                <div className="input-fields">
                  <label className="text-red text-decoration-underline" htmlFor="Price">Price:</label>
                  <br/>
                  <input type="number" name="Price" id="Price" required />
                </div>
              </div>
              <br/>
              <div className="right">
                <div className="input-fields">
                  <label className="text-red text-decoration-underline" htmlFor="itemDescription">Description:</label>
                  <input
                    name="Description"
                    id="itemDescription"
                    type="text"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-end">
          <input className="btn btn-red" type="submit" value="ADD TO MENU" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
