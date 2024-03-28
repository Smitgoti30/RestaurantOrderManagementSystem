import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import appetizersImg from '../assets/images/Appetizers1.jpg';
import appetizersImg2 from '../assets/images/Appetizers2.jpg';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phoneNumber: '',
    cartItems: [
      { id: 1, name: 'Margherita Pizza', quantity: 2, price: 12.99, image: appetizersImg },
      { id: 2, name: 'Vegan Burger', quantity: 1, price: 9.99, image: appetizersImg2 },
      { id: 3, name: 'Caesar Salad', quantity: 3, price: 7.99, image: appetizersImg },
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend for order processing
    console.log(formData);
    // Reset form after submission
    setFormData({
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
      cartItems: formData.cartItems,
    });
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCartItems = formData.cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setFormData({ ...formData, cartItems: updatedCartItems });
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCartItems = formData.cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setFormData({ ...formData, cartItems: updatedCartItems });
  };

  const totalPrice = formData.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <button type="submit" style={styles.button}>Place Order</button>
      </form>
      <div style={styles.orderSummary}>
        <h3>Order Summary</h3>
        <ul style={styles.itemList}>
          {formData.cartItems.map((item) => (
            <li key={item.id} style={styles.item}>
              <div style={styles.itemImageContainer}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
              </div>
              <div style={styles.itemInfo}>
                <p>{item.name}</p>
                <div style={styles.quantityControls}>
                  <button onClick={() => handleDecreaseQuantity(item.id)} style={styles.quantityButton}>-</button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)} style={styles.quantityButton}>+</button>
                </div>
                <p>Price: ${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
        <p style={styles.totalPrice}>Total: ${totalPrice}</p>
        <Link to="/menu" style={styles.menuLink}>Return to Menu</Link> {/* Link to main menu page */}
      </div>
    </div>
  );
};

const styles = {
    form: {
      marginBottom: '20px',
    },
    orderSummary: {
      marginTop: '30px',
    },
    itemList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: '20px',
      marginBottom: '20px',
      width: '200px', // Adjust the width as needed
    },
    itemImage: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    itemInfo: {
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#ef4444',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
    },
    quantityButton: {
      backgroundColor: '#ef4444',
      color: '#fff',
      padding: '5px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '5px',
    },
    quantity: {
      padding: '5px 10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    totalPrice: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginTop: '20px',
    },
    menuLink: {
      marginTop: '20px',
      display: 'inline-block',
      color: '#333',
      textDecoration: 'none',
    },
  };
  
  

export default CheckoutPage;
