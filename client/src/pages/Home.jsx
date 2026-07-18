//client/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Globe,
  Award,
  Phone,
  Mail,
  PlayCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/hero1.jpg", // Replace with your actual image paths
      title: "Together, We Rise.",
      highlight: "Together, We Restore Hope.",
      desc: "Join Living Beyond Meds in supporting The Widows Empowerment Trust – bringing compassion, dignity, and new beginnings to widows, families, and vulnerable individuals.",
    },
    {
      image: "/hero2.jpg",
      title: "Empowering Widows.",
      highlight: "Building Brighter Futures.",
      desc: "Through skills training, emotional support, and community outreach, we are transforming lives one family at a time.",
    },
    {
      image: "/hero3.jpg",
      title: "Join the Movement.",
      highlight: "Be the Change You Seek.",
      desc: "Your support helps us reach more women in need. Together, we can break the cycle of isolation and despair.",
    },
  ];

  // Auto-switch slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stories`,
        );
        const data = await response.json();
        setStories(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION - CAROUSEL */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        {/* Background Slides */}
        <div className="hero-slides">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-text-wrapper">
              <h1 className="hero-title">
                {heroSlides[currentSlide].title}
                <br />
                <span className="highlight">
                  {heroSlides[currentSlide].highlight}
                </span>
              </h1>
              <p className="hero-description">
                {heroSlides[currentSlide].desc}
              </p>
            </div>
            <div className="hero-buttons">
              <Link to="/causes" className="btn btn-custom btn-primary-custom">
                Our Causes <ArrowRight size={20} />
              </Link>
              <Link
                to="/donate"
                className="btn btn-custom btn-secondary-custom"
              >
                Donate Now <Heart size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section scroll-reveal">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">About Us</span>
              <h2 className="brand-heading">
                Standing Together to Restore Hope
              </h2>
              <p>
                As the Founder and CEO of Living Beyond Meds, it is an honour to
                support organisations whose mission aligns deeply with my
                purpose and calling. One of these remarkable organisations is
                The Widows Empowerment Trust, a charity that has played an
                important role in my journey of rebuilding, reflection, and
                transformation.
              </p>
              <div className="founder-quote">
                <p>
                  "I invite you to join me in honouring the incredible work of
                  The Widows Empowerment Trust, and in sowing love into the
                  lives of those who need support and encouragement."
                </p>
                <span className="founder-name">
                  Founder & CEO – Living Beyond Meds
                </span>
              </div>
              <Link to="/about" className="btn btn-custom btn-outline-custom">
                Learn More <ChevronRight size={20} />
              </Link>
            </div>
            <div className="about-image">
              <img
                src="/images/about-placeholder.jpg"
                alt="About Living Beyond Meds"
                className="about-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Services</span>
            <h2 className="brand-heading">What We Do</h2>
            <p>
              Empowering lives through compassionate support and practical
              assistance
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card tilt-card">
              <div className="service-number">01</div>
              <h3>Emotional &amp; Mental Wellbeing Support</h3>
              <p>
                Providing safe, compassionate spaces for women navigating grief,
                trauma, and major life transitions.
              </p>
            </div>
            <div className="service-card tilt-card">
              <div className="service-number">02</div>
              <h3>Empowerment &amp; Skills Training</h3>
              <p>
                Workshops and development sessions that build confidence,
                resilience, and self-sufficiency.
              </p>
            </div>
            <div className="service-card tilt-card">
              <div className="service-number">03</div>
              <h3>Community Outreach</h3>
              <p>
                Practical support for widows and vulnerable women through
                welfare assistance and community engagement.
              </p>
            </div>
            <div className="service-card tilt-card">
              <div className="service-number">04</div>
              <h3>Advocacy &amp; Awareness</h3>
              <p>
                Standing against stigma, isolation, and silence around widowhood
                and mental health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section scroll-reveal">
        <div className="container">
          <div className="section-header light">
            <span className="section-tag gold">Some Fun Fact</span>
            <h2 className="brand-heading-light">
              Thank To The Results Achieved With You!
            </h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Users size={40} />
              </div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Widows Supported</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Heart size={40} />
              </div>
              <div className="stat-number">30</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Globe size={40} />
              </div>
              <div className="stat-number">71</div>
              <div className="stat-label">Countries Worldwide</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Award size={40} />
              </div>
              <div className="stat-number">38</div>
              <div className="stat-label">Awards &amp; Recognition</div>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES/VIDEOS SECTION */}
      <section className="stories-section scroll-reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Video Gallery</span>
            <h2 className="brand-heading">Latest Stories &amp; Events</h2>
            <p>Inspiring stories of transformation and hope</p>
          </div>
          <div className="stories-grid">
            {stories.length > 0
              ? stories.map((story) => (
                  <Link
                    to={`/story/${story._id}`}
                    key={story._id}
                    className="story-card"
                  >
                    <div className="story-thumbnail">
                      {story.videoUrl ? (
                        <>
                          <img
                            src={story.thumbnail || story.image}
                            alt={story.title}
                          />
                          <div className="play-icon">
                            <PlayCircle size={50} />
                          </div>
                        </>
                      ) : (
                        <img
                          src={story.image || "/images/default-story.jpg"}
                          alt={story.title}
                        />
                      )}
                    </div>
                    <div className="story-content">
                      <h3>{story.title}</h3>
                      <p>{story.excerpt}</p>
                      <span className="read-more">Read More →</span>
                    </div>
                  </Link>
                ))
              : // Placeholder if no stories
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="story-card story-card-placeholder">
                    <div className="story-thumbnail-placeholder"></div>
                    <div className="story-content">
                      <h3>Coming Soon</h3>
                      <p>Stay tuned for inspiring stories</p>
                    </div>
                  </div>
                ))}
          </div>
          <div className="view-all">
            <Link to="/gallery" className="btn btn-custom btn-outline-custom">
              View All Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / JOIN SECTION */}
      <section className="cta-section scroll-reveal">
        <div className="cta-overlay"></div>
        <div className="container cta-content">
          <h2 className="brand-heading-light">Join In Worldwide Team</h2>
          <p>Be part of something bigger. Join us in making a difference.</p>
          <div className="cta-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter User Name"
                className="cta-input"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="cta-input"
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Contact Number"
                className="cta-input"
              />
            </div>
            <button className="cta-submit">Join With Us</button>
          </div>
          <div className="cta-phone">
            <Phone size={20} />
            <span>Contact Us Now! +447476088871</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
