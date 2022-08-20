import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/intensive-foods/">
          Intensive foods
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNavAltMArkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/intensive-foods/foods">
              Foods
            </NavLink>
            <NavLink className="nav-link" to="/intensive-foods/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" to="/intensive-foods/orders">
              Orders
            </NavLink>
            <NavLink className="nav-link" to="/intensive-foods/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/intensive-foods/register">
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
