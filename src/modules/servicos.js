import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initServicos() {
  gsap.from(".servicos__head > *", {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: { trigger: ".servicos", start: "top 75%" },
  });

  gsap.from(".card", {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: { trigger: ".servicos__grid", start: "top 80%" },
  });
}
