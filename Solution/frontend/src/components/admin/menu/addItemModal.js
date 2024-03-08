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
    const postData = 
        {
          name: formData.get("ItemName"),
          description: formData.get("Description"),
          price: formData.get("Price"),
          image: "Appetizers1.jpg",
          category_name:category_name,
        };
        console.log(postData);
        // const file = await uploadFile(fileData)
        // console.log(file);
    const data = await addMenu(postData);
    handleClose();
    const datas = await getMenu();
    setMenu(datas)
    console.log(data);
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
                  <label htmlFor="Category">Category:</label>
                  {loading ? (
                    <Loading />
                  ) : (
                    <select name="Category" id="itemCategory" required>
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
                <div className="input-fields">
                  <label htmlFor="ItemName">Item Name:</label>
                  <input type="text" name="ItemName" id="ItemName" required />
                </div>
                <div className="input-fields">
                  <label htmlFor="Price">Price:</label>
                  <input type="number" name="Price" id="Price" required />
                </div>
              </div>
              <div className="right">
                <div className="input-fields">
                  <label htmlFor="itemDescription">Description:</label>
                  <textarea
                    name="Description"
                    id="itemDescription"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <input className="btn btn-red" type="submit" value="ADD TO MENU" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
