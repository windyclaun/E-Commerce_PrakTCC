import React, { Component, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cart from "./cart";

// Komponen Link aktif Bulma
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`navbar-item${isActive ? " has-text-link" : ""}`}
      style={{ fontWeight: 600 }}
    >
      {children}
    </Link>
  );
}

function NavbarContent() {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const token = localStorage.getItem("token");
  let isLoggedIn = Boolean(token);
  let role = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch {}
  }
  const isSeller = false;

  return (
    <nav
      className="navbar has-background-link-dark has-text-white"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link
          to="/"
          className="navbar-item has-text-white"
          style={{ fontWeight: 700 }}
        >
          MyStore
        </Link>
        <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
          onClick={() => {
            const menu = document.getElementById("navbarBasic");
            menu.classList.toggle("is-active");
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div id="navbarBasic" className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Produk</NavLink>
          {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
          {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        </div>
        <div className="navbar-end">
          {isLoggedIn && role === "admin" && (
            <NavLink to="/dashboard">Dashboard</NavLink>
          )}
          {isLoggedIn && role === "customer" && (
            <div className="navbar-item">
              <button
                className="button is-link is-light is-small"
                onClick={() => navigate("/cart")}
              >
                Keranjang
              </button>
            </div>
          )}
          {isLoggedIn && (
            <div className="navbar-item">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                  window.location.reload();
                }}
                className="button is-link is-light is-small"
              >
                Logout
              </button>
            </div>
          )}
          {isSeller && (
            <div className="navbar-item">
              <button
                onClick={() => navigate("/seller")}
                className="button is-link is-light is-small"
              >
                Seller Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

class Navbar extends Component {
  render() {
    return (
      <header>
        <NavbarContent />
      </header>
    );
  }
}

export default Navbar;
