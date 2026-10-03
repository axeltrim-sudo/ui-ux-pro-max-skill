#!/usr/bin/env node
/**
 * Tool hooks (PreToolUse / PostToolUse)
 *
 * Cross-platform (Windows, macOS, Linux)
 *
 * Ports the conditional hooks from hooks.json, whose expression matchers
 * (`tool == "Bash" && ...`) Claude Code does not support. settings.json
 * matches on tool name only; the conditions are checked here instead.
 *
 * Usage: node tool-hooks.js <pre-bash|post-bash|post-edit>
 *
 * Exit 2 blocks a PreToolUse call and shows stderr to Claude.
 * PostToolUse findings are returned as additionalContext so Claude sees them.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readInput() {
  return new Promise(resolve => {
    let data = '';
    process.stdin.on('data', chunk => (data += chunk));
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
  });
}

function addContext(event, lines) {
  if (!lines.length) return;
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: event, additionalContext: lines.join('\n') }
  }));
}

function preBash(input) {
  const cmd = input.tool_input?.command || '';

  // Block dev servers outside tmux - ensures you can access logs
  if (/(npm run dev|pnpm( run)? dev|yarn dev|bun run dev)/.test(cmd) && !process.env.TMUX) {
    console.error('[Hook] BLOCKED: Dev server must run in tmux for log access');
    console.error('[Hook] Use: tmux new-session -d -s dev "npm run dev"');
    console.error('[Hook] Then: tmux attach -t dev');
    process.exit(2);
  }

  // Reminder to use tmux for long-running commands
  if (/(npm (install|test)|pnpm (install|test)|yarn (install|test)?|bun (install|test)|cargo build|make|docker|pytest|vitest|playwright)/.test(cmd) && !process.env.TMUX) {
    console.error('[Hook] Consider running in tmux for session persistence');
    console.error('[Hook] tmux new -s dev  |  tmux attach -t dev');
  }

  // Reminder before git push to review changes
  if (/git push/.test(cmd)) {
    console.error('[Hook] Review changes before push...');
    console.error('[Hook] Continuing with push (remove this hook to add interactive review)');
  }
}

function postBash(input) {
  // Log PR URL and provide review command after PR creation
  const cmd = input.tool_input?.command || '';
  if (!/gh pr create/.test(cmd)) return;
  const response = input.tool_response;
  const out = typeof response === 'string' ? response : JSON.stringify(response || '');
  const m = out.match(/https:\/\/github\.com\/([^/]+\/[^/]+)\/pull\/(\d+)/);
  if (m) {
    addContext('PostToolUse', [
      `[Hook] PR created: ${m[0]}`,
      `[Hook] To review: gh pr review ${m[2]} --repo ${m[1]}`
    ]);
  }
}

function postEdit(input) {
  const p = input.tool_input?.file_path;
  if (!p || !/\.(ts|tsx|js|jsx)$/.test(p) || !fs.existsSync(p)) return;
  const lines = [];

  // Auto-format JS/TS files with Prettier after edits
  try {
    execSync(`npx --no-install prettier --write "${p}"`, { stdio: 'pipe' });
  } catch {}

  // TypeScript check after editing .ts/.tsx files
  if (/\.(ts|tsx)$/.test(p)) {
    let dir = path.dirname(p);
    while (dir !== path.dirname(dir) && !fs.existsSync(path.join(dir, 'tsconfig.json'))) {
      dir = path.dirname(dir);
    }
    if (fs.existsSync(path.join(dir, 'tsconfig.json'))) {
      let out = '';
      try {
        out = execSync('npx --no-install tsc --noEmit --pretty false 2>&1', { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
      } catch (e) {
        out = e.stdout || '';
      }
      const errors = out.split('\n').filter(l => l.includes(path.relative(dir, p))).slice(0, 10);
      if (errors.length) lines.push(`[Hook] TypeScript errors in ${p}:`, ...errors);
    }
  }

  // Warn about console.log statements after edits
  const matches = [];
  fs.readFileSync(p, 'utf8').split('\n').forEach((l, idx) => {
    if (/console\.log/.test(l)) matches.push(`${idx + 1}: ${l.trim()}`);
  });
  if (matches.length) {
    lines.push(`[Hook] WARNING: console.log found in ${p}`, ...matches.slice(0, 5), '[Hook] Remove console.log before committing');
  }

  addContext('PostToolUse', lines);
}

const modes = { 'pre-bash': preBash, 'post-bash': postBash, 'post-edit': postEdit };

readInput().then(input => {
  const handler = modes[process.argv[2]];
  if (handler) handler(input);
  process.exit(0);
}).catch(err => {
  console.error('[ToolHooks] Error:', err.message);
  process.exit(0);
});
