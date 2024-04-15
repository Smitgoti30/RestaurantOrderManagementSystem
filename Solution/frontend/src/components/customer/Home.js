import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCookie,
  faCheese,
  faWineGlassEmpty,
  faHotdog,
  faPlateWheat,
  faBowlRice,
  faBurger,
  faCakeCandles,
  faChampagneGlasses,
} from "@fortawesome/free-solid-svg-icons";
import MainImage from "../../../src/assets/images/main-images.png";

const icons = [
  { name: faCookie },
  { name: faCheese },
  { name: faWineGlassEmpty },
  { name: faHotdog },
  { name: faPlateWheat },
  { name: faBurger },
  { name: faCakeCandles },
  { name: faChampagneGlasses },
  { name: faBowlRice },
];

const Home = () => {
  return (
    <>
      <div className="home-container m-5">
        <div className="main-heading-text ms-5">
          <h1 className="main-heading">
            It's not just <br /> <span className="donut">F🍩🍩</span>D, It's an
            EXPERIENCE
          </h1>
        </div>
        <div className="image me-5">
          <img src={MainImage} alt="main-image" />
        </div>
      </div>
      <div className="m-5 bg-red home-sub-div2 row p-5">
        <div className="col-4 border-right">
          <h1>What is the Speciality of us?</h1>
        </div>
        <div className="col-8">
          <p className="fs-5">
            We take pride in adapting our menu to the seasons, ensuring that we
            offer only the freshest and most flavorful ingredients available.
            This not only supports local farmers and producers but also keeps
            our cuisine vibrant and exciting year.
          </p>
        </div>
      </div>
      <div className="col my-5 text-center">
        {icons.map((icon, index) => (
          <FontAwesomeIcon
            key={index}
            className="thin icons"
            icon={icon.name}
          />
        ))}
      </div>
      <div className="bg-red m-5 p-1 text-white">
        <h3 className="text-center">Helloooo!!!</h3>
      </div>
      <div className="m-5">
        <h1 className="text-start">"Feeling hungry? We've got you covered."</h1>
        <hr />
        <p className="fs-5">
          "Dive into our wide array of exquisite dishes that are sure to satisfy
          your cravings. From the heartwarming richness of our homemade pasta to
          the zesty kick of our signature tacos, every item on our menu is
          crafted with care and designed to delight. No matter your taste or
          mood, our restaurant promises a meal that not only fills your stomach
          but also warms your heart. Join us today and let your culinary journey
          begin!"
        </p>
      </div>
    </>
  );
};

const styles = {
  menuLink: {
    marginTop: "10px",
    display: "inline-block",
    color: "#f2f2f",
    textDecoration: "bold",
  },
};

export default Home;
