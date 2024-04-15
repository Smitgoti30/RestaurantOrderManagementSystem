import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ik3j3d9", "template_az9692u", form.current, {
        publicKey: "uWU3GJ4rTdn0HQjBb",
      })
      .then(
        () => {
          console.log("Message Sent!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="sp-contact-row">
      <div class="sp-contact-card1 contact-background">
        <div class="sp-contact-heading">
          <h1>Contact Us</h1>
        </div>
        <p className="text-center">
          Need to get in touch with us? Fill out the form and contact us by
          sending your thoughts! We'd love to hear from you.
        </p>
      </div>
      <form
        className="col-4 m-3 p-4 contact-us text-center"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="sp-contact-names">
          <div class="col-md-6 col-sm-12">
            <label className="label-name">First Name</label>
            <input
              className="bg-body-secondary"
              type="text"
              name="fname"
              onSubmit={sendEmail}
              required
            />
          </div>
          <div class="col-md-6 col-sm-12">
            <label className="label-name">Last Name</label>
            <input
              className="bg-body-secondary"
              type="text"
              name="lname"
              onSubmit={sendEmail}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <label>Email</label>
            <input
              className="bg-body-secondary"
              type="email"
              name="email"
              onSubmit={sendEmail}
              required
            />
          </div>
        </div>
        <br />
        <div class="">
          <label>Your Message</label>
          <br />
          <textarea
            className="bg-body-secondary form-select mb-3"
            name="message"
            type="text"
            onSubmit={sendEmail}
            required
          ></textarea>
        </div>
        <br />
        <div className="submit">
          <div className="row">
            <button
              className="btn btn-outline-primary btn-lg"
              type="submit"
              style={{ alignItems: "left", display: "flex" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
