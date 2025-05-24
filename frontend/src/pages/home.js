import React from "react";
import BasePage from "./BasePage";

class Home extends BasePage {
  render() {
    const { featured = [], loading, error } = this.state || {};
    if (loading) return <div className="has-text-centered">Loading...</div>;
    if (error) return <div className="notification is-danger">{error}</div>;
    return (
      <section
        className="section has-background-link-dark has-text-white"
        style={{ minHeight: "100vh", width: "100vw", margin: 0, padding: 0 }}
      >
        <div className="container is-fluid" style={{ width: "100%" }}>
          <h1 className="title has-text-white has-text-centered">
            🌊 Selamat Datang di MyStore!
          </h1>
          <p className="subtitle has-text-white has-text-centered">
            Temukan produk terbaik untuk kebutuhan Anda dengan mudah dan cepat.
          </p>
          <div className="columns is-multiline">
            {featured.length === 0 && (
              <div className="column is-12 has-text-centered has-text-grey-light">
                Tidak ada produk unggulan.
              </div>
            )}
            {featured.map((product) => (
              <div key={product.id} className="column is-4">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="has-text-centered mt-5">
            <a href="/products" className="button is-link is-medium">
              Lihat Semua Produk
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
