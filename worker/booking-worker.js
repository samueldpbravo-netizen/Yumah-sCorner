// Cloudflare Worker: receives a booking from the website and texts it to the restaurant phone via Twilio.
//
// Secrets and variables (set in the Cloudflare dashboard or with `wrangler secret put`), never in this file:
//   TWILIO_ACCOUNT_SID   your Twilio Account SID
//   TWILIO_AUTH_TOKEN    your Twilio Auth Token
//   TWILIO_FROM          a Twilio number or approved sender ID that can send SMS in Belgium
//   NOTIFY_TO            +32487854229
//   ALLOWED_ORIGIN       the exact site origin, e.g. https://your-name.github.io
//
// The website then calls this worker's URL (js/config.js -> bookingEndpoint).

const MAX = { name: 80, phone: 30, type: 40, date: 12, time: 8, guests: 5, notes: 400 };

function cors(origin, env) {
  const allowed = env.ALLOWED_ORIGIN || "";
  return {
    "Access-Control-Allow-Origin": origin && origin === allowed ? origin : allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });
}

function clean(value, max) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin, env);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, headers);
    if (!env.ALLOWED_ORIGIN || origin !== env.ALLOWED_ORIGIN) return json({ ok: false, error: "origin" }, 403, headers);

    let data;
    try { data = await request.json(); } catch { return json({ ok: false, error: "json" }, 400, headers); }

    if (data.website) return json({ ok: true }, 200, headers); // honeypot: pretend success, send nothing

    const b = {};
    for (const key of Object.keys(MAX)) b[key] = clean(data[key], MAX[key]);
    if (!b.name || !b.phone || !b.date || !b.time || !b.guests) return json({ ok: false, error: "missing" }, 400, headers);
    if (!/^[0-9+()\-\s]{6,30}$/.test(b.phone)) return json({ ok: false, error: "phone" }, 400, headers);

    const body = [
      "New booking: Jumah's Corner",
      `Name: ${b.name}`,
      `Phone: ${b.phone}`,
      `For: ${b.type}`,
      `Date: ${b.date} ${b.time}`,
      `Guests: ${b.guests}`,
      b.notes ? `Notes: ${b.notes}` : "Notes: none"
    ].join("\n");

    const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ To: env.NOTIFY_TO, From: env.TWILIO_FROM, Body: body })
    });

    if (!res.ok) return json({ ok: false, error: "sms" }, 502, headers);
    return json({ ok: true }, 200, headers);
  }
};
