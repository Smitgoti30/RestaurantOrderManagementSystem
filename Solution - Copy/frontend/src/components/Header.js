import React from "react";
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <nav>
          <span className="logo">
            <Link to="/home">
              {/* <span> */}
              <b className="active">LOGO</b>
              {/* </span> */}
            </Link>
          </span>
          <div className="menu-icon">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className="nav-list">
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
            <li>
              <Link to="/menu_customer">MC</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
