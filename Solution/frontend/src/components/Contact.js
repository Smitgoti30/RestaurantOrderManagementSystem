import React, { useState } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
      publicKey: "YOUR_PUBLIC_KEY",
    })
    .then(
      () => {
        console.log("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error.text);
      }
    );
};

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
      <p className="text-center">
        Get in touch with us! We'd love to hear from you.
      </p>
      <div className="col-4"></div>
      <form
        className="col-4 m-3 p-4 contact-us text-center"
        onSubmit={sendEmail}
      >
        <div>
          <label>Your Name*:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={sendEmail}
            required
          />
        </div>
        <br />
        <div>
          <label>Your Email Address*:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={sendEmail}
            required
          />
        </div>
        <br />
        <div>
          <label>Your Message*:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={sendEmail}
            required
          ></textarea>
        </div>
        <br />
        <button className="btn btn-red" type="submit" value="Send">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
