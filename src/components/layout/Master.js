import React from "react";
import Sidebar from "../partoals/SideBar";
import Footer from "../partoals/Footer";
import Nav from "../partoals/Nav";

import { Outlet } from "react-router-dom";

export default function Master() {
  return (
    <>
      <Nav />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
