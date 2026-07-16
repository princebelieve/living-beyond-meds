import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>Living Beyond Meds</h3>
            <p>
              An organization set up to provide help and raise money for those
              in need. Supporting widows, families, and vulnerable individuals.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/causes">Causes</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <Phone size={16} />
                <a href="tel:+447476088871">+447476088871</a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:info@livingbeyondmeds.com">
                  info@livingbeyondmeds.com
                </a>
              </li>
              <li>
                <MapPin size={16} />
                <span>United Kingdom</span>
              </li>
            </ul>
          </div>

          <div className="footer-cta">
            <h4>Get In Touch</h4>
            <p>Join us in making a difference</p>
            <Link to="/donate" className="footer-donate-btn">
              <Heart size={16} /> Donate Now
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Copyright 2025 Living Beyond Meds – All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
