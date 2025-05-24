import React from "react";
import BasePage from "./BasePage";
import Loading from "../components/loading";

class Product extends BasePage {
  state = {
    products: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
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

  render() {
    const { products = [], loading, error } = this.state;
    if (loading) return <Loading />;
    if (error) return <div className="notification is-danger">{error}</div>;
    return this.renderContainer(
      <section className="section">
        <div className="container">
          <h2 className="title has-text-link-dark has-text-centered">
            🌊 Daftar Produk
          </h2>
          <div className="columns is-multiline is-mobile">
            {products.length === 0 && (
              <div className="column is-12 has-text-centered has-text-grey">
                Tidak ada produk.
              </div>
            )}
            {products.map((product) => (
              <div
                key={product.id}
                className="column is-3-desktop is-4-tablet is-6-mobile"
              >
                <div className="card">
                  <div className="card-image has-text-centered">
                    <figure className="image is-128x128 is-inline-block">
                      <img
                        src={product.image_url || "/logo192.png"}
                        alt={product.name}
                        style={{ objectFit: "cover" }}
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="title is-5">{product.name}</p>
                    <p className="subtitle is-6 has-text-link">
                      Rp {product.price?.toLocaleString("id-ID")}
                    </p>
                    <p className="has-text-grey">{product.description}</p>
                  </div>
                  <footer className="card-footer">
                    <button
                      className="card-footer-item button is-link is-light"
                      onClick={() => this.handleAddToCart(product)}
                    >
                      Tambah ke Keranjang
                    </button>
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
