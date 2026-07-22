import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Image as ImageIcon,
  ShoppingBag,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Particles from "../components/Particles";
import ScrollIndicator from "../components/ScrollIndicator";
import "../styles/Causes.css";
import useScrollReveal from "../hooks/useScrollReveal";

const Causes = () => {
  useScrollReveal();
  const [isReady, setIsReady] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 60);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storiesRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stories`,
        );
        const storiesData = await storiesRes.json();
        const blogPosts = storiesData.filter((story) => story.type === "blog");
        setBlogs(blogPosts);

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

      <section className="causes-hero">
        <div className="causes-hero-backdrop" />
        <div className="causes-hero-glow" />
        <Particles count={60} color="rgba(243, 193, 62, 0.12)" />
        <ScrollIndicator />

        <div className="container causes-hero-content">
          <div className={`causes-hero-copy ${isReady ? "is-ready" : ""}`}>
            <span className="causes-eyebrow">Living Beyond Meds • The Widows Empowerment Trust</span>
            <h1>
              Restoring dignity through compassion,
              <span>opportunity, and lasting support.</span>
            </h1>
            <p>
              We stand beside widows and vulnerable women as they navigate grief,
              uncertainty, and reinvention with courage and care.
            </p>

            <div className="causes-hero-actions">
              <Link to="/donate" className="causes-btn causes-btn-primary">
                Donate Now <ArrowRight size={18} />
              </Link>
              <Link to="/collection" className="causes-btn causes-btn-ghost">
                Shop To Support <ShoppingBag size={18} />
              </Link>
            </div>
          </div>

          <div className={`causes-hero-card ${isReady ? "is-ready" : ""}`}>
            <p className="causes-card-label">Impact in motion</p>
            <div className="causes-stat-grid">
              <div>
                <strong>500+</strong>
                <span>Women supported</span>
              </div>
              <div>
                <strong>30</strong>
                <span>Community partners</span>
              </div>
              <div>
                <strong>1</strong>
                <span>Purpose-led mission</span>
              </div>
            </div>
            <p className="causes-card-note">
              Every contribution helps create safe spaces, practical support,
              and renewed hope.
            </p>
          </div>
        </div>
      </section>

      <section className="causes-intro-section scroll-reveal">
        <div className="container causes-intro-grid">
          <div className="causes-intro-copy">
            <span className="section-tag">Our Foundation</span>
            <h2>A cause rooted in lived experience.</h2>
            <p>
              This mission is deeply personal. It was shaped by seasons of
              stigma, emotional pain, and reinvention—and by the organisations
              that helped restore hope when it felt impossible to find.
            </p>
            <blockquote>
              “Living Beyond Meds was born from the belief that healing becomes
              possible when compassion meets practical care.”
            </blockquote>
          </div>

          <div className="causes-intro-panel">
            <div className="causes-panel-icon">
              <HeartHandshake size={24} />
            </div>
            <h3>Support that feels human</h3>
            <p>
              We build every step around dignity, emotional safety, and real
              encouragement for women navigating life-changing transitions.
            </p>
          </div>
        </div>
      </section>

      <section className="causes-pillars-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Prioritise</span>
            <h2>Three pillars of care.</h2>
            <p>
              A thoughtful blend of emotional support, practical action, and long-term hope.
            </p>
          </div>

          <div className="causes-pillars-grid">
            <article className="causes-pillar-card">
              <div className="causes-pillar-icon">
                <HeartHandshake size={22} />
              </div>
              <h3>Emotional Healing</h3>
              <p>Gentle, compassionate support for grief, loss, and uncertainty.</p>
            </article>
            <article className="causes-pillar-card">
              <div className="causes-pillar-icon">
                <ShieldCheck size={22} />
              </div>
              <h3>Practical Empowerment</h3>
              <p>Tools, guidance, and opportunities that help women move forward.</p>
            </article>
            <article className="causes-pillar-card">
              <div className="causes-pillar-icon">
                <Sparkles size={22} />
              </div>
              <h3>Renewed Hope</h3>
              <p>Community-led care that helps dignity and purpose return.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="causes-gallery-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Stories in Focus</span>
            <h2>Moments of care, courage, and connection.</h2>
            <p>Real stories from the people and communities we honour.</p>
          </div>

          {loading ? (
            <div className="causes-state-card">
              <p>Loading stories...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="causes-state-card">
              <p>No stories available yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="causes-gallery-grid">
              {blogs.map((blog) => (
                <Link to={`/story/${blog._id}`} key={blog._id} className="causes-gallery-card">
                  <div className="causes-gallery-image">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} />
                    ) : (
                      <div className="image-placeholder">
                        <ImageIcon size={36} color="#999" />
                      </div>
                    )}
                    {blog.videoUrl && (
                      <div className="video-indicator">
                        <PlayCircle size={28} color="white" />
                      </div>
                    )}
                  </div>
                  <div className="causes-gallery-content">
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <span className="read-more">Read Story <ArrowRight size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="causes-support-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Support the Mission</span>
            <h2>Shop with purpose.</h2>
            <p>Every purchase helps sustain this work and extend support farther.</p>
          </div>

          {loading ? (
            <div className="causes-state-card">
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="causes-state-card">
              <p>No products available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="causes-products-grid">
              {products.slice(0, 4).map((product) => (
                <div key={product._id} className="causes-product-card">
                  <div className="causes-product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="causes-product-content">
                    <h3>{product.name}</h3>
                    <p className="causes-product-price">£{product.price.toLocaleString()}</p>
                    <Link to={`/product/${product._id}`} className="causes-btn causes-btn-ghost causes-btn-small">
                      View Product <ShoppingBag size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="causes-support-cta">
            <Link to="/collection" className="causes-btn causes-btn-primary">
              Explore the Collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Causes;
