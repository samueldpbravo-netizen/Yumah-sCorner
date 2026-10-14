// Booking form.
// 1. If JUMAHS.bookingEndpoint is set, the booking is POSTed there and the worker texts the restaurant phone.
// 2. If not, the form opens WhatsApp with the full booking message pre-filled for the guest to send.
// The page only says "sent" when the endpoint confirms it.
(function () {
  var cfg = window.JUMAHS || {};
  var form, statusBox, submit;

  function t(k) { return window.JC_I18N ? window.JC_I18N.t(k) : k; }

  function digits(num) { return String(num || "").replace(/[^0-9]/g, ""); }

  function buildMessage(d) {
    return [
      "New booking for Jumah's Corner",
      "Name: " + d.name,
      "Phone: " + d.phone,
      "For: " + d.type,
      "Date: " + d.date,
      "Time: " + d.time,
      "Guests: " + d.guests,
      "Notes: " + (d.notes || "none")
    ].join("\n");
  }

  function show(kind, html) {
    statusBox.hidden = false;
    statusBox.className = "status " + kind;
    statusBox.innerHTML = html;
    statusBox.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function read() {
    var typeSelect = form.elements["type"];
    return {
      name: form.elements["name"].value.trim(),
      phone: form.elements["phone"].value.trim(),
      type: typeSelect.options[typeSelect.selectedIndex].text,
      date: form.elements["date"].value,
      time: form.elements["time"].value,
      guests: form.elements["guests"].value,
      notes: form.elements["notes"].value.trim(),
      website: form.elements["website"].value // honeypot, must stay empty
    };
  }

  function whatsappFallback(d) {
    var text = buildMessage(d);
    var number = digits(cfg.notifyNumber);
    var wa = "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
    var sms = "sms:" + (cfg.notifyNumber || "") + "?&body=" + encodeURIComponent(text);
    show(
      "warn",
      escapeHtml(t("form.wa.ready")) +
        '<br><a href="' + wa + '" target="_blank" rel="noopener">' + escapeHtml(t("form.wa.open")) + "</a>" +
        ' &middot; <a href="' + sms + '">' + escapeHtml(t("form.sms")) + "</a>"
    );
    window.open(wa, "_blank", "noopener");
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    var d = read();
    if (d.website) return; // bots fill the hidden field
    if (!d.name || !d.phone || !d.date || !d.time || !d.guests) {
      show("warn", escapeHtml(t("form.error.required")));
      return;
    }

    if (!cfg.bookingEndpoint) {
      whatsappFallback(d);
      return;
    }

    submit.disabled = true;
    var label = submit.textContent;
    submit.textContent = t("form.sending");
    try {
      var res = await fetch(cfg.bookingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: d.name, phone: d.phone, type: d.type, date: d.date, time: d.time, guests: d.guests, notes: d.notes, website: d.website })
      });
      var data = await res.json().catch(function () { return {}; });
      if (res.ok && data.ok) {
        show("ok", escapeHtml(t("form.ok.sent")));
        form.reset();
        setMinDate();
      } else {
        throw new Error("rejected");
      }
    } catch (e) {
      show("warn", escapeHtml(t("form.fail")) + '<br><a href="#" id="wa-retry">' + escapeHtml(t("form.wa.open")) + "</a>");
      var retry = document.getElementById("wa-retry");
      if (retry) retry.addEventListener("click", function (e2) { e2.preventDefault(); whatsappFallback(d); });
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  }

  function setMinDate() {
    var el = form.elements["date"];
    var now = new Date();
    var iso = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
    el.min = iso;
  }

  document.addEventListener("DOMContentLoaded", function () {
    form = document.getElementById("booking-form");
    if (!form) return;
    statusBox = document.getElementById("form-status");
    submit = document.getElementById("form-submit");
    setMinDate();
    form.addEventListener("submit", onSubmit);
  });
})();
