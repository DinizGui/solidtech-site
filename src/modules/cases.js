import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initCases() {
  const section = document.querySelector(".cases");
  const track = document.getElementById("cases-track");
  if (!section || !track) return;

  // horizontal scroll pinned via vertical input
  const getScrollAmount = () => track.scrollWidth - window.innerWidth + 32;

  const tween = gsap.to(track, {
    x: () => -getScrollAmount(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollAmount()}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });

  // small reveal for the head
  gsap.from(".cases__head > *", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: section, start: "top 75%" },
  });

  return tween;
}
