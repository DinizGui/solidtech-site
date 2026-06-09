import gsap from "gsap";
import { splitCharsKeepingSpans } from "./splitText.js";

export function animateHero() {
  const title = document.getElementById("hero-title");
  if (!title) return;

  const chars = splitCharsKeepingSpans(title);

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(".hero__meta", { y: 30, opacity: 0, duration: 1 })
    .from(chars, { yPercent: 130, duration: 1.2, stagger: 0.022 }, "-=0.7")
    // release the clip mask so descenders are never sliced after entry
    .set(title.querySelectorAll(".st-wrap"), { overflow: "visible" })
    .from(".hero__bottom > *", { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.4")
    .from(".hero__scroll", { opacity: 0, duration: 0.6 }, "-=0.2");
}
