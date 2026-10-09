#!/usr/bin/env bash
# Installe le kit design pour Claude Code (macOS / Linux)
#
#   Global (tous vos projets) :  ./installer.sh
#   Un seul projet :             ./installer.sh /chemin/vers/mon-projet
set -euo pipefail

KIT="$(cd "$(dirname "$0")" && pwd)"
PROJET="${1:-}"

if [ -n "$PROJET" ]; then
  CIBLE="$PROJET/.claude"; DESIGN_MD="$PROJET/design-md"; CLAUDE_MD="$PROJET/CLAUDE.md"
else
  CIBLE="$HOME/.claude"; DESIGN_MD="$CIBLE/design-md"; CLAUDE_MD="$CIBLE/CLAUDE.md"
fi

mkdir -p "$CIBLE/skills" "$CIBLE/commands" "$DESIGN_MD"
cp -R "$KIT/.claude/skills/." "$CIBLE/skills/"
cp -R "$KIT/.claude/commands/." "$CIBLE/commands/"
cp -R "$KIT/design-md/." "$DESIGN_MD/"

# CLAUDE.md : on ne remplace jamais un fichier existant, on ajoute le kit à la fin
if [ -f "$CLAUDE_MD" ]; then
  grep -q "# Kit design" "$CLAUDE_MD" || { printf '\n' >> "$CLAUDE_MD"; cat "$KIT/CLAUDE.md" >> "$CLAUDE_MD"; }
else
  cp "$KIT/CLAUDE.md" "$CLAUDE_MD"
fi

if [ -n "$PROJET" ]; then
  if [ -f "$PROJET/.mcp.json" ]; then
    echo "Un .mcp.json existe déjà : ajoutez-y le serveur '21st' à la main (voir .mcp.json du kit)."
  else
    cp "$KIT/.mcp.json" "$PROJET/.mcp.json"
  fi
fi

echo
echo "Kit installé dans $CIBLE"
echo
echo "Étapes restantes :"
echo " 1. Clé 21st.dev (gratuite sur https://21st.dev/mcp) :"
if [ -n "$PROJET" ]; then
  echo "    export API_KEY_21ST=\"votre-clé\"  (à mettre dans ~/.zshrc ou ~/.bashrc)"
else
  echo "    claude mcp add --scope user --transport http 21st https://21st.dev/api/mcp --header \"x-api-key: VOTRE_CLE\""
fi
echo " 2. Navigateur pour les tests :  npm install -g @playwright/cli@latest"
echo " 3. Python 3 doit être installé (pour ui-ux-pro-max) :  python3 --version"
