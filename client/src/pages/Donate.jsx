import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, CheckCircle, Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createDonationSession } from "../services/api";
import "../styles/Donate.css";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCause, setSelectedCause] = useState("general");
  const [donationType, setDonationType] = useState("one-time");

  const donationAmounts = [10, 25, 50, 100, 250];

  const causes = [
    { id: "general", name: "General Fund" },
    { id: "widows", name: "Widows Empowerment" },
    { id: "training", name: "Skills Training" },
    { id: "outreach", name: "Community Outreach" },
  ];

  const handleDonation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const finalAmount = customAmount || amount;
      if (!finalAmount || parseFloat(finalAmount) <= 0) {
        alert("Please enter a valid donation amount");
        setIsLoading(false);
        return;
      }

      const response = await createDonationSession({
        amount: parseFloat(finalAmount),
        cause: selectedCause,
        donationType: donationType,
      });

      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("Failed to create donation session");
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("There was an error processing your donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donate-page">
      <Navbar />

      <section className="donate-hero">
        <div className="container">
          <h1>Make a Donation</h1>
          <p>
            Your support makes a lasting impact on widows and vulnerable
            individuals
          </p>
        </div>
      </section>

      <section className="donate-form-section">
        <div className="container">
          <div className="donate-grid">
            <div className="donate-form-wrapper">
              <form onSubmit={handleDonation} className="donate-form">
                <div className="form-group">
                  <label>Select Donation Type</label>
                  <div className="donation-type-group">
                    {["one-time", "monthly", "annual"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`type-btn ${donationType === type ? "active" : ""}`}
                        onClick={() => setDonationType(type)}
                      >
                        {type === "one-time"
                          ? "One-Time"
                          : type === "monthly"
                            ? "Monthly"
                            : "Annual"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Amount</label>
                  <div className="amount-grid">
                    {donationAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`amount-btn ${amount === amt.toString() ? "active" : ""}`}
                        onClick={() => {
                          setAmount(amt.toString());
                          setCustomAmount("");
                        }}
                      >
                        £{amt}
                      </button>
                    ))}
                    <div className="custom-amount">
                      <input
                        type="number"
                        placeholder="£ Custom"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount("");
                        }}
                        min="1"
                        step="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Choose Cause</label>
                  <div className="cause-grid">
                    {causes.map((cause) => (
                      <button
                        key={cause.id}
                        type="button"
                        className={`cause-btn ${selectedCause === cause.id ? "active" : ""}`}
                        onClick={() => setSelectedCause(cause.id)}
                      >
                        {cause.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="donate-submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : `Donate £${amount || customAmount || "0"}`}
                  <ArrowRight size={20} />
                </button>

                <div className="secure-info">
                  <Shield size={16} />
                  <span>Secure payment processing</span>
                  <CheckCircle size={16} />
                  <span>100% goes to the cause</span>
                </div>
              </form>
            </div>

            <div className="donate-info">
              <div className="impact-card">
                <h3>Your Impact</h3>
                <ul>
                  <li>
                    <span className="impact-amount">£10</span>
                    <p>Provides a meal for one widow</p>
                  </li>
                  <li>
                    <span className="impact-amount">£25</span>
                    <p>Supports a mental health session</p>
                  </li>
                  <li>
                    <span className="impact-amount">£50</span>
                    <p>Funds a skills training workshop</p>
                  </li>
                  <li>
                    <span className="impact-amount">£100</span>
                    <p>Supports a family for a month</p>
                  </li>
                </ul>
              </div>
              <div className="donate-testimonial">
                <blockquote>
                  "Every donation, no matter the size, brings hope and dignity
                  to those who need it most."
                </blockquote>
                <cite>– Founder, Living Beyond Meds</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
