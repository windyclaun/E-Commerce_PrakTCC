import axios from "axios";
import React from "react";

class ProductForm extends React.Component {
  state = {
    name: "",
    price: "",
    stock: "",
    image_url: "",
    description: "",
    category: "", // Menambahkan kategori ke state
    loading: false,
    error: null,
    success: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null, success: null });
    try {
      // Kirim token JWT untuk autentikasi admin
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/products", // Ganti dengan URL API yang sesuai
        {
          name: this.state.name,
          price: this.state.price,
          stock: this.state.stock,
          image_url: this.state.image_url,
          description: this.state.description,
          category: this.state.category, // Menyertakan kategori dalam request POST
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.setState({
        name: "",
        price: "",
        stock: "",
        image_url: "",
        description: "",
        category: "", // Reset kategori
        loading: false,
        success: "Produk berhasil ditambahkan!",
      });
      if (this.props.onSuccess) this.props.onSuccess();
    } catch (err) {
      this.setState({
        error: err.response?.data?.error || "Gagal menambah produk",
        loading: false,
      });
    }
  };

  render() {
    const {
      name,
      price,
      stock,
      image_url,
      description,
      category,
      loading,
      error,
      success,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        {error && (
          <div className="notification is-danger is-light is-size-7 mb-3">
            {error}
          </div>
        )}
        {success && (
          <div className="notification is-success is-light is-size-7 mb-3">
            {success}
          </div>
        )}
        <div className="field mb-3">
          <label className="label" style={{ color: "var(--primary)" }}>
            Nama Produk
          </label>
          <div className="control">
            <input
              className="input"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
              style={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div className="field mb-3">
          <label className="label" style={{ color: "var(--primary)" }}>
            Harga
          </label>
          <div className="control">
            <input
              className="input"
              name="price"
              type="number"
              value={price}
              onChange={this.handleChange}
              required
              style={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div className="field mb-3">
          <label className="label" style={{ color: "var(--primary)" }}>
            Stok
          </label>
          <div className="control">
            <input
              className="input"
              name="stock"
              type="number"
              value={stock}
              onChange={this.handleChange}
              required
              style={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div className="field mb-3">
          <label className="label" style={{ color: "var(--primary)" }}>
            URL Gambar
          </label>
          <div className="control">
            <input
              className="input"
              name="image_url"
              value={image_url}
              onChange={this.handleChange}
              style={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div className="field mb-3">
          <label className="label" style={{ color: "var(--primary)" }}>
            Deskripsi
          </label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              value={description}
              onChange={this.handleChange}
              style={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div className="field mb-3">
          <label className="label" style={{ color: "var(--primary)" }}>
            Kategori
          </label>
          <div className="control">
            <select
              className="input"
              name="category"
              value={category}
              onChange={this.handleChange}
              required
              style={{ color: "var(--primary)" }}
            >
              <option value="">Pilih Kategori</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Elektronika</option>
              <option value="furniture">Perabotan</option>
              <option value="sports">Olahraga</option>
              <option value="beauty">Kecantikan</option>
              <option value="health">Kesehatan</option>
              <option value="children">Perlengkapan Anak</option>
            </select>
          </div>
        </div>
        <div className="field mt-4">
          <button
            className={`button is-link is-fullwidth${loading ? " is-loading" : ""}`}
            disabled={loading}
            style={{ background: "var(--accent)", color: "var(--white)", fontWeight: 600 }}
          >
            {loading ? "Memuat..." : "Tambah Produk"}
          </button>
        </div>
      </form>
    );
  }
}

export default ProductForm;
