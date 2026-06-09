import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "./splitText.js";

export function initSobre() {
  const text = document.getElementById("sobre-text");
  if (!text) return;

  const words = splitWords(text);
  gsap.set(words, { opacity: 0.15 });

  // word-by-word scrub reveal
  gsap.to(words, {
    opacity: 1,
    stagger: 0.04,
    ease: "none",
    scrollTrigger: {
      trigger: text,
      start: "top 80%",
      end: "bottom 60%",
      scrub: 0.5,
    },
  });

  // accent key phrases in yellow
  words.forEach((w) => {
    const t = w.textContent.toLowerCase().replace(/[.,]$/, "");
    if (["5+", "anos", "brasil", "eua", "canadá"].includes(t)) {
      w.style.color = "var(--c-accent)";
    }
  });

  // pillars stagger
  gsap.from(".sobre__pill", {
    y: 50,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".sobre__right", start: "top 80%" },
  });

  gsap.from(".sobre__pill .rule", {
    scaleX: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    transformOrigin: "left",
    scrollTrigger: { trigger: ".sobre__right", start: "top 80%" },
  });
}
