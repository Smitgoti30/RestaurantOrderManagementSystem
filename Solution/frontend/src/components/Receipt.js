import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDER_DETAILS, GET_RECEIPT_BY_ID } from "../graphql/Queries";
import { useParams } from "react-router-dom";

const useConditionalQuery = (receiptId, orderId) => {
  let query, variables;

  if (receiptId) {
    query = GET_RECEIPT_BY_ID;
    variables = { receiptId };
  } else if (orderId) {
    query = GET_ORDER_DETAILS;
    variables = { id: orderId };
  }

  return useQuery(query, {
    variables,
    skip: !query,
    fetchPolicy: "network-only",
  });
};

const Receipt = () => {
  let { receiptId, orderId } = useParams();

  const { data, loading, error } = useConditionalQuery(receiptId, orderId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Determine the correct data field based on what query was executed
  const receipt = receiptId ? data?.getReceiptById : data?.getOrderDetails;

  if (!receipt) return <p>No data found.</p>;

  const handlePrint = () => {
    const printContent = document.getElementById("r-print").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  const {
    customer,
    items,
    payment_method,
    sub_total,
    tax_amount,
    total_amount,
    date,
  } = receipt;
  // Format date here as necessary
  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div>
      <div className="contact">
        <div className="form" id="r-print">
          <fieldset className="r-receipt">
            {orderId && <h2>Order Details</h2>}
            {receiptId && <h2>ROMS - Receipt</h2>}
            {/* <div className="container"> */}
            <div className="row">
              <div className="col-5">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <th>Street</th>
                      <td>108 University Ave</td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td>Waterloo</td>
                    </tr>
                    <tr>
                      <th>Province</th>
                      <td>Ontario, N2J 2W2</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>info@roms.com</td>
                    </tr>
                    <tr>
                      <th>Phone No.</th>
                      <td>+1234567890</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-7">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      {receiptId && (
                        <>
                          <th>Receipt Id</th>
                          <td>{receipt._id}</td>
                        </>
                      )}
                      {orderId && (
                        <>
                          <th>Order Id</th>
                          <td>{orderId}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{formattedDate}</td>
                    </tr>
                    <tr>
                      <th>Customer Name</th>
                      <td>{customer.name}</td>
                    </tr>
                    <tr>
                      <th>Phone No.</th>
                      <td>{customer.phone}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{customer.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {/* <h2>Order Items</h2> */}
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Sub Total</th>
                      <th>Tax</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.subTotal.toFixed(2)}</td>
                        <td>${item.tax.toFixed(2)}</td>
                        <td>${(item.subTotal + item.tax).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <p>
                          <b>Payment Method: {payment_method}</b>
                        </p>
                      </td>
                      <td colSpan="4">
                        <div className="receipt-total">
                          <p>Sub Total: ${sub_total.toFixed(2)}</p>
                          <p>Tax: ${tax_amount.toFixed(2)}</p>
                          <p>Total: ${total_amount.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
          </fieldset>
        </div>
      </div>
      {receiptId && (
        <div className="d-flex justify-content-center mt-3 print-button">
          <button className="btn btn-danger" onClick={handlePrint}>
            Print Receipt
          </button>
        </div>
      )}
    </div>
  );
};
export default Receipt;
