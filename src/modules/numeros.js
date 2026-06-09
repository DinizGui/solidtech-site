import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initNumeros() {
  document.querySelectorAll(".num__val").forEach((el) => {
    const target = parseFloat(el.dataset.target || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        el.textContent = obj.val.toFixed(decimals);
      },
    });
  });

  gsap.from(".num", {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: ".numeros__grid", start: "top 85%" },
  });

  gsap.from(".num__rule", {
    scaleX: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
    transformOrigin: "left",
    scrollTrigger: { trigger: ".numeros__grid", start: "top 85%" },
  });
}
