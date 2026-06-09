import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initStage() {
  const stage = document.querySelector(".stage");
  if (!stage) return;

  const letters = stage.querySelectorAll(".stage__letter");
  const rules = stage.querySelectorAll(".stage__rules span");
  const legend = stage.querySelectorAll(".stage__legend span");

  // entry — letters drop, rules draw, legend fades
  const tl = gsap.timeline({
    scrollTrigger: { trigger: stage, start: "top 75%" },
    defaults: { ease: "power4.out" },
  });

  tl.from(".stage__top > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 })
    .from(rules, { scaleX: 0, duration: 1.1, stagger: 0.07 }, "-=0.4")
    .from(
      letters,
      { yPercent: 110, opacity: 0, duration: 1.3, stagger: 0.09 },
      "-=0.8"
    )
    .from(legend, { y: 20, opacity: 0, stagger: 0.07, duration: 0.6 }, "-=0.6")
    .from(".stage__caption", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
    .from(
      ".stage__caption .rule",
      { scaleX: 0, transformOrigin: "left", duration: 1 },
      "<"
    );

  // parallax bg while in viewport
  gsap.fromTo(
    stage.querySelector(".stage__bg"),
    { yPercent: -8 },
    {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  // subtle per-letter parallax — each letter drifts at slightly different
  // speed for a layered feel
  letters.forEach((letter, i) => {
    const depth = (i % 2 === 0 ? 1 : -1) * (8 + i * 2);
    gsap.fromTo(
      letter,
      { y: 0 },
      {
        y: depth,
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}
