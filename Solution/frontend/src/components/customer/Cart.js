import React, { useState } from "react";
import "./Cart.module.css";

const Cart = () => {
  // const { cartItems, onRemove, onUpdateQuantity } = props;

  // Dummy data for demonstration
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Margherita Pizza", quantity: 2, price: 12.99 },
    { id: 2, name: "Vegan Burger", quantity: 1, price: 9.99 },
    { id: 3, name: "Caesar Salad", quantity: 3, price: 7.99 },
  ]);

  const onRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const onUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      return; // Optionally, handle removing the item or alerting the user
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = (items) =>
    items
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="remove-item">
                <button onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cart-total">
        <strong>Total:</strong> ${calculateTotal(cartItems)}
      </div>
    </div>
  );
};

export default Cart;
