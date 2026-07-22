import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import "../styles/WhatsAppButton.css";

const WHATSAPP_NUMBER = "447476088871";

export default function WhatsAppButton() {
  const location = useLocation();
  const pathLabel =
    location.pathname === "/"
      ? "the homepage"
      : location.pathname.replace("/", "") || "this page";

  const message = encodeURIComponent(
    `Hello, I’m reaching out from ${pathLabel} and would love to learn more about your work.`,
  );

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
      <span>WhatsApp</span>
    </a>
  );
}
