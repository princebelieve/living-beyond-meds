import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendSupportChat } from "../services/api";
import useAuth from "../hooks/useAuth";
import "../styles/ChatBubble.css";

export default function SupportPane({ onClose, adminMode = false }) {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [message, setMessage] = useState("");
  const [needHumanSupport, setNeedHumanSupport] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLoginReminder, setShowLoginReminder] = useState(false);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    if (event?.preventDefault) event.preventDefault();
    setError("");
    setShowLoginReminder(false);

    if (!message.trim()) {
      setError("Please enter your question.");
      return;
    }

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await sendSupportChat({
        name: user?.name || "Guest",
        email: user?.email || "guest@livingbeyondmeds.com",
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

      if (response.escalated && !isLoggedIn) {
        setShowLoginReminder(true);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextareaKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`support-pane ${adminMode ? "support-pane-admin" : ""}`}>
      <div className="support-pane-header">
        <div>
          <div className="eyebrow">Support</div>
          <h2>{adminMode ? "Admin support console" : "Support Chat"}</h2>
          <p>
            {adminMode
              ? "Review support requests and reply directly to users."
              : "Ask a question and get an instant support response."}
          </p>
        </div>
        {onClose && (
          <button type="button" className="support-pane-close" onClick={onClose}>
            Close
          </button>
        )}
      </div>

      <div className="support-chat-panel">
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.length === 0 ? (
            <div className="chat-empty">Say something to start the chat.</div>
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
          <label>
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              rows={4}
              placeholder="Type your question here"
              required
            />
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
          {showLoginReminder && (
            <div className="form-note">
              To escalate this request or receive email follow-up, please log in.
            </div>
          )}

          <div className="support-footer-actions">
            <button type="submit" className="support-submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
            {!isLoggedIn && (
              <button
                type="button"
                className="support-login-btn"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            )}
            {onClose && (
              <button type="button" className="support-close-btn" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
