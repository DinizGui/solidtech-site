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
  // limpa qualquer char-wrap que a split-text deixou pra trás
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

  // slot-reel: ambas as palavras se movem em sincronia (mesmo time start,
  // mesma duração, mesmo ease). Sem opacity transition — só translateY —
  // pra nunca ter o momento "as duas parcialmente visíveis em opacidade
  // intermediária" que dava aquele mix smeared horrível.
  gsap
    .timeline({
      onComplete: () => {
        current.remove();
        next.classList.add("is-current");
      },
    })
    .to(
      current,
      { yPercent: -100, duration: 0.65, ease: "expo.inOut" },
      0
    )
    .fromTo(
      next,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.65, ease: "expo.inOut" },
      0
    );
}

function startCycle() {
  setInterval(() => {
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
