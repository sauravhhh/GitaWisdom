# GitaWisdom — Bhagwat Gita Quotes Telegram Bot

Telegram bot serving verses from the Bhagavad Gita. Live as **@gitawisdom_bot** ("Bhagwat Gita Quotes").

## Commands

- `/start` — welcome and command list
- `/random` — a random verse (Sanskrit in Devanagari + English translation)
- `/shloka 1.1` — a specific verse: chapter.verse (also `/shloka 1 1`, `/verse 1.1`)
- `/chapter <1-18>` — chapter name, verse count and a short summary
- `/about` — about this bot
- `/help` — command list (shows only verse and shloka)

Every command also works as a plain word, with or without the slash:
`help`, `random`, `shloka 1.1`, `shloka 1 1`, `chapter 2`, `about`.
`verse`, `shloka`, `sloka` — and typos of them — work with a chapter.verse
number, e.g. `verse 1.1`. Sent on their own, without a number, they do nothing.
Each verse reply shows the chapter name, e.g. "Bhagavad Gita 1.1 — Arjuna Vishada Yoga".

## Verse data

`data/verses.json` bundles **701 verses** — the full Gita (the traditional 700, plus
verse 13.1 which some editions include, so chapter 13 has 35 verses here instead of 34).
Each verse has the Sanskrit text in Devanagari, IAST transliteration, and an English
translation by Shri Purohit Swami (first published 1935, public domain), with Swami
Sivananda's translation as a fallback where Purohit's was unavailable.

Source dataset: [ChiragMirani/gita-quotes](https://github.com/ChiragMirani/gita-quotes)
(`data.json`, built from [vedicscriptures.github.io](https://vedicscriptures.github.io/)).
Every verse the bot serves comes from this dataset — nothing is invented.

Chapter summaries in `api/telegram.js` are short factual summaries of the 18 chapters.

## About

Bhagwat Gita Quotes is a Telegram bot that brings the wisdom of the Bhagavad
Gita to you — 701 verses across all 18 chapters, with the original Sanskrit
text and English translation.

Created by **Saurabh Saha**, Assam.

## Deploy (Vercel)

1. Deploy this repo to Vercel (import the repo, or `vercel` from the project root).
2. In the Vercel dashboard, set the environment variable `BOT_TOKEN` to the bot token
   from BotFather. Never commit the token.
3. Set the Telegram webhook to your deployment URL:
   `https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-vercel-url>/api/telegram`
4. Open the bot in Telegram and send `/start`.

The webhook handler is `api/telegram.js` (Node, no dependencies). A GET on
`/api/telegram` returns a live string for a quick health check.

## Security

The bot token lives **only** in the deploy environment (`BOT_TOKEN`) and in the
operator's local credentials file. It is never in this repo, never in code, and
never in logs. `.gitignore` excludes `.env` and credential files.
