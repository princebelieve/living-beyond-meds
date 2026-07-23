import { useState, useEffect, useRef } from "react";
import { Send, Upload } from "lucide-react";
import { sendSupportChat } from "../services/api";
import useAuth from "../hooks/useAuth";
import "../styles/ChatBubble.css";

export default function SupportPane({ onClose, adminMode = false }) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatHistoryRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    if (event?.preventDefault) event.preventDefault();
    setError("");

    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", user?.name || "Guest");
    formData.append("email", user?.email || "guest@livingbeyondmeds.com");
    formData.append("message", userMessage);
    formData.append("needHumanSupport", "false");
    if (uploadFile) {
      formData.append("attachment", uploadFile);
    }

    try {
      const response = await sendSupportChat(formData);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.reply,
          escalated: response.escalated,
        },
      ]);
      setMessage("");
      setUploadFile(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
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

  const handleTextareaInput = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className={`support-pane ${adminMode ? "support-pane-admin" : ""}`}>
      <div className="support-pane-header">
        <div>
          <div className="eyebrow">Living Beyond Med Support</div>
          <h2>Welcome to Living Beyond Med Support</h2>
        </div>
        {onClose && (
          <button type="button" className="support-pane-close" onClick={onClose}>
            ×
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
          <div className="support-input-row">
            <button type="submit" className="support-send-btn" disabled={loading}>
              <Send size={18} />
            </button>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={handleTextareaInput}
              onKeyDown={handleTextareaKeyDown}
              rows={1}
              placeholder="Message"
              className="support-input"
              required
            />
            <label className="support-file-upload" title="Upload a file">
              <Upload size={18} />
              <input
                type="file"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {error && <div className="form-error">{error}</div>}
          {uploadFile && (
            <div className="support-upload-name">Attached: {uploadFile.name}</div>
          )}

          <div className="support-footer-note">
            Please note that this is a chatbot, you can request for human support inside the chat.
          </div>
        </form>
      </div>
    </div>
  );
}
