import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SupportPane from "../components/SupportPane";
import "../styles/ChatBubble.css";

export default function Support() {
  return (
    <>
      <Navbar />
      <main className="support-page" style={{ padding: "24px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h1>Support Chat</h1>
          <p>
            Ask a question and get an instant response from our chatbot. If you
            request human support, the team will be notified.
          </p>
          <SupportPane />
        </div>
      </main>
      <Footer />
    </>
  );
}
