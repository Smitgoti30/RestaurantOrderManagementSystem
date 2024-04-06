import React from "react";

function OnlineOrderMgmt() {
  const data = [];
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

  return (
    <div>
      <h1>Orders</h1>
      <div>
        <div className="container">
          <div className="contact cls-customer">
            <form className="form" /*onSubmit={handleSubmit}*/>
              <fieldset>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Order</th>
                      <th>Table #</th>
                      <th>Status</th>
                      <th colSpan="2"></th>
                    </tr>
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
                      {data.getAllCustomersWithLatestOrder.map(
                        (customer, index) => (
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

                            <td>
                              {(customer.latestOrder?._id && (
                                <Link
                                  to={`/order/${customer.latestOrder?._id}`}
                                >
                                  <u>
                                    {customer.latestOrder?._id?.substring(
                                      customer.latestOrder?._id?.length - 3,
                                      customer.latestOrder?._id?.length
                                    )}
                                  </u>
                                </Link>
                              )) ||
                                "-"}
                            </td>
                            <td>{customer.latestOrder?.table_number || "-"}</td>
                            <td>{customer.latestOrder?.status || "-"}</td>
                            {customer.latestOrder?.status === "Pending" ||
                            customer.latestOrder?.status === "Completed" ? (
                              <>
                                <td>
                                  <button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    onClick={() => {
                                      handleReorderClick(
                                        customer,
                                        customer.latestOrder?._id
                                      );
                                    }}
                                  >
                                    Reorder
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    type="button"
                                    onClick={() => {
                                      handleCompleteClick(customer);
                                    }}
                                  >
                                    Complete
                                  </button>
                                </td>
                              </>
                            ) : (
                              <td>
                                <button
                                  className="btn btn-success btn-sm"
                                  type="button"
                                  onClick={() => handleActivateClick(customer)}
                                >
                                  Activate
                                </button>
                              </td>
                            )}
                          </tr>
                        )
                      )}
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

export default OnlineOrderMgmt;
