import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { createCartCheckoutSession } from "../services/api";
import "../styles/Cart.css";

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setError(null);
    setIsLoading(true);

    try {
      const cartItems = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const data = await createCartCheckoutSession(cartItems);
      clearCart();
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Unable to start checkout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <section className="container cart-section">
          <div className="cart-header">
            <div>
              <span className="eyebrow">Shopping cart</span>
              <h1>Your cart</h1>
              <p>{totalItems} item{totalItems === 1 ? "" : "s"} in your cart</p>
            </div>
            <div className="cart-actions">
              <button className="btn-secondary" onClick={() => navigate("/collection")}>Continue shopping</button>
              <button className="btn-clear" onClick={clearCart} disabled={!items.length}>Clear cart</button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is currently empty.</p>
              <Link to="/collection" className="btn-primary">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="cart-grid">
              <div className="cart-items">
                {items.map((item) => (
                  <article key={item.productId} className="cart-item">
                    <img src={item.image || "/product-placeholder.png"} alt={item.name} />
                    <div className="cart-item-details">
                      <h2>{item.name}</h2>
                      <p>£{item.price.toLocaleString()}</p>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                      </div>
                      <button
                        className="remove-link"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="cart-summary">
                <div className="summary-card">
                  <h2>Order summary</h2>
                  <div className="summary-row">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>
                  {error && <p className="cart-error">{error}</p>}
                  <button
                    className="btn-primary checkout-button"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? "Redirecting…" : "Checkout"}
                  </button>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
