//client/src/pages/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import useScrollReveal from "../hooks/useScrollReveal";
import Footer from "../components/Footer";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  useScrollReveal();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero-section reveal">
        <Hero />
      </section>

      {/* DUAL AUDIENCE SECTION */}
      <section className="section reveal">
        <div className="container dual-grid">
          <div className="dual-card hover-lift">
            <span className="dual-label">READY TO WEAR</span>
            <h2>Premium Fashion Collection</h2>
            <p>
              Discover senator wears, suits, gowns and refined styles created
              for modern elegance.
            </p>
          </div>

          <div className="dual-card hover-lift">
            <span className="dual-label">BESPOKE TAILORING</span>
            <h2>Custom-Made To Your Measurements</h2>
            <p>
              Every outfit is tailored personally to your preferred fit, fabric
              and style.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="section-alt reveal">
        <div className="container">
          <h2 className="title">Featured Collection</h2>
          <p className="muted">Premium ready-to-wear fashion pieces</p>

          <ProductGrid products={products} />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section reveal">
        <div className="container">
          <h2 className="title">Our Services</h2>

          <div className="service-grid">
            <div className="service-card hover-lift">
              <h3>Luxury Tailoring</h3>
              <p>Perfect fit suits, senator wears, gowns & native styles.</p>
            </div>

            <div className="service-card hover-lift">
              <h3>Custom Design</h3>
              <p>
                We bring your fashion ideas into reality from sketch to finish.
              </p>
            </div>

            <div className="service-card hover-lift">
              <h3>Fast Delivery</h3>
              <p>
                UK-based operations with reliable production and delivery flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner reveal">
        <div className="container">
          <h2>Ready to Upgrade Your Style?</h2>
          <p>Shop or request a custom outfit today.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

