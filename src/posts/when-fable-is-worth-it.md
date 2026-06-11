---
title: When Fable Is Worth It
date: 2026-06-10
summary: Anthropic shipped its most capable model yet. It's not the one I use most.
---

Claude Fable 5 is Anthropic's most capable model. It is not the one I run by default, and after a few weeks with both, I don't think it should be for most work.

Opus 4.8 handles the large majority of what I ask a model to do. Fable is better, but better in a specific direction that doesn't show up on ordinary tasks. Summarize a document, write a function, answer a question, and the two land in the same place, with Fable charging more to get there. The gap opens up on long work that has no fixed shape: builds that run across many steps, problems the model has to plan and execute over a long stretch, tasks where it needs to check its own output and correct course without someone watching.

Ambiguity is where I noticed it most. I gave Fable a problem where the real work was figuring out what the problem actually was, and it stayed in that uncertainty instead of collapsing it into the nearest familiar shape and running. Opus is more likely to commit early to a reading that is reasonable but wrong. That patience is most of what the extra capability buys you, and most tasks don't need it.

The cost is higher than it looks. Fable runs about twice the price per token of Opus. On top of that it uses a different tokenizer, the system that splits your text into the units you are billed on, and the same text comes out to roughly 30% more tokens than on Opus. The two stack, so an identical prompt costs closer to two and a half times as much, and the extra third stays invisible until the bill arrives. If you are moving a workload over, measure again on Fable rather than trusting your old token counts.

Time is a cost too. Fable thinks more, and on hard problems a single request can run for minutes. That is fine when you have handed it something difficult and you plan to step away while it works. It is the wrong fit for anything interactive, where someone is sitting there waiting on an answer.

Two smaller things worth knowing. Fable's thinking is always on. There is no switch to turn it off the way there is on Opus, which tells you plainly that speed and low cost were not the point of the model. And at the other end, even running Fable at a low effort setting often beats older models running at full tilt, so it is not strictly a question of cheap model for easy work and expensive model for hard work. Fable on low is its own option. One practical caveat if you go to use it: Fable has stricter requirements around data handling than the other models, so it does not drop cleanly into every account.

What I have settled on is Opus 4.8 as the default and Fable on purpose, for tasks that are long, genuinely hard, or ambiguous enough that the model needs to think rather than reach for a pattern. The instinct to put your best model on everything is the expensive mistake. Most work is not at the frontier, and paying frontier prices for it is waste, not diligence. Match the model to the task and the choice mostly makes itself.
