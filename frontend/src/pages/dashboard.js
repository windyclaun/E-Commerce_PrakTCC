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
        <section className="section">
          <div className="box" style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 className="title has-text-centered has-text-link-dark mb-5">
              Dashboard Admin
            </h2>
            <h3 className="subtitle has-text-link mb-4">Tambah Produk Baru</h3>
            <ProductForm onSuccess={this.handleProductAdded} />
            <hr />
            
          </div>
        </section>
      );
    }
    // Render untuk customer
    if (role === "customer") {
      return this.renderContainer(
        <section className="section">
          <div className="box" style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 className="title has-text-centered has-text-link-dark mb-5">
              Dashboard Customer
            </h2>
            <h3 className="subtitle has-text-link mb-4">Daftar Produk</h3>
            {loading ? (
              <div className="has-text-centered">Memuat produk...</div>
            ) : error ? (
              <div className="notification is-danger is-light">{error}</div>
            ) : (
              <table className="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Stok</th>
                    <th>Gambar</th>
                    <th>Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>Rp {p.price?.toLocaleString("id-ID")}</td>
                      <td>{p.stock}</td>
                      <td>
                        {p.image_url && (
                          <img
                            src={p.image_url}
                            alt={p.name}
                            style={{
                              width: 48,
                              height: 48,
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td>{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mt-5">
              <h4 className="subtitle is-6 has-text-link">Keranjang Belanja</h4>
              <this.props.cartComponent />
            </div>
          </div>
        </section>
      );
    }
    // Jika bukan admin/customer
    return this.renderContainer(
      <section className="section">
        <div className="box" style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 className="title has-text-centered has-text-link-dark mb-5">
            Dashboard
          </h2>
          <p className="has-text-centered">
            Selamat datang, Anda berhasil login!
          </p>
        </div>
      </section>
    );
  }
}

export default Dashboard;
