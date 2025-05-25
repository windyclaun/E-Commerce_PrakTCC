import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Product from "./pages/product";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Cart from "./components/cart";
import CartPage from "./pages/cartPage";
import "./custom.css"; // Importing custom CSS

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Product />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={<Dashboard cartComponent={Cart} />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
