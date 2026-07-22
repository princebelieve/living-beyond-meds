import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Heart } from "lucide-react";
import useClickOutside from "../hooks/useClickOutside";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token"),
  );
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const clickRefs = useRef([]);

  useEffect(() => {
    clickRefs.current = [menuRef.current, toggleRef.current];
  }, []);

  useClickOutside(clickRefs, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              <img
                src="/logo.png"
                alt="Living Beyond Meds logo"
                className="navbar-logo-image"
              />
              <span className="logo-text">Living Beyond Meds</span>
            </Link>

            <div
              ref={menuRef}
              className={`navbar-links ${isOpen ? "active" : ""}`}
            >
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== "/" &&
                    location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={isActive ? "nav-link active" : "nav-link"}
                  >
                    {link.name}
                  </Link>
                );
              })}
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
              ref={toggleRef}
              className="mobile-menu-btn"
              onClick={() => setIsOpen((prev) => !prev)}
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
