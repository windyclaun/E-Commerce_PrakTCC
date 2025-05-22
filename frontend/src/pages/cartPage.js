import React from "react";
import axios from "axios";

class CartPage extends React.Component {
  state = {
    orders: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      let userId = null;
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload && payload.id;
      }
      if (!userId) throw new Error("User tidak ditemukan");
      const res = await axios.get(`/api/orders`);
      const userOrders = res.data.filter((order) => order.user_id === userId);
      this.setState({ orders: userOrders, loading: false });
    } catch (err) {
      this.setState({ error: "Gagal memuat keranjang", loading: false });
    }
  }

  render() {
    const { orders, loading, error } = this.state;
    // Ambil userId dari token
    let userId = null;
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload && payload.id;
      } catch {}
    }
    return (
      <section className="section">
        <div className="box" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="title has-text-centered has-text-link-dark mb-5">
            Keranjang Belanja
          </h2>
          <div className="has-text-right is-size-7 mb-2">
            <span className="tag is-link is-light">
              User ID: {userId || "-"}
            </span>
          </div>
          {loading ? (
            <div>Memuat...</div>
          ) : error ? (
            <div className="notification is-danger is-light is-size-7 mb-2">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="has-text-grey-light">Keranjang kosong</div>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id} style={{ marginBottom: 8 }}>
                  {order.product_name} x{order.quantity} - Rp{" "}
                  {order.total_price?.toLocaleString("id-ID")}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }
}

export default CartPage;
