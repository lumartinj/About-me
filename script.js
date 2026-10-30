(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    var label = toggle.querySelector(".visually-hidden");
    if (label) label.textContent = open ? "Close menu" : "Open menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  /* ---------- Active section in nav ---------- */
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']")) : [];
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); });
        var link = byId[entry.target.id];
        if (link) link.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Project modal: openModal(id) / closeModal(), as in the original page ---------- */
  var modal = document.getElementById("project-modal");
  var modalContentArea = document.getElementById("modal-dynamic-content");
  var lastTrigger = null;

  function openModal(templateId, trigger) {
    var source = document.getElementById(templateId);
    if (!modal || !modalContentArea || !source || typeof modal.showModal !== "function") return;

    var copy = source.cloneNode(true);
    copy.removeAttribute("id");
    var title = copy.querySelector("h3");
    if (title) title.id = "modal-title-slot";
    modalContentArea.replaceChildren(copy);

    lastTrigger = trigger || null;
    document.body.classList.add("modal-open");
    modal.showModal();
    modal.querySelector(".modal-content").scrollTop = 0;
    var closeBtn = modal.querySelector(".close-btn");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (modal && modal.open) modal.close();
  }

  document.querySelectorAll(".interactive-card[data-modal]").forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card.getAttribute("data-modal"), card);
    });
  });

  if (modal) {
    var closeBtn = modal.querySelector(".close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Click on the backdrop lands on the <dialog> itself
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    // Escape closes natively; restore page state on every close
    modal.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
      modalContentArea.replaceChildren();
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- Pause SVG flight animation for reduced-motion users ---------- */
  var route = document.querySelector(".hero-route");
  if (route && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      typeof route.pauseAnimations === "function") {
    route.pauseAnimations();
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
