import React, { useState, useEffect } from "react";
import CategoryAdmin from "../category/categoryAdmin";
import AddItemModal from "./addItemModal";
import { getMenu, getMenuItem } from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdateItemModal from "./updateItemModal";
import DeleteItemModal from "./deleteItemModal";

function MenuAdmin() {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [menu, setMenu] = useState([]);
  const [item, setItem] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu();
      setMenu(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const uniqueCategories = Object.values(
    menu.reduce((acc, item) => {
      if (!acc[item.category_name]) {
        acc[item.category_name] = {
          category_name: item.category_name,
          description: item.description,
          items: [item],
        };
      } else {
        acc[item.category_name].items.push(item);
      }
      return acc;
    }, {})
  );

  // const uniqueCategories = [...new Set(menu.map((item) => item.category_name))];

  const handleShowUpdate = async (id) => {
    try {
      const data = await getMenuItem(id);
      setItem(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
    setShowUpdate(true);
  };

  const handleShowDelete = async (id) => {
    setItem(id);
    setShowDelete(true);
  };

  return (
    <>
      <div className="container menu-admin-class">
        <CategoryAdmin />
        <h1 className="m-4">Items</h1>

        <table className="table table-striped">
          <caption>
            <button className="btn btn-red" onClick={handleShow}>
              Add Item
            </button>

            <AddItemModal
              show={show}
              handleClose={handleClose}
              setMenu={(updatedData) => setMenu(updatedData)}
            />
          </caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {uniqueCategories.map((category, category_index) =>
              category.items.map((item, index) => (
                <tr key={category_index + index}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{category.category_name}</td>
                  <td>{item.image}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className="btn-menu"
                      onClick={() => handleShowUpdate(item._id)}
                    >
                      <FontAwesomeIcon
                        icon={faPencil}
                        size="lg"
                        color="green"
                      />
                    </button>
                    <button
                      className="ms-1 btn-menu"
                      onClick={() => handleShowDelete(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <UpdateItemModal
        show={showUpdate}
        handleClose={handleCloseUpdate}
        item={item}
        setMenu={(updatedData) => setMenu(updatedData)}
      />
      <DeleteItemModal
        show={showDelete}
        handleClose={handleCloseDelete}
        item={item}
        setMenu={(updatedData) => setMenu(updatedData)}
      />
    </>
  );
}

export default MenuAdmin;
