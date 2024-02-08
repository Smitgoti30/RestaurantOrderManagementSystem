import React from "react";
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <nav>
          <span class="logo">
            <Link to="/home">
              {/* <span> */}
              <b class="active">LOGO</b>
              {/* </span> */}
            </Link>
          </span>
          <div class="menu-icon">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <ul class="nav-list">
            <li>
              <Link to="/menu_admin">MENU</Link>
            </li>
            <li>
              <Link to="/customer">CUSTOMER</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
            <li>
              <Link to="/about">ABOUT US</Link>
            </li>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
