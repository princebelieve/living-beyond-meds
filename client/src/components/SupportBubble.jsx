import { useState } from "react";
import { MessageSquare } from "lucide-react";
import SupportPane from "./SupportPane";
import "../styles/ChatBubble.css";

export default function SupportBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="chat-bubble" onClick={() => setOpen(true)}>
        <MessageSquare size={24} />
      </button>
      {open && (
        <div className="support-pane-wrapper">
          <SupportPane onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
