import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CUSTOMER } from "../graphql/Mutation";
import { GET_ALL_CUSTOMERS } from "../graphql/Query";
import { Link } from "react-router-dom";

function Customer() {
  const { loading, error, data } = useQuery(GET_ALL_CUSTOMERS);
  const [addCustomer] = useMutation(ADD_CUSTOMER);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCustomer({ variables: { customerInput: formData } });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Customer Information</h1>
      <div>
        <div className="container">
          <div className="contact cls-customer">
        <form className="form" onSubmit={handleSubmit}>
              <fieldset>
                <div className="contactform">
          <div className="input-fields">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter Your First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
                    <small>Error</small>
                  </div>
          <div className="input-fields">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Your Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
                    <small>Error</small>
                  </div>
          <div className="input-fields">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
                    <small>Error</small>
                  </div>
          <div className="input-fields">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
                    <small>Error</small>
                  </div>
                  <input
                    className="btn btn-danger"
                    type="submit"
                    value="ADD CUSTOMER"
                  />
                </div>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Customer #</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Order #</th>
                      <th>Table #</th>
                      <th>Status</th>
                      <th colSpan="2"></th>
                    </tr>
                    {"No" != "Yes" && (
                      <tr>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                            />
                          </div>
                        </th>
                        <th style={{ border: "none" }} colSpan={1}>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            id="button-addon2"
                          >
                            Filter
                          </button>
                        </th>
                        <th style={{ borderLeft: "none" }}>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            id="button-addon2"
                          >
                            Clear
                          </button>
                        </th>
                      </tr>
                    )}
                  </thead>
                  {(1 || 0) === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan="11" className="text-center">
                          <p className="alert alert-info">
                            No customers found in the database.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                        <tr key={1}>
                          <td><Link to="/"><u>{"C1"}</u></Link></td>
                          <td>{"Deepam"}</td>
                          <td>{"Patel"}</td>
                          <td>{"dpampatel@gmail.com"}</td>
                          <td>{"1234567890"}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td >
                            <button className="btn btn-success btn-sm">
                              Activate
                            </button>
                          </td>
                        </tr>
                        <tr key={2}>
                        <td><Link><u>{"C2"}</u></Link></td>
                          <td>{"Smit"}</td>
                          <td>{"Goti"}</td>
                          <td>{"sg@gmail.com"}</td>
                          <td>{"8834567890"}</td>
                          <td>{"O3"}</td>
                          <td>{"T4"}</td>
                          <td>{"Active"}</td>
                          <td>
                            <button className="btn btn-primary btn-sm">
                              Reorder
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger btn-sm">
                              Complete
                            </button>
                          </td>
                          
                        </tr>
                        <tr key={3}>
                        <td><Link><u>{"C6"}</u></Link></td>
                          <td>{"Shivang"}</td>
                          <td>{"Patel"}</td>
                          <td>{"sp@gmail.com"}</td>
                          <td>{"5534567890"}</td>
                          <td>{"O7"}</td>
                          <td>{"T1"}</td>
                          <td>{"Active"}</td>
                          <td>
                            <button className="btn btn-primary btn-sm">
                              Reorder
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger btn-sm">
                              Complete
                            </button>
                          </td>
                          
                        </tr>
                    </tbody>
                  )}
                </table>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
