import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Image as ImageIcon,
  ShoppingBag,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Causes.css";
import useScrollReveal from "../hooks/useScrollReveal";

const Causes = () => {
  useScrollReveal();
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs (stories with type: "blog")
        const storiesRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stories`,
        );
        const storiesData = await storiesRes.json();
        const blogPosts = storiesData.filter((story) => story.type === "blog");
        setBlogs(blogPosts);

        // Fetch products (for Purchase Now section)
        const productsRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`,
        );
        const productsData = await productsRes.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="causes-page">
      <Navbar />

      {/* Hero Section */}
      <section className="causes-hero">
        <div
          className="causes-hero-background"
          style={{
            backgroundImage: "url('/images/causes-hero.jpg')",
          }}
        >
          <div className="causes-hero-overlay">
            <div className="container">
              <div className="causes-hero-content">
                <h1>
                  Restoring Dignity.
                  <br />
                  Rebuilding Lives.
                  <br />
                  <span className="highlight">Renewing Hope.</span>
                </h1>
                <p className="hero-description">
                  At Living Beyond Meds, our cause is simple yet powerful:
                  <br />
                  to ensure no widow, no woman, and no vulnerable individual
                  walks through pain, grief, or transition alone.
                </p>
                <p className="hero-description">
                  Our partnership with The Widows Empowerment Trust is a
                  reflection of this calling—a shared commitment to uplift,
                  empower, and restore those who have been overlooked, unheard,
                  or unsupported in their most vulnerable moments.
                </p>
                <p
                  className="hero-description"
                  style={{ fontWeight: "600", color: "var(--gold)" }}
                >
                  We are here to offer compassion, dignity, and opportunities
                  for renewal, because every woman deserves to be seen, heard,
                  and supported through her journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="personal-story-section">
        <div className="container">
          <div className="personal-story-content">
            <span className="section-tag">Our Foundation</span>
            <h2>A Cause Rooted in Real Experience</h2>
            <p className="personal-story-intro">
              This mission is deeply personal.
            </p>
            <blockquote className="personal-story-quote">
              "Living Beyond Meds was birthed from my own journey through
              stigma, emotional pain, mental health challenges, and immigration
              struggles. In the seasons where hope seemed distant, organisations
              like The Widows Empowerment Trust became a source of
              strength—providing listening ears, encouragement, and a reminder
              that my life still had meaning."
            </blockquote>
            <p className="personal-story-conclusion">
              Today, I stand restored, and it is now my purpose to give that
              same hope to others.
            </p>
            <p
              className="personal-story-conclusion"
              style={{ fontWeight: "600", color: "var(--deep-green)" }}
            >
              Our cause is not theoretical. It is lived. It is felt. It is real.
            </p>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link to="/donate" className="btn-support">
                Support Our Cause <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Showcase - BLOGS (stories with type: "blog") */}
      <section className="photo-showcase-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Photo Showcase</span>
            <h2>Stories in Pictures</h2>
            <p>
              Real moments from the lives we've touched and the communities we
              serve.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p>Loading photos...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p>No photos available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="photo-grid">
              {blogs.map((blog) => (
                <Link
                  to={`/story/${blog._id}`}
                  key={blog._id}
                  className="photo-card"
                >
                  <div className="photo-image">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} />
                    ) : (
                      <div className="image-placeholder">
                        <ImageIcon size={40} color="#999" />
                      </div>
                    )}
                    {blog.videoUrl && (
                      <div className="video-indicator">
                        <PlayCircle size={30} color="white" />
                      </div>
                    )}
                  </div>
                  <div className="photo-content">
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <span className="read-more">
                      Read More <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/gallery" className="btn-view-gallery">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Purchase Now - PRODUCTS */}
      <section className="purchase-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Shop</span>
            <h2>Purchase Now</h2>
            <p>
              Support our cause by purchasing our products. Every purchase helps
              us continue our mission.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p>No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.slice(0, 4).map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-content">
                    <h3>{product.name}</h3>
                    <p className="product-price">
                      £{product.price.toLocaleString()}
                    </p>
                    <Link
                      to={`/product/${product._id}`}
                      className="btn-purchase"
                    >
                      <ShoppingBag size={18} /> View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/collection" className="btn-view-all-products">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Causes;
