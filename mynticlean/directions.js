(() => {
  const direction = new URLSearchParams(location.search).get("direction");
  const concepts = {
    soft: {
      name: "01 / Soft Reset",
      title: "A little less doing.<br>A little more <em>being.</em>",
      kicker: "COME HOME TO A LITTLE CALM",
      copy: "An everyday reset for your home.<br>More space for the moments that matter.",
    },
    fresh: {
      name: "02 / Fresh Energy",
      title: "Big clean.<br><em>Good energy.</em>",
      kicker: "A FRESH OUTLOOK ON HOUSEWORK",
      copy: "Your space, refreshed.<br>Your weekend, wide open.",
    },
    light: {
      name: "03 / Room for Light",
      title: "The luxury of<br><em>doing less.</em>",
      kicker: "RESIDENTIAL CLEANING / DALLAS–FORT WORTH",
      copy: "Thoughtful cleaning. A quieter kind of everyday.<br>Make room for what comes next.",
    },
  };
  if (!concepts[direction]) return;
  const concept = concepts[direction];
  document.documentElement.dataset.direction = direction;
  document.title = `mynticlean — ${concept.name.slice(5)} concept`;
  document.querySelector(".hero h1").innerHTML = concept.title;
  document.querySelector(".hero > .kicker").textContent = concept.kicker;
  document.querySelector(".hero .intro").innerHTML = concept.copy;
  const panel = document.querySelector(".hero-panel");
  panel.innerHTML =
    direction === "soft"
      ? '<div class="soft-orbit orbit-one"></div><div class="soft-orbit orbit-two"></div><div class="soft-card sc-one"><span>the everyday</span><i>made lighter.</i><div class="soft-line"></div><small>SPACE TO EXHALE</small></div><div class="soft-card sc-two"><span>less on your list.</span><i>more in your day.</i><b>✳</b></div><span class="art-note">A LITTLE RESET. A DIFFERENT KIND OF DAY.</span>'
      : direction === "fresh"
        ? '<div class="energy-ring"></div><div class="energy-disc"><span>fresh<br><i>feels good.</i></span></div><div class="energy-bubble bubble-one">less chores.</div><div class="energy-bubble bubble-two">more you.</div><span class="art-note">YOUR NEXT CHAPTER STARTS FRESH.</span>'
        : '<div class="light-rays"></div><div class="architecture arch-back"></div><div class="architecture arch-front"><div class="arch-door"></div></div><span class="light-word">breathe.</span><span class="art-note">OPEN THE DOOR TO A LIGHTER DAY.</span>';
  const switcher = document.createElement("aside");
  switcher.className = "concept-switcher";
  switcher.setAttribute("aria-label", "Design concept navigation");
  switcher.innerHTML = `<a href="./directions.html">← All directions</a><span>${concept.name}</span><a href="./">Current site ↗</a>`;
  document.body.prepend(switcher);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  // Keep content visible by default; reveal only when motion is permitted.
  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".section-heading,.steps li,.service-card,.trust article,.plans",
      )
      .forEach((el) => {
        el.classList.add("concept-reveal");
        observer.observe(el);
      });
    let ticking = false;
    function updateScene() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = panel.getBoundingClientRect();
        const progress = Math.max(
          -1,
          Math.min(
            1,
            (innerHeight * 0.55 - r.top - r.height / 2) / innerHeight,
          ),
        );
        panel.style.setProperty("--travel", progress);
        ticking = false;
      });
    }
    addEventListener("scroll", updateScene, { passive: true });
    updateScene();
  }
})();
