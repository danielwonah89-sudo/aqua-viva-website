const whatsappNumber = "2348035631977";

const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  siteNav?.classList.toggle("is-open", !open);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  });
});

const ratingButtons = [...document.querySelectorAll(".star-picker button")];
let selectedRating = 0;

ratingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedRating = Number(button.dataset.rating);
    ratingButtons.forEach((star) => {
      const selected = Number(star.dataset.rating) <= selectedRating;
      star.classList.toggle("is-selected", selected);
      star.setAttribute("aria-pressed", String(Number(star.dataset.rating) === selectedRating));
    });
    const hint = document.querySelector("#rating-hint");
    if (hint) hint.textContent = selectedRating + " out of 5 — thank you for rating us";
  });
});

document.querySelector("#order-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    "Hello Aqua Viva, I'd like to place an order.",
    "Name: " + form.get("name"),
    "Phone: " + form.get("phone"),
    "Delivery area: " + form.get("area"),
    "Order request: " + form.get("request"),
    "",
    "Please confirm available sizes, delivery options and price. Thank you."
  ].join("\n");
  window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
});

document.querySelector("#feedback-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!selectedRating) {
    const hint = document.querySelector("#rating-hint");
    if (hint) hint.textContent = "Choose a star rating before sending your note.";
    document.querySelector(".star-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const message = [
    "Hello Aqua Viva — here's my feedback.",
    "Rating: " + "★".repeat(selectedRating) + " (" + selectedRating + "/5)",
    name ? "Name: " + name : "",
    "Note: " + String(form.get("note") || "").trim()
  ].filter(Boolean).join("\n");
  window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealSections = document.querySelectorAll(".section");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealSections.forEach((section) => {
    section.setAttribute("data-reveal", "");
    revealObserver.observe(section);
  });
} else {
  revealSections.forEach((section) => section.classList.add("is-visible"));
}

