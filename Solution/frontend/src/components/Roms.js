import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./authentication/AuthContext.js";
import ProtectedRoute from "./authentication/ProtectedRoute.js";
import HomeC from "./customer/Home";
import NoPage from "./NoPage";
import Customer from "./admin/customer/Customer";
import MenuAdmin from "./admin/menu/MenuAdmin";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Login from "./authentication/Login";
import Layout from "./theme/layout";
import CategoryLayout from "./CategoryLayout";
import OrderDetails from "./customer/OrderDetails";
import Cart from "./customer/Cart";
import Receipt from "./Receipt";
import CustomerDetails from "./admin/customer/CustomerDetails";
import CheckoutPage from "./CheckoutPage";
import Authentication from "./authentication/Authentication";
import CategoryAdmin from "./admin/category/categoryAdmin.js";
import { Success } from "./customer/success.js";
import { Failed } from "./customer/failed.js";
// import OnlineOrderMgmt from "./admin/customer/OnlineOrderMgmt.js";

function Roms() {
  return (
    <>
      <AuthProvider>
        <Layout>
          <main>
            <Routes>
              <Route index element={<HomeC />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/menu" element={<CategoryLayout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/failed" element={<Failed />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/receipt/:receiptId" element={<Receipt />} />
              <Route path="/order/:orderId" element={<Receipt />} />

              <Route
                path="/customer"
                element={
                  <ProtectedRoute allowedTypes={["staff", "admin"]}>
                    <Customer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/on/order"
                element={
                  <ProtectedRoute allowedTypes={["staff", "admin"]}>
                    {/* <OnlineOrderMgmt /> */}
                  </ProtectedRoute>
                }
              />
              <Route path="/d3" element={<Navigate to="/d3/index.html" />} />
              <Route
                path="/admin/menu"
                element={
                  <ProtectedRoute allowedTypes={["staff", "admin"]}>
                    <MenuAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/category"
                element={
                  <ProtectedRoute allowedTypes={["staff", "admin"]}>
                    <CategoryAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderdetails"
                element={
                  <ProtectedRoute allowedTypes={["staff", "admin"]}>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute allowedTypes={["online"]}>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/:customerId"
                element={
                  <ProtectedRoute allowedTypes={["staff", "admin"]}>
                    <CustomerDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute allowedTypes={["online"]}>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </main>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default Roms;
