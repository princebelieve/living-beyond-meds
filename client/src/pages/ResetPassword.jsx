//client/src/pages/ResetPassword.jsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/Auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [params] = useSearchParams();
  const nav = useNavigate();

  const token = params.get("token");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!token) {
        setError(
          "Missing reset token. Please use the reset link from your email.",
        );
        return;
      }

      const res = await resetPassword(token, password);

      if (res.message && res.message.toLowerCase().includes("success")) {
        nav("/login");
      } else if (res.message) {
        setError(res.message);
      } else {
        setError("Unable to reset password. Please try again.");
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

      <div className="auth-page">
        <div className="form">
          <h1>Reset Password</h1>

        <p className="muted" style={{ marginBottom: 20 }}>
          Enter your new password below.
        </p>

        {error ? <p className="form-message form-error">{error}</p> : null}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: 14 }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        </div>
      </div>
    </>
  );
}
