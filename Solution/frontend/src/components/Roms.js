import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import HomeC from "./customer/Home";
import NoPage from "./NoPage";
import Customer from "./Customer";
import MenuAdmin from "./admin/menu/MenuAdmin";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Login from "./Login";
import Layout from "./theme/layout";
import CategoryLayout from "./CategoryLayout";
import OrderDetails from "./customer/OrderDetails";
import Cart from "./customer/Cart";

function Roms() {
  return (
    <>
      <Layout>
        <main>
          <Routes>
            <Route index element={<HomeC />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/menu" element={<CategoryLayout />} />
            <Route path="/admin/menu" element={<MenuAdmin />} />
            <Route path="/admin/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orderdetails" element={<OrderDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
}

export default Roms;
