import React, { useState, useEffect } from "react";
import { Link, json } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const CREATE_CHECKOUT_SESSION = gql`
  mutation createCheckoutSession($products: [ProductInput]!) {
    createCheckoutSession(products: $products) {
      id
    }
  }
`;

const CheckoutPage = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Retrieve cart items from session storage
    const storedCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    const total=JSON.parse(sessionStorage.getItem("TotalPrice"))
    setTotalPrice(total)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);
  const stripePromise = loadStripe('pk_test_51OzPMy09rVaNz0yFsMG2XbPkZ3SNIYcTfKW5J5XgXSdRlVCp0AjrK3FAKcphJ58XHz2PPXpKbmuY5Xj4u3IVKok500cYvrMXzs');

  const handleSubmit = async () => {
    const filteredCartItems = cartItems.map(item => ({
      amount: item.price,
      name: item.name,
      quantity: item.quantity
    }));

    try {
      const { data } = await createCheckoutSession({ variables: { products: filteredCartItems } });
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.createCheckoutSession.id });
    } catch (error) {
      console.error(error);

      if (error.message.includes('cancel_url')) {
        // Redirect to the cancel URL with an alert
        alert('Payment canceled. You will be redirected back to the homepage.');
        window.location.href = 'http://localhost:3000';
      } else {
        // Redirect to the success URL with an alert
        alert('Payment successful. You will be redirected to the homepage.');
        window.location.href = 'http://localhost:3000';
      }
    }

    setFormData({
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      cartItems: cartItems,
    });
    console.log(formData);
  };

  const handleDecreaseQuantity = (id) => {
    console.log("Decreasing quantity for item with ID:", id);
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    console.log("Updated cart items after decrease:", updatedCartItems);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   cartItems: updatedCartItems,
    // }));
    const totalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
    setCartItems(updatedCartItems)
  };

  const handleIncreaseQuantity = (id) => {
    console.log("Increasing quantity for item with ID:", id);
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    console.log("Updated cart items after increase:", updatedCartItems);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   cartItems: updatedCartItems,
    // }));
    const totalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
    setCartItems(updatedCartItems);
  };

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  return (
    <div>
      <h2 className="text-center p-2 text-decoration-underline">Checkout</h2>
      <div className="row">
        <div className="col-6">
          <form style={styles.form} className="cart">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.input}
              required
            ></textarea>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <button onClick={() => handleSubmit()} type="button" style={styles.button}>
              Place Order
            </button>
          </form>
        </div>
        <div className="col-6">
          <div className="order-summary text-center">
            <h3 className="text-center text-red">Order Summary</h3>
            <ul style={styles.itemList}>
              {cartItems.map((item) => (
                <li key={item.id} style={styles.item}>
                  <div style={styles.itemImageContainer}>
                    <img
                      src={
                        item.image ? require(`../assets/images/${item.image}`) : ""
                      }
                      alt={item.image}
                      style={styles.itemImage}
                    />
                  </div>
                  <div style={styles.itemInfo}>
                    <p>{item.name}</p>
                    <div style={styles.quantityControls}>
                      <span style={styles.quantity} className="text-red">{item.quantity}</span>
                      <p className="m-2"><b>Price : $ {item.price}</b></p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="row text-center">
              <div className="col-12">
                <p style={styles.totalPrice}>Total: ${totalPrice}</p>
              </div>
            </div>
            <button className="btn btn-red" onClick={handleBackToMenu}>
              Return to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  form: {
    marginBottom: "20px",
  },
  orderSummary: {
    marginTop: "30px",
  },
  itemList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "20px",
    marginBottom: "20px",
    width: "200px", // Adjust the width as needed
  },
  itemImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  itemInfo: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  quantity: {
    padding: "5px 10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  totalPrice: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginTop: "20px",
  },
};

export default CheckoutPage;
