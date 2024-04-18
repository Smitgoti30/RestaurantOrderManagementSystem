import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.module.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    const totalPrice = storedCartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    setTotalPrice(totalPrice);
  }, []);

  const handleDecreaseQuantity = (id) => {
    console.log("Decreasing quantity for item with ID:", id);
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    const totalPrice = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
    setCartItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (id) => {
    console.log("Increasing quantity for item with ID:", id);
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    const totalPrice = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
    setCartItems(updatedCartItems);
  };

  const onRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  };

  const calculateTotal = (items) =>
    items
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);

  const addOrder = async () => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    sessionStorage.setItem("TotalPrice", JSON.parse(calculateTotal(cartItems)));
    navigate("/checkout");
  };

  return (
    <div className="row ccc-smit">
      <h2 className="text-center text-decoration-underline p-2">Cart</h2>
      <div className="col-3"></div>
      <div className="cart col-6">
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item row p-2">
              <div className="col-4 text-center">
                <img
                  src={
                    item.image
                      ? require(`../../assets/images/${item.image}`)
                      : ""
                  }
                  className="cart-img"
                  alt={item.image}
                />
              </div>
              <div className="col-4 text-center">
                <p>{item.name}</p>
                <div>
                  <button
                    className="btn-red p-2"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="m-3">{item.quantity}</span>
                  <button
                    className="btn-red p-2"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <h6 className="py-2">
                  <b>Price: ${item.price}</b>
                </h6>
              </div>
              <div className="col-4 text-center">
                <button
                  className="btn btn-red"
                  onClick={() => onRemove(item.id)}
                >
                  remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="row">
          <div className="cart-total text-center px-5 mx-5 col-12">
            <strong className="text-red">Total : </strong>
            <b> ${calculateTotal(cartItems)}</b>
          </div>
          <button
            className="btn btn-red float-right mx-4 text-white"
            onClick={() => addOrder()}
          >
            Checkout
          </button>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default Cart;
