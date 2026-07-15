import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, Heart } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Causes", path: "/causes" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-top">
        <div className="container">
          <div className="navbar-top-content">
            <div className="navbar-contact">
              <a href="mailto:info@livingbeyondmeds.com">
                <Mail size={16} /> info@livingbeyondmeds.com
              </a>
              <a href="tel:+447476088871">
                <Phone size={16} /> +447476088871
              </a>
            </div>
            <div className="navbar-donate">
              <Link to="/donate" className="donate-btn">
                <Heart size={16} /> Donate
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-main">
        <div className="container">
          <div className="navbar-main-content">
            <Link to="/" className="navbar-logo">
              <span className="logo-text">Living Beyond Meds</span>
            </Link>

            <div className={`navbar-links ${isOpen ? "active" : ""}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isLoggedIn ? (
                <>
                  <Link to="/admin/products" className="admin-link">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="login-link">
                  Login
                </Link>
              )}
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
