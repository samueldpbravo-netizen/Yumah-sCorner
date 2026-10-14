# Jumah's Corner website

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html        home, menu teaser, catering, Google Maps "how to find us"
menu.html         full menu
book.html         booking and catering form
css/styles.css    all styling (colors and fonts are variables at the top)
js/config.js      phone number, booking endpoint, hours
js/i18n.js        EN / NL / FR text
js/main.js        mobile nav, live "open now" badge
js/book.js        booking form logic
assets/logo.png   logo
worker/           optional booking-to-SMS worker (see below)
```

## Publish on GitHub Pages

1. Create a new repository on GitHub and upload everything in this folder (or `git init`, `git add .`, `git commit`, `git remote add origin ...`, `git push`).
2. In the repository, open **Settings > Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

A custom domain can be added under the same Pages settings.

## How bookings reach 0487 85 42 29

A static site cannot send an SMS by itself, so there are two modes. Both use `+32487854229` from `js/config.js`.

**Mode 1, works immediately (default).** When a guest presses "Send booking", WhatsApp opens with the full booking message already written to that number. The guest presses send. There is also an SMS link as a backup. The page does not say "sent" in this mode, because it cannot know.

**Mode 2, fully automatic.** The booking is sent to a small worker that texts the number with Twilio, with no action needed from the guest.

1. Create a free Cloudflare account and a Worker, and paste in `worker/booking-worker.js`.
2. Create a Twilio account with a number or sender ID that can send SMS to Belgium. Twilio charges per message.
3. In the Worker settings add these as secrets or variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM`
   - `NOTIFY_TO` = `+32487854229`
   - `ALLOWED_ORIGIN` = your exact site origin, for example `https://your-username.github.io`
4. Copy the Worker URL into `bookingEndpoint` in `js/config.js` and commit.

Never put the Twilio token in this repository.

Note that the number is visible in `js/config.js` and in the WhatsApp link, because the site is public.

## Editing

- Prices, dishes and specials: `menu.html` and the dish cards in `index.html`.
- Opening hours: `js/config.js`, plus the text in the pages and `js/i18n.js`.
- Colors: the `--green` and `--yellow` variables at the top of `css/styles.css`. The green matches the logo background exactly.
- The menu is English only. The navigation, hero, find-us section and booking form switch between English, Dutch and French.
