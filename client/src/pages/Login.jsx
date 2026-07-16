//client/src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUser } from "../services/api";
import { setToken } from "../utils/auth";
import { Eye, EyeOff } from "lucide-react";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res.token) {
        setToken(res.token);

        const payload = JSON.parse(atob(res.token.split(".")[1]));

        if (payload.role === "admin") {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
        return;
      }

      setError(
        res.message ||
          "Unable to sign in. Please check your email and password and try again.",
      );
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
        <h1>Welcome Back</h1>
        <p className="muted" style={{ marginBottom: 20 }}>
          Be part of something bigger. Log in to continue supporting our
          worldwide mission.
        </p>

        {error ? <p className="form-message form-error">{error}</p> : null}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <p style={{ marginTop: 16, fontSize: 14 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--gold)" }}>
            Register here
          </Link>
        </p>
      </div>
    </>
  );
}
