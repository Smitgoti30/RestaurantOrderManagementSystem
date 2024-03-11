import React from "react";
// import "./OrderDetails.css";

const OrderDetails = ({ order }) => {
  order = {
    customerName: "Deepam",
    deliveryAddress: "183 Foxhunt Road, Waterloo",
    items: [
      { id: 1, name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { id: 2, name: "Pasta Carbonara", quantity: 1, price: 9.99 },
      { id: 3, name: "Caesar Salad", quantity: 1, price: 7.99 },
    ],
  };

  const calculateTotal = (items) =>
    items
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <div className="customer-details">
        <h3>Customer Details</h3>
        <p>
          <strong>Name:</strong> {order.customerName}
        </p>
        <p>
          <strong>Delivery Address:</strong> {order.deliveryAddress}
        </p>
      </div>
      <div className="order-items">
        <h3>Items Ordered</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="total-amount">
        <strong>Total Amount:</strong> ${calculateTotal(order.items)}
      </div>
    </div>
  );
};

export default OrderDetails;
