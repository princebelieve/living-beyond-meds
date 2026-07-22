import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSupportTickets, updateSupportTicket } from "../services/api";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = getToken();

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getSupportTickets(token);
        setTickets(data);
      } catch (err) {
        setError(err.message || "Unable to load tickets");
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, [token]);

  const handleStatusChange = async (ticketId, status) => {
    try {
      const updated = await updateSupportTicket(ticketId, { status }, token);
      setTickets((prev) => prev.map((ticket) => (ticket._id === ticketId ? updated : ticket)));
    } catch (err) {
      setError(err.message || "Unable to update ticket");
    }
  };

  const renderTicket = (ticket) => (
    <div
      key={ticket._id}
      style={{
        border: "1px solid #dde3ea",
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h3 style={{ margin: 0 }}>{ticket.name}</h3>
          <p style={{ margin: "6px 0", color: "#4b5b6a" }}>{ticket.email}</p>
        </div>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            background: ticket.status === "resolved" ? "#d7f2dc" : "#eef4ff",
            color: ticket.status === "resolved" ? "#16664d" : "#304b7e",
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          {ticket.status}
        </span>
      </div>

      <div style={{ margin: "18px 0" }}>
        <p style={{ margin: 0, color: "#475569" }}>{ticket.message}</p>
      </div>
      {ticket.aiReply && (
        <div style={{ marginBottom: 18 }}>
          <strong>AI Reply</strong>
          <p style={{ margin: "10px 0", color: "#334155" }}>{ticket.aiReply}</p>
        </div>
      )}
      {ticket.adminReply && (
        <div style={{ marginBottom: 18 }}>
          <strong>Admin Reply</strong>
          <p style={{ margin: "10px 0", color: "#334155" }}>{ticket.adminReply}</p>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => handleStatusChange(ticket._id, "open")}
          style={{ padding: "10px 16px", borderRadius: 999, border: "1px solid #16664d", background: "#fff", color: "#16664d" }}
        >
          Mark open
        </button>
        <button
          type="button"
          onClick={() => handleStatusChange(ticket._id, "resolved")}
          style={{ padding: "10px 16px", borderRadius: 999, border: "1px solid #0f2f44", background: "#0f2f44", color: "#fff" }}
        >
          Mark resolved
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="page" style={{ padding: "100px 24px 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h1>Admin Support</h1>
          <p style={{ color: "#475569", marginBottom: 24 }}>
            View chat support requests and update their status when required.
          </p>
          {loading && <p>Loading support tickets...</p>}
          {error && <p style={{ color: "#b13636" }}>{error}</p>}
          {!loading && tickets.length === 0 && <p>No support tickets yet.</p>}
          {tickets.map(renderTicket)}
        </div>
      </main>
    </>
  );
}
