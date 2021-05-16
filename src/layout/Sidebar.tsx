import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NavbarBrand } from "react-bootstrap";
import { Routes } from "../routes";

function Sidebar() {
  const location = useLocation();
  const path = location.pathname.slice(1, location.pathname.length);

  return (
    <div className="bg-dark px-3 text-white h-100">
      <NavbarBrand className="mb-1 mt-1 font-weight-bold">
        D3 Charts
      </NavbarBrand>
      <hr
        className="text-white bg-light p-0 mt-0 "
        style={{ opacity: "0.4" }}
      />
      <div>
        {Routes.map((e) => {
          return (
            <div
              key={e.route}
              className={path === e.route ? "active mb-3" : "mb-3"}
            >
              <Link to={e.route} className="text-white">
                {e.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
