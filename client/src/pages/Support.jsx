import { useState } from "react";
import { Mail, MapPin, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import { sendSupportChat } from "../services/api";
import "../styles/Support.css";

export default function Support() {
  useScrollReveal();

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
    <>
      <Navbar />

      <main className="support-page">
        <section className="support-hero scroll-reveal">
          <div className="container support-hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">AI support</span>
              <h1>Support Chat</h1>
              <p>
                Get fast answers from our AI assistant, or choose human support
                when you need a real person to help.
              </p>
            </div>
            <aside className="hero-card">
              <div className="support-card-row">
                <Mail size={20} />
                <div>
                  <strong>Email</strong>
                  <p>info@livingbeyondmeds.com</p>
                </div>
              </div>
              <div className="support-card-row">
                <MapPin size={20} />
                <div>
                  <strong>Location</strong>
                  <p>29 Cross Street Chapel, Manchester, M2 1NL</p>
                </div>
              </div>
              <div className="support-card-note">
                <Heart size={18} />
                <p>
                  Living Beyond Meds helps widows and vulnerable women through
                  community care, donations, and practical support.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="support-chat-section scroll-reveal">
          <div className="container support-grid">
            <div className="support-chat-panel">
              <div className="chat-header">
                <h2>Chat with Support</h2>
                <p>
                  Ask about donations, volunteering, services, events, or ask
                  for a human support agent.
                </p>
              </div>

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
                      <div className="chat-message-text">
                        {messageItem.text}
                      </div>
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
                    rows={5}
                    placeholder="Write your question or request human support"
                    required
                  />
                </label>

                <label className="support-checkbox">
                  <input
                    type="checkbox"
                    checked={needHumanSupport}
                    onChange={(e) => setNeedHumanSupport(e.target.checked)}
                  />
                  I want human support from an admin or support agent.
                </label>

                {error && <div className="form-error">{error}</div>}

                <button type="submit" className="support-submit" disabled={loading}>
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
