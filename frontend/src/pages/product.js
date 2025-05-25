import React from "react";
import BasePage from "./BasePage";
import Loading from "../components/loading";
import axios from "axios";

class Product extends BasePage {
  state = {
    products: [],
    loading: true,
    error: null,
    role: null,
  };

  async componentDidMount() {
    let role = null;
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        role = payload.role;
      }
    } catch {}
    this.setState({ loading: true, role });
    try {
      const res = await fetch("/api/products");
      const products = await res.json();
      this.setState({ products, loading: false });
    } catch (err) {
      this.setState({ error: "Gagal memuat produk", loading: false });
    }
  }

  handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login untuk menambah ke keranjang.");
      return;
    }
    try {
      // Default quantity 1, total_price = product.price
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
          total_price: product.price,
        }),
      });
      alert("Produk berhasil dimasukkan ke keranjang!");
    } catch (err) {
      alert("Gagal menambah ke keranjang");
    }
  };

  handleDeleteProduct = async (productId) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.setState((prev) => ({
        products: prev.products.filter((p) => p.id !== productId),
      }));
    } catch (err) {
      let msg = "Gagal menghapus produk";
      if (err.response && err.response.data && err.response.data.error) {
        if (
          err.response.data.error.includes("a foreign key constraint fails") ||
          err.response.data.error.includes(
            "Cannot delete or update a parent row"
          )
        ) {
          msg =
            "Tidak dapat menghapus produk karena masih ada order/transaksi yang menggunakan produk ini.";
        }
      }
      alert(msg);
    }
  };

  render() {
    const { products = [], loading, error, role } = this.state;
    if (loading) return <Loading />;
    if (error) return <div className="notification is-danger">{error}</div>;
    return this.renderContainer(
      <section className="section">
        <div className="container">
          <h2 className="title has-text-link-dark has-text-centered">
            🌊 Daftar Produk
          </h2>
          <div
            className="columns is-multiline is-mobile"
            style={{ marginLeft: -10, marginRight: -10 }}
          >
            {products.length === 0 && (
              <div className="column is-12 has-text-centered has-text-grey">
                Tidak ada produk.
              </div>
            )}
            {products.map((product) => (
              <div
                key={product.id}
                className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile"
                style={{ marginBottom: 32 }}
              >
                <div
                  className="card"
                  style={{
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 4px 16px 0 rgba(122,178,211,0.10)",
                    transition: "transform 0.2s",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="card-image has-text-centered"
                    style={{ background: "var(--secondary-bg)", padding: 24 }}
                  >
                    <figure
                      className="image is-128x128 is-inline-block"
                      style={{ margin: 0 }}
                    >
                      <img
                        src={product.image_url || "/logo192.png"}
                        alt={product.name}
                        style={{
                          objectFit: "cover",
                          borderRadius: 12,
                          boxShadow: "0 2px 8px 0 rgba(74,98,138,0.08)",
                        }}
                      />
                    </figure>
                  </div>
                  <div className="card-content" style={{ padding: 12 }}>
                    <p
                      className="title is-5"
                      style={{
                        color: "var(--primary)",
                        fontWeight: 600,
                        marginBottom: 2,
                        fontSize: 13,
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      className="subtitle is-6"
                      style={{
                        color: "var(--accent)",
                        fontWeight: 500,
                        marginBottom: 6,
                        fontSize: 12,
                      }}
                    >
                      Rp {product.price?.toLocaleString("id-ID")}
                    </p>
                    <p
                      className="has-text-grey"
                      style={{ fontSize: 11, minHeight: 24 }}
                    >
                      {product.description}
                    </p>
                  </div>
                  <footer
                    className="card-footer"
                    style={{
                      background: "var(--primary-bg)",
                      borderTop: "none",
                    }}
                  >
                    {role === "admin" ? (
                      <button
                        className="card-footer-item button is-danger is-light"
                        style={{
                          borderRadius: 0,
                          borderBottomLeftRadius: 16,
                          borderBottomRightRadius: 16,
                          fontWeight: 600,
                        }}
                        onClick={() => this.handleDeleteProduct(product.id)}
                      >
                        Hapus Produk
                      </button>
                    ) : (
                      <button
                        className="card-footer-item button is-link is-light"
                        style={{
                          borderRadius: 0,
                          borderBottomLeftRadius: 16,
                          borderBottomRightRadius: 16,
                          fontWeight: 600,
                        }}
                        onClick={() => this.handleAddToCart(product)}
                      >
                        Tambah ke Keranjang
                      </button>
                    )}
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Product;
