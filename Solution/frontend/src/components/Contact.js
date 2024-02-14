import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can add your logic here to handle form submission (e.g., send an email).
  };
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>Get in touch with us! We'd love to hear from you.</p>
      <div class="contact-div">
        <form class="form-box" onSubmit={handleSubmit}>
          <label>
            Your Name*:
            <input
              class="input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Your Email Address*:
            <input
              class="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Your Message*:
            <textarea
              class="input"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <button class="toggle-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
