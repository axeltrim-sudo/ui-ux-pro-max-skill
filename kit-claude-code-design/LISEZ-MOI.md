# Kit design pour Claude Code (VS Code)

Tout ce qu'il faut pour que Claude Code conçoive de belles interfaces, dans un seul dossier.

## Contenu

| Élément | Où | Source |
|---|---|---|
| UI UX Pro Max + 6 skills design (bannières, marque, design system, slides, shadcn/Tailwind…) | `.claude/skills/` | ce dépôt |
| 13 skills « taste » anti-design générique (dont `image-to-code`, le SKILL.md que vous avez envoyé) | `.claude/skills/` | Leonxlnx/taste-skill |
| Skill `21st-ui` + serveur MCP `21st` (composants prêts à l'emploi) | `.claude/skills/21st-ui`, `.mcp.json` | 21st-dev/magic-mcp |
| Skill `playwright-cli` (piloter un navigateur, tester, captures) | `.claude/skills/playwright-cli` | microsoft/playwright-cli |
| Commande `/web-interface-guidelines` (audit accessibilité/qualité) | `.claude/commands/` | vercel-labs/web-interface-guidelines |
| 73 DESIGN.md de sites réels (Stripe, Linear, Apple, Notion…) | `design-md/` | VoltAgent/awesome-design-md |
| Mode d'emploi pour Claude | `CLAUDE.md` | — |

## Installation

### Option 1 : pour tous vos projets (recommandé)

Windows, dans un terminal PowerShell ouvert dans ce dossier :

```powershell
powershell -ExecutionPolicy Bypass -File .\installer.ps1
```

macOS / Linux :

```bash
./installer.sh
```

Les skills et la commande vont dans `~/.claude/` (sous Windows : `C:\Users\<vous>\.claude\`).
Ils sont alors disponibles dans tous les projets ouverts avec Claude Code.

### Option 2 : pour un seul projet

```powershell
powershell -ExecutionPolicy Bypass -File .\installer.ps1 -Projet "C:\chemin\vers\mon-projet"
```

ou copiez simplement `.claude`, `.mcp.json`, `CLAUDE.md` et `design-md` à la racine du projet.
Un `CLAUDE.md` existant n'est jamais écrasé : le kit est ajouté à la fin.

## Trois étapes à faire une fois

1. **Clé 21st.dev** (gratuite) sur https://21st.dev/mcp, puis :
   - installation globale :
     `claude mcp add --scope user --transport http 21st https://21st.dev/api/mcp --header "x-api-key: VOTRE_CLE"`
   - installation par projet : définir la variable d'environnement `API_KEY_21ST`
     (Windows : `setx API_KEY_21ST "votre-clé"`), puis redémarrer VS Code.
     Ne mettez jamais la clé en clair dans `.mcp.json` si le projet est sur GitHub.
2. **Navigateur** : `npm install -g @playwright/cli@latest` (Node.js 18 ou plus).
3. **Python 3** pour UI UX Pro Max : `python --version` doit répondre.

## Vérifier

Ouvrez Claude Code dans VS Code et tapez `/` : vous devez voir `web-interface-guidelines` et les skills
(`ui-ux-pro-max`, `design-taste-frontend`…). Tapez `/mcp` pour voir le serveur `21st`.

## Exemples de demandes

- « Fais-moi une landing page pour ma boutique de bijoux, style haut de gamme. »
- « Refais ce site en mieux » → `redesign-existing-projects`
- « Un site qui ressemble à Stripe » → `design-md/stripe/DESIGN.md`
- « Ajoute une section pricing depuis 21st.dev »
- « Ouvre la page dans le navigateur et fais une capture »
- `/web-interface-guidelines src/components/Header.tsx`

## Attention

Ces skills viennent de dépôts publics tiers et Claude les suit avec toutes ses permissions.
Ils ont été copiés tels quels le 9 octobre 2026 ; pour les mettre à jour, retéléchargez les dépôts sources.
