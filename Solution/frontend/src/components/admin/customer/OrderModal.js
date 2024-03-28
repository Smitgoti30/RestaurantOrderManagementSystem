import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAllMenuItems } from "../../../graphql/Queries";
import { CREATE_ORDER } from "../../../graphql/Mutations";

function OrderModal(props) {
  const {
    isOpen,
    closeModal,
    customer,
    refetchCustomers,
    refetchOrderById,
    reorderDetails,
  } = props;
  console.log(props);
  const [tableNumber, setTableNumber] = useState("");
  const [menuItems, setMenuItems] = useState([{ id: "", quantity: 1 }]);
  const { loading, error, data } = useQuery(getAllMenuItems, {
    fetchPolicy: "network-only",
  });
  const [createOrder] = useMutation(CREATE_ORDER);

  const [tableNumberValid, setTableNumberValid] = useState(true);
  const [menuItemsValid, setMenuItemsValid] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (
        !reorderDetails ||
        (reorderDetails && reorderDetails?.items?.length === 0)
      ) {
        setTableNumber("");
        // Ensure there's at least one blank menu item when opening the modal
        setMenuItems([{ id: "", quantity: 1 }]);
      } else {
        // If there are reorder details, set them as before
        setTableNumber(reorderDetails.table_number.toString());
        const preloadedItems = reorderDetails.items.map((item) => ({
          id: item.menu_id.toString(),
          quantity: item.quantity,
        }));
        setMenuItems(preloadedItems);
      }
    }
  }, [isOpen, reorderDetails]);

  const handleMenuItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMenuItems = [...menuItems];
    if (name === "itemId") {
      updatedMenuItems[index].id = value;
    } else if (name === "quantity") {
      updatedMenuItems[index].quantity = parseInt(value || 0);
    }
    setMenuItems(updatedMenuItems);
  };

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { id: "", quantity: 1 }]);
  };

  const handleDeleteMenuItem = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems.splice(index, 1);
    setMenuItems(updatedMenuItems);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate table number
    const tableNumberInt = parseInt(tableNumber, 10);
    if (isNaN(tableNumberInt) || tableNumberInt <= 0) {
      setTableNumberValid(false);
      isValid = false;
    } else {
      setTableNumberValid(true);
    }
    debugger;
    // Validate menu items and quantities
    if (menuItems.some((item) => item.id === "" || item.quantity < 1)) {
      setMenuItemsValid(false);
      isValid = false;
    } else {
      setMenuItemsValid(true);
    }

    return isValid;
  };
  const handlePlaceOrder = async () => {
    try {
      if (!validateForm()) return;
      debugger;
      await createOrder({
        variables: {
          order: {
            order_id: reorderDetails?._id || "",
            customer_id: customer._id,
            status: "Pending",
            type: "dining",
            table_number: parseInt(tableNumber, 10),
          },
          items: menuItems.map((item) => ({
            menu_id: item.id,
            quantity: item.quantity,
            price: 0, // include price
          })),
        },
      });
      refetchCustomers();
      refetchOrderById();
      closeModal();
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div className="cls-order-window">
      <div
        className={`modal ${isOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Place Order</h5>
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              <div className="form-group">
                <label htmlFor="tableNumber">Table Number:</label>
                <input
                  type="text"
                  className={`form-control ${
                    !tableNumberValid ? "is-invalid" : ""
                  }`}
                  id="tableNumber"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
                {!tableNumberValid && (
                  <div className="invalid-feedback">
                    Please enter a valid table number.
                  </div>
                )}
              </div>
              <div className="form-group">
                {menuItems.length > 0 && <label>Menu Items:</label>}
                {menuItems.map((item, index) => (
                  <div key={index} className="input-group mb-3">
                    <select
                      name="itemId"
                      className="form-control"
                      value={item.id}
                      onChange={(e) => handleMenuItemChange(e, index)}
                    >
                      <option value="">Select Menu Item</option>
                      {data &&
                        data.getAllMenuItems.map((menuItem) => (
                          <option key={menuItem._id} value={menuItem._id}>
                            {menuItem.name}
                          </option>
                        ))}
                    </select>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) => handleMenuItemChange(e, index)}
                      min="1"
                    />
                    <div className="input-group-append  ms-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteMenuItem(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!menuItemsValid && (
                  <div className="text-danger mb-2">
                    Please select a menu item and enter a valid quantity for
                    each.
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddMenuItem}
                >
                  Add Menu Item
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
