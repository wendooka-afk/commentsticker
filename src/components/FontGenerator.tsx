import { useState } from 'react';
import { Copy, Check, Type } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';

interface Props { darkMode: boolean; onNavigate: (page: any) => void; }

// ── Unicode font transforms ───────────────────────────────────────────────────
function tx(text: string, uBase: number, lBase: number, exc: Record<string, string> = {}): string {
  return [...text].map(c => {
    if (c in exc) return exc[c];
    const n = c.charCodeAt(0);
    if (n >= 65 && n <= 90) return String.fromCodePoint(uBase + n - 65);
    if (n >= 97 && n <= 122) return String.fromCodePoint(lBase + n - 97);
    return c;
  }).join('');
}

const SMALL_CAPS_MAP: Record<string, string> = {
  a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',
  k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',
  u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ',
};

const BUBBLE_UPPER = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ';
const BUBBLE_LOWER = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';

interface FontStyle {
  name: string;
  description: string;
  color: string;
  transform: (text: string) => string;
}

const FONT_STYLES: FontStyle[] = [
  {
    name: '𝐁𝐨𝐥𝐝',
    description: 'Bold serif',
    color: 'from-pink-500 to-rose-500',
    transform: t => tx(t, 0x1D400, 0x1D41A),
  },
  {
    name: '𝘐𝘵𝘢𝘭𝘪𝘤',
    description: 'Italic serif',
    color: 'from-purple-500 to-pink-500',
    transform: t => tx(t, 0x1D434, 0x1D44E, { h: 'ℎ' }),
  },
  {
    name: '𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄',
    description: 'Bold Italic',
    color: 'from-orange-500 to-pink-500',
    transform: t => tx(t, 0x1D468, 0x1D482),
  },
  {
    name: '𝒮𝒸𝓇𝒾𝓅𝓉',
    description: 'Script / Cursive',
    color: 'from-fuchsia-500 to-purple-500',
    transform: t => tx(t, 0x1D49C, 0x1D4B6, {
      B:'ℬ', E:'ℰ', F:'ℱ', H:'ℋ', I:'ℐ', L:'ℒ', M:'ℳ', R:'ℛ',
      e:'ℯ', g:'ℊ', o:'ℴ',
    }),
  },
  {
    name: '𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽',
    description: 'Bold Script',
    color: 'from-violet-500 to-fuchsia-500',
    transform: t => tx(t, 0x1D4D0, 0x1D4EA),
  },
  {
    name: '𝔉𝔯𝔞𝔨𝔱𝔲𝔯',
    description: 'Fraktur (Gothic)',
    color: 'from-emerald-500 to-teal-500',
    transform: t => tx(t, 0x1D504, 0x1D51E, {
      C:'ℭ', H:'ℌ', I:'ℑ', R:'ℜ', Z:'ℨ',
    }),
  },
  {
    name: '𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜',
    description: 'Double-Struck',
    color: 'from-cyan-500 to-blue-500',
    transform: t => tx(t, 0x1D538, 0x1D552, {
      C:'ℂ', H:'ℍ', N:'ℕ', P:'ℙ', Q:'ℚ', R:'ℝ', Z:'ℤ',
    }),
  },
  {
    name: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎',
    description: 'Monospace',
    color: 'from-blue-500 to-indigo-500',
    transform: t => tx(t, 0x1D670, 0x1D68A),
  },
  {
    name: 'Ｆｕｌｌｗｉｄｔｈ',
    description: 'Fullwidth',
    color: 'from-amber-500 to-orange-500',
    transform: t => tx(t, 0xFF21, 0xFF41),
  },
  {
    name: 'Ⓒⓘⓡⓒⓛⓔⓓ',
    description: 'Circled',
    color: 'from-rose-500 to-red-500',
    transform: t => [...t].map(c => {
      const n = c.charCodeAt(0);
      if (n >= 65 && n <= 90) return [...BUBBLE_UPPER][n - 65] ?? c;
      if (n >= 97 && n <= 122) return [...BUBBLE_LOWER][n - 97] ?? c;
      return c;
    }).join(''),
  },
  {
    name: 'ꜱᴍᴀʟʟ ᴄᴀᴘꜱ',
    description: 'Small Caps',
    color: 'from-neutral-600 to-neutral-400',
    transform: t => [...t].map(c => {
      if (c >= 'A' && c <= 'Z') return SMALL_CAPS_MAP[c.toLowerCase()] ?? c;
      return SMALL_CAPS_MAP[c] ?? c;
    }).join(''),
  },
  {
    name: 'S̶t̶r̶i̶k̶e̶',
    description: 'Strikethrough',
    color: 'from-red-400 to-rose-400',
    transform: t => [...t].map(c => c === ' ' ? ' ' : c + '\u0336').join(''),
  },
  {
    name: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲',
    description: 'Underline',
    color: 'from-teal-500 to-cyan-500',
    transform: t => [...t].map(c => c === ' ' ? ' ' : c + '\u0332').join(''),
  },
];

function CopyButton({ text, darkMode }: { text: string; darkMode: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied
        ? 'bg-green-500 text-white'
        : darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function FontGenerator({ darkMode, onNavigate }: Props) {
  const [inputText, setInputText] = useState('Type your text here');

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

      <main className="max-w-4xl mx-auto px-6 py-32">
        {/* Hero */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold uppercase tracking-wider">
            Free Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            TikTok Font Generator — Copy & Paste Fancy Text
          </h1>
          <p className="text-xl text-neutral-500 font-medium max-w-2xl">
            Convert any text into <strong className={darkMode ? 'text-white' : 'text-neutral-900'}>13 Unicode font styles</strong> — 𝐁𝐨𝐥𝐝, 𝒮𝒸𝓇𝒾𝓅𝓉, 𝔻𝕠𝕦𝕓𝕝𝕖-𝕊𝕥𝕣𝕦𝕔𝕜, Ⓒⓘⓡⓒⓛⓔⓓ & more.
            Works on TikTok, Instagram, Twitter, Discord and any platform.
          </p>
        </div>

        {/* Tool */}
        <div className={`rounded-3xl border-2 p-6 md:p-8 mb-12 ${darkMode ? 'bg-neutral-900/60 border-purple-500/30' : 'bg-white border-purple-500/30 shadow-xl shadow-purple-500/10'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Type className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black">Font Generator</h2>
              <p className={`text-xs font-medium ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Type text → click any style to copy it</p>
            </div>
          </div>

          {/* Input */}
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type your text here…"
            className={`w-full px-4 py-3.5 rounded-xl border text-lg font-medium transition-colors focus:outline-none mb-6 ${darkMode
              ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500'
              : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-purple-500'
            }`}
          />

          {/* Font grid */}
          <div className="space-y-2">
            {FONT_STYLES.map((style) => {
              const transformed = style.transform(inputText || 'Preview text');
              return (
                <div
                  key={style.name}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all ${darkMode
                    ? 'bg-neutral-800/50 border-neutral-700 hover:border-neutral-600'
                    : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${style.color} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      {style.description}
                    </p>
                    <p className="text-base leading-snug truncate" style={{ fontFamily: 'inherit' }}>
                      {transformed}
                    </p>
                  </div>
                  <CopyButton text={transformed} darkMode={darkMode} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Educational content */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-3xl font-bold mb-4">Why Use Fancy Fonts on TikTok?</h2>
            <p>Unicode font styles aren't images — they're actual text characters that render natively on every platform. This means they copy-paste perfectly into TikTok bios, video captions, comments, and usernames without any app or image upload needed.</p>
            <div className="grid md:grid-cols-3 gap-5 my-6">
              {[
                { icon: '👁️', title: 'Stop the Scroll', desc: 'Bold and script text stands out in comment sections and TikTok bios, grabbing attention faster than plain text.' },
                { icon: '📋', title: 'Copy & Paste Anywhere', desc: 'These are real Unicode characters — they work in TikTok, Instagram, Twitter, Discord, YouTube, and anywhere text is accepted.' },
                { icon: '🆓', title: 'Completely Free', desc: 'No account required. Generate unlimited font variants and copy them in one click, forever free.' },
              ].map((b, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                  <div className="text-2xl mb-2">{b.icon}</div>
                  <h3 className="font-black text-base mb-1">{b.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Where to Use These Fonts</h2>
            <ul className="space-y-2">
              {[
                '**TikTok bio** — make your profile description pop',
                '**TikTok username** — stand out in comment sections and For You feeds',
                '**Video captions & text overlays** — use bold or script for emphasis',
                '**Instagram bio & captions** — add visual hierarchy to long captions',
                '**Twitter / X bios and pinned tweets** — differentiate your profile',
                '**Discord server names and display names**',
                '**YouTube channel about section**',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm font-medium">
                  <span className="text-purple-500 font-black mt-0.5">→</span>
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                </li>
              ))}
            </ul>
          </section>

          <div className="py-6 border-y border-neutral-100 dark:border-neutral-900">
            <p className={`text-[10px] font-black uppercase tracking-widest mb-4 text-center ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>Sponsored</p>
            <AdSense adSlot="1122334455" />
          </div>

          <section>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Do these fonts work on TikTok?', a: 'Yes. All styles shown are standard Unicode characters that TikTok and every modern platform supports natively. Copy the text and paste it directly.' },
                { q: 'Why does my font look like boxes on some devices?', a: 'Older devices or systems without full Unicode support may render some math block characters as boxes. Bold and Italic styles have the widest compatibility; Fraktur and Double-Struck may not render on all older Android devices.' },
                { q: 'Can I use these in TikTok video text?', a: 'You can paste the font into TikTok captions and bios. For on-screen text overlays inside a video, TikTok uses its own fonts — use a video editor like CapCut instead.' },
                { q: 'Are there font restrictions on Instagram?', a: 'Instagram supports the same Unicode characters. All 13 styles shown work in Instagram bios and captions. Some very unusual characters may not display in Instagram usernames.' },
              ].map((faq, i) => (
                <details key={i} className={`group rounded-2xl border p-5 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-purple-500 group-open:rotate-180 transition-transform text-lg font-black">↓</span>
                  </summary>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <RelatedArticles
          ids={['guide-tiktok-comment-generator', 'guide-tiktok-comment-picker', 'guide']}
          onNavigate={onNavigate}
          darkMode={darkMode}
        />
      </main>

      <SEOFooter onNavigate={onNavigate} />
    </div>
  );
}
