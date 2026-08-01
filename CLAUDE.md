# CLAUDE.md

Project context lives in [AGENTS.md](./AGENTS.md) — authorities, commands,
architecture, patterns, and the Definition of Done. Read it first.

Kept here only because it is Claude Code specific:

- Skills are vendored under `.agents/skills/` and locked in `skills-lock.json`.
  `.claude/` is gitignored, so anything placed there is local to one machine.
- `.github/hooks/impeccable.json` and `.codex/hooks.json` wire the impeccable
  design hook. Both no-op when the skill is not installed.
