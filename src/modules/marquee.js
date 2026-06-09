import gsap from "gsap";

const WORDS_1 = ["SITES", "SISTEMAS", "APPS", "E-COMMERCE", "AUTOMAÇÃO", "IA"];
const WORDS_2 = ["PERFORMANCE", "DESIGN", "PRODUTO", "ESCALA", "RESULTADO", "VENDA"];

function buildTrack(trackEl, words) {
  if (!trackEl) return;

  const set = () => {
    const frag = document.createDocumentFragment();
    words.forEach((w) => {
      const word = document.createElement("span");
      word.className = "marquee__word";
      word.textContent = w;
      frag.appendChild(word);
      const dot = document.createElement("span");
      dot.className = "marquee__dot";
      dot.textContent = "•";
      frag.appendChild(dot);
    });
    return frag;
  };

  while (trackEl.scrollWidth < window.innerWidth * 2) {
    trackEl.appendChild(set());
  }
  const half = trackEl.scrollWidth;
  trackEl.innerHTML += trackEl.innerHTML;

  return half;
}

export function initMarquee() {
  const track1 = document.getElementById("marquee-1");
  const track2 = document.getElementById("marquee-2");

  const half1 = buildTrack(track1, WORDS_1);
  const half2 = buildTrack(track2, WORDS_2);

  requestAnimationFrame(() => {
    if (track1 && half1) {
      gsap.to(track1, {
        x: -half1,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    }
    if (track2 && half2) {
      // start track 2 already shifted so it scrolls left-to-right visually
      gsap.set(track2, { x: -half2 });
      gsap.to(track2, {
        x: 0,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    }
  });
}
