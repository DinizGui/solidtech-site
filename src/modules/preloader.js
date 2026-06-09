import gsap from "gsap";

export function runPreloader() {
  return new Promise((resolve) => {
    const root = document.getElementById("preloader");
    const counter = document.getElementById("preloader-count");
    if (!root || !counter) {
      resolve();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        resolve();
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.floor(obj.val)).padStart(3, "0");
      },
    })
      .to(
        ".preloader__inner",
        { opacity: 0, duration: 0.4, ease: "power2.out" },
        ">-0.05"
      )
      .to(root, {
        yPercent: -100,
        duration: 1.1,
        ease: "expo.inOut",
      })
      .set(root, { display: "none" });
  });
}
