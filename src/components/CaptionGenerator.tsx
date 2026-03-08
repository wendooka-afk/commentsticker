import { useState } from 'react';
import { Copy, Check, RefreshCw, MessageSquare } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';

interface Props { darkMode: boolean; onNavigate: (page: any) => void; }

const PLATFORMS = [
  { id: 'tiktok',     label: 'TikTok',     emoji: '🎵', color: 'from-pink-500 to-rose-500' },
  { id: 'instagram',  label: 'Instagram',  emoji: '📸', color: 'from-purple-500 to-pink-500' },
  { id: 'linkedin',   label: 'LinkedIn',   emoji: '💼', color: 'from-blue-600 to-blue-500' },
  { id: 'youtube',    label: 'YouTube',    emoji: '▶️', color: 'from-red-500 to-orange-500' },
] as const;
type PlatformId = typeof PLATFORMS[number]['id'];

const VIBES = [
  { id: 'casual',        label: 'Casual',        emoji: '😊' },
  { id: 'funny',         label: 'Funny',         emoji: '😂' },
  { id: 'inspirational', label: 'Inspirational', emoji: '✨' },
  { id: 'educational',   label: 'Educational',   emoji: '📚' },
  { id: 'professional',  label: 'Professional',  emoji: '💼' },
] as const;
type VibeId = typeof VIBES[number]['id'];

type Templates = Record<PlatformId, Record<VibeId, string[]>>;

const TEMPLATES: Templates = {
  tiktok: {
    casual:        ['nobody talks about {topic} so let me show you 👇', 'POV: you finally figured out {topic} 🤯', 'me after discovering {topic} 😭💀', 'can we talk about {topic} for a sec?', 'okay but why does nobody mention {topic}'],
    funny:         ['my therapist when I said {topic} was a good idea 💀', 'imagine paying for {topic} when you can do this for free 😭', '{topic} got me like 💀🙏', 'bro really thought {topic} was gonna work 😂', 'the audacity of {topic} to be this easy'],
    inspirational: ['your future self is thanking you for learning about {topic} today 🙏', 'one year ago I knew nothing about {topic}. Here\'s what changed 💪', '{topic} changed my life. Not clickbait. 🔥', 'the only thing standing between you and {topic} is this video ✨'],
    educational:   ['how to {topic} in 60 seconds (no fluff) 👇', '{topic} explained simply for beginners 📖', 'everything you need to know about {topic} in one video ✅', '3 things nobody tells you about {topic}', 'the {topic} guide I wish I had when starting'],
    professional:  ['3 key insights on {topic} I learned this quarter 📊', 'Breaking down {topic}: what actually matters and what doesn\'t.', 'The most overlooked aspect of {topic} — and how to fix it.', '{topic} strategy that added 40% to our results. Full breakdown:'],
  },
  instagram: {
    casual:        ['vibes only ✨ {topic} edition', 'that {topic} feeling 🫶', 'living for {topic} right now', 'soft life: {topic} version 🌸', 'dropping my honest take on {topic} ↓'],
    funny:         ['when {topic} hits different 😭', 'not me obsessing over {topic} again 💀', '{topic} really said "choose chaos" and I agreed 😂', 'the {topic} to my mental stability 😂✨'],
    inspirational: ['growth isn\'t linear, but {topic} helps. 🌱', 'every version of you that\'s struggled with {topic} led to this moment ✨', '{topic} reminder: you\'re doing better than you think 🤍', 'let {topic} be the reason you start today, not tomorrow. 🔥'],
    educational:   ['{topic} 101 — save this for later 📌', 'quick tip on {topic} that changed everything for me 👇', 'swipe to learn everything about {topic} in 30 seconds →', '{topic} made simple. No experience needed. ✅'],
    professional:  ['Building in public: here\'s what {topic} actually looks like. 📊', '{topic} isn\'t about working harder — it\'s about working differently.', 'My thoughts on {topic} after two years of iteration 👇', 'The {topic} playbook that we\'ve been refining. Sharing it here:'],
  },
  linkedin: {
    casual:        ['Real talk about {topic}: it\'s not what most people think.', 'I\'ve been thinking a lot about {topic} lately. Here\'s my take:', 'Unpopular opinion on {topic} 👇', 'The honest truth about {topic} that nobody posts about:'],
    funny:         ['Me: I don\'t need to learn about {topic}\nAlso me: spends 3 hours going down a {topic} rabbit hole 😅', 'How I explained {topic} to my team vs. how they heard it:', 'Interviewer: "What\'s your experience with {topic}?"\nMe: *sweating*', 'That feeling when your {topic} strategy actually works 📈'],
    inspirational: ['{topic} is a skill. Skills are learned. You can do this. 💪', 'The most successful people I know share one trait: they invested in {topic} early.', 'One year of focusing on {topic} > 10 years of ignoring it.', 'Your {topic} journey starts with a single step. Take it today.'],
    educational:   ['3 things I learned about {topic} after {time}:\n\n1️⃣\n2️⃣\n3️⃣\n\nSave this for later ↓', '{topic} is changing. Here\'s what that means for your career 👇', 'A simple framework for thinking about {topic}:', 'The {topic} mistake I see most professionals make — and how to avoid it:'],
    professional:  ['After 12 months of working on {topic}, here are the 5 lessons that changed our approach:', 'We increased our {topic} results by 3x this quarter. Here\'s the exact strategy:', '{topic} hot take: most companies are solving the wrong problem. Thread below 👇', 'The {topic} playbook that generated $X for us. Open-sourcing it:'],
  },
  youtube: {
    casual:        ['I tried {topic} for 30 days... here\'s what happened 👀', 'honest review of {topic} (no sponsors, no BS)', 'testing viral {topic} hacks so you don\'t have to', '{topic} — was it worth it? My real experience'],
    funny:         ['I let AI control my {topic} for a week 💀', 'rating every {topic} method from worst to best', '{topic} speedrun (gone wrong) 😂', 'I tried the worst {topic} advice on the internet'],
    inspirational: ['How {topic} completely changed my life (real story)', 'From zero to {topic}: my full journey explained', 'The {topic} video I wish existed when I started', 'Why {topic} is the skill you need in 2026'],
    educational:   ['Complete {topic} guide for beginners (2026)', 'Everything about {topic} explained in under 10 minutes', '{topic} masterclass — free and no filler', 'The ultimate {topic} tutorial you\'ve been waiting for'],
    professional:  ['How top companies approach {topic} — full breakdown', '{topic} case study: what worked, what didn\'t, and why', 'Expert analysis of {topic} — data-backed insights', 'The {topic} strategy interview with industry leaders'],
  },
};

const HASHTAG_SUGGESTIONS: Record<PlatformId, string[]> = {
  tiktok:    ['#fyp', '#foryoupage', '#creator', '#viral', '#tiktok'],
  instagram: ['#reels', '#explore', '#instagram', '#content', '#creator'],
  linkedin:  ['#linkedin', '#professional', '#career', '#growth', '#networking'],
  youtube:   ['#youtube', '#shorts', '#creator', '#subscribe', '#trending'],
};

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function renderCaption(tpl: string, topic: string): string {
  return tpl.replace(/\{topic\}/g, topic || 'this topic').replace(/\{time\}/g, '6 months');
}

export function CaptionGenerator({ darkMode, onNavigate }: Props) {
  const [platform, setPlatform] = useState<PlatformId>('tiktok');
  const [vibe, setVibe] = useState<VibeId>('casual');
  const [topic, setTopic] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    const pool = TEMPLATES[platform][vibe];
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 4);
    setCaptions(shuffled.map(t => renderCaption(t, topic)));
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const selectedPlatform = PLATFORMS.find(p => p.id === platform)!;

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

      <main className="max-w-4xl mx-auto px-6 py-32">
        {/* Hero */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider">
            Free Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Social Media Caption Generator — TikTok, Instagram & More
          </h1>
          <p className="text-xl text-neutral-500 font-medium max-w-2xl">
            Generate <strong className={darkMode ? 'text-white' : 'text-neutral-900'}>scroll-stopping captions</strong> for TikTok, Instagram Reels, LinkedIn and YouTube in one click. Choose your platform and vibe.
          </p>
        </div>

        {/* Tool */}
        <div className={`rounded-3xl border-2 p-6 md:p-8 mb-12 ${darkMode ? 'bg-neutral-900/60 border-blue-500/20' : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/10'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 bg-gradient-to-br ${selectedPlatform.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black">Caption Generator</h2>
              <p className={`text-xs font-medium ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Pick platform + vibe → generate → copy</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Platform */}
            <div>
              <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Platform</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PLATFORMS.map(p => (
                  <button key={p.id} onClick={() => setPlatform(p.id)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${platform === p.id
                      ? `bg-gradient-to-r ${p.color} text-white shadow`
                      : darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {p.emoji} {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe */}
            <div>
              <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Vibe / Tone</label>
              <div className="flex flex-wrap gap-2">
                {VIBES.map(v => (
                  <button key={v.id} onClick={() => setVibe(v.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${vibe === v.id
                      ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                      : darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {v.emoji} {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Topic / Keyword <span className="normal-case font-medium">(optional)</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. skincare routine, freelancing, TikTok growth…"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors focus:outline-none ${darkMode
                  ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:border-blue-500'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Generate */}
            <button onClick={generate}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm bg-gradient-to-r ${selectedPlatform.color} text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all`}
            >
              <RefreshCw className="w-4 h-4" />
              Generate Captions
            </button>
          </div>

          {/* Results */}
          {captions.length > 0 && (
            <div className="mt-6 space-y-3">
              <p className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Generated Captions</p>
              {captions.map((caption, i) => (
                <div key={i} className={`relative rounded-2xl border p-4 ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <pre className={`text-sm whitespace-pre-wrap font-sans leading-relaxed pr-20 ${darkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                    {caption}
                  </pre>
                  <button
                    onClick={() => copy(caption, i)}
                    className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copiedIdx === i
                      ? 'bg-green-500 text-white'
                      : darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300' : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {copiedIdx === i ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
                  </button>
                </div>
              ))}

              {/* Hashtag suggestions */}
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-neutral-800/50 border-neutral-700' : 'bg-blue-50 border-blue-100'}`}>
                <p className={`text-xs font-black uppercase tracking-widest mb-2 ${darkMode ? 'text-neutral-500' : 'text-blue-400'}`}>Suggested Hashtags</p>
                <p className={`text-sm font-mono ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {HASHTAG_SUGGESTIONS[platform].join(' ')}
                </p>
                <button
                  onClick={() => copy(HASHTAG_SUGGESTIONS[platform].join(' '), -1)}
                  className={`mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copiedIdx === -1
                    ? 'bg-green-500 text-white'
                    : darkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-white text-neutral-600 border border-blue-200'
                  }`}
                >
                  {copiedIdx === -1 ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy hashtags</>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Educational content */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-3xl font-bold mb-6">Anatomy of a Viral Social Media Caption</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { step: '1', title: 'The Hook', desc: 'The first line decides if anyone reads the rest. Lead with a question, a bold claim, or a "POV:" — anything that creates a pattern interrupt.' },
                { step: '2', title: 'The Value', desc: 'Deliver what you promised in the hook. Keep it tight. Cut every word that doesn\'t add meaning.' },
                { step: '3', title: 'The CTA', desc: 'Tell your audience what to do: like, comment, save, or follow. A clear call-to-action can double your engagement rate.' },
              ].map((s, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                  <div className="text-2xl font-black text-blue-500 mb-2">0{s.step}</div>
                  <h3 className="font-black text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="py-6 border-y border-neutral-100 dark:border-neutral-900">
            <p className={`text-[10px] font-black uppercase tracking-widest mb-4 text-center ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>Sponsored</p>
            <AdSense adSlot="3344556677" />
          </div>

          <section>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'How long should a TikTok caption be?', a: 'TikTok shows approximately 100 characters before cutting off with "more". Lead with the most important info first. The best-performing TikTok captions are either very short (1–2 lines) or use line breaks to create a "read more" incentive.' },
                { q: 'Do captions affect reach on TikTok and Instagram?', a: 'Yes. Relevant keywords in captions help the algorithm categorize your content and show it to the right audience. Both TikTok and Instagram analyze caption text for content classification.' },
                { q: 'How many hashtags should I use on Instagram?', a: 'The data is mixed, but 3–10 highly targeted hashtags tends to outperform using all 30 allowed. Mix viral, medium, and niche hashtags for the best balance of reach and relevance.' },
                { q: 'Can I use the same caption across platforms?', a: 'It\'s better to adapt. TikTok favors casual and conversational; LinkedIn prefers structured insights; Instagram works with aesthetic and inspirational tones. Our generator handles this for each platform automatically.' },
              ].map((faq, i) => (
                <details key={i} className={`group rounded-2xl border p-5 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-blue-500 group-open:rotate-180 transition-transform text-lg font-black">↓</span>
                  </summary>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <RelatedArticles
          ids={['guide-tiktok-comment-generator', 'guide', 'guide-tiktok-comment-picker']}
          onNavigate={onNavigate}
          darkMode={darkMode}
        />
      </main>
      <SEOFooter onNavigate={onNavigate} />
    </div>
  );
}
