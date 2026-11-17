// Bhagwat Gita Quotes — Telegram webhook bot (Vercel serverless, no dependencies)
// Reads the verse dataset bundled at data/verses.json (701 verses, Sanskrit +
// English translation by Shri Purohit Swami, public domain, via vedicscriptures).
// Token comes ONLY from process.env.BOT_TOKEN — never in this repo.

const versesData = require('../data/verses.json');
const VERSES = versesData.verses;

const CHAPTERS = [
  { n: 1,  name: 'Arjuna Vishada Yoga',            en: 'The Yoga of Arjuna\u2019s Despair',                 verses: 47, summary: 'On the field of Kurukshetra, Arjuna is overcome by grief and moral confusion at the prospect of fighting his own kin and teachers, and lays down his bow. Krishna begins to counsel him.' },
  { n: 2,  name: 'Sankhya Yoga',                   en: 'The Yoga of Knowledge',                            verses: 72, summary: 'Krishna teaches the immortality of the soul, the duty of the warrior, and the wisdom of equanimity \u2014 acting without attachment to results.' },
  { n: 3,  name: 'Karma Yoga',                     en: 'The Yoga of Action',                               verses: 43, summary: 'The yoga of selfless action: do your duty without attachment to its fruits, as an offering, following the example of the wise.' },
  { n: 4,  name: 'Jnana Karma Sannyasa Yoga',      en: 'Knowledge and Renunciation of Action',              verses: 42, summary: 'Krishna explains the divine origin of his teaching, the nature of action and inaction, and how knowledge burns away the bonds of karma.' },
  { n: 5,  name: 'Karma Sannyasa Yoga',            en: 'The Yoga of Renunciation',                         verses: 29, summary: 'Renunciation and action are reconciled: true renunciation is not abandoning work but abandoning attachment; the sage sees the Self in all.' },
  { n: 6,  name: 'Dhyana Yoga',                    en: 'The Yoga of Meditation',                           verses: 47, summary: 'The yoga of meditation: how to still the mind, the practice of self-control, and the path of the yogi who seeks union through meditation.' },
  { n: 7,  name: 'Jnana Vijnana Yoga',             en: 'The Yoga of Knowledge and Wisdom',                 verses: 30, summary: 'Krishna reveals his divine nature, the twofold prakriti (lower and higher), and how knowing him is the highest knowledge.' },
  { n: 8,  name: 'Akshara Brahma Yoga',            en: 'The Yoga of the Imperishable Brahman',             verses: 28, summary: 'The imperishable Brahman, the paths of departure at death, and the two ways \u2014 the bright path of light and the dark path of return.' },
  { n: 9,  name: 'Raja Vidya Raja Guhya Yoga',     en: 'Royal Knowledge and Royal Secret',                 verses: 34, summary: 'The royal knowledge and royal secret: devotion to Krishna as the most direct path; all beings rest in him.' },
  { n: 10, name: 'Vibhuti Yoga',                   en: 'The Yoga of Divine Glories',                       verses: 42, summary: 'Krishna describes his divine glories manifest in the world \u2014 the best of each kind of being is a spark of his splendour.' },
  { n: 11, name: 'Vishvarupa Darshana Yoga',       en: 'The Vision of the Universal Form',                 verses: 55, summary: 'Arjuna is granted divine sight and beholds Krishna\u2019s universal form \u2014 infinite, radiant and terrible \u2014 and is filled with awe.' },
  { n: 12, name: 'Bhakti Yoga',                    en: 'The Yoga of Devotion',                             verses: 20, summary: 'The yoga of devotion: the path of loving surrender is declared the highest; Krishna describes the qualities of his dearest devotee.' },
  { n: 13, name: 'Kshetra Kshetrajna Vibhaga Yoga', en: 'The Field and the Knower of the Field',           verses: 35, summary: 'The field (the body and material nature) and the knower of the field (the Self); knowledge is seeing the difference between them.' },
  { n: 14, name: 'Gunatraya Vibhaga Yoga',         en: 'The Yoga of the Three Gunas',                      verses: 27, summary: 'The three gunas \u2014 sattva, rajas, tamas \u2014 bind the soul; freedom comes from rising above them.' },
  { n: 15, name: 'Purushottama Yoga',              en: 'The Yoga of the Supreme Person',                   verses: 20, summary: 'The imperishable ashvattha tree with roots above; the Supreme Person beyond both the perishable and the imperishable.' },
  { n: 16, name: 'Daivasura Sampad Vibhaga Yoga',  en: 'Divine and Demoniac Natures',                      verses: 24, summary: 'The divine and demoniac natures contrasted; the three gates of hell \u2014 lust, anger and greed \u2014 and the call to follow scripture.' },
  { n: 17, name: 'Shraddhatraya Vibhaga Yoga',     en: 'The Yoga of the Three Kinds of Faith',             verses: 28, summary: 'Faith is of three kinds according to the gunas; so are worship, sacrifice, austerity and charity.' },
  { n: 18, name: 'Moksha Sannyasa Yoga',           en: 'The Yoga of Liberation and Renunciation',          verses: 78, summary: 'The conclusion: renunciation and relinquishment, the perfection of duty, and Krishna\u2019s final call \u2014 surrender to him alone and be freed.' },
];

const COMMANDS =
  '/verse \u2014 a random verse\n' +
  '/verse 1.1 \u2014 a specific verse (chapter.verse)\n' +
  '/shloka 1 1 \u2014 same, chapter and verse\n' +
  '/daily \u2014 today\u2019s verse\n' +
  '/chapter <1-18> \u2014 about a chapter\n' +
  '/about \u2014 about this bot\n' +
  '/help \u2014 list of commands';

function cleanEnglish(text) {
  // Dataset English starts with a "2.47 " prefix; the reference line carries it already.
  return text.replace(/^\d+\.\d+\s*/, '').trim();
}

function formatVerse(v) {
  return (
    'Bhagavad Gita ' + v.chapter + '.' + v.verse + '\n\n' +
    v.sanskrit.trim() + '\n\n' +
    cleanEnglish(v.english)
  );
}

function randomVerse() {
  return VERSES[Math.floor(Math.random() * VERSES.length)];
}

function verseOfTheDay(date) {
  // Deterministic by UTC date: same verse for everyone on the same day.
  const day = Math.floor((date || new Date()).getTime() / 86400000);
  return VERSES[day % VERSES.length];
}

function specificVerse(ch, vs) {
  const chapter = CHAPTERS.find(c => c.n === ch);
  if (!chapter) return 'Please give a chapter from 1 to 18, e.g. /verse 1.1';
  const v = VERSES.find(v => v.chapter === ch && v.verse === vs);
  if (!v) return 'Chapter ' + ch + ' (' + chapter.name + ') has ' + chapter.verses + ' verses. Try /verse ' + ch + '.1 to /verse ' + ch + '.' + chapter.verses;
  return formatVerse(v);
}

function parseVerseArg(arg) {
  const dotted = arg.match(/^(\d+)\s*\.\s*(\d+)$/);
  if (dotted) return [parseInt(dotted[1], 10), parseInt(dotted[2], 10)];
  const parts = arg.split(/\s+/);
  if (parts.length === 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
  }
  return null;
}

function chapterText(n) {
  const ch = CHAPTERS.find(c => c.n === n);
  if (!ch) return 'Please give a chapter number from 1 to 18, e.g. /chapter 2';
  return (
    'Chapter ' + ch.n + ' \u2014 ' + ch.name + ' (' + ch.en + ')\n' +
    ch.verses + ' verses\n\n' +
    ch.summary
  );
}

function chapterList() {
  return 'Chapters of the Bhagavad Gita:\n' +
    CHAPTERS.map(c => c.n + '. ' + c.name + ' \u2014 ' + c.verses + ' verses').join('\n') +
    '\n\nSend /chapter <number> for a summary, e.g. /chapter 2';
}

async function sendMessage(token, chatId, text) {
  const res = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text }),
  });
  if (!res.ok) console.error('sendMessage failed:', res.status, await res.text().catch(() => ''));
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).send('Bhagwat Gita Quotes bot is live (@gitawisdom_bot)');
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const token = process.env.BOT_TOKEN;
  if (!token) {
    console.error('BOT_TOKEN is not set');
    res.status(500).send('Bot is not configured');
    return;
  }

  const update = req.body || {};
  const msg = update.message;
  if (!msg || !msg.text) {
    res.status(200).send('ok');
    return;
  }

  const chatId = msg.chat.id;
  const text = msg.text.trim();
  // Strip "@botname" suffix so "/verse@gitawisdom_bot" works in groups.
  const firstWord = text.split(/\s+/)[0].replace(/@[A-Za-z0-9_]+$/, '');
  const arg = text.slice(text.split(/\s+/)[0].length).trim();
  const lower = text.toLowerCase();

  let reply = null;
  if (firstWord === '/start') {
    reply =
      'Namaste. I am Bhagwat Gita Quotes \u2014 the wisdom of the Bhagavad Gita, one verse at a time.\n\n' +
      'Commands:\n' + COMMANDS + '\n\n' +
      'Send "verse" or "shloka" any time for a random verse.';
  } else if (firstWord === '/about') {
    reply =
      'Bhagwat Gita Quotes \u2014 the wisdom of the Bhagavad Gita, one verse at a time.\n\n' +
      '701 verses from all 18 chapters, in Sanskrit with English translation.\n\n' +
      'Made by Saurabh Saha from Assam.';
  } else if (firstWord === '/help') {
    reply = 'Commands:\n' + COMMANDS;
  } else if (firstWord === '/verse' || firstWord === '/shloka') {
    if (!arg) {
      reply = formatVerse(randomVerse());
    } else {
      const parsed = parseVerseArg(arg);
      reply = parsed ? specificVerse(parsed[0], parsed[1]) : 'Give the verse as chapter.verse, e.g. /verse 1.1 or /verse 1 1';
    }
  } else if (firstWord === '/daily') {
    reply = 'Verse of the day\n\n' + formatVerse(verseOfTheDay());
  } else if (firstWord === '/chapter') {
    if (!arg) {
      reply = chapterList();
    } else {
      const n = parseInt(arg, 10);
      reply = Number.isInteger(n) ? chapterText(n) : 'Please give a chapter number from 1 to 18, e.g. /chapter 2';
    }
  } else if (lower === 'verse' || lower === 'shloka') {
    reply = formatVerse(randomVerse());
  }

  if (reply) {
    try {
      await sendMessage(token, chatId, reply);
    } catch (e) {
      console.error('sendMessage error:', e);
    }
  }
  res.status(200).send('ok');
};
