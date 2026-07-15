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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = () => {
  const [stories, setStories] = useState([]);

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

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Together, We Rise.
              <br />
              <span className="highlight">Together, We Restore Hope.</span>
            </h1>
            <p className="hero-description">
              Join Living Beyond Meds in supporting The Widows Empowerment Trust
              – bringing compassion, dignity, and new beginnings to widows,
              families, and vulnerable individuals.
            </p>
            <div className="hero-buttons">
              <Link to="/causes" className="btn btn-primary">
                Our Causes <ArrowRight size={20} />
              </Link>
              <Link to="/donate" className="btn btn-secondary">
                Donate Now <Heart size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">About Us</span>
              <h2>Standing Together to Restore Hope</h2>
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
              <Link to="/about" className="btn btn-outline">
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
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Services</span>
            <h2>What We Do</h2>
            <p>
              Empowering lives through compassionate support and practical
              assistance
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-number">01</div>
              <h3>Emotional &amp; Mental Wellbeing Support</h3>
              <p>
                Providing safe, compassionate spaces for women navigating grief,
                trauma, and major life transitions.
              </p>
            </div>
            <div className="service-card">
              <div className="service-number">02</div>
              <h3>Empowerment &amp; Skills Training</h3>
              <p>
                Workshops and development sessions that build confidence,
                resilience, and self-sufficiency.
              </p>
            </div>
            <div className="service-card">
              <div className="service-number">03</div>
              <h3>Community Outreach</h3>
              <p>
                Practical support for widows and vulnerable women through
                welfare assistance and community engagement.
              </p>
            </div>
            <div className="service-card">
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
      <section className="stats-section">
        <div className="container">
          <div className="section-header light">
            <span className="section-tag gold">Some Fun Fact</span>
            <h2>Thank To The Results Achieved With You!</h2>
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
      <section className="stories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Video Gallery</span>
            <h2>Latest Stories &amp; Events</h2>
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
            <Link to="/gallery" className="btn btn-outline">
              View All Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / JOIN SECTION */}
      <section className="cta-section">
        <div className="cta-overlay"></div>
        <div className="container cta-content">
          <h2>Join In Worldwide Team</h2>
          <p>Be part of something bigger. Join us in making a difference.</p>
          <div className="cta-form">
            <input
              type="text"
              placeholder="Enter User Name"
              className="cta-input"
            />
            <input
              type="email"
              placeholder="Enter Email Address"
              className="cta-input"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="cta-input"
            />
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
