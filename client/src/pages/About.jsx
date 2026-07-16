import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/About.css";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <div className="container about-hero-inner">
            <div className="about-copy">
              <span className="eyebrow">About Living Beyond Meds</span>
              <h1>Standing Together to Restore Hope</h1>
              <p>
                Living Beyond Meds is an organisation birthed from personal
                transformation, deep faith, and a calling to support women and
                vulnerable individuals walking through some of life’s most
                difficult journeys.
              </p>
            </div>

            <div className="about-image-wrap">
              <img src="/about.jpg" alt="Living Beyond Meds" />
            </div>
          </div>
        </section>

        <section className="section-alt">
          <div className="container about-story">
            <div className="story-card">
              <h2 className="title">About Us</h2>
              <p>
                Our work is strengthened through our partnership with The Widows
                Empowerment Trust, a charity that has played a vital role in
                Wumi’s own journey of rebuilding and restoration.
              </p>
              <p>
                Together, we are committed to empowering widows, supporting
                families, and giving voice to women who often feel unseen or
                unheard. We stand with women facing grief, isolation, trauma,
                and life transitions. Our heart is to ensure that no woman feels
                alone during her most vulnerable season.
              </p>
            </div>

            <div className="story-card">
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
