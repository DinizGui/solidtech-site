import "./style.css";
import { runPreloader } from "./modules/preloader.js";
import { initLenis } from "./modules/lenisSetup.js";
import { initCursor } from "./modules/cursor.js";
import { initMagnetic } from "./modules/magnetic.js";
import { animateHero } from "./modules/hero.js";
import { initMarquee } from "./modules/marquee.js";
import { initSobre } from "./modules/sobre.js";
import { initStage } from "./modules/stage.js";
import { initServicos } from "./modules/servicos.js";
import { initNumeros } from "./modules/numeros.js";
import { initCases } from "./modules/cases.js";
import { initCta } from "./modules/cta.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

initCursor();
initLenis();

// preloader → then everything else
runPreloader().then(() => {
  animateHero();
  initMarquee();
  initSobre();
  initStage();
  initServicos();
  initNumeros();
  initCases();
  initCta();
  initMagnetic();

  // ensure scroll-triggers are calibrated after layout settles
  requestAnimationFrame(() => ScrollTrigger.refresh());
});
