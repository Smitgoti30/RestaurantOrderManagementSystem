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
      <div className="contact-div">
        <form className="sp-contact-from-box" onSubmit={handleSubmit}>
          <label className="sp-contact-label">
             Name
            <input
              className="sp-contact-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="sp-contact-label">
             Email Address
            <input
              className="sp-contact-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="sp-contact-label">
             Message
            <textarea
              className="sp-contact-input"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <button className="sp-contact-submit-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
