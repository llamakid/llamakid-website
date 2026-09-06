---
title: Skills Work the Same in Claude and Codex Now, and That's a Bigger Deal Than It Sounds
date: 2026-09-06
summary: Claude and Codex both use skills built from the same SKILL.md format. Write one and it works in either tool.
---

Most AI tooling is built to lock you in. You learn one assistant's way of doing things, and switching to a different one means relearning it from scratch. Skills are the rare exception, and it happened almost by accident.

## What a skill actually is

A skill is a folder with instructions in it, a `SKILL.md` file plus whatever scripts or reference material it needs, that tells an assistant how to handle a specific kind of task. Instead of re-explaining your deploy process or your code review checklist in every conversation, you write it once as a skill. The assistant reads the file, sees when it applies, and follows it.

Claude has had this for a while, built into Claude Code, the Claude apps, and the Agent SDK. Codex, OpenAI's coding agent, later added its own skills feature, and it uses the same format. A folder with a `SKILL.md` describing what the skill does, when it should trigger, and the steps to follow. Drop one in `~/.claude/skills` and Claude picks it up. Drop the same folder in `~/.codex/skills` and Codex picks it up too.

That wasn't a formal standards agreement between the two companies. It's just that the format was simple and useful enough that the second tool to build a skills system copied it instead of inventing something incompatible.

## Why that matters more than it looks like it should

Normally, tooling investment doesn't transfer. Time spent learning a tool's quirks, its custom config format, its specific way of extending behavior, is time you lose the moment you switch tools. That's most of why people stick with a worse tool they already know.

Skills break that pattern. Write a skill once, for one tool, and it's genuinely portable to the other. If you use Claude Code for most of your work but reach for Codex on a specific project, you're not maintaining two versions of your onboarding instructions or your commit message conventions. You maintain one folder.

It also means you don't have to bet on a single tool anymore. Try both, use whichever is better for the task in front of you, and the skills you've built keep working either way.

## A concrete example

Say you want either assistant to write commit messages your way, imperative mood, no more than 72 characters on the summary line, no mention of AI in the message. Instead of typing that out every time, you write one skill:

```
skills/commit-style/SKILL.md
```

```markdown
---
name: commit-style
description: Use when writing a git commit message
---

Write commit messages in the imperative mood ("Fix bug", not "Fixed bug").
Keep the summary line under 72 characters.
Never mention AI, Claude, or Codex in the message.
```

Copy that folder into `~/.claude/skills/commit-style` and Claude follows it. Copy the same folder into `~/.codex/skills/commit-style` and Codex follows it too. No translation, no rewriting, no tool-specific dialect to learn.

## Where to start

If you already use Claude Code, you likely have skills in place without thinking of them that way, things like `/code-review` or project-specific slash commands are often skills under the hood. Look in `~/.claude/skills` to see what's already there.

If you split time between Claude and Codex, that's the actual payoff: pick one small, repeated annoyance, commit message style, a specific review checklist, a formatting convention, write it as a skill once, and stop explaining it twice.
