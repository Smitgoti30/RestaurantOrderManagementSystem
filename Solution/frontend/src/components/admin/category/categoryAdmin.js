import React, { useEffect, useState } from "react";
import { getAllCategory, getCategory } from "../../../api";
import AddCategoryModal from "./addCategoryModal";
import UpdateCategoryModal from "./updateCategoryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import StatusModal from "./statusModal";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [id, setId] = useState(null);
  const [idStatus, setIdStatus] = useState(null);
  const [status, setStatus] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleCloseStatus = () => {
    setShowStatus(false);
  };
  const handleShow = () => setShow(true);
  const handleShowUpdate = async (id) => {
    setShowUpdate(true);
    setId(id);
    try {
      const data = await getCategory(id);
      setCategoryName(data.category_name);
      setCategoryDesc(data.description);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategory();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleStatus = async (id, status) => {
    setIdStatus(id);
    if (status === true) {
      setStatus(false);
    } else {
      setStatus(true);
    }
    setShowStatus(true);
  };
  return (
    <div className="menu-admin-class">
      <h1 className="m-4">Item Category</h1>

      <table className="table table-striped">
        <caption>
          <AddCategoryModal
            show={show}
            handleClose={handleClose}
            setCategory={(updatedData) => setCategories(updatedData)}
          />
          <button className="btn btn-red" onClick={handleShow}>
            Add Category
          </button>
        </caption>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.category_name}</td>
              <td>{category.description}</td>
              <td>
                <span
                  className={`badge ${
                    category.status ? "bg-success" : "bg-danger"
                  }`}
                  onClick={() => handleStatus(category._id, category.status)}
                  style={{ cursor: "pointer" }}
                >
                  {category.status ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className="btn-menu"
                  onClick={() => handleShowUpdate(category._id)}
                >
                  <FontAwesomeIcon icon={faPencil} size="lg" color="green" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <StatusModal
        id={idStatus}
        status={status}
        show={showStatus}
        handleClose={handleCloseStatus}
        setCategory={(updatedData) => setCategories(updatedData)}
      />
      <UpdateCategoryModal
        id={id}
        name={categoryName}
        desc={categoryDesc}
        show={showUpdate}
        handleClose={handleCloseUpdate}
        setCategory={(updatedData) => setCategories(updatedData)}
      />
    </div>
  );
};

export default CategoryAdmin;
