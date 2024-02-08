import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import NoPage from "./NoPage";
import Customer from "./Customer";
import MenuAdmin from "./MenuAdmin";
import AboutUs from "./AboutUs";
import Contact from "./Contact";

function Roms(props) {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route
              path="menu"
              element={
                <div className="p-4">
                  {/* <Menu Search />
                    <h2>Menu List</h2>
                    <MenuTable /> */}
                </div>
              }
            />
            <Route
              path="/customer"
              element={
                <>
                  <br></br>
                  <Customer />
                </>
              }
            />
            <Route
              path="/menu_admin"
              element={
                <>
                  <br></br>
                  <MenuAdmin />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <br></br>
                  <AboutUs />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <br></br>
                  <Contact />
                </>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default Roms;
