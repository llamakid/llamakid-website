---
title: Most of the Time, You Don't Need Fable
date: 2026-06-10
summary: Anthropic shipped its most capable model yet. Here's when it's worth reaching for, and when Opus is the better call.
---

Anthropic released Claude Fable 5 recently, and it's the most capable model they've put out. Naturally the first instinct is to switch everything over to it. I did that for about a day before backing most of it out.

Fable is genuinely better at the hardest stuff. But "the hardest stuff" is doing a lot of work in that sentence, and most of what I do day to day isn't it. So I've ended up running two models side by side: Fable for a narrow band of work, Opus 4.8 for almost everything else. Here's how I think about the split.

## What Fable is actually for

The way I'd put it: Opus is the model that does the task. Fable is the model that does the task you weren't sure was possible.

The gains don't really show up on the everyday stuff. If you ask both to summarize a document, write a function, answer a question, they're close enough that you won't feel a difference, and you'll have paid more for Fable. Where Fable pulls ahead is on long work with no clear shape, the kind that runs for a while and has to hold itself together the whole way through. Big multistep builds. Problems where the model has to plan, work, check its own output, and correct course without a human nudging it back on track.

I gave it a genuinely ambiguous problem last week, the kind where the first real task is figuring out what the task even is, and it sat in that ambiguity instead of flattening it into the nearest familiar shape and charging ahead. That's the thing that's hard to get from a model, and it's the thing you're paying for.

So the honest test is: is this a problem my current model already handles fine? If yes, Fable won't feel different. Save it for the ones that are actually at the edge of what's working.

## The costs nobody mentions up front

Two things make Fable more expensive than the sticker price suggests, and they compound.

The first is the obvious one. Fable runs about twice the price per token of Opus 4.8. Fine, you'd expect to pay more for the top model.

The second one is quieter. Fable uses a new tokenizer, which is the system that chops your text into the units the model actually bills on. The same exact text comes out to roughly 30% more tokens than it would on Opus. So you're not paying 2x. You're paying something more like 2.5x for an identical prompt, and the extra third is invisible until you look at the bill. If you're moving a workload over, don't trust your old token estimates. Measure again on Fable directly.

There's also time. Fable thinks more, and on hard tasks a single request can run for minutes, not seconds. That's the right tradeoff when you've handed it something genuinely difficult and you're going to walk away while it works. It's the wrong tradeoff when you wanted a quick answer. Worth knowing before you wire it into anything interactive where a person is sitting there waiting.

## A few things that surprised me

Fable's thinking is always on. You can't turn it off the way you can with Opus. That fits the model's whole personality. It's built to deliberate. But it means Fable isn't the one you reach for when you want fast and cheap. That's not the job it's for.

The other surprise was at the bottom of the dial, not the top. You can run Fable at a low effort setting, and even there it often beats older models running flat out. So "use the cheaper model for easy work" and "use Fable for hard work" aren't the only two options. Fable on low is a real third lane I'm still feeling out.

And one practical note if you ever go to actually use it: Fable has stricter requirements around data handling than the other models, so it's not something you can just drop into every account or setup. Check that before you assume you can swap the name in.

## Where I've landed

Opus 4.8 is my default. It's fast, it's autonomous enough for most of what I throw at it, and it costs half as much before the tokenizer math even kicks in. I reach for Fable deliberately, when the task is long, genuinely hard, or ambiguous in a way that needs the model to think rather than reach for a pattern.

The mental model I keep coming back to: don't pick the most capable model. Pick the one that matches the task. Most tasks aren't at the frontier, and paying frontier prices for them is just waste dressed up as caution.

I don't think the answer is fixed yet. I'm still working out where exactly the line sits, and it probably moves as I get a better feel for both. But "default to Opus, escalate to Fable on purpose" has been a much better rule than "always use the best one."
