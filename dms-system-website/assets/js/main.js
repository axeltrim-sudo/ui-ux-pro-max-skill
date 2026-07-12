/* ==========================================================================
   DMS System — Scripts partagés
   Header/footer injectés depuis une source unique + interactions
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Données entreprise ---------- */
  var COMPANY = {
    name: "DMS System",
    phone: "02 47 48 05 18",
    phoneHref: "tel:+33247480518",
    email: "contact@dms-system.fr",
    address: "11 bis Rue Jean Perrin, 37170 Chambray-lès-Tours",
    mapsQuery: "DMS+System+11+bis+Rue+Jean+Perrin+37170+Chambray-lès-Tours"
  };

  /* ---------- Icônes SVG (Lucide) ---------- */
  var I = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  /* ---------- Navigation ---------- */
  var NAV = [
    { href: "index.html", label: "Accueil" },
    { href: "particuliers.html", label: "Particuliers" },
    { href: "professionnels.html", label: "Professionnels" },
    { href: "depannage.html", label: "Dépannage" },
    { href: "avis.html", label: "Avis" },
    { href: "faq.html", label: "FAQ" },
    { href: "contact.html", label: "Contact" }
  ];

  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  /* ---------- Header ---------- */
  function buildHeader() {
    var page = currentPage();
    var links = NAV.map(function (n) {
      var active = n.href === page ? ' aria-current="page"' : "";
      return '<li><a href="' + n.href + '"' + active + ">" + n.label + "</a></li>";
    }).join("");

    return '' +
      '<header class="site-header">' +
        '<div class="topbar"><div class="container">' +
          '<div class="topbar__left">' +
            '<span class="topbar__item">' + I.pin + '<span>' + COMPANY.address + '</span></span>' +
            '<span class="topbar__item topbar__hours">' + I.clock + '<span>Lun–Ven 07:30–18:00</span></span>' +
          '</div>' +
          '<div class="topbar__right">' + I.phone + '<a href="' + COMPANY.phoneHref + '">' + COMPANY.phone + '</a></div>' +
        '</div></div>' +
        '<div class="container"><nav class="navbar" aria-label="Navigation principale">' +
          '<a class="brand" href="index.html" aria-label="DMS System — accueil">' +
            '<span class="brand__mark">DMS</span>' +
            '<span class="brand__name">DMS System<small>Électricité · Plomberie · CVC</small></span>' +
          '</a>' +
          '<ul class="nav-links" id="navLinks">' + links + '</ul>' +
          '<div class="nav-cta">' +
            '<a class="btn btn--primary" href="contact.html">Devis gratuit</a>' +
            '<button class="nav-toggle" id="navToggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="navLinks">' + I.menu + '</button>' +
          '</div>' +
        '</nav></div>' +
      '</header>' +
      '<div class="nav-scrim" id="navScrim"></div>';
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var year = document.documentElement.getAttribute("data-year") || "2025";
    var quickLinks = NAV.map(function (n) {
      return '<li><a href="' + n.href + '">' + n.label + "</a></li>";
    }).join("");

    return '' +
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="index.html">' +
              '<span class="brand__mark">DMS</span>' +
              '<span class="brand__name">DMS System<small>Spécialiste multi-métiers</small></span>' +
            '</a>' +
            '<p>Votre spécialiste électricité, plomberie, chauffage, climatisation et enseignes à Chambray-lès-Tours. Plus de 15 ans au service des particuliers, professionnels et industriels de la région Centre-Val de Loire.</p>' +
          '</div>' +
          '<div><h4>Nos métiers</h4><ul class="footer-links">' +
            '<li><a href="particuliers.html">Électricité</a></li>' +
            '<li><a href="particuliers.html">Plomberie</a></li>' +
            '<li><a href="particuliers.html">Chauffage & PAC</a></li>' +
            '<li><a href="particuliers.html">Climatisation</a></li>' +
            '<li><a href="professionnels.html">Enseignes sur mesure</a></li>' +
          '</ul></div>' +
          '<div><h4>Navigation</h4><ul class="footer-links">' + quickLinks + '</ul></div>' +
          '<div><h4>Contact</h4><ul class="footer-contact">' +
            '<li>' + I.pin + '<span>' + COMPANY.address + '</span></li>' +
            '<li>' + I.phone + '<a href="' + COMPANY.phoneHref + '">' + COMPANY.phone + '</a></li>' +
            '<li>' + I.mail + '<a href="mailto:' + COMPANY.email + '">' + COMPANY.email + '</a></li>' +
            '<li>' + I.clock + '<span>Lun–Ven : 07:30 – 18:00<br>Sam–Dim : fermé</span></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + year + ' DMS System — Tous droits réservés.</span>' +
          '<span>Devis gratuit · Intervention en Centre-Val de Loire</span>' +
        '</div>' +
      '</div></footer>' +
      '<a class="fab-call" href="' + COMPANY.phoneHref + '" aria-label="Appeler DMS System">' + I.phone + '</a>';
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    var scrim = document.getElementById("navScrim");
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle("open", open);
      scrim.classList.toggle("show", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      toggle.innerHTML = open ? I.close : I.menu;
    }
    toggle.addEventListener("click", function () {
      setOpen(!links.classList.contains("open"));
    });
    scrim.addEventListener("click", function () { setOpen(false); });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Header ombre au scroll ---------- */
  function initScrollHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 6px 20px rgba(15,23,42,0.08)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Reveal au scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Validation formulaire ---------- */
  function initForm() {
    var form = document.getElementById("devisForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");

    function validateField(field) {
      var input = field.querySelector("input, select, textarea");
      if (!input) return true;
      var valid = input.checkValidity();
      field.classList.toggle("invalid", !valid);
      return valid;
    }

    form.querySelectorAll(".field").forEach(function (field) {
      var input = field.querySelector("input, select, textarea");
      if (input) input.addEventListener("blur", function () { validateField(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allValid = true;
      var firstInvalid = null;
      form.querySelectorAll(".field").forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
          if (!firstInvalid) firstInvalid = field.querySelector("input, select, textarea");
        }
      });
      if (!allValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Envoi en cours…"; }
      // Simulation d'envoi (à connecter à un backend / service e-mail)
      window.setTimeout(function () {
        if (success) {
          success.classList.add("show");
          success.setAttribute("tabindex", "-1");
          success.focus();
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = "Envoyer ma demande de devis"; }
      }, 700);
    });
  }

  /* ---------- Init ---------- */
  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    mount("site-header", buildHeader());
    mount("site-footer", buildFooter());
    initMenu();
    initScrollHeader();
    initReveal();
    initForm();
  });
})();
