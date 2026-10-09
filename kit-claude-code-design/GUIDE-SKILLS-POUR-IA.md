# Guide des skills Claude Code — à donner à l'IA qui rédige les prompts

Tu rédiges des prompts destinés à **Claude Code**, qui travaille dans VS Code sur des sites internet.
Claude Code dispose des **skills** ci-dessous : ce sont des modes d'emploi spécialisés qu'il sait lire.

**Règle principale : dans chaque prompt, nomme explicitement le ou les skills à utiliser**,
avec la formule « Utilise le skill `nom-du-skill` ». Claude Code suit beaucoup mieux un prompt qui nomme ses skills.

---

## Les skills et à quoi ils servent

### Choisir le design (à faire en premier)

| Skill | À quoi il sert |
|---|---|
| `ui-ux-pro-max` | Base de données de design : styles, palettes de couleurs, associations de polices, structures de landing page, règles UX. **À utiliser au début de chaque nouveau site** pour fixer le style, les couleurs et les polices. |
| `design-md` (dossier, pas un skill) | 73 fiches de design de vrais sites (Stripe, Apple, Linear, Notion, Airbnb, Tesla, Nike…). À citer quand on veut « un site qui ressemble à X » : « Inspire-toi de `design-md/stripe/DESIGN.md` ». |

### Construire le site

| Skill | À quoi il sert |
|---|---|
| `design-taste-frontend` | **Skill principal pour coder un site.** Landing pages, portfolios, sites vitrines qui n'ont pas l'air « faits par une IA ». |
| `high-end-visual-design` | Rendu luxe / agence haut de gamme : polices, espacements, ombres, animations qui font « cher ». |
| `minimalist-ui` | Style épuré, éditorial, couleurs douces, pas de dégradés. |
| `industrial-brutalist-ui` | Style brut, technique, grilles rigides, très typographique. |
| `gpt-taste` | Sites avec beaucoup d'animations au défilement (GSAP). |
| `redesign-existing-projects` | **Améliorer un site qui existe déjà** sans casser ce qui marche. |
| `ui-styling` | Composants d'interface avec shadcn/ui et Tailwind CSS (formulaires, menus, fenêtres…). |
| `21st-ui` | Aller chercher des **composants tout faits** sur 21st.dev (section prix, menu, hero, témoignages…) et des logos de marques. Nécessite le serveur 21st connecté. |
| `full-output-enforcement` | Oblige Claude à écrire le code **en entier**, sans « … » ni morceaux manquants. Utile pour les longues pages. |

### Images et maquettes

| Skill | À quoi il sert |
|---|---|
| `imagegen-frontend-web` | Générer des **maquettes en image** d'un site (une image par section). |
| `imagegen-frontend-mobile` | Pareil pour une **application mobile**. |
| `image-to-code` | Transformer des maquettes en image en **vrai code**, le plus fidèlement possible. |

### Marque et communication

| Skill | À quoi il sert |
|---|---|
| `brand` | Ton de la marque, identité visuelle, messages. |
| `brandkit` | Planche d'identité de marque en image (logo, couleurs, mises en situation). |
| `design` | Logos, identité visuelle complète, icônes, visuels réseaux sociaux. |
| `banner-design` | Bannières pour réseaux sociaux, publicités, haut de site, impression. |
| `design-system` | Système de design : variables de couleurs, tailles, espacements, fiches composants. |
| `stitch-design-taste` | Écrit un fichier `DESIGN.md` qui décrit le style du site, pour garder un design cohérent. |
| `slides` | Présentations en HTML (avec graphiques). |

### Vérifier le résultat

| Outil | À quoi il sert |
|---|---|
| `playwright-cli` | Ouvrir le site dans un navigateur, cliquer, tester, **faire des captures d'écran** pour vérifier le rendu. |
| `/web-interface-guidelines <fichier>` (commande) | Vérifier l'**accessibilité et la qualité** du code d'une page (boutons, formulaires, contrastes…). |

À éviter : `design-taste-frontend-v1` (ancienne version, ne pas l'utiliser sauf demande précise).

---

## Méthode à suivre dans les prompts

Pour un nouveau site, le prompt doit demander ces étapes dans l'ordre :

1. **Choisir le design** avec `ui-ux-pro-max` (ou une fiche `design-md/<marque>/DESIGN.md`).
2. **Construire** avec `design-taste-frontend` (ou un skill de style : `high-end-visual-design`, `minimalist-ui`…).
3. **Vérifier visuellement** avec `playwright-cli` (capture d'écran, puis corrections).
4. **Contrôler la qualité** avec `/web-interface-guidelines`.

---

## Exemples de prompts

**Nouveau site**
> Crée la page d'accueil d'une boutique de coffrets cadeaux en bronze, style luxe et chaleureux.
> 1. Utilise le skill `ui-ux-pro-max` pour choisir le style, la palette et les polices.
> 2. Utilise le skill `high-end-visual-design` et le skill `design-taste-frontend` pour coder la page.
> 3. Utilise le skill `playwright-cli` pour ouvrir la page, faire une capture et corriger ce qui ne va pas.
> 4. Termine avec `/web-interface-guidelines` sur les fichiers créés.

**Améliorer un site existant**
> Utilise le skill `redesign-existing-projects` pour moderniser la page `index.html` sans casser les fonctionnalités.
> Puis utilise `playwright-cli` pour comparer avant/après avec des captures.

**Site inspiré d'une marque**
> Crée une landing page pour une application de rendez-vous.
> Inspire-toi du fichier `design-md/airbnb/DESIGN.md` et utilise le skill `design-taste-frontend`.

**Ajouter un composant tout fait**
> Utilise le skill `21st-ui` pour trouver une section « tarifs » sur 21st.dev et l'intégrer à la page.

**Maquettes d'abord, code ensuite**
> Utilise le skill `imagegen-frontend-web` pour générer une maquette par section (hero, avantages, avis, contact),
> puis le skill `image-to-code` pour coder le site fidèlement à ces maquettes.

**Visuels de marque**
> Utilise le skill `banner-design` pour créer une bannière Instagram et une bannière Facebook pour la nouvelle collection.
