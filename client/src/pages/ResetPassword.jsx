//client/src/pages/ResetPassword.jsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/Auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const nav = useNavigate();

  const token = params.get("token");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await resetPassword(token, password);

    alert(res.message || "Password reset successful");

    nav("/login");
  }

  return (
    <>
      <Navbar />

      <div className="form">
        <h2>Reset Password</h2>

        <p className="muted" style={{ marginBottom: 20 }}>
          Enter your new password below.
        </p>

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
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}
