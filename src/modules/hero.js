import gsap from "gsap";
import { splitCharsKeepingSpans } from "./splitText.js";

const ROTATING_WORDS = [
  "vende.",
  "converte.",
  "escala.",
  "fatura.",
  "entrega.",
  "decola.",
];

const SWAP_INTERVAL_MS = 2600;

let cycleIdx = 0;

function resetRotator() {
  const rot = document.getElementById("hero-rotator");
  if (!rot) return;
  // limpa qualquer char-wrap que a split-text deixou pra trás e replanta
  // o estado inicial com a primeira palavra
  rot.innerHTML = `<span class="rotator__word accent is-current">${ROTATING_WORDS[0]}</span>`;
}

function swapRotator() {
  const rot = document.getElementById("hero-rotator");
  if (!rot) return;
  const current = rot.querySelector(".is-current");
  if (!current) return;

  cycleIdx = (cycleIdx + 1) % ROTATING_WORDS.length;

  const next = document.createElement("span");
  next.className = "rotator__word accent";
  next.textContent = ROTATING_WORDS[cycleIdx];
  rot.appendChild(next);

  gsap
    .timeline()
    .to(current, {
      yPercent: -110,
      opacity: 0,
      duration: 0.55,
      ease: "power3.in",
    })
    .fromTo(
      next,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.35"
    )
    .add(() => {
      current.remove();
      next.classList.add("is-current");
    });
}

function startCycle() {
  setInterval(() => {
    // não anima quando aba está em background — economiza CPU e evita
    // pilha de swaps acumulados ao voltar
    if (document.visibilityState === "visible") swapRotator();
  }, SWAP_INTERVAL_MS);
}

export function animateHero() {
  const title = document.getElementById("hero-title");
  if (!title) return;

  const chars = splitCharsKeepingSpans(title);

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(".hero__meta", { y: 30, opacity: 0, duration: 1 })
    .from(chars, { yPercent: 130, duration: 1.2, stagger: 0.022 }, "-=0.7")
    .set(title.querySelectorAll(".st-wrap"), { overflow: "visible" })
    .from(".hero__bottom > *", { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.4")
    .from(".hero__scroll", { opacity: 0, duration: 0.6 }, "-=0.2")
    .add(() => {
      resetRotator();
      startCycle();
    });
}
