# GitaWisdom — Bhagwat Gita Quotes Telegram Bot

Telegram bot serving verses from the Bhagavad Gita. Live as **@gitawisdom_bot** ("Bhagwat Gita Quotes").

## Commands

- `/start` — welcome and command list
- `/verse` — a random verse (Sanskrit in Devanagari + English translation)
- `/verse 1.1` — a specific verse: chapter.verse (also `/verse 1 1`)
- `/shloka 1.1` — same as `/verse`, for a specific verse
- `/daily` — verse of the day (same verse for everyone on the same day)
- `/chapter <1-18>` — chapter name, verse count and a short summary
- `/about` — about this bot
- `/help` — command list

Sending the plain words `verse` or `shloka` also returns a random verse.

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

Bhagwat Gita Quotes serves verses from the Bhagavad Gita — 701 verses from all
18 chapters, in Sanskrit with English translation.

Made by **Saurabh Saha** from Assam.

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
