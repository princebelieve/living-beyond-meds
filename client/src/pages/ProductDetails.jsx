//client/src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createCheckoutSession } from "../services/api";
import "../styles/Product.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

            <button className="primary" onClick={buyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
