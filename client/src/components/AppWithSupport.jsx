import { useState } from "react";
import App from "./App";
import SupportBubble from "./components/SupportBubble";

export default function AppWithSupport() {
  const [hasSupportPane, setHasSupportPane] = useState(true);

  return (
    <>
      <App />
      {hasSupportPane ? <SupportBubble /> : null}
    </>
  );
}
