import api from "../api";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckoutPage() {
  const location = useLocation();
  const { selectedOrders, orders } = location.state || {};
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      // Checkout semua order yang dipilih
      // Filter hanya order dengan status 'pending' dan milik user
      let userId = null;
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          userId = payload && payload.id;
        } catch {}
      }
      const pendingOrderIds = selectedOrderDetails
        .filter((o) => o.status === "pending" && o.user_id === userId)
        .map((o) => o.id);
      if (pendingOrderIds.length === 0) {
        setError(
          "Tidak ada order dengan status 'pending' milik Anda yang bisa di-checkout."
        );
        setLoading(false);
        return;
      }
      await Promise.all(
        pendingOrderIds.map((orderId) => api.checkoutOrder(orderId, token))
      );
      setSuccess(true);
    } catch (err) {
      let msg = "Checkout gagal. Silakan coba lagi.";
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          msg = err.response.data.message;
        } else if (err.response.data.error) {
          msg =
            typeof err.response.data.error === "string"
              ? err.response.data.error
              : JSON.stringify(err.response.data.error);
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) return <Navigate to="/cart" replace />;
  if (!selectedOrders || !orders) return <Navigate to="/cart" replace />;

  const selectedOrderDetails = orders.filter((o) =>
    selectedOrders.includes(o.id)
  );
  const total = selectedOrderDetails.reduce(
    (sum, o) => sum + (o.total_price || 0),
    0
  );

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 className="title has-text-centered has-text-link-dark mb-5">
          Checkout
        </h2>
        {error && (
          <div className="notification is-danger is-light is-size-7 mb-3">
            {error}
          </div>
        )}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {selectedOrderDetails.map((order) => (
            <li
              key={order.id}
              style={{
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={order.image_url || order.product_image || "/logo192.png"}
                alt={order.product_name || order.name || "Produk"}
                style={{
                  width: 48,
                  height: 48,
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
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order.total_price || 0)}
                </div>
                <div style={{ color: "#888", fontSize: 13 }}>
                  x{order.quantity}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 mb-4 has-text-right">
          <span className="is-size-5 has-text-weight-bold">
            Total:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(total)}
          </span>
        </div>
        <div className="has-text-right">
          <button
            className={`button is-link is-medium${
              loading ? " is-loading" : ""
            }`}
            onClick={handleCheckout}
            disabled={loading}
          >
            Konfirmasi & Bayar
          </button>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
