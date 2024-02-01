import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import NoPage from "./NoPage";

function Roms(props) {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route
              path="list"
              element={
                <div className="p-4">
                  {/* <Menu Search />
					<h2>Menu List</h2>
					<MenuTable /> */}
                </div>
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
