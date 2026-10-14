// Small EN / NL / FR switch. Any element with data-i18n="key" is swapped.
// Menu dish names and descriptions stay in English.
(function () {
  var dict = {
    en: {
      "nav.home": "Home", "nav.menu": "Menu", "nav.book": "Book", "nav.find": "Find us",
      "hero.eyebrow": "African bar & restaurant, Ghent",
      "hero.title": "The corner of Ghent that tastes like <em>Ghana</em>",
      "hero.sub": "Smoky jollof, slow soups, fufu and spiced plantain. Eat in, take away, or bring us to your party.",
      "cta.book": "Book a table", "cta.menu": "See the menu", "cta.directions": "Get directions",
      "badge.1": "We're", "badge.2": "Open", "badge.3": "Every day 12 to 12",
      "open.now": "Open now, until midnight", "open.closed": "Closed, opens at 12:00",
      "facts.title": "Come as you are",
      "facts.1.t": "Eat in", "facts.1.p": "A warm bar and dining room where music and good company come with the plate.",
      "facts.2.t": "Takeaway", "facts.2.p": "Order ahead and take the jollof home, or to the station.",
      "facts.3.t": "Watch parties", "facts.3.p": "Big matches, big screens, big plates to share.",
      "facts.4.t": "Catering", "facts.4.p": "Birthdays, offices, weddings. We bring the kitchen to you.",
      "menu.teaser.title": "On the menu", "menu.teaser.p": "A few of the plates people come back for.",
      "menu.all": "Full menu",
      "cat.title": "Need catering for your event?", "cat.p": "Tell us the date and the number of guests. We will come back with a menu and a price.",
      "find.title": "How to find us", "find.lead": "Voskenslaan, a short walk from Gent Sint-Pieters station.",
      "find.address": "Address", "find.hours": "Opening hours", "find.hours.v": "Every day, 12:00 to 00:00", "find.phone": "Phone",
      "foot.follow": "Follow us on Instagram",
      "menu.page.title": "Menu", "menu.page.p": "Cooked fresh, seasoned properly. Ask us about spice levels and vegetarian options.",
      "book.page.title": "Book", "book.page.p": "Reserve a table, plan a watch party or ask about catering. Your request goes straight to our phone.",
      "form.name": "Your name", "form.phone": "Your phone", "form.phone.hint": "So we can confirm with you.",
      "form.type": "What is it for", "form.type.table": "Table for dinner", "form.type.watch": "Watch party", "form.type.catering": "Catering", "form.type.party": "Private party",
      "form.date": "Date", "form.time": "Time", "form.guests": "Guests", "form.notes": "Anything we should know",
      "form.send": "Send booking",
      "form.sending": "Sending...",
      "form.error.required": "Please fill in your name, phone, date, time and number of guests.",
      "form.ok.sent": "Sent. We have your request and will confirm by phone soon.",
      "form.fail": "We could not send that automatically. Use WhatsApp or call us instead.",
      "form.wa.ready": "Your booking message is ready in WhatsApp. Press send there to finish.",
      "form.wa.open": "Open WhatsApp", "form.sms": "Send as SMS instead"
    },
    nl: {
      "nav.home": "Home", "nav.menu": "Menu", "nav.book": "Boeken", "nav.find": "Vind ons",
      "hero.eyebrow": "Afrikaanse bar & restaurant, Gent",
      "hero.title": "De hoek van Gent die smaakt naar <em>Ghana</em>",
      "hero.sub": "Rokerige jollof, langzaam gestoofde soepen, fufu en gekruide plantain. Eet hier, neem mee, of laat ons naar uw feest komen.",
      "cta.book": "Reserveer een tafel", "cta.menu": "Bekijk het menu", "cta.directions": "Route",
      "badge.1": "Wij zijn", "badge.2": "Open", "badge.3": "Elke dag 12 tot 12",
      "open.now": "Nu open, tot middernacht", "open.closed": "Gesloten, open vanaf 12:00",
      "facts.title": "Kom zoals u bent",
      "facts.1.t": "Ter plaatse", "facts.1.p": "Een warme bar en eetzaal waar muziek en gezelligheid bij het bord horen.",
      "facts.2.t": "Afhaal", "facts.2.p": "Bestel vooraf en neem de jollof mee naar huis, of naar het station.",
      "facts.3.t": "Kijkavonden", "facts.3.p": "Grote wedstrijden, grote schermen, grote borden om te delen.",
      "facts.4.t": "Catering", "facts.4.p": "Verjaardagen, kantoren, bruiloften. Wij brengen de keuken naar u.",
      "menu.teaser.title": "Op het menu", "menu.teaser.p": "Enkele gerechten waarvoor mensen terugkomen.",
      "menu.all": "Volledig menu",
      "cat.title": "Catering nodig voor uw evenement?", "cat.p": "Laat ons de datum en het aantal gasten weten. Wij komen terug met een menu en een prijs.",
      "find.title": "Zo vindt u ons", "find.lead": "Voskenslaan, op een korte wandeling van station Gent Sint-Pieters.",
      "find.address": "Adres", "find.hours": "Openingsuren", "find.hours.v": "Elke dag, 12:00 tot 00:00", "find.phone": "Telefoon",
      "foot.follow": "Volg ons op Instagram",
      "menu.page.title": "Menu", "menu.page.p": "Vers gekookt, goed gekruid. Vraag ons naar pittigheid en vegetarische opties.",
      "book.page.title": "Boeken", "book.page.p": "Reserveer een tafel, plan een kijkavond of vraag naar catering. Uw aanvraag gaat rechtstreeks naar onze telefoon.",
      "form.name": "Uw naam", "form.phone": "Uw telefoon", "form.phone.hint": "Zodat we kunnen bevestigen.",
      "form.type": "Waarvoor", "form.type.table": "Tafel voor diner", "form.type.watch": "Kijkavond", "form.type.catering": "Catering", "form.type.party": "Privéfeest",
      "form.date": "Datum", "form.time": "Uur", "form.guests": "Gasten", "form.notes": "Iets dat we moeten weten",
      "form.send": "Boeking versturen",
      "form.sending": "Versturen...",
      "form.error.required": "Vul uw naam, telefoon, datum, uur en aantal gasten in.",
      "form.ok.sent": "Verstuurd. We hebben uw aanvraag en bevestigen binnenkort telefonisch.",
      "form.fail": "We konden dit niet automatisch versturen. Gebruik WhatsApp of bel ons.",
      "form.wa.ready": "Uw boekingsbericht staat klaar in WhatsApp. Druk daar op verzenden om af te ronden.",
      "form.wa.open": "WhatsApp openen", "form.sms": "Liever via sms"
    },
    fr: {
      "nav.home": "Accueil", "nav.menu": "Menu", "nav.book": "Réserver", "nav.find": "Nous trouver",
      "hero.eyebrow": "Bar & restaurant africain, Gand",
      "hero.title": "Le coin de Gand qui a le goût du <em>Ghana</em>",
      "hero.sub": "Jollof fumé, soupes mijotées, fufu et plantain épicé. Sur place, à emporter, ou chez vous pour votre fête.",
      "cta.book": "Réserver une table", "cta.menu": "Voir le menu", "cta.directions": "Itinéraire",
      "badge.1": "Nous sommes", "badge.2": "Ouvert", "badge.3": "Tous les jours 12 à 12",
      "open.now": "Ouvert, jusqu'à minuit", "open.closed": "Fermé, ouvre à 12:00",
      "facts.title": "Venez comme vous êtes",
      "facts.1.t": "Sur place", "facts.1.p": "Un bar et une salle chaleureux où musique et bonne compagnie accompagnent l'assiette.",
      "facts.2.t": "À emporter", "facts.2.p": "Commandez à l'avance et emportez le jollof chez vous, ou à la gare.",
      "facts.3.t": "Soirées match", "facts.3.p": "Grands matchs, grands écrans, grandes assiettes à partager.",
      "facts.4.t": "Traiteur", "facts.4.p": "Anniversaires, bureaux, mariages. Nous apportons la cuisine chez vous.",
      "menu.teaser.title": "Au menu", "menu.teaser.p": "Quelques plats pour lesquels on revient.",
      "menu.all": "Menu complet",
      "cat.title": "Un traiteur pour votre événement ?", "cat.p": "Donnez-nous la date et le nombre d'invités. Nous revenons avec un menu et un prix.",
      "find.title": "Comment nous trouver", "find.lead": "Voskenslaan, à quelques minutes à pied de la gare de Gand-Saint-Pierre.",
      "find.address": "Adresse", "find.hours": "Horaires", "find.hours.v": "Tous les jours, 12:00 à 00:00", "find.phone": "Téléphone",
      "foot.follow": "Suivez-nous sur Instagram",
      "menu.page.title": "Menu", "menu.page.p": "Cuisiné frais, bien assaisonné. Demandez-nous le niveau de piment et les options végétariennes.",
      "book.page.title": "Réserver", "book.page.p": "Réservez une table, organisez une soirée match ou demandez un devis traiteur. Votre demande arrive directement sur notre téléphone.",
      "form.name": "Votre nom", "form.phone": "Votre téléphone", "form.phone.hint": "Pour confirmer avec vous.",
      "form.type": "Pour quoi", "form.type.table": "Table pour dîner", "form.type.watch": "Soirée match", "form.type.catering": "Traiteur", "form.type.party": "Fête privée",
      "form.date": "Date", "form.time": "Heure", "form.guests": "Personnes", "form.notes": "Autre chose à savoir",
      "form.send": "Envoyer la réservation",
      "form.sending": "Envoi...",
      "form.error.required": "Merci d'indiquer votre nom, téléphone, date, heure et nombre de personnes.",
      "form.ok.sent": "Envoyé. Nous avons votre demande et confirmerons bientôt par téléphone.",
      "form.fail": "Nous n'avons pas pu l'envoyer automatiquement. Utilisez WhatsApp ou appelez-nous.",
      "form.wa.ready": "Votre message de réservation est prêt dans WhatsApp. Appuyez sur envoyer pour terminer.",
      "form.wa.open": "Ouvrir WhatsApp", "form.sms": "Envoyer par SMS"
    }
  };

  var KEY = "jc-lang";

  function current() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && dict[saved]) return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").slice(0, 2);
    return dict[nav] ? nav : "en";
  }

  function t(key) {
    var lang = current();
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function apply(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = (dict[lang] && dict[lang][el.getAttribute("data-i18n")]) || dict.en[el.getAttribute("data-i18n")];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    document.dispatchEvent(new CustomEvent("jc-lang-changed", { detail: { lang: lang } }));
  }

  window.JC_I18N = { t: t, apply: apply, current: current };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
    });
    apply(current());
  });
})();
