// Mobile nav, footer year, and the live "open now" badge.
(function () {
  var cfg = window.JUMAHS || { openHour: 12, closeHour: 24 };

  function brusselsHour() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Europe/Brussels" }).formatToParts(new Date());
      var h = parts.filter(function (p) { return p.type === "hour"; })[0];
      return parseInt(h.value, 10) % 24;
    } catch (e) {
      return new Date().getHours();
    }
  }

  function renderOpen() {
    var h = brusselsHour();
    var open = h >= cfg.openHour && h < cfg.closeHour;
    document.querySelectorAll("[data-open-badge]").forEach(function (el) {
      var dot = el.querySelector(".dot");
      var label = el.querySelector("[data-open-label]");
      if (dot) dot.classList.toggle("live", open);
      if (label) label.textContent = window.JC_I18N ? window.JC_I18N.t(open ? "open.now" : "open.closed") : (open ? "Open now" : "Closed");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    renderOpen();
    setInterval(renderOpen, 60 * 1000);
  });

  document.addEventListener("jc-lang-changed", renderOpen);
})();
