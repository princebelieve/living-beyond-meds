import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/Contact.css";

export default function Contact() {
  useScrollReveal();
  return (
    <>
      <Navbar />

      <main className="contact-page">
        <section className="contact-hero scroll-reveal">
          <div className="container contact-hero-inner">
            <div className="hero-copy">
              <h1>Contact Us</h1>
              <p>
                Have questions or want to partner with us? We'd love to hear
                from you. Reach out and let's make a difference together.
              </p>
            </div>

            <aside className="hero-card">
              <h2>Get in Touch</h2>
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

        <section className="contact-map scroll-reveal">
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
