// The live Ω: each press moves the page to the next app's colour. Without script the page stays teal.
(() => {
  const states = window.__omegaStates || [];
  const root = document.documentElement;
  const line = document.querySelector("[data-state-line]");
  let i = 0;
  const show = (n) => {
    i = (n + states.length) % states.length;
    root.dataset.app = states[i].id;
    if (line) line.textContent = states[i].line;
  };
  // The Ω spins a full turn and takes the new colour halfway, while its face is edge-on.
  const spin = document.querySelector(".omega3d__spin");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-cycle]").forEach((b) => b.addEventListener("click", () => {
    if (still || !spin) return show(i + 1);
    spin.classList.remove("is-spinning");
    void spin.offsetWidth;
    spin.classList.add("is-spinning");
    setTimeout(() => show(i + 1), 330);
  }));
  // Reaching an app's block tints the page in its colour; leaving the apps hands control back to the Ω.
  const blocks = document.querySelectorAll("[data-app-block]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) show(states.findIndex((s) => s.id === e.target.dataset.appBlock));
    }, { rootMargin: "-45% 0px -45% 0px" });
    blocks.forEach((b) => io.observe(b));
  }
})();

// Reveal once on entry; children of a [data-reveal] block stagger in order.
(() => {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) { targets.forEach((el) => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
  targets.forEach((el) => {
    [...el.children].forEach((c, n) => c.style.setProperty("--i", n));
    io.observe(el);
  });
  window.addEventListener("load", () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-in"); });
  }, 2500));
})();

// The closing sentence: the idea becomes the issue title.
(() => {
  const form = document.querySelector("[data-idea]");
  if (!form) return;
  // Enter sends, as in a one-line field; the text still wraps visually when it is long.
  form.querySelector("#idea").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
  });
  form.addEventListener("submit", () => {
    const input = form.querySelector("#idea");
    input.value = `Omega app idea: an app that ${input.value.trim()}`;
    setTimeout(() => { input.value = ""; }, 0);
  });
})();

// Pointer-driven depth. One rAF loop eases every tilted element toward its target and stops when all
// have settled, so nothing runs while the pointer is still. Fine pointers only; off under reduced motion.
(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const items = [];
  const hero = document.querySelector("[data-tilt-hero]");
  if (hero) items.push({ el: hero, max: 22, x: 0, y: 0, tx: 0, ty: 0, global: true });
  document.querySelectorAll("[data-tilt]").forEach((el) => items.push({ el, max: 7, x: 0, y: 0, tx: 0, ty: 0 }));
  let frame = 0;
  let heroVisible = true;
  const tick = () => {
    let moving = false;
    for (const it of items) {
      it.x += (it.tx - it.x) * 0.12;
      it.y += (it.ty - it.y) * 0.12;
      if (Math.abs(it.tx - it.x) > 0.01 || Math.abs(it.ty - it.y) > 0.01) moving = true;
      it.el.style.setProperty("--rx", `${it.y.toFixed(2)}deg`);
      it.el.style.setProperty("--ry", `${it.x.toFixed(2)}deg`);
    }
    frame = moving ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => { if (!frame) frame = requestAnimationFrame(tick); };
  addEventListener("pointermove", (e) => {
    for (const it of items) {
      if (it.global && !heroVisible) continue;
      const r = it.el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!it.global && !inside) { it.tx = it.ty = 0; continue; }
      // The hero follows the pointer anywhere on the first screen; the others only while hovered.
      const nx = (e.clientX - (r.left + r.width / 2)) / (it.global ? innerWidth / 2 : r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (it.global ? innerHeight / 2 : r.height / 2);
      it.tx = Math.max(-1, Math.min(1, nx)) * it.max;
      it.ty = Math.max(-1, Math.min(1, -ny)) * it.max;
    }
    kick();
  }, { passive: true });
  document.addEventListener("pointerleave", () => { items.forEach((it) => { it.tx = it.ty = 0; }); kick(); });
  if (hero && "IntersectionObserver" in window) new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
})();

// Buttons lean a few pixels toward the pointer.
(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".button").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * 8}px`);
      b.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * 6}px`);
    });
    b.addEventListener("pointerleave", () => { b.style.setProperty("--mx", "0px"); b.style.setProperty("--my", "0px"); });
  });
})();

// The empty idea field cycles through suggestions while it is on screen and untouched.
(() => {
  const input = document.querySelector("[data-ideas]");
  if (!input) return;
  const ideas = JSON.parse(input.dataset.ideas || "[]");
  let n = 0;
  let timer = 0;
  const run = () => {
    timer = setInterval(() => {
      if (input.value || document.activeElement === input) return;
      n = (n + 1) % ideas.length;
      input.classList.add("is-swapping");
      setTimeout(() => { input.placeholder = ideas[n]; input.classList.remove("is-swapping"); }, 220);
    }, 2800);
  };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { clearInterval(timer); if (e.isIntersecting) run(); }).observe(input);
  }
})();

// The footer loop stops while it is off screen.
(() => {
  const loop = document.querySelector("[data-loop]");
  if (!loop || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(([e]) => loop.classList.toggle("is-paused", !e.isIntersecting)).observe(loop);
})();
