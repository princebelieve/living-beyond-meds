//client/src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { forgotPassword } from "../services/api";
import "../styles/Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await forgotPassword(email);

      if (res.message) {
        setSent(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to reach the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="form">
        <h1>Forgot Password</h1>

        <p>Enter your email and we’ll send you a reset link.</p>

        {error ? <p className="form-message form-error">{error}</p> : null}

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        ) : (
          <p style={{ marginTop: 10, color: "#2e7d32" }}>
            If that email exists, a password reset link has been sent.
          </p>
        )}

        <div style={{ marginTop: 18 }}>
          <Link to="/login" style={{ color: "var(--gold)" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
}
