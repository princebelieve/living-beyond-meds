//client/src/hooks/useScrollReveal.js
// src/hooks/useScrollReveal.js
import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      ".scroll-reveal, .reveal, .reveal-left, .reveal-right, .reveal-scale",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
