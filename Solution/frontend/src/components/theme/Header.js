import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            NAVBAR
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/menu"}>
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/contact"}>
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/customer"}>
                  Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/customer/menu"}>
                  Online Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/about"}>
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <header>
        <nav>
          <span className="logo">
            <Link to="/home">
              <b className="active">LOGO</b>
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
          </ul>
        </nav>
      </header> */}
      {/* <Outlet /> */}
    </>
  );
}

export default Header;
