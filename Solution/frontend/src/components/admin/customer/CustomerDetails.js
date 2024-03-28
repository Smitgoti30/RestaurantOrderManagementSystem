import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_ORDERS,
} from "../../../graphql/Queries";
import { UPDATE_CUSTOMER } from "../../../graphql/Mutations";
import { Form, Button, Table, Toast, ToastContainer } from "react-bootstrap";

const CustomerDetails = () => {
  let { customerId } = useParams();
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [showToast, setShowToast] = useState(false);
  const { loading: detailsLoading, data: customerData } = useQuery(
    GET_CUSTOMER_DETAILS,
    { variables: { id: customerId }, fetchPolicy: "network-only" }
  );
  const { loading: ordersLoading, data: ordersData } = useQuery(
    GET_CUSTOMER_ORDERS,
    { variables: { customerId }, fetchPolicy: "network-only" }
  );
  const [
    updateCustomerDetails,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_CUSTOMER, {
    onCompleted: () => {
      setShowToast(true);
    },
  });

  useEffect(() => {
    if (customerData && customerData.getCustomer) {
      const { firstName, lastName, email, phone } = customerData.getCustomer;
      setCustomerDetails({ firstName, lastName, email, phone });
    }
  }, [customerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    customerDetails.phone = Number(customerDetails.phone);
    updateCustomerDetails({
      variables: { customerId, customerDetails },
    });
  };

  if (detailsLoading || ordersLoading) return <p>Loading...</p>;

  return (
    <div className="cls-customer-details">
      <ToastContainer position="top-end" style={{ marginTop: "75px" }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
        >
          {/* <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header> */}
          <Toast.Body>Customer details updated successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="container ">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <h2>Customer Details</h2>
            <Form onSubmit={handleSubmit}>
              <div className="input-group mb-3 mt-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  ID
                </span>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="_id"
                  value={customerData?.getCustomer?._id || ""}
                  required
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  disabled
                  readOnly
                />
              </div>
              <div className="input-group mb-3 mt-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Type
                </span>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="type"
                  value={customerData?.getCustomer?.type || ""}
                  required
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  disabled
                  readOnly
                />
              </div>
              <div className="input-group mb-3 mt-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  First Name
                </span>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  name="firstName"
                  value={customerDetails.firstName || ""}
                  onChange={handleInputChange}
                  required
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Last Name
                </span>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter last name"
                  name="lastName"
                  value={customerDetails.lastName || ""}
                  onChange={handleInputChange}
                  required
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Email
                </span>
                <Form.Control
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={customerDetails.email || ""}
                  onChange={handleInputChange}
                  required
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Phone
                </span>
                <Form.Control
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  name="phone"
                  value={customerDetails.phone || ""}
                  onChange={handleInputChange}
                  required
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <Button variant="success" type="submit" disabled={updateLoading}>
                Update
              </Button>
              {updateError && (
                <div className="alert alert-danger" role="alert">
                  Error updating details: {updateError.message}
                </div>
              )}
            </Form>
          </div>
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-6 mt-5">
            {ordersData?.getCustomerOrders?.length > 0 && (
              <>
                <h2>History</h2>
                <Table striped bordered hover className="mt-0">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData?.getCustomerOrders.map((order) => (
                      <tr key={order._id}>
                        <td>${order.order_id}</td>
                        <td>${order.total_amount.toFixed(2)}</td>
                        <td>{new Date(order.date).toLocaleString()}</td>
                        <td>
                          <a href={`/receipt/${order._id}`}>View Receipt</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
