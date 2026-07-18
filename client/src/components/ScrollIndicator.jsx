//client/src/components/ScrollIndicator.jsx
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <div className="scroll-indicator">
      <div className="scroll-mouse">
        <div className="scroll-wheel"></div>
      </div>
      <div className="scroll-arrows">
        <ChevronDown size={20} />
        <ChevronDown size={20} className="arrow-delayed" />
      </div>
      <span className="scroll-text">Scroll to explore</span>
    </div>
  );
};

export default ScrollIndicator;
