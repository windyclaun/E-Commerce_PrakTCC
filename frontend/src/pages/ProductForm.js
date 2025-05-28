import api from "../api";
import React from "react";

class ProductForm extends React.Component {
  state = {
    name: "",
    price: "",
    stock: "",
    image: null, // Menyimpan gambar yang di-upload
    description: "",
    category: "", // Menambahkan kategori ke state
    loading: false,
    error: null,
    success: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Mengubah handleChange untuk file input
  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/jpg"].includes(file.type)) {
      this.setState({
        error: "File harus berupa gambar JPG/JPEG",
        image: null,
      });
      return;
    }
    this.setState({ image: file, error: null });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null, success: null });

    const { name, price, stock, description, category, image } = this.state;
    const token = localStorage.getItem("token");

    if (!image) {
      this.setState({ error: "Gambar produk wajib diisi", loading: false });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);

      await api.addProduct(formData, token);

      // Animasi fade out sebelum reset/redirect
      document.body.classList.add("fade-page-exit-active");
      setTimeout(() => {
        this.setState({
          name: "",
          price: "",
          stock: "",
          description: "",
          category: "",
          image: null,
          loading: false,
          success: "Produk berhasil ditambahkan!",
          error: null,
        });
        if (this.props.onSuccess) this.props.onSuccess();
        if (this.props.redirect) {
          window.location.href = this.props.redirect;
        }
      }, 400);
    } catch (err) {
      let msg = "Gagal menambah produk";
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      } else if (err.response && err.response.data && err.response.data.error) {
        msg =
          typeof err.response.data.error === "string"
            ? err.response.data.error
            : JSON.stringify(err.response.data.error);
      } else if (err.message) {
        msg = err.message;
      }
      this.setState({
        error: msg,
        loading: false,
      });
    }
  };

  render() {
    const {
      name,
      price,
      stock,
      description,
      category,
      image,
      loading,
      error,
      success,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        {error && (
          <div className="notification is-danger is-light is-size-7 mb-3">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}
        {success && (
          <div className="notification is-success is-light is-size-7 mb-3">
            {typeof success === "string" ? success : JSON.stringify(success)}
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
              style={{
                color: "var(--primary)",
                background: "#fffbe6", // warna kuning muda cerah dari palette
                border: "1.5px solid #d4c9be",
                fontWeight: 600,
              }}
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

        <div className="field mb-3">
          <label className="label" style={{ color: "var(--primary)" }}>
            Gambar Produk (jpg/jpeg)
          </label>
          <div className="control">
            <input
              type="file"
              name="image"
              accept="image/jpeg, image/jpg"
              onChange={this.handleFileChange}
              required
            />
          </div>
        </div>

        <div className="field mt-4">
          <button
            className={`button is-link is-fullwidth${
              loading ? " is-loading" : ""
            }`}
            disabled={loading}
            style={{
              background: "var(--accent)",
              color: "var(--white)",
              fontWeight: 600,
            }}
          >
            {loading ? "Memuat..." : "Tambah Produk"}
          </button>
        </div>
      </form>
    );
  }
}

export default ProductForm;
