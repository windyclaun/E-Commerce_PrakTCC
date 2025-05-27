import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data produk");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/products/${id}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Produk berhasil diupdate!");
      navigate("/products");
    } catch (err) {
      setError("Gagal update produk");
    }
  };

  if (loading) return <div>Memuat...</div>;
  if (error) return <div className="notification is-danger">{error}</div>;
  if (!product) return null;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 500, margin: "0 auto" }}>
        <h2 className="title has-text-centered has-text-link-dark mb-5">
          Edit Produk
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label
              className="label"
              style={{ color: "var(--primary)", fontWeight: 700 }}
            >
              Nama Produk
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={product.name || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label
              className="label"
              style={{ color: "var(--primary)", fontWeight: 700 }}
            >
              Harga
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="price"
                value={product.price || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label
              className="label"
              style={{ color: "var(--primary)", fontWeight: 700 }}
            >
              Stok
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="stock"
                value={product.stock || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field mb-3">
            <label
              className="label"
              style={{ color: "var(--primary)", fontWeight: 700 }}
            >
              Kategori
            </label>
            <div className="control">
              <select
                className="input"
                name="category"
                value={product.category || ""}
                onChange={handleChange}
                required
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
          <div className="field">
            <label
              className="label"
              style={{ color: "var(--primary)", fontWeight: 700 }}
            >
              Deskripsi
            </label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                value={product.description || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label
              className="label"
              style={{ color: "var(--primary)", fontWeight: 700 }}
            >
              Image URL
            </label>
            <div className="control">
              <input
                className="input"
                type="file"
                name="image_url"
                accept="image/jpeg, image/jpg"
                value={""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field has-text-right">
            <button className="button is-link is-medium" type="submit">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProduct;
