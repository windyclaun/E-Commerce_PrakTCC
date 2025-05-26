import React from "react";
import axios from "axios";
import BasePage from "./BasePage";
import ProductForm from "./ProductForm";
import Cart from "../components/cart";

class Dashboard extends BasePage {
  state = {
    products: [],
    loading: true,
    error: null,
    role: null,
    accessDenied: false,
  };

  async componentDidMount() {
    // Ambil role dari token dan simpan ke state
    let role = null;
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        role = payload.role;
      }
    } catch (e) {}
    // Proteksi akses: jika bukan admin, tampilkan notifikasi
    if (role !== "admin") {
      this.setState({ accessDenied: true, role });
      return;
    }
    this.setState({ role });
    // Ambil data produk
    try {
      const res = await axios.get("/api/products");
      this.setState({ products: res.data, loading: false });
    } catch (err) {
      this.setState({ error: "Gagal memuat produk", loading: false });
    }
  }

  handleProductAdded = async () => {
    // Refresh produk setelah tambah
    this.setState({ loading: true });
    const res = await axios.get("/api/products");
    this.setState({ products: res.data, loading: false });
  };

  render() {
    const { products, loading, error, role, accessDenied } = this.state;

    if (accessDenied) {
      return this.renderContainer(
        <section className="section">
          <div className="box" style={{ maxWidth: 500, margin: "0 auto" }}>
            <div className="notification is-danger is-light has-text-centered">
              <strong>Akses Ditolak</strong>
              <br />
              Halaman ini hanya dapat diakses oleh admin.
              <br />
              <button
                className="button is-link mt-4"
                onClick={() => (window.location.href = "/")}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </section>
      );
    }

    // Render untuk admin
    if (role === "admin") {
      return this.renderContainer(
        <section
          className="section"
          style={{ background: "var(--primary-bg)", minHeight: "100vh" }}
        >
          <div
            className="box"
            style={{
              maxWidth: 500,
              margin: "0 auto",
              borderRadius: 18,
              boxShadow: "0 4px 24px #7ab2d320",
              background: "#fff",
            }}
          >
            <h2
              className="title has-text-centered mb-4"
              style={{
                color: "var(--primary)",
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              Dashboard Admin
            </h2>
            <h3
              className="subtitle mb-4 has-text-centered"
              style={{ color: "var(--accent)", fontWeight: 600 }}
            >
              Tambah Produk Baru
            </h3>
            <div style={{ marginBottom: 24 }}>
              <p
                className="has-text-grey has-text-centered"
                style={{ fontSize: 15, marginBottom: 18 }}
              >
                Silakan isi form di bawah untuk menambah produk ke toko Anda.
                Pastikan data produk sudah benar sebelum disimpan.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <ProductForm onSuccess={this.handleProductAdded} />
            </div>
          </div>
        </section>
      );
    }

    // Jika bukan admin/customer
    return this.renderContainer(
      <section className="section">
        <div className="box" style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            className="title has-text-centered mb-5"
            style={{ color: "var(--primary)" }}
          >
            Dashboard
          </h2>
          <p className="has-text-centered" style={{ color: "var(--accent)" }}>
            Selamat datang, Anda berhasil login!
          </p>
        </div>
      </section>
    );
  }
}

export default Dashboard;
