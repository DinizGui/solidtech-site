import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitCharsKeepingSpans } from "./splitText.js";

export function initCta() {
  const headline = document.getElementById("cta-headline");
  if (!headline) return;

  const chars = splitCharsKeepingSpans(headline);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
    defaults: { ease: "power4.out" },
  });

  tl.from(".cta .kicker", { y: 20, opacity: 0, duration: 0.7 })
    .from(chars, { yPercent: 130, duration: 1, stagger: 0.018 }, "-=0.4")
    .set(headline.querySelectorAll(".st-wrap"), { overflow: "visible" })
    .from(".cta .btn--cta", { y: 30, opacity: 0, duration: 0.9 }, "-=0.4")
    .from(".cta__sub", { opacity: 0, duration: 0.6 }, "-=0.3");
}
