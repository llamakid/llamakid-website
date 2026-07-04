---
title: AEO: Why It Matters That AI Can See Your Website
date: 2026-07-03
summary: People are asking AI instead of Google. If AI can't read your site, you don't exist in those answers.
---

A friend of mine runs a small service business. Good reviews, solid website, ranks fine on Google. A few weeks ago someone told him they found a competitor by asking ChatGPT for a recommendation. He asked me why the AI didn't mention him. So I checked. The answer was pretty simple: the AI couldn't actually read his site.

That's the whole problem AEO is trying to solve.

## What AEO actually is

AEO stands for answer engine optimization. It's the same idea as SEO, except the audience isn't a search engine ranking pages. It's an AI assembling an answer.

The shift behind it is real. A growing chunk of people don't type "best plumber near me" into Google anymore. They ask ChatGPT or Claude or Perplexity, and they get back a single answer with maybe three or four names in it. There's no page two. There isn't even really a page one. There's just the answer, and you're either in it or you're not.

With traditional search, being mediocre still got you something. Rank eighth and some people scroll down. With an answer engine, there's no eighth place. That makes visibility less of a nice to have and more of a threshold. Below it you're invisible.

## Why AI might not see your site at all

Here's the part that surprises people. It's usually not about content quality. It's about whether the AI can read the page in the first place. A few common ways sites fail this:

**The site blocks AI crawlers.** A lot of sites blocked bots like GPTBot and ClaudeBot in their robots.txt a couple years ago, often by default through a hosting provider or a security plugin. That made sense if you were worried about training data. But those same crawlers are now what feeds live answers, and blocking them means opting out of being recommended. Worth checking your robots.txt to see what you're actually blocking. You might not have chosen it.

**The site is all JavaScript.** This was my friend's problem. His site was a single page app where the actual content only appears after scripts run in a browser. Most AI crawlers don't run your JavaScript. They fetch the page, and if the HTML that comes back is an empty shell with a loading spinner, that's what the AI sees. Nothing. Google eventually renders JavaScript. Most answer engines don't wait around.

**The content is vague on purpose.** Marketing sites love saying "solutions that empower your journey" without ever stating what the business does, where it is, or what it costs. A human can piece it together from vibes and photos. An AI pulling your page into an answer needs the plain facts, plainly stated. If your homepage never says "we do X for Y people in Z city," don't be shocked when the AI can't say it either.

## What to actually do

The good news is the fixes are boring, and boring is doable.

Check robots.txt first. Make sure you're not blocking the crawlers you want, like GPTBot, ClaudeBot, and PerplexityBot. Takes five minutes.

Make sure your content exists in the HTML. Load your page, view the source, and search for a sentence from the page. If it's not there, the AI isn't seeing it either. Server rendering or static generation fixes this. Even prerendering key pages helps.

Say what you do in plain sentences. Somewhere on your site there should be text a stranger could quote directly: what you do, who it's for, where you are, how to reach you. Answer engines quote. Give them something quotable.

Answer real questions. Think about what someone would actually ask an AI in your category, then make sure your site contains the answer in words, not just implied by design. An FAQ page written honestly does more for AEO than most things you could pay for.

Add structured data if you can. Basic schema markup for your business type, location, and offerings gives machines the facts in a format they can't misread. It's not required, but it removes guesswork.

## The part I keep coming back to

None of this is exotic. It's mostly the old advice, be clear and be readable, applied to a new reader. The sites that win at AEO aren't gaming anything. They're just legible. A machine can land on the page and walk away knowing who you are and what you do.

My friend's fix took an afternoon. Prerendered pages, an updated robots.txt, and one paragraph on the homepage that states in plain English what the business actually does. Ask the same question now and he shows up in the answer.

The web is getting a new kind of visitor. It doesn't scroll, it doesn't admire your animations, and it doesn't guess. It reads what's there. Make sure there's something there to read.
