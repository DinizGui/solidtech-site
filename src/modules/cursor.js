import gsap from "gsap";

export function initCursor() {
  if (!matchMedia("(hover: hover)").matches) return;

  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const SPEED = 0.18;

  gsap.set(cursor, { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * SPEED;
    pos.y += (mouse.y - pos.y) * SPEED;
    gsap.set(cursor, { x: pos.x, y: pos.y });
  });

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    const big = el.dataset.cursor === "big";
    el.addEventListener("mouseenter", () => {
      cursor.classList.add(big ? "is-hover-big" : "is-hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hover", "is-hover-big");
    });
  });
}
