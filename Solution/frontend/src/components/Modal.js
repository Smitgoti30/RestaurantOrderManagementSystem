import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomModal = ({ show, handleClose, data }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const totalPrice = data.price * quantity;

  const addToCart = () => {
    debugger;
    const cartItem = {
      id: data._id,
      name: data.name,
      price: data.price,
      image:data.image,
      quantity: quantity,
      totalPrice: totalPrice
    };
    const existingCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    existingCartItems.push(cartItem);
    sessionStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    handleClose();
      toast.success("Added to Cart!");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{data.description}</p>
        <img src={require(`../assets/images/${data.image}`)} alt="img" />
      </Modal.Body>
      <Modal.Footer>
        <div className="item-container">
          <div className="btn-qty">
            <button className="btn" onClick={handleDecrement}>
              <span>-</span>
            </button>
            <div className="bg-red p-2 text-white">{quantity}</div>
            <button className="btn" onClick={handleIncrement}>
              <span>+</span>
            </button>
          </div>
          <div>
            <button className="btn btn-outline-danger">
              Total Price - ${totalPrice}
            </button>
          </div>
        <div>
          <Button className="btn-red" onClick={() => addToCart(data)}>Add to cart</Button>
        </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
