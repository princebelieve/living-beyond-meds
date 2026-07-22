import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/About.css";

export default function About() {
  useScrollReveal();
  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero scroll-reveal">
          <div className="container about-hero-inner">
            <div className="about-copy">
              <span className="eyebrow">About Living Beyond Meds</span>
              <h1>Standing Together to Restore Hope</h1>
              <p>
                Living Beyond Meds is an organisation birthed from personal
                transformation, deep faith, and a calling to support women and
                vulnerable individuals walking through some of life's most
                difficult journeys.
              </p>
              <div className="about-hero-actions">
                <a href="https://wa.me/447476088871?text=Hello%2C%20I%20would%20love%20to%20learn%20more%20about%20your%20work." className="about-cta about-cta-primary" target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
                <a href="/contact" className="about-cta about-cta-ghost">
                  Contact Us
                </a>
              </div>
              <div className="about-founder">
                <img
                  src="/founder.jpg"
                  alt="Founder of Living Beyond Meds"
                  className="founder-photo"
                />
                <div className="founder-info">
                  <h3>Wumi Adebayo</h3>
                  <p>Founder & CEO</p>
                </div>
              </div>
            </div>

            <div className="about-image-wrap">
              <img src="/about.jpg" alt="Living Beyond Meds" />
            </div>
          </div>
        </section>

        <section className="section-alt scroll-reveal">
          <div className="container about-story">
            <div className="story-card">
              <h2 className="title">Our Story</h2>
              <p>
                Our work is strengthened through our partnership with The Widows
                Empowerment Trust, a charity that has played a vital role in
                Wumi's own journey of rebuilding and restoration.
              </p>
              <p>
                Together, we are committed to empowering widows, supporting
                families, and giving voice to women who often feel unseen or
                unheard. We stand with women facing grief, isolation, trauma,
                and life transitions. Our heart is to ensure that no woman feels
                alone during her most vulnerable season.
              </p>
            </div>

            <div className="story-card story-card-accent">
              <h2 className="title">Our Promise</h2>
              <ul className="promise-list">
                <li>Emotional & Mental Wellbeing Support</li>
                <li>Empowerment & Skills Training</li>
                <li>Community Outreach for vulnerable women</li>
                <li>Advocacy, awareness, and dignity</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section-alt">
          <div className="container">
            <div className="values-header">
              <span className="eyebrow">Why People Trust Us</span>
              <h2 className="title">Support, Healing, and Community Care</h2>
            </div>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <h3>Safe Support Spaces</h3>
              <p>
                We create safe, compassionate spaces for women navigating grief,
                trauma, and life transitions.
              </p>
            </div>
            <div className="service-card">
              <h3>Skills and Empowerment</h3>
              <p>
                Our programs build confidence, resilience, and practical skills
                for independence.
              </p>
            </div>
            <div className="service-card">
              <h3>Community Outreach</h3>
              <p>
                We connect widows and vulnerable women with vital resources,
                care, and advocacy.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
