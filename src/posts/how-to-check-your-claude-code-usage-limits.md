---
title: How to Check Your Claude Code Usage Limits
date: 2026-06-23
summary: Claude Code has session and weekly limits, and most people only find out they exist by slamming into one. Here's how to see where you stand before that happens.
---

The limits are invisible right up until you hit one, which is the worst possible time to learn they were there. You're deep in something, the work is flowing, and then it stops and tells you to come back later. Two minutes of checking ahead of time saves you that, so here's how to actually see where you stand.

## The fastest check: /usage

Run `/usage` inside Claude Code. That's it. If you're on a Pro or Max plan it shows you consumption bars for your current limits, how much of each you've burned, and when each one resets. The same command answers to `/cost` and `/stats` if those are easier to remember.

It costs nothing to run. No tokens, no API call, it just reads what it already knows and draws it on the screen. So there's no reason to ration it. I run it without thinking about it now, the way you'd glance at a fuel gauge.

## The two limits, and how they stack

There are two clocks running at once, and understanding the difference is most of the battle.

The first is a 5 hour rolling window. This one is short term. The thing people miss is that it starts on your first prompt, not on a fixed wall clock. Fire your first message at 10 in the morning and that window resets at 3 in the afternoon, no matter what you did in between. So if you front load a heavy burst right at the start, the clock to recovery is already ticking.

The second is a weekly cap. This is the bigger picture, the total amount of work the plan gives you across seven days. You can be completely fine on your 5 hour window and still be running low for the week, or the other way around. They're separate, and `/usage` shows you both so you don't have to guess which one is the constraint.

One more thing worth knowing: that weekly quota is now shared across Claude Code, claude.ai, and Cowork. It's one pool, not three. Heavy chatting in the browser pulls from the same bucket your coding does.

As for actual numbers, I'm going to send you to `/usage` rather than print them here. The limits change. They got doubled earlier this year, the ranges differ by plan, and anything I write down goes stale the next time Anthropic adjusts them. The shape is what's stable: Pro is the lighter tier, and the Max plans scale up sharply from there. For your real figures, check your own screen.

## Context is a different thing entirely

This trips people up, so it's worth being clear. Your context window and your usage limit are not the same number, and a full context does not mean you've hit your plan.

The context window is how much the model can hold in a single conversation, 200 thousand tokens by default and a million on the extended models. It's about this one chat. When it fills, Claude compacts the history and keeps going. To see it directly, run `/context`, which draws your current conversation as a grid and warns you as it gets crowded.

The usage limit is about your plan over time, across every conversation. So you can blow through a context window five times in an afternoon and still be nowhere near your weekly cap, or sit in one small chat and be running low because of everything else you did this week. Two different gauges measuring two different things.

## Make it always visible

If you'd rather not run a command at all, you can pin this information to the bottom of the screen. The status line is a small script Claude Code runs after each message, and it can show your context percentage and your rate limit percentages right there, all the time, updating as you work.

It lives in your `~/.claude/settings.json` under a `statusLine` entry that points at a script. The script gets handed all the numbers as data, the context window fields and the rate limit fields for both the 5 hour and 7 day windows, and you decide what to print. It's the difference between checking the gauge and having it always in view. For a busy week, having it always in view is the better setup.

## Habits that keep you under the line

Checking is half of it. The other half is not burning through the quota faster than you need to.

The big one is model choice. Most of what you do day to day doesn't need the heaviest model, and reaching for it on small tasks spends your limit faster for no real gain. I wrote a whole post on that, but the short version is to match the model to the task instead of defaulting to the strongest one.

The other habit is starting fresh instead of dragging one enormous session along all day. A long conversation carries all its weight forward. When you've finished a thing, start clean for the next thing. Your context stays light and you spend less getting where you're going.

None of this is complicated. Run `/usage` now and then, know which of the two clocks is actually the tight one, and you stop getting surprised. That's the whole game.

## Sources

If you want to go deeper than this post, these are the pages I leaned on:

- [Use Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan) — the official rundown of how the plans work with Claude Code.
- [Costs and usage tracking](https://code.claude.com/docs/en/costs.md) — the docs for the `/usage` command and what it reports.
- [Status line configuration](https://code.claude.com/docs/en/statusline.md) — the full reference for pinning context and limit info to the bottom of the screen.
- [Slash commands](https://code.claude.com/docs/en/commands.md) — the list that covers `/usage`, `/context`, and the rest.
