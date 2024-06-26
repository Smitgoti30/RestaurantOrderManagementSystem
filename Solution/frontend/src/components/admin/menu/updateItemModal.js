import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getMenu, updateMenuItem } from "../../../api";

const UpdateItemModal = ({
  show,
  handleClose,
  item,
  setMenu,
}) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    try {
      if (item) {
        console.log(item);
        setItemName(item.name);
        setDescription(item.description);
        setPrice(item.price);
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  }, [item]);

  const handleSubmitItem = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const itemData = {
      id:item._id,
      name: formData.get("ItemName"),
      description: formData.get("Description"),
      price: parseFloat(formData.get("Price")),
    };
    const data = await updateMenuItem(itemData);
    handleClose();
    const updatedData = await getMenu();
    setMenu(updatedData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Menu Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitItem}>
          <div className="mb-2">
            <label className="text-red text-decoration-underline" htmlFor="ItemName">Item Name:</label>
            <input
              type="text"
              name="ItemName"
              id="ItemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <br/>
          <div className="mb-2">
            <label className="text-red text-decoration-underline" htmlFor="Description">Description:</label>
            <input
              name="Description"
              id="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <br/>
          <div className="mb-2">
            <label className="text-red text-decoration-underline" htmlFor="Price">Price:</label>
            <br/>
            <input
              type="number"
              name="Price"
              id="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <hr />
          <div className="text-end">
          <input className="btn-red p-2" type="submit" value="UPDATE ITEM" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateItemModal;
