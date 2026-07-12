# Site web DMS System

Site vitrine multi-pages pour **DMS System**, entreprise multi-métiers implantée à
Chambray-lès-Tours : électricité, plomberie, chauffage (pompes à chaleur, énergies
renouvelables), climatisation et enseignes sur mesure.

## Pages

| Fichier | Page |
|---------|------|
| `index.html` | Accueil |
| `particuliers.html` | Particuliers |
| `professionnels.html` | Professionnels & industriels |
| `depannage.html` | Dépannage |
| `avis.html` | Avis clients |
| `faq.html` | Questions fréquentes |
| `contact.html` | Contact & devis (formulaire + carte) |

## Structure

```
dms-system-website/
├── index.html, particuliers.html, professionnels.html,
│   depannage.html, avis.html, faq.html, contact.html
├── assets/
│   ├── css/style.css     # Design tokens + composants (style « Trust & Authority »)
│   └── js/main.js        # Header/footer partagés, menu mobile, validation formulaire, animations
└── README.md
```

Le header et le footer sont générés depuis une **source unique** dans `assets/js/main.js`
(injectés dans `#site-header` / `#site-footer`), ce qui garantit une navigation cohérente
sur toutes les pages.

## Design

- **Style** : Trust & Authority (bleu marine `#0F172A` + bleu CTA `#0369A1`)
- **Typographie** : Lexend (titres) / Source Sans 3 (texte) — Google Fonts
- **Icônes** : SVG inline (jeu Lucide), aucune emoji comme icône
- **Accessibilité** : contrastes AA+, focus visibles, navigation clavier, `prefers-reduced-motion`, labels de formulaire
- **Responsive** : mobile-first, breakpoints 640 / 900 / 940 px, menu hamburger, bouton d'appel flottant sur mobile

## Lancer en local

Aucune dépendance ni build. Ouvrez `index.html` dans un navigateur, ou servez le dossier :

```bash
cd dms-system-website
python3 -m http.server 8000
# puis http://localhost:8000
```

## À personnaliser avant mise en production

- **E-mail** : `contact@dms-system.fr` est un exemple — remplacez-le dans `assets/js/main.js`
  (`COMPANY.email`) et dans `contact.html`.
- **Formulaire** : l'envoi est simulé côté client. Connectez le `<form id="devisForm">`
  à un backend ou à un service d'e-mail (Formspree, Getform, EmailJS…) dans `main.js`.
- **Avis / note** : les témoignages sont des exemples représentatifs. Le nombre d'avis (4 620)
  reprend la fiche fournie ; ajustez la note affichée selon votre fiche Google réelle.
- **Carte** : la carte Google Maps pointe sur l'adresse indiquée (aucune clé API requise).
