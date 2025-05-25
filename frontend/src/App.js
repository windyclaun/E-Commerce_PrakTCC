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
  React.useEffect(() => {
    // Set judul sesuai halaman aktif
    const handleTitle = () => {
      const path = window.location.pathname;
      let title = "MyStore";
      if (path === "/") title = "Beranda | MyStore";
      else if (path === "/login") title = "Login | MyStore";
      else if (path === "/register") title = "Register | MyStore";
      else if (path === "/products") title = "Produk | MyStore";
      else if (path === "/dashboard") title = "Dashboard | MyStore";
      else if (path === "/cart") title = "Keranjang | MyStore";
      document.title = title;
    };
    handleTitle();
    window.addEventListener("popstate", handleTitle);
    // Tambahkan event listener untuk react-router navigation
    const observer = new MutationObserver(handleTitle);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("popstate", handleTitle);
      observer.disconnect();
    };
  }, []);

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
