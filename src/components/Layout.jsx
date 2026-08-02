import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
