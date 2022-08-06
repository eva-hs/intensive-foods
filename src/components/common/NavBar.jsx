import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Intensive foods
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/foods">
              Foods
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/customers">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/orders">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
