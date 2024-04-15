import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  const renderNavLink = (to, label, allowedTypes, openInNewTab = false) => {
    if (!user && !allowedTypes.includes("public")) return null;
    if (
      user &&
      allowedTypes &&
      !allowedTypes.includes(user.type) &&
      !allowedTypes.includes("public")
    )
      return null;

    const navComponent = openInNewTab ? (
      <a
        className="nav-link"
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    ) : (
      <Link className="nav-link" to={to}>
        {label}
      </Link>
    );

    return <li className="nav-item">{navComponent}</li>;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            NAVBAR
          </Link>
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
              {renderNavLink("/admin/menu", "Menu", ["staff", "admin"])}
              {renderNavLink("/admin/on/order", "Order", ["staff", "admin"])}
              {renderNavLink("/customer", "Customer", ["staff", "admin"])}
              {renderNavLink(
                "/menu",
                "Menu",
                user && (user.type === "staff" || user.type === "admin")
                  ? []
                  : ["public"]
              )}
              {renderNavLink("/d3/index.html", "Analytics", ["admin"], true)}{" "}
              {renderNavLink("/cart", "Cart", ["online"])}
              {renderNavLink("/checkout", "Checkout", ["online"])}
              {/* {renderNavLink("/about", "About Us", ["public"])}
              {renderNavLink("/contact", "Contact", ["public"])}{" "} */}
              {user ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              ) : (
                renderNavLink("/auth", "Login", ["public"])
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
