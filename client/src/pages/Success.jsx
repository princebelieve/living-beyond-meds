//client/src/pages/Success.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Success() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the Stripe page from history
    window.history.replaceState(null, "", "/success");

    fetch(`${BASE_URL}/api/orders/latest`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load order");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch(() => setOrder({ error: true }));
  }, []);

  if (!order) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Payment Successful 🎉</h1>
        <p>Loading your order...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Thank you for your order.</p>

      {!order.error && (
        <div style={{ margin: "24px 0" }}>
          <h3>Order Details</h3>
          <p>Product ID: {order.productId}</p>
          <p>Amount: £{order.amount.toLocaleString()}</p>
          <p>Status: {order.status}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/", { replace: true })}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>

        <Link
          to="/collection"
          replace="true"
          style={{
            padding: "12px 20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
