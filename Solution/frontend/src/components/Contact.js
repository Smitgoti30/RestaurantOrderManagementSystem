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
    <div className="row">
      <h1>Contact Us</h1>
      <p className="text-center">Get in touch with us! We'd love to hear from you.</p>
      <div className="col-4"></div>
      <form className="col-4 m-3 p-4 contact-us text-center" onSubmit={handleSubmit}>
        <div>
          <label>
            Your Name*:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>
            Your Email Address*:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>
            Your Message*:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <br />
        <button className="btn btn-red" type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
