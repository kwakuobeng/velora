const $ = (s) => document.querySelector(s);
const services = [
  {
    name: "The everyday clean",
    type: "Standard",
    icon: "✧",
    badge: "STANDARD",
    copy: "A little order for the rooms that do it all.",
    items: [
      "Dust accessible surfaces",
      "Wipe kitchen counters and sink",
      "Clean bathroom fixtures",
      "Vacuum and mop floors",
    ],
  },
  {
    name: "The deeper reset",
    type: "Deep",
    icon: "✳",
    badge: "DEEP CLEAN",
    copy: "Extra attention for the details in between.",
    items: [
      "Proposed standard cleaning scope",
      "Detail accessible baseboards",
      "Wipe reachable door frames",
      "Extra attention to kitchen and bath buildup",
    ],
  },
  {
    name: "The next chapter",
    type: "Move-in/out",
    icon: "⌂",
    badge: "MOVE-IN / OUT",
    copy: "A fresh canvas for a new beginning.",
    items: [
      "Proposed deep cleaning scope",
      "Clean empty cabinet interiors",
      "Wipe empty closets and shelves",
      "Clean accessible interior surfaces in an empty home",
    ],
  },
  {
    name: "The regular refresh",
    type: "Recurring",
    icon: "↻",
    badge: "RECURRING",
    copy: "Your favorite feeling, on repeat.",
    items: [
      "Proposed standard cleaning scope",
      "Weekly, biweekly, or monthly rhythm",
      "Discuss home priorities before booking",
      "Final scope confirmed before service",
    ],
  },
];
services.forEach((service) => {
  const button = document.createElement("button");
  button.className = "service-card";
  button.dataset.type = service.type;
  button.innerHTML = `<span class="badge">${service.badge}</span><span class="service-icon" aria-hidden="true">${service.icon}</span><h3>${service.name}</h3><p>${service.copy}</p><span class="explore">Explore the clean <span aria-hidden="true"><svg class="arrow" aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" stroke-width="1.5"/></svg></span></span>`;
  button.setAttribute("aria-haspopup", "dialog");
  button.addEventListener("click", () => {
    $("#dialog-kicker").textContent =
      `PROPOSED SCOPE / ${service.type.toUpperCase()}`;
    $("#dialog-title").textContent = service.name;
    $("#dialog-copy").textContent = service.copy;
    $("#dialog-list").replaceChildren(
      ...service.items.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      }),
    );
    openDialog($("#service-dialog"));
  });
  $("#service-grid").append(button);
});
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    let count = 0;
    document.querySelectorAll(".service-card").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "All" &&
        button.dataset.filter !== card.dataset.type;
      if (!card.hidden) count++;
    });
    $("#service-count").textContent =
      `${count} cleaning option${count === 1 ? "" : "s"}`;
  }),
);
const factors = { once: 1, weekly: 0.8, biweekly: 0.9, monthly: 0.95 };
function examplePrice() {
  return Math.round(
    (85 +
      Number($("#bedrooms").value) * 20 +
      Number($("#bathrooms").value) * 20) *
      factors[$("#frequency").value],
  );
}
function updateQuote() {
  $("#price").textContent = `$${examplePrice()}`;
}
$("#quote-form").addEventListener("change", updateQuote);
updateQuote();
$("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  $("#booking-summary").textContent =
    `EXAMPLE: $${examplePrice()} per standard clean · ${$("#bedrooms").value} bedrooms · ${$("#bathrooms").value} bathrooms · ${$("#frequency").selectedOptions[0].textContent}. Not live rates.`;
  openDialog($("#booking-dialog"));
});
document.querySelectorAll("[data-frequency]").forEach((link) =>
  link.addEventListener("click", () => {
    $("#frequency").value = link.dataset.frequency;
    updateQuote();
  }),
);
const openers = new WeakMap();
function openDialog(dialog) {
  openers.set(dialog, document.activeElement);
  dialog.showModal();
}
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelector(".close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const b = dialog.getBoundingClientRect();
      if (
        event.clientX < b.left ||
        event.clientX > b.right ||
        event.clientY < b.top ||
        event.clientY > b.bottom
      )
        dialog.close();
    }
  });
  dialog.addEventListener("close", () => openers.get(dialog)?.focus());
});
// Native showModal supplies Escape dismissal, focus containment and an inert background.
$("#dialog-quote").addEventListener("click", () => {
  $("#service-dialog").close();
  requestAnimationFrame(() => $("#bedrooms").focus({ preventScroll: true }));
});
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let queued = false;
function scrollEffect() {
  if (queued || reduced.matches) return;
  queued = true;
  requestAnimationFrame(() => {
    const panel = $(".hero-panel"),
      rect = panel.getBoundingClientRect();
    panel.style.setProperty(
      "--scroll",
      Math.max(
        0,
        Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)),
      ),
    );
    queued = false;
  });
}
addEventListener("scroll", scrollEffect, { passive: true });
scrollEffect();
