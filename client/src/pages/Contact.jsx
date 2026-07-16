import { Mail, Phone, MapPin } from "lucide-react";
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
              <h1>Contact Us</h1>
              <p>
                Get in touch to learn how you can support widows and vulnerable
                women through prayer, giving, or partnership.
              </p>
              <div className="hero-actions">
                <a
                  href="mailto:info@livingbeyondmeds.com"
                  className="btn btn-secondary"
                >
                  info@livingbeyondmeds.com
                </a>
                <a href="tel:+447476088871" className="btn btn-primary">
                  +44 7476 088871
                </a>
              </div>
            </div>

            <aside className="hero-card">
              <h2>Contact Details</h2>
              <div className="contact-card-row">
                <Mail size={18} />
                <div>
                  <strong>Support Email</strong>
                  <p>info@livingbeyondmeds.com</p>
                </div>
              </div>
              <div className="contact-card-row">
                <Phone size={18} />
                <div>
                  <strong>Phone Number</strong>
                  <p>+44 7476 088871</p>
                </div>
              </div>
              <div className="contact-card-row">
                <MapPin size={18} />
                <div>
                  <strong>Address</strong>
                  <p>
                    29 Cross Street Chapel, Cross Street, Manchester, M2 1NL
                  </p>
                </div>
              </div>
              <div className="contact-card-row social-row">
                <strong>Follow Us</strong>
                <div className="social-links">
                  <a href="https://facebook.com/" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com/" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com/" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://youtube.com/" aria-label="YouTube">
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
                Wumi’s own journey of rebuilding and restoration.
              </p>
              <p>
                Together, we are committed to empowering widows, supporting
                families, and giving voice to women who often feel unseen or
                unheard.
              </p>
              <a href="/about" className="btn btn-primary hero-link">
                Learn More About Us
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

        <section className="contact-map">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Our Location</span>
              <h2>Visit Us in Manchester</h2>
            </div>
            <div className="map-wrapper">
              <iframe
                title="Living Beyond Meds Manchester"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.1234567890123!2d-2.2420001847106!3d53.4820000797818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb123456789ab%3A0xcdef1234567890ab!2s29%20Cross%20Street%20Chapel%2C%20Manchester%20M2%201NL!5e0!3m2!1sen!2suk!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
