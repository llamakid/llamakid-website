---
title: Context Is the Job
date: 2026-06-07
summary: Most agent failures aren't reasoning failures. They're information failures.
---

The thing nobody tells you about building agents is that most of the debugging isn't about the model. It's about what the model knew when it made a decision.

I've been building with Claude a lot lately and the pattern that keeps showing up is this: when something goes wrong, it almost never comes down to the model being bad at reasoning. It comes down to the model reasoning well from incomplete or wrong context. The logic is fine. The inputs are not.

That distinction matters because it changes how you think about the engineering problem.

When you treat agents as a reasoning problem, you end up tuning prompts and tweaking temperature and hoping the model figures it out. When you treat it as a context problem, you start asking different questions. What does the agent see at step 3? Is the relevant state from step 1 still visible? What happened to that error from two tool calls ago — did it get passed forward or swallowed?

Framing it this way makes the job feel more like data pipeline engineering than AI engineering. You're thinking about what flows where, what gets summarized versus preserved verbatim, what the agent needs to have right now versus what it already handled.

The concrete version of this: I had an agent that kept making a particular mistake in the middle of a long task. It would do the first few steps correctly, then seem to forget what the original goal was. Felt like a reasoning failure. But when I looked at the actual context window at that point in the execution, the original instruction was barely visible. It was there, technically, but buried under several rounds of tool output. The model wasn't forgetting. It was weighting what was right in front of it.

Fix was simple: repeat the core objective at each step instead of assuming the model would trace back. Not elegant, but it worked.

I think this is the thing that trips people up early on. There's a tendency to treat the model as an omniscient reasoner you just have to give the right high level instruction to. And modern models are genuinely impressive enough that this works, right up until it doesn't. The failure cases are almost always information failures dressed up as reasoning failures.

There's also a version of this at the architecture level. Agents working across multiple steps accumulate state. Each handoff is a potential information loss. If you're not deliberate about what gets carried forward and in what form, you'll spend a lot of time chasing bugs that feel mysterious but are actually just: the agent didn't have what it needed.

None of this is a knock on agents or on the models. If anything it's clarifying. It means the craft is mostly in the plumbing. Thinking carefully about what each step receives, what it produces, and what the next step needs. That's concrete. That's buildable. You don't have to wait for the model to get smarter. You can improve the information diet right now.

I don't have a tidy conclusion here. Still figuring out the right patterns. But treating context as the primary engineering surface has made me a lot less frustrated when things break, because at least I have somewhere useful to look.
