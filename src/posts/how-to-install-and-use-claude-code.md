---
title: How to Install Claude Code and Actually Start Using It
date: 2026-07-25
summary: It's a terminal app, which sounds scarier than it is. Here's the whole setup, start to finish.
---

Claude Code is Anthropic's coding assistant that lives in your terminal instead of a chat window. That description scares off a lot of people who'd otherwise get a lot out of it. You don't need to be a terminal person already. You just need to follow the steps once.

## Installing it

You need Node.js installed first — version 18 or newer. If you don't already have it, grab it from [nodejs.org](https://nodejs.org) and install it like any other program.

Once that's done, open your terminal (Terminal on Mac, PowerShell or WSL on Windows) and run:

```
npm install -g @anthropic-ai/claude-code
```

That downloads Claude Code and makes the `claude` command available everywhere on your machine. Give it a minute to finish.

## Logging in

Type:

```
claude
```

The first time you run it, it'll walk you through logging in with your Anthropic account — either a Claude.ai Pro/Max subscription or an API key, your choice. Follow the prompts, and once it's done you'll land in Claude Code's own prompt, ready to go.

## Pointing it at a project

Claude Code works on whatever folder you're in. Before launching it, `cd` into the project you want help with:

```
cd path/to/your/project
claude
```

If you just want to poke around without a real project yet, any empty folder works fine too. It'll read the files that are there and go from there.

## Talking to it

Once you're in, just type what you want in plain English:

> "Add a dark mode toggle to the settings page."

> "Why is this function throwing an error when the input is empty?"

> "Set up a basic Express server with one route."

It reads your files, makes changes, and tells you what it did. You can ask it to explain something instead of changing it, ask it to undo a change, or just keep the conversation going like you would with any assistant. It'll ask before doing anything that seems risky, like deleting files or running commands that touch things outside the project.

## A few things worth knowing early

**It works in steps, not all at once.** For a big task, it'll often lay out a plan before touching anything, especially if you ask it to. That's a good habit to lean into — for anything nontrivial, ask it to plan first and confirm before it starts writing code.

**Slash commands are shortcuts.** Type `/` in the prompt to see a list. `/clear` starts a fresh conversation, `/usage` shows you what you've used against your plan's limits (worth checking if you're not sure what those are), `/help` lists everything else.

**It remembers your project, not just your conversation.** If you create a file called `CLAUDE.md` in your project's root folder, Claude Code reads it automatically every time you start a session there. That's the place to put standing instructions — coding conventions, things to always do or avoid, background on the project — so you're not repeating yourself every time.

**You can exit anytime.** `Ctrl+C` twice, or just close the terminal. Nothing keeps running in the background after you leave.

## Where to go from here

Start small. Point it at a real but low-stakes task — fixing a bug, writing a small feature, explaining a file you didn't write — and see how the back-and-forth feels. The learning curve is mostly about trusting it with bigger asks once you've seen it handle smaller ones well.

If you want a sense of how to spend your usage wisely once you're past the basics, I've also written about [checking your Claude Code usage limits](/blog/how-to-check-your-claude-code-usage-limits) before you run into one unexpectedly.
