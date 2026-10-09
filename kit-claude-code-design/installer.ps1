# Installe le kit design pour Claude Code (Windows / PowerShell)
#
#   Global (tous vos projets) :  .\installer.ps1
#   Un seul projet :             .\installer.ps1 -Projet "C:\chemin\vers\mon-projet"
#
# Si PowerShell bloque le script :  powershell -ExecutionPolicy Bypass -File .\installer.ps1

param([string]$Projet = "")

$ErrorActionPreference = "Stop"
$Kit = $PSScriptRoot

if ($Projet -ne "") {
    $Cible = Join-Path $Projet ".claude"
    $DesignMd = Join-Path $Projet "design-md"
    $ClaudeMd = Join-Path $Projet "CLAUDE.md"
} else {
    $Cible = Join-Path $HOME ".claude"
    $DesignMd = Join-Path $Cible "design-md"
    $ClaudeMd = Join-Path $Cible "CLAUDE.md"
}

New-Item -ItemType Directory -Force -Path (Join-Path $Cible "skills"), (Join-Path $Cible "commands"), $DesignMd | Out-Null
Copy-Item -Recurse -Force (Join-Path $Kit ".claude\skills\*") (Join-Path $Cible "skills")
Copy-Item -Recurse -Force (Join-Path $Kit ".claude\commands\*") (Join-Path $Cible "commands")
Copy-Item -Recurse -Force (Join-Path $Kit "design-md\*") $DesignMd

# CLAUDE.md : on ne remplace jamais un fichier existant, on ajoute le kit à la fin
# (lecture/écriture en UTF-8 pour garder les accents)
$Bloc = [IO.File]::ReadAllText((Join-Path $Kit "CLAUDE.md"))
if (Test-Path $ClaudeMd) {
    if (-not ([IO.File]::ReadAllText($ClaudeMd)).Contains("# Kit design")) {
        [IO.File]::AppendAllText($ClaudeMd, "`r`n$Bloc")
    }
} else {
    [IO.File]::WriteAllText($ClaudeMd, $Bloc)
}

if ($Projet -ne "") {
    $Mcp = Join-Path $Projet ".mcp.json"
    if (-not (Test-Path $Mcp)) { Copy-Item (Join-Path $Kit ".mcp.json") $Mcp }
    else { Write-Host "Un .mcp.json existe deja : ajoutez-y le serveur '21st' a la main (voir .mcp.json du kit)." }
}

Write-Host ""
Write-Host "Kit installe dans $Cible"
Write-Host ""
Write-Host "Etapes restantes :"
Write-Host " 1. Cle 21st.dev (gratuite sur https://21st.dev/mcp) :"
if ($Projet -ne "") {
    Write-Host "    setx API_KEY_21ST `"votre-cle`"   puis redemarrez VS Code"
} else {
    Write-Host "    claude mcp add --scope user --transport http 21st https://21st.dev/api/mcp --header `"x-api-key: VOTRE_CLE`""
}
Write-Host " 2. Navigateur pour les tests :  npm install -g @playwright/cli@latest"
Write-Host " 3. Python 3 doit etre installe (pour ui-ux-pro-max) :  python --version"
