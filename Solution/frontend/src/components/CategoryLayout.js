import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import CustomModal from "./Modal";
import { getMenu, getAllCategory } from "../api";
import Loading from "./Loading";

const CategoryLayout = () => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenu();
        setMenu(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
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

  const handleShowModal = (item) => {
    setShowModal(true);
    setData(item);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleMenuItemClick = (event, categoryName) => {
    event.preventDefault();
    const element = document.getElementById(categoryName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="row menu">
          <div className="col-3">
            {/* menu bar */}
            <div className="menusidebar text-center">
              <ul>
                {uniqueCategories.map((item, index) => (
                  <li className="menu-list-items" key={index}>
                    <a
                      href="javascript:void(0)"
                      onClick={(e) => handleMenuItemClick(e, item.category_name)}
                    >
                      {item.category_name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-9 content-wrapper content-scroll">
            {uniqueCategories.map((category, index) => (
              <div key={index} id={category.category_name}>
                <h1 className="text-red mt-4">{category.category_name}</h1>
                <p className="text-center">{category.description}</p>
                <div className="card-container">
                  {category.items.map((item, index) => (
                    <Card
                      onClick={() => handleShowModal(item)}
                      role="button"
                      key={index}
                      className="p-1"
                      style={{ width: "18rem", margin: "10px" }}
                    >
                      <Card.Img
                        variant="top"
                        src={require(`../assets/images/${item.image}`)}
                        style={{ height: "18rem" }}
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.hasOwnProperty("image") ? (
        <CustomModal
          show={showModal}
          handleClose={handleCloseModal}
          data={data}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CategoryLayout;
