import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CUSTOMER } from "../graphql/Mutations";
import { GET_ALL_CUSTOMERS_WITH_LATEST_ORDER } from "../graphql/Queries";
import { Link } from "react-router-dom";

function Customer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    type: "",
    tableNumber: "",
  });

  const [tempFilters, setTempFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    type: "",
    tableNumber: "",
  });

  const [addCustomer] = useMutation(CREATE_CUSTOMER);
  const { loading, error, data } = useQuery(
    GET_ALL_CUSTOMERS_WITH_LATEST_ORDER,
    {
      variables: { filters },
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleApplyFilters = () => {
    setFilters(tempFilters);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      debugger;
      const submitData = {
        ...formData,
        type: "dining",
        phone: parseInt(formData.phone, 10),
      };
      await addCustomer({ variables: { customerInput: submitData } });
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

  if (loading)
    return <p style={{ textAlign: "center", padding: "10px" }}>Loading...</p>;
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
                      placeholder="Enter First Name"
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
                      placeholder="Enter Last Name"
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
                      placeholder="Enter Email Address"
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
                      placeholder="Enter Phone Number"
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
                      <th>#</th>
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
                            {/* <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                              name=""
                              onChange={handleFilterChange}
                            /> */}
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                              name="firstName"
                              value={tempFilters.firstName}
                              onChange={handleFilterChange}
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
                              name="lastName"
                              value={tempFilters.lastName}
                              onChange={handleFilterChange}
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
                              name="email"
                              value={tempFilters.email}
                              onChange={handleFilterChange}
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
                              name="phone"
                              value={tempFilters.phone}
                              onChange={handleFilterChange}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            {/* <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                              onChange={handleFilterChange}
                            /> */}
                          </div>
                        </th>
                        <th>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-describedby="button-addon2"
                              name="tableNumber"
                              value={tempFilters.tableNumber}
                              onChange={handleFilterChange}
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
                              name="status"
                              value={tempFilters.status}
                              onChange={handleFilterChange}
                            />
                          </div>
                        </th>
                        <th style={{ border: "none" }} colSpan={1}>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            id="button-addon2"
                            onClick={handleApplyFilters}
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
                      {data.getAllCustomersWithLatestOrder.map((customer) => (
                        <tr key={customer._id}>
                          <td>
                            <Link to={`/customer/${customer._id}`}>
                              <u>
                                {customer?._id?.substring(
                                  customer?._id?.length - 3,
                                  customer?._id?.length
                                )}
                              </u>
                            </Link>
                          </td>
                          <td>{customer.firstName}</td>
                          <td>{customer.lastName}</td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.latestOrder?._id || "-"}</td>
                          <td>{customer.latestOrder?.table_number || "-"}</td>
                          <td>{customer.latestOrder?.status || "-"}</td>
                          {true && (
                            <td>
                              <button className="btn btn-success btn-sm">
                                Activate
                              </button>
                            </td>
                          )}
                          {false && customer.firstName !== "Deepam" && (
                            <>
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
                            </>
                          )}
                        </tr>
                      ))}
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
