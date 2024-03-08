import React from "react";

function AboutUs() {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",
    },
    header: {
      textAlign: "center",
      fontSize: "2rem",
      color: "#333",
      marginBottom: "20px",
    },
    content: {
      lineHeight: "1.6",
    },
    boldParagraph: {
      marginBottom: "15px",
      fontWeight: "bold",
    },
    paragraph: {
      marginBottom: "15px",
    },
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Us</h1>
      <div style={styles.content}>
        <p style={styles.boldParagraph}>
          Welcome to our Restaurant Order Management System!
        </p>
        <p style={styles.paragraph}>
          Our system aims to streamline the process of managing orders in a
          restaurant, making it easier for both customers and staff.
        </p>
        <p style={styles.paragraph}>
          With our platform, customers can place orders conveniently from their
          devices, and restaurant staff can efficiently manage and fulfill those
          orders.
        </p>
        <p style={styles.paragraph}>
          Whether you're a small local eatery or a large restaurant chain, our
          system can help you improve your order management process and provide
          better service to your customers.
        </p>
        <p style={styles.paragraph}>
          Thank you for choosing our Restaurant Order Management System. If you
          have any questions or feedback, feel free to reach out to us.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
