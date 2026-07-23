import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/Mission.css";

export default function Mission() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      <main className="mission-page">
        <section className="mission-hero scroll-reveal">
          <div className="container mission-hero-inner">
            <div className="mission-hero-copy">
              <span className="eyebrow">Our Mission</span>
              <h1>Empowering others. Restoring Dignity. Transforming Lives.</h1>
              <p>
                Our mission at Living Beyond Meds, in partnership with The Widows
                Empowerment Trust, is to bring healing, strength, and renewed
                hope to widows, vulnerable women, and individuals who have
                experienced emotional, social, or mental hardship.
              </p>
              <p>
                We exist to ensure no woman walks through grief, transition, or
                trauma alone.
              </p>

              <div className="mission-buttons">
                <Link to="/donate" className="btn-custom btn-primary-custom">
                  Donate Now
                </Link>
                <Link to="/about" className="btn-custom btn-outline-custom">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="mission-hero-image">
              <img src="/about.jpg" alt="Living Beyond Meds mission" />
            </div>
          </div>
        </section>

        <section className="mission-features scroll-reveal">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">Key Features</span>
              <h2>Food & Shelter. Fundraise. Easy To Get Started.</h2>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <h3>Food & Shelter</h3>
                <p>
                  We support immediate needs for widows and vulnerable women
                  through access to nourishing meals, safe shelter, and essential
                  home care.
                </p>
                <Link to="/donate" className="mission-card-link">
                  Donate for shelter
                </Link>
              </article>
              <article className="feature-card">
                <h3>Fundraise</h3>
                <p>
                  Your generosity helps us build long-term programs that restore
                  dignity, mental wellbeing, and practical independence.
                </p>
                <ul>
                  <li>Process guidance for every giver</li>
                  <li>Secure, transparent support</li>
                  <li>Direct impact on women and families</li>
                </ul>
                <Link to="/donate" className="mission-card-link">
                  Start fundraising
                </Link>
              </article>
              <article className="feature-card">
                <h3>Easy To Get Started</h3>
                <p>
                  Giving is simple and immediate. We make it easy to choose your
                  support, complete your donation, and stay connected.
                </p>
                <Link to="/donate" className="mission-card-link">
                  Give now
                </Link>
              </article>
            </div>

            <div className="mission-feature-image-grid">
              <img src="/founder.jpg" alt="Founder of Living Beyond Meds" />
              <img src="/contact-hero.png" alt="Community support" />
            </div>
          </div>
        </section>

        <section className="mission-steps scroll-reveal">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">Get Started</span>
              <h2>04 simple steps to join the movement.</h2>
            </div>

            <div className="step-grid">
              <article className="step-card">
                <span className="step-number">01</span>
                <h3>Choose Your Contribution</h3>
                <p>
                  Select a donation amount that aligns with your heart. Every gift,
                  big or small, makes a real difference in the lives of widows and
                  vulnerable women.
                </p>
                <Link to="/donate" className="mission-card-link">
                  Choose an amount
                </Link>
              </article>

              <article className="step-card">
                <span className="step-number">02</span>
                <h3>Complete Your Secure Donation</h3>
                <p>
                  Use our safe and easy online payment process to give. Your
                  details are protected, and your generosity goes directly to
                  support programmes that restore hope.
                </p>
                <Link to="/donate" className="mission-card-link">
                  Donate securely
                </Link>
              </article>

              <article className="step-card">
                <span className="step-number">03</span>
                <h3>Share the Cause</h3>
                <p>
                  Spread the word with friends, family, or on social media. Your
                  voice helps us reach more people who care and want to make a
                  difference.
                </p>
                <Link to="/contact" className="mission-card-link">
                  Contact us to share
                </Link>
              </article>

              <article className="step-card">
                <span className="step-number">04</span>
                <h3>Stay Connected</h3>
                <p>
                  Join our community to receive updates, stories, and progress
                  reports. Together, we celebrate impact and continue to uplift
                  women in need.
                </p>
                <Link to="/about" className="mission-card-link">
                  Learn more
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="mission-faq scroll-reveal">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">FAQ</span>
              <h2>Get Every Answer From Here.</h2>
            </div>

            <div className="faq-grid">
              <article className="faq-item">
                <h3>
                  <a
                    href="https://livingbeyondmeds.com/about-us/#collapse-a3b88706a623d1023302"
                    target="_blank"
                    rel="noreferrer"
                  >
                    What is the purpose of this fundraiser?
                  </a>
                </h3>
                <p>
                  This fundraiser supports The Widows Empowerment Trust in
                  providing emotional, practical, and developmental support to
                  widows and vulnerable women. Every donation helps restore
                  dignity, hope, and new beginnings for women facing hardship.
                </p>
              </article>

              <article className="faq-item">
                <h3>
                  <a
                    href="https://livingbeyondmeds.com/about-us/#collapse-91a0d116a623d1023302"
                    target="_blank"
                    rel="noreferrer"
                  >
                    How will my donation be used?
                  </a>
                </h3>
                <p>
                  Your contribution goes directly toward programmes such as mental
                  wellbeing support, empowerment workshops, community outreach,
                  welfare assistance, and advocacy for widows and vulnerable
                  families. Every gift creates real impact.
                </p>
              </article>

              <article className="faq-item">
                <h3>
                  <a
                    href="https://livingbeyondmeds.com/about-us/#collapse-a28bfd26a623d1023302"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Why is Living Beyond Meds partnering with The Widows
                    Empowerment Trust?
                  </a>
                </h3>
                <p>
                  The partnership is rooted in shared values of compassion,
                  restoration, and empowerment. Living Beyond Meds supports this
                  cause because of Wumi’s personal journey and her commitment to
                  standing with women who feel unseen or unsupported.
                </p>
              </article>

              <article className="faq-item">
                <h3>How else can I support besides donating?</h3>
                <p>
                  You can support by volunteering, sharing the fundraiser,
                  attending awareness events, partnering with the organisation,
                  or offering skills and resources that benefit widows and
                  vulnerable women. Every act of kindness contributes to change.
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
