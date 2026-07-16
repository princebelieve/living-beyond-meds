import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="contact-page">
        <section className="contact-hero">
          <div className="container contact-hero-inner">
            <div className="hero-copy">
              <img
                src="/logo.png"
                alt="Living Beyond Meds logo"
                className="brand-logo"
              />
              <span className="eyebrow">Living Beyond Meds</span>
              <h1>Standing Together to Restore Hope</h1>
              <p>
                Living Beyond Meds is an organisation birthed from personal
                transformation, deep faith, and a calling to support women and
                vulnerable individuals walking through some of life’s most
                difficult journeys.
              </p>
              <div className="hero-actions">
                <a
                  href="mailto:info@livingbeyondmeds.com"
                  className="btn btn-secondary"
                >
                  Email Us
                </a>
                <a href="tel:+447476088871" className="btn btn-primary">
                  Call +44 7476 088871
                </a>
              </div>
            </div>

            <aside className="hero-card">
              <h2>Contact Details</h2>
              <div className="contact-card-row">
                <Mail size={18} />
                <div>
                  <strong>Email</strong>
                  <p>info@livingbeyondmeds.com</p>
                </div>
              </div>
              <div className="contact-card-row">
                <Phone size={18} />
                <div>
                  <strong>Phone</strong>
                  <p>+44 7476 088871</p>
                </div>
              </div>
              <div className="contact-card-row">
                <MapPin size={18} />
                <div>
                  <strong>Location</strong>
                  <p>United Kingdom</p>
                </div>
              </div>
              <div className="contact-card-row social-row">
                <strong>Follow Us</strong>
                <div className="social-links">
                  <a href="https://facebook.com/" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                  <a href="https://facebook.com/" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://facebook.com/" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://facebook.com/" aria-label="YouTube">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-about">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">About Us</span>
              <h2>Standing Together to Restore Hope</h2>
            </div>
            <div className="about-copy">
              <p>
                Our work is strengthened through our partnership with The Widows
                Empowerment Trust, a charity that has played a vital role in
                Wumi’s own journey of rebuilding and restoration. Together, we
                are committed to empowering widows, supporting families, and
                giving voice to women who often feel unseen or unheard.
              </p>
              <p>
                We stand with women facing grief, isolation, trauma, and life
                transitions. Our heart is to ensure that no woman feels alone
                during her most vulnerable season.
              </p>
              <a
                href="http://livingbeyondmeds.com/contact/"
                className="btn btn-primary hero-link"
              >
                Join With Us
              </a>
            </div>
          </div>
        </section>

        <section className="contact-services">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">What We Do</span>
              <h2>How We Care for Communities</h2>
            </div>
            <div className="services-grid">
              <article className="service-card">
                <span className="service-number">01</span>
                <h3>Emotional & Mental Wellbeing Support</h3>
                <p>
                  Providing safe, compassionate spaces for women navigating
                  grief, trauma, and major life transitions.
                </p>
              </article>
              <article className="service-card">
                <span className="service-number">02</span>
                <h3>Empowerment & Skills Training</h3>
                <p>
                  Workshops and development sessions that build confidence,
                  resilience, and self-sufficiency.
                </p>
              </article>
              <article className="service-card">
                <span className="service-number">03</span>
                <h3>Community Outreach</h3>
                <p>
                  Practical support for widows and vulnerable women through
                  welfare assistance and community engagement.
                </p>
              </article>
              <article className="service-card">
                <span className="service-number">04</span>
                <h3>Advocacy & Awareness</h3>
                <p>
                  Standing against stigma, isolation, and silence around
                  widowhood and mental health.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
