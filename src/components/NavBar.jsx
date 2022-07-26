import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/intensive-foods/">
          Intensive foods
        </NavLink>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/intensive-foods/foods">
              Foods
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/intensive-foods/customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/intensive-foods/orders">
              Orders
            </NavLink>
          </li>
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/intensive-foods/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/intensive-foods/login">
                  Login
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/intensive-foods/profile">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/intensive-foods/logout">
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
