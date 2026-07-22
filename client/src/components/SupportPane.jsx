import { useState } from "react";
import { sendSupportChat } from "../services/api";
import "../styles/ChatBubble.css";

export default function SupportPane({ onClose, adminMode = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [needHumanSupport, setNeedHumanSupport] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please enter your name, email, and message.");
      return;
    }

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await sendSupportChat({
        name: name.trim(),
        email: email.trim(),
        message: userMessage,
        needHumanSupport,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.reply,
          escalated: response.escalated,
        },
      ]);
      setMessage("");
      setNeedHumanSupport(false);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`support-pane ${adminMode ? "support-pane-admin" : ""}`}>
      <div className="support-pane-header">
        <div>
          <div className="eyebrow">Support</div>
          <h2>{adminMode ? "Admin support console" : "Chat with support"}</h2>
          <p>
            {adminMode
              ? "Review support requests and reply directly to users."
              : "Ask about donations, volunteering, events, or request human support."}
          </p>
        </div>
        {onClose && (
          <button type="button" className="support-pane-close" onClick={onClose}>
            Close
          </button>
        )}
      </div>

      <div className="support-chat-panel">
        <div className="chat-history">
          {messages.length === 0 ? (
            <div className="chat-empty">
              Start the conversation with your question.
            </div>
          ) : (
            messages.map((messageItem, index) => (
              <div
                key={`${messageItem.role}-${index}`}
                className={`chat-message chat-${messageItem.role}`}
              >
                <div className="chat-message-label">
                  {messageItem.role === "user" ? "You" : "Support"}
                </div>
                <div className="chat-message-text">{messageItem.text}</div>
              </div>
            ))
          )}
        </div>

        <form className="support-form" onSubmit={handleSubmit}>
          <div className="support-form-row">
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>
          </div>

          <label>
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write your question or request human support"
              required
            />
          </label>

          <label className="support-note">
            Your name and email let us follow up on this request by email if an admin needs to reply.
          </label>

          <label className="support-checkbox">
            <input
              type="checkbox"
              checked={needHumanSupport}
              onChange={(e) => setNeedHumanSupport(e.target.checked)}
            />
            Request human support from an admin.
          </label>

          {error && <div className="form-error">{error}</div>}

          <div className="support-footer-actions">
            <button type="submit" className="support-submit" disabled={loading}>
              {loading ? "Sending..." : "Send support request"}
            </button>
            {onClose && (
              <button type="button" className="support-close-btn" onClick={onClose}>
                Close chat
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
