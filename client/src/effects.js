// ========================================
// EFFECTS.JS - All JavaScript effects
// ========================================

const initializeRevealEffects = () => {
  const revealElements = document.querySelectorAll(
    ".scroll-reveal, .reveal, .reveal-left, .reveal-right, .reveal-scale",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
};

const initEffects = () => {
  window.requestAnimationFrame(() => {
    initializeRevealEffects();

    // ===== NUMBER COUNTERS =====
    document.querySelectorAll(".counter-number").forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      if (!target) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2500;
          const startTime = Date.now();

          const updateCounter = () => {
            const currentTime = Date.now();
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            counter.textContent = current.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });

      observer.observe(counter);
    });

    // ===== SLIDER =====
    const sliderContainers = document.querySelectorAll(".slider-container");

    sliderContainers.forEach((container) => {
      const track = container.querySelector(".slider-track");
      const slides = container.querySelectorAll(".slide");
      const prevBtn = container.querySelector(".slider-btn.prev");
      const nextBtn = container.querySelector(".slider-btn.next");
      const dotsContainer = container.querySelector(".slider-dots");
      let currentIndex = 0;
      let slideInterval;

      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = `slider-dot ${index === 0 ? "active" : ""}`;
        dot.dataset.index = index;
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });

      const dots = dotsContainer.querySelectorAll(".slider-dot");

      function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      }

      function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        goToSlide(next);
      }

      function prevSlide() {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prev);
      }

      function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
      }

      function stopAutoPlay() {
        clearInterval(slideInterval);
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          stopAutoPlay();
          nextSlide();
          startAutoPlay();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          stopAutoPlay();
          prevSlide();
          startAutoPlay();
        });
      }

      container.addEventListener("mouseenter", stopAutoPlay);
      container.addEventListener("mouseleave", startAutoPlay);

      startAutoPlay();
    });

    // ===== 3D TILT CARDS =====
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `
          rotateY(${x * 15}deg)
          rotateX(${-y * 15}deg)
          translateY(-8px)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0) rotateX(0) translateY(0)";
      });
    });

    // ===== SCROLL PROGRESS BAR =====
    const progressBar = document.querySelector(".scroll-progress");

    if (progressBar) {
      window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
      });
    }

    // ===== MAGNETIC BUTTONS =====
    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
      });
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    console.log("✅ Living Beyond Meds effects initialized!");
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEffects);
} else {
  initEffects();
}
