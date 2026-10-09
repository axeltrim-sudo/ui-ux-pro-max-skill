# Kit design — instructions pour Claude Code

Ce projet embarque un kit de skills, une commande et un serveur MCP orientés design UI/UX.
Utilise-les selon le tableau ci-dessous plutôt que de concevoir l'interface « de mémoire ».

## Quel outil pour quelle demande

| Demande | Outil à utiliser |
|---|---|
| Choisir un style, une palette, des polices, une structure de landing page | skill `ui-ux-pro-max` (base de données consultable, voir commande ci-dessous) |
| Landing page, portfolio, site vitrine qui ne doit pas avoir l'air « généré par IA » | skill `design-taste-frontend` |
| Rendu haut de gamme, façon agence | skill `high-end-visual-design` |
| Style précis : épuré/éditorial · brutaliste · animations GSAP poussées | `minimalist-ui` · `industrial-brutalist-ui` · `gpt-taste` |
| Refaire en mieux un site existant | skill `redesign-existing-projects` |
| Générer des maquettes en image d'abord, puis coder à partir d'elles | `imagegen-frontend-web` / `imagegen-frontend-mobile` puis `image-to-code` |
| Planche d'identité de marque, logo | `brandkit`, `brand`, `design` |
| Bannières réseaux sociaux / pubs | `banner-design` |
| Tokens de design, système de design | `design-system`, `stitch-design-taste` (écrit un DESIGN.md) |
| Composants shadcn/ui + Tailwind | `ui-styling` |
| Composant prêt à l'emploi (pricing, navbar, hero…), logo SVG de marque | skill `21st-ui` + serveur MCP `21st` |
| Présentation HTML | `slides` |
| Ouvrir le site dans un navigateur, tester, faire des captures | skill `playwright-cli` |
| Vérifier l'accessibilité et la qualité d'une interface | commande `/web-interface-guidelines <fichier>` |
| Code long : ne rien tronquer | `full-output-enforcement` |

`design-taste-frontend-v1` est l'ancienne version de `design-taste-frontend` ; ne l'utilise que si on la demande.

## ui-ux-pro-max : recherche dans la base

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<requête>" --design-system -p "Nom du projet"
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<requête>" --domain <product|style|typography|color|landing|chart|ux|gsap>
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<requête>" --stack <html-tailwind|react|nextjs|vue|svelte|...>
```

Sous Windows, utilise `python` au lieu de `python3`. Si le kit est installé globalement,
le chemin est `~/.claude/skills/ui-ux-pro-max/scripts/search.py`.

## Bibliothèque DESIGN.md

Le dossier `design-md/` (ou `~/.claude/design-md/` en installation globale) contient 73 systèmes de design
extraits de sites réels (stripe, linear.app, vercel, apple, notion, airbnb, spotify, tesla…).
Quand on demande « un site qui ressemble à X », lis `design-md/<x>/DESIGN.md` et respecte ses tokens,
sa typographie et ses règles. Tu peux aussi copier ce fichier à la racine du projet en `DESIGN.md`.

## Méthode par défaut pour une interface

1. Interroger `ui-ux-pro-max` (ou lire un DESIGN.md de référence) pour fixer style, couleurs et polices.
2. Construire avec le skill de goût adapté (`design-taste-frontend` par défaut).
3. Ouvrir le résultat avec `playwright-cli`, faire une capture, corriger ce qui cloche.
4. Passer `/web-interface-guidelines` sur les fichiers modifiés.
