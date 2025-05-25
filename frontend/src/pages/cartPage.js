import React from "react";
import axios from "axios";

class CartPage extends React.Component {
  state = {
    orders: [],
    loading: true,
    error: null,
    userId: null,
    selectedOrders: [],
  };

  async componentDidMount() {
    await this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      let userId = null;
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload && payload.id;
      }
      if (!userId) throw new Error("User tidak ditemukan");
      const res = await axios.get(`/api/orders/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.setState({
        orders: res.data,
        loading: false,
        userId,
        selectedOrders: [],
      });
    } catch (err) {
      this.setState({ error: "Gagal memuat keranjang", loading: false });
    }
  };

  handleDelete = async (orderId) => {
    if (!window.confirm("Yakin ingin menghapus item ini dari keranjang?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await this.fetchOrders();
    } catch (err) {
      alert("Gagal menghapus order");
    }
  };

  handleSelect = (orderId) => {
    this.setState((prev) => {
      const selected = prev.selectedOrders.includes(orderId)
        ? prev.selectedOrders.filter((id) => id !== orderId)
        : [...prev.selectedOrders, orderId];
      return { selectedOrders: selected };
    });
  };

  render() {
    const { orders, loading, error, userId, selectedOrders } = this.state;
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
            <>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {orders.map((order) => (
                  <li
                    key={order.id}
                    style={{
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      background: "var(--secondary-bg)",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => this.handleSelect(order.id)}
                      style={{ marginRight: 12, width: 18, height: 18 }}
                      title="Pilih untuk checkout"
                    />
                    <img
                      src={
                        order.image_url || order.product_image || "/logo192.png"
                      }
                      alt={order.product_name || order.name || "Produk"}
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 8,
                        marginRight: 16,
                        background: "#fff",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "var(--primary)",
                          fontSize: 15,
                        }}
                      >
                        {order.product_name || order.name || "(Tanpa Nama)"}
                      </div>
                      <div
                        style={{
                          color: "var(--accent)",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        Rp {order.total_price?.toLocaleString("id-ID")}
                      </div>
                      <div style={{ color: "#888", fontSize: 13 }}>
                        x{order.quantity}
                      </div>
                    </div>
                    <button
                      className="button is-danger is-light is-small ml-3"
                      style={{ height: 32 }}
                      title="Hapus order"
                      onClick={() => this.handleDelete(order.id)}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 has-text-right">
                <button
                  className="button is-link is-medium"
                  disabled={selectedOrders.length === 0}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}

export default CartPage;
