//client/src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createCheckoutSession } from "../services/api";
import { useCart } from "../contexts/CartContext";
import "../styles/Product.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.message === "Product not found") {
          setProduct(null);
          return;
        }
        setProduct(data);
      });
  }, [id]);

  async function buyNow() {
    try {
      const data = await createCheckoutSession(id);
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout session error:", err);

      if (err.message) {
        alert(err.message);
      } else {
        alert("Unable to start payment. Please try again.");
      }
    }
  }

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setStatusMessage("Added to cart.");
    window.setTimeout(() => setStatusMessage(""), 2600);
  };

  if (!product) {
    return (
      <div className="page">
        <Navbar />
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="product-detail">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />

          <div className="product-detail-content">
            <h1>{product.name}</h1>
            <h2>£{Number(product?.price || 0).toLocaleString()}</h2>

            <div className="product-actions">
              <button className="primary" onClick={buyNow}>
                Buy Now
              </button>
              <button className="secondary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
