import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div class="left w-33">
          <p class="head">QUICK LINKS</p>
          <ul class="clear">
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
        <div class="mid w-33">
          <div class="logo">
            <a href="customer">
              <span>
                <b class="active">LOGO</b>
              </span>
            </a>
          </div>
          <div class="address">
            <p>108 University Ave</p>
            <p>Waterloo, Ontario, N2J 2W2</p>
          </div>
          <div class="info">
            <p>
              <a href="tel:1234567890">123-456-7890</a>
            </p>
            <p>
              <a href="mail:info@roms.com">info@roms.com</a>
            </p>
          </div>
        </div>
        <div class="right w-33">
          <strong>
            <p>Capstone Project - Group 1 &copy; 2024 </p>
          </strong>
          <div class="copy">
            <p>Deepam Patel | 8812460 </p>
            <p>Smit Goti | 8812460 </p>
            <p>Shivang Patel | 8812460 </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
