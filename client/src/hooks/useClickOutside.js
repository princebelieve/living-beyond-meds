//client/src/hooks/useClickOutside.js
import { useEffect } from "react";

export default function useClickOutside(refs, handler) {
  useEffect(() => {
    function listener(event) {
      const elements = Array.isArray(refs.current)
        ? refs.current
        : [refs.current];

      const clickedInside = elements.some(
        (ref) => ref && ref.contains(event.target),
      );

      if (clickedInside) return;

      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
}
