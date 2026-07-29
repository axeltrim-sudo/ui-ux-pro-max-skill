/* ============================================================================
   DMS System — Logique interactive
   - Switch Particuliers / Professionnels (contenu + navigation dynamiques)
   - Carrousel de services (auto-défilement + navigation)
   - Modale de devis
   - FAQ en accordéons
   - Menu mobile, header au scroll, révélations, formulaires
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. Année dynamique dans le footer
     ======================================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ==========================================================================
     1. CONTENU DYNAMIQUE selon l'audience (Particuliers / Professionnels)
     ======================================================================== */
  const CONTENT = {
    particuliers: {
      heroSubtitle:
        "Électricité, plomberie, chauffage et climatisation pour votre habitat. " +
        "Un accompagnement clé en main, du dépannage à la rénovation énergétique.",
      polesSubtitle: "Une équipe polyvalente pour tous vos projets d'habitat.",
      metiers: {
        electricite: "Mise aux normes NF C 15-100, rénovation de tableaux électriques, éclairage, domotique et bornes de recharge. Des installations fiables et sécurisées pour votre quotidien.",
        plomberie:   "Recherche et réparation de fuites, création de réseaux d'eau, installation sanitaire et rénovation complète de salle de bain. Interventions soignées et durables.",
        chauffage:   "Installation et entretien de pompes à chaleur, chaudières et planchers chauffants. Des solutions économes pour réduire vos factures et améliorer votre confort.",
        climatisation: "Climatiseurs réversibles, systèmes split et gainables discrets. Profitez d'une fraîcheur maîtrisée en été et d'un appoint de chauffage en hiver.",
      },
      // Cartes du carrousel de services
      services: [
        { icon: '⚡', color: 'energy',  title: 'Mise aux normes électrique', text: 'Sécurisez votre installation selon la norme NF C 15-100.' },
        { icon: '🔌', color: 'energy',  title: 'Borne de recharge',          text: 'Installation IRVE pour votre véhicule électrique.' },
        { icon: '🚿', color: 'plumb',   title: 'Rénovation salle de bain',   text: 'Un espace bien-être clé en main, du sol au plafond.' },
        { icon: '💧', color: 'plumb',   title: 'Recherche de fuite',         text: 'Détection non destructive et réparation rapide.' },
        { icon: '🔥', color: 'heat',    title: 'Pompe à chaleur',            text: 'Chauffez malin et divisez votre facture énergétique.' },
        { icon: '❄️', color: 'climate', title: 'Climatisation réversible',   text: 'Frais l\'été, doux l\'hiver, silencieux toute l\'année.' },
      ],
    },
    professionnels: {
      heroSubtitle:
        "Électricité, CVC et plomberie pour vos locaux, copropriétés et sites tertiaires. " +
        "Contrats de maintenance, interventions planifiées et interlocuteur unique dédié.",
      polesSubtitle: "Un partenaire technique unique pour vos bâtiments et copropriétés.",
      metiers: {
        electricite: "Tableaux tertiaires, mises en conformité, éclairage LED, GTB et contrôles périodiques. Nous sécurisons vos locaux et optimisons vos consommations.",
        plomberie:   "Réseaux collectifs, sanitaires ERP, colonnes montantes et maintenance préventive pour copropriétés et entreprises. Traçabilité et réactivité garanties.",
        chauffage:   "Chaufferies collectives, PAC tertiaires et contrats d'entretien annuels. Maîtrise des coûts d'exploitation et continuité de service assurée.",
        climatisation: "Climatisation de bureaux, VRV/DRV et gainables tertiaires. Maintenance planifiée pour un confort continu de vos collaborateurs et clients.",
      },
      services: [
        { icon: '🏢', color: 'plumb',   title: 'Maintenance tertiaire',    text: 'Contrats d\'entretien préventif et curatif multi-sites.' },
        { icon: '🏗️', color: 'energy',  title: 'Copropriétés',             text: 'Interlocuteur unique pour syndics et gestionnaires.' },
        { icon: '⚡', color: 'energy',  title: 'Conformité électrique',    text: 'Mises aux normes et contrôles périodiques ERP.' },
        { icon: '🌡️', color: 'heat',    title: 'Chaufferie collective',    text: 'Exploitation, régulation et optimisation énergétique.' },
        { icon: '❄️', color: 'climate', title: 'Climatisation VRV/DRV',    text: 'Confort maîtrisé pour bureaux et commerces.' },
        { icon: '📊', color: 'plumb',   title: 'GTB & pilotage',           text: 'Supervision et suivi des consommations en temps réel.' },
      ],
    },
  };

  // Classes Tailwind (déclarées ici pour être conservées par le compilateur JIT du CDN)
  const COLOR_MAP = {
    energy:  { border: 'border-energy',  text: 'text-energy',  bg: 'bg-energy/15',  ring: 'ring-energy/40' },
    plumb:   { border: 'border-plumb',   text: 'text-sky',     bg: 'bg-plumb/20',   ring: 'ring-plumb/50' },
    climate: { border: 'border-climate', text: 'text-climate', bg: 'bg-climate/15', ring: 'ring-climate/40' },
    heat:    { border: 'border-heat',    text: 'text-heat',    bg: 'bg-heat/15',    ring: 'ring-heat/40' },
  };

  let currentAudience = 'particuliers';

  /**
   * Applique le contenu de l'audience choisie, avec transition en fondu.
   */
  function setAudience(audience) {
    if (!CONTENT[audience]) return;
    currentAudience = audience;
    const data = CONTENT[audience];

    // --- 1. Fondu sortant des textes concernés ---
    const swappables = document.querySelectorAll('.fade-swap, .metier-desc');
    swappables.forEach(el => el.classList.add('fade-out'));

    // --- 2. Après le fondu, on remplace les contenus puis on fait réapparaître ---
    setTimeout(() => {
      // Sous-titres
      const heroSub = document.getElementById('hero-subtitle');
      const polesSub = document.getElementById('poles-subtitle');
      if (heroSub) heroSub.textContent = data.heroSubtitle;
      if (polesSub) polesSub.textContent = data.polesSubtitle;

      // Descriptifs des 4 métiers
      document.querySelectorAll('.metier-desc').forEach(el => {
        const key = el.dataset.metier;
        if (data.metiers[key]) el.textContent = data.metiers[key];
      });

      // Reconstruction du carrousel de services
      buildCarousel(data.services);

      // Réapparition
      swappables.forEach(el => el.classList.remove('fade-out'));
    }, 350);

    // --- 3. Mise à jour de l'apparence des boutons toggle ---
    updateToggleUI(audience);

    // --- 4. Affichage des onglets réservés au mode Pro ---
    const isPro = audience === 'professionnels';
    document.querySelectorAll('[data-pro-only]').forEach(el => {
      el.classList.toggle('hidden', !isPro);
    });
  }

  /**
   * Met à jour l'aspect visuel du switch (pastille glissante + couleurs).
   */
  function updateToggleUI(audience) {
    const isPro = audience === 'professionnels';

    // Pastille glissante du switch principal
    const pill = document.getElementById('toggle-pill');
    if (pill) {
      pill.style.transform = isPro ? 'translateX(100%)' : 'translateX(0)';
    }

    // Couleur du texte des boutons (principal + mobile)
    document.querySelectorAll('.audience-btn').forEach(btn => {
      const active = btn.dataset.audience === audience;
      // Version header principal
      if (btn.closest('#audience-toggle')) {
        btn.classList.toggle('text-night', active);
        btn.classList.toggle('text-white/70', !active);
      } else {
        // Version mobile (pastille pleine)
        btn.classList.toggle('bg-sky', active);
        btn.classList.toggle('text-night', active);
        btn.classList.toggle('text-white/70', !active);
      }
    });
  }

  // Écoute des clics sur tous les boutons d'audience
  document.querySelectorAll('.audience-btn').forEach(btn => {
    btn.addEventListener('click', () => setAudience(btn.dataset.audience));
  });


  /* ==========================================================================
     2. CARROUSEL DE SERVICES (construction + auto-défilement)
     ======================================================================== */
  const carousel = document.getElementById('carousel');
  const dotsWrap = document.getElementById('carousel-dots');
  let autoTimer = null;

  /**
   * (Re)construit les cartes du carrousel à partir d'un tableau de services.
   */
  function buildCarousel(services) {
    if (!carousel) return;
    carousel.innerHTML = '';

    services.forEach(s => {
      const c = COLOR_MAP[s.color];
      const card = document.createElement('div');
      card.className = `service-card hover-card rounded-2xl p-6 bg-night ring-1 ring-white/10 border-t-4 ${c.border}`;
      card.innerHTML = `
        <div class="w-14 h-14 rounded-xl grid place-items-center text-3xl mb-4 ${c.bg} ring-1 ${c.ring}">${s.icon}</div>
        <h3 class="text-lg font-bold ${c.text}">${s.title}</h3>
        <p class="text-sm text-white/60 mt-2">${s.text}</p>
      `;
      carousel.appendChild(card);
    });

    buildDots();
    restartAuto();
  }

  /**
   * Crée les indicateurs (dots) en fonction du nombre de cartes visibles.
   */
  function buildDots() {
    if (!dotsWrap || !carousel) return;
    dotsWrap.innerHTML = '';
    const cards = carousel.querySelectorAll('.service-card');
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Aller à la prestation ${i + 1}`);
      dot.addEventListener('click', () => scrollToCard(i));
      dotsWrap.appendChild(dot);
    });
  }

  /** Fait défiler jusqu'à la carte d'indice donné. */
  function scrollToCard(index) {
    const cards = carousel.querySelectorAll('.service-card');
    if (!cards[index]) return;
    carousel.scrollTo({ left: cards[index].offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
  }

  /** Met à jour l'indicateur actif selon la position de défilement. */
  function updateActiveDot() {
    if (!carousel || !dotsWrap) return;
    const cards = carousel.querySelectorAll('.service-card');
    const dots = dotsWrap.querySelectorAll('.carousel-dot');
    let closest = 0, min = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - carousel.offsetLeft - carousel.scrollLeft);
      if (dist < min) { min = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }

  /** Avance d'une carte (revient au début si on est à la fin). */
  function nextCard() {
    if (!carousel) return;
    const nearEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
    if (nearEnd) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      const card = carousel.querySelector('.service-card');
      carousel.scrollBy({ left: (card ? card.offsetWidth : 320) + 20, behavior: 'smooth' });
    }
  }

  /** Recule d'une carte. */
  function prevCard() {
    if (!carousel) return;
    const card = carousel.querySelector('.service-card');
    carousel.scrollBy({ left: -((card ? card.offsetWidth : 320) + 20), behavior: 'smooth' });
  }

  /** (Re)démarre le défilement automatique. */
  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextCard, 3500);
  }

  if (carousel) {
    document.getElementById('carousel-next')?.addEventListener('click', () => { nextCard(); restartAuto(); });
    document.getElementById('carousel-prev')?.addEventListener('click', () => { prevCard(); restartAuto(); });
    carousel.addEventListener('scroll', updateActiveDot, { passive: true });
    // Pause de l'auto-défilement quand la souris survole le carrousel
    carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', restartAuto);
  }


  /* ==========================================================================
     3. MODALE DE DEVIS
     ======================================================================== */
  const modal = document.getElementById('quote-modal');

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // bloque le scroll de fond
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-quote]').forEach(b => b.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-quote]').forEach(b => b.addEventListener('click', closeModal));
  // Fermeture au clic sur l'overlay
  modal?.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
  // Fermeture avec la touche Échap
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


  /* ==========================================================================
     4. FAQ — accordéons
     ======================================================================== */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Ferme tous les autres (comportement accordéon classique)
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });


  /* ==========================================================================
     5. MENU MOBILE
     ======================================================================== */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  burger?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));
  // Fermeture du menu mobile au clic sur un lien
  document.querySelectorAll('.mobile-link').forEach(l =>
    l.addEventListener('click', () => mobileMenu?.classList.add('hidden'))
  );


  /* ==========================================================================
     6. HEADER : ombre renforcée au scroll
     ======================================================================== */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('shadow-2xl', 'shadow-black/40', 'bg-night/90');
    } else {
      header.classList.remove('shadow-2xl', 'shadow-black/40', 'bg-night/90');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ==========================================================================
     7. RÉVÉLATION AU SCROLL (IntersectionObserver)
     ======================================================================== */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    // Repli : tout afficher si l'API n'est pas dispo
    revealEls.forEach(el => el.classList.add('is-visible'));
  }


  /* ==========================================================================
     8. FORMULAIRES (démonstration — pas de back-end)
     ======================================================================== */
  const quoteForm = document.getElementById('quote-form');
  quoteForm?.addEventListener('submit', e => {
    e.preventDefault();
    const fb = document.getElementById('quote-feedback');
    fb?.classList.remove('hidden');
    quoteForm.reset();
    setTimeout(() => { fb?.classList.add('hidden'); closeModal(); }, 2500);
  });

  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const fb = document.getElementById('contact-feedback');
    fb?.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => fb?.classList.add('hidden'), 4000);
  });


  /* ==========================================================================
     9. INITIALISATION
     ======================================================================== */
  setAudience('particuliers'); // construit le carrousel + contenu par défaut
});
