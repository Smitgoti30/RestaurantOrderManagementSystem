import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Layout = (props) => {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
