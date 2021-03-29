import React from "react";
import { Link } from "react-router-dom";
import { Button, NavbarBrand } from "react-bootstrap";

const Items = [
  {
    name: "Bar Chart",
    route: "bar-chart",
  },
];

function Sidebar() {
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
        {Items.map((e) => {
          return (
            <Link to={e.route} key={e.route} className="text-white">
              {e.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
