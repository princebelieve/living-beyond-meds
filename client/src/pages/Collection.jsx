import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/Product.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Collection() {
  useScrollReveal();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${BASE_URL}/api/products`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <>
      <Navbar />

      <section className="products-page section-alt reveal">
        <div className="container">
          <div className="collection-hero reveal">
            <div className="collection-copy">
              <span className="section-tag">Shop With Purpose</span>
              <h1>Support a cause with every purchase.</h1>
              <p>
                Our collection brings together thoughtful pieces that reflect
                care, dignity, and the spirit of the Living Beyond Meds mission.
                Every order helps sustain the work we do for women and families
                in need.
              </p>
              <div className="collection-actions">
                <Link to="/causes" className="btn-secondary">
                  Learn About Our Mission
                </Link>
              </div>
            </div>

            <div className="collection-card">
              <h2>Why Shop Here?</h2>
              <ul>
                <li>Thoughtfully curated pieces with a meaningful purpose</li>
                <li>Support a mission rooted in restoration and hope</li>
                <li>Every purchase contributes to real community impact</li>
              </ul>
            </div>
          </div>

          <div className="collection-body reveal">
            <div className="section-header">
              <h2>Our Collection</h2>
              <p>
                Browse the range below and choose something that speaks to your
                style while supporting our cause.
              </p>
            </div>

            {loading ? (
              <div className="empty-state">Loading collection...</div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                No products are available right now. Please check back soon.
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
