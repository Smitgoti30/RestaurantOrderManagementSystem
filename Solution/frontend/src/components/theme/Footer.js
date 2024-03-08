import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="head">QUICK LINKS</p>
              <ul className="clear">
                <li>
                  <Link to={"/menu"}>MENU</Link>
                </li>
                <li>
                  <Link to={"/contact"}>CONTACT</Link>
                </li>
                <li>
                  <Link to={"/about"}>ABOUT US</Link>
                </li>
                <li>
                  <Link to={"/login"}>LOGIN</Link>
                </li>
              </ul>
            </div>
            <div className="col text-center">
              <div className="logo">
                <a href="/">
                  <span>
                    <b className="active">LOGO</b>
                  </span>
                </a>
              </div>
              <div className="address">
                <p>108 University Ave</p>
                <p>Waterloo, Ontario, N2J 2W2</p>
              </div>
              <div className="info">
                <p>
                  <a href="tel:1234567890">123-456-7890</a>
                </p>
                <p>
                  <a href="mail:info@roms.com">info@roms.com</a>
                </p>
              </div>
            </div>
            <div className="col text-end">
              <strong>
                <p>Capstone Project - Group 1 &copy; 2024 </p>
              </strong>
              <div className="copy">
                <p>Deepam Patel | 8812460 </p>
                <p>Smit Goti | 8812460 </p>
                <p>Shivang Patel | 8812460 </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
