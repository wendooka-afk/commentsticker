import { useState } from 'react';
import { Hash, Copy, Check, Search, RefreshCw } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';
import { NICHES, PLATFORMS, getHashtags, type NicheId, type PlatformId } from '../data/hashtags';

interface GuideProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

function CopyButton({ text, label, className }: { text: string; label?: string; className?: string }) {
    const [copied, setCopied] = useState(false);
    const handle = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-500'} ${className ?? ''}`}
        >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : (label ?? 'Copy')}
        </button>
    );
}

function HashtagTag({ tag, darkMode }: { tag: string; darkMode: boolean }) {
    const [copied, setCopied] = useState(false);
    const handle = () => {
        navigator.clipboard.writeText(tag);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <button
            onClick={handle}
            title="Click to copy"
            className={`px-3 py-1.5 rounded-full text-sm font-bold border transition-all hover:scale-105 active:scale-95 ${copied
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : darkMode
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:border-pink-500 hover:text-pink-400'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-pink-400 hover:text-pink-500 shadow-sm'
                }`}
        >
            {copied ? '✓' : tag}
        </button>
    );
}

export function HashtagGenerator({ darkMode, onNavigate }: GuideProps) {
    const [niche, setNiche] = useState<NicheId>('general');
    const [platform, setPlatform] = useState<PlatformId>('tiktok');
    const [keyword, setKeyword] = useState('');
    const [generated, setGenerated] = useState<{ viral: string[]; medium: string[]; niche: string[] } | null>(null);

    const generate = () => {
        const result = getHashtags(niche, platform, keyword.trim() || undefined);
        setGenerated(result);
    };

    const allTags = generated ? [...generated.viral, ...generated.medium, ...generated.niche] : [];
    const allTagsText = allTags.join(' ');

    const platformEmojis: Record<PlatformId, string> = { tiktok: '🎵', instagram: '📸', youtube: '▶️' };

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                {/* Hero */}
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
                        Free Hashtag Tool
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        TikTok Hashtag Generator
                    </h1>
                    <p className="text-xl text-neutral-500 font-medium">
                        Generate the best <span className="font-bold text-neutral-900 dark:text-white">TikTok, Instagram and YouTube hashtags</span> for your niche. Copy and paste — free, no sign-up.
                    </p>
                </div>

                {/* Generator Card */}
                <div className={`rounded-3xl border p-8 mb-10 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'}`}>

                    {/* Platform Selector */}
                    <div className="mb-7">
                        <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-3">Platform</label>
                        <div className="flex gap-2">
                            {PLATFORMS.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setPlatform(p.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${platform === p.id
                                        ? 'bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-500/20'
                                        : darkMode
                                            ? 'bg-neutral-800 border-neutral-700 hover:border-pink-500/50 text-neutral-300'
                                            : 'bg-neutral-50 border-neutral-200 hover:border-pink-400 text-neutral-600'
                                        }`}
                                >
                                    <span>{platformEmojis[p.id]}</span>
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Niche Selector */}
                    <div className="mb-7">
                        <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-3">Your Niche</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {NICHES.map(n => (
                                <button
                                    key={n.id}
                                    onClick={() => setNiche(n.id)}
                                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-xs font-bold transition-all ${niche === n.id
                                        ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white border-transparent shadow-lg'
                                        : darkMode
                                            ? 'bg-neutral-800 border-neutral-700 hover:border-pink-500/50 text-neutral-300'
                                            : 'bg-neutral-50 border-neutral-200 hover:border-pink-400 text-neutral-600'
                                        }`}
                                >
                                    <span className="text-xl">{n.emoji}</span>
                                    <span>{n.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Keyword Input */}
                    <div className="mb-7">
                        <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-3">
                            Keyword (Optional)
                        </label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="e.g. skincare routine, gym tips, street food..."
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && generate()}
                                className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`}
                            />
                        </div>
                    </div>

                    <button
                        onClick={generate}
                        className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90 active:scale-[0.99] transition-all shadow-lg text-lg flex items-center justify-center gap-2"
                    >
                        <Hash className="w-5 h-5" />
                        Generate Hashtags
                    </button>
                </div>

                {/* Results */}
                {generated && (
                    <div className="space-y-6 mb-10">
                        {/* Copy All bar */}
                        <div className={`flex items-center justify-between p-4 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                            <div>
                                <span className="font-black text-sm">{allTags.length} hashtags generated</span>
                                <span className="text-xs text-neutral-500 ml-2">Click any tag to copy individually</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={generate}
                                    title="Regenerate"
                                    className={`p-2 rounded-xl border transition-all ${darkMode ? 'bg-neutral-800 border-neutral-700 hover:border-pink-500/50 text-neutral-400' : 'bg-neutral-50 border-neutral-200 hover:border-pink-400 text-neutral-500'}`}
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                                <CopyButton text={allTagsText} label="Copy All" />
                            </div>
                        </div>

                        {/* Viral Hashtags */}
                        <div className={`rounded-3xl border p-6 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-black text-base flex items-center gap-2">
                                        <span className="text-orange-500">🔥</span> Viral Hashtags
                                    </h3>
                                    <p className="text-xs text-neutral-500 mt-0.5">100M+ posts — maximum reach potential</p>
                                </div>
                                <CopyButton text={generated.viral.join(' ')} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {generated.viral.map(tag => (
                                    <HashtagTag key={tag} tag={tag} darkMode={darkMode} />
                                ))}
                            </div>
                        </div>

                        {/* Medium Hashtags */}
                        <div className={`rounded-3xl border p-6 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-black text-base flex items-center gap-2">
                                        <span className="text-blue-500">📊</span> Growth Hashtags
                                    </h3>
                                    <p className="text-xs text-neutral-500 mt-0.5">1M–100M posts — balanced reach & discoverability</p>
                                </div>
                                <CopyButton text={generated.medium.join(' ')} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {generated.medium.map(tag => (
                                    <HashtagTag key={tag} tag={tag} darkMode={darkMode} />
                                ))}
                            </div>
                        </div>

                        {/* Niche Hashtags */}
                        <div className={`rounded-3xl border p-6 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-black text-base flex items-center gap-2">
                                        <span className="text-emerald-500">🎯</span> Niche Hashtags
                                    </h3>
                                    <p className="text-xs text-neutral-500 mt-0.5">&lt;1M posts — high-intent, targeted audience</p>
                                </div>
                                <CopyButton text={generated.niche.join(' ')} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {generated.niche.map(tag => (
                                    <HashtagTag key={tag} tag={tag} darkMode={darkMode} />
                                ))}
                            </div>
                        </div>

                        {/* Full text box */}
                        <div className={`rounded-2xl border p-5 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-black uppercase tracking-widest text-neutral-500">All hashtags — ready to paste</span>
                                <CopyButton text={allTagsText} label="Copy All" />
                            </div>
                            <p className={`text-sm font-medium leading-relaxed break-words ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                                {allTagsText}
                            </p>
                        </div>
                    </div>
                )}

                {/* How it works */}
                <div className={`rounded-3xl border p-8 mb-10 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                    <h2 className="text-2xl font-black mb-6">The 3-Tier Hashtag Strategy (Used by Top Creators)</h2>
                    <div className="grid sm:grid-cols-3 gap-5">
                        {[
                            {
                                tier: 'Tier 1: Viral (30%)',
                                emoji: '🔥',
                                color: 'from-orange-500 to-red-500',
                                desc: 'Use 3–5 viral hashtags per post. These expose your content to the broadest possible audience. The competition is fierce — but even 0.001% discoverability equals millions of people.',
                                example: '#tiktok, #fyp, #fitness, #trending',
                            },
                            {
                                tier: 'Tier 2: Growth (50%)',
                                emoji: '📈',
                                color: 'from-blue-500 to-cyan-500',
                                desc: 'Use 5–8 mid-range hashtags (1M–100M posts). These are your sweet spot: enough volume to reach new viewers, small enough that your content can rank in the feed.',
                                example: '#fitnessmotivation, #workoutlife, #gymtips',
                            },
                            {
                                tier: 'Tier 3: Niche (20%)',
                                emoji: '🎯',
                                color: 'from-emerald-500 to-teal-500',
                                desc: 'Use 2–4 niche hashtags (<500K posts). These attract your most engaged, high-intent audience. Your content has a real chance of ranking #1 for these tags.',
                                example: '#homeworkouttips, #morninggymsession',
                            },
                        ].map((t, i) => (
                            <div key={i} className={`rounded-2xl border overflow-hidden ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                                <div className={`h-2 bg-gradient-to-r ${t.color}`} />
                                <div className="p-5">
                                    <div className="text-2xl mb-2">{t.emoji}</div>
                                    <h3 className="font-black text-sm mb-2">{t.tier}</h3>
                                    <p className="text-xs text-neutral-500 leading-relaxed mb-3">{t.desc}</p>
                                    <p className="text-xs font-bold text-neutral-400 italic">{t.example}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AdSense */}
                <div className="my-10 w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center overflow-hidden">
                    <AdSense adSlot="6677889900" />
                </div>

                {/* Platform tips */}
                <div className={`rounded-3xl border p-8 mb-10 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                    <h2 className="text-2xl font-black mb-6">Hashtag Rules by Platform</h2>
                    <div className="space-y-4">
                        {[
                            {
                                platform: '🎵 TikTok',
                                rule: '3–8 hashtags per video',
                                detail: 'TikTok\'s algorithm weights hashtags less than YouTube but still uses them for initial content distribution. Place hashtags in your caption — not in comments. Mix 2–3 viral + 3–4 niche for best reach.',
                                limit: 'No hard cap, but >10 looks spammy',
                            },
                            {
                                platform: '📸 Instagram',
                                rule: '5–10 hashtags per Reel',
                                detail: 'Instagram officially recommends 3–5 hashtags after testing showed diminishing returns beyond 10. For Reels, hashtags are indexed in search — focus on specific, niche hashtags for discoverability rather than mega-viral ones.',
                                limit: 'Hard limit: 30 hashtags',
                            },
                            {
                                platform: '▶️ YouTube',
                                rule: '3–5 hashtags per video',
                                detail: 'YouTube hashtags appear above the title and in search results. The first hashtag becomes a clickable blue link. Use 3 highly relevant hashtags in your description — irrelevant or over-hashtagging results in YouTube removing all hashtags.',
                                limit: 'Max 15 shown; >60 = all removed',
                            },
                        ].map((p, i) => (
                            <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1">
                                        <h3 className="font-black text-base mb-1">{p.platform}</h3>
                                        <p className="text-pink-500 font-bold text-sm mb-2">{p.rule}</p>
                                        <p className="text-sm text-neutral-500 leading-relaxed">{p.detail}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${darkMode ? 'bg-neutral-900 text-neutral-400' : 'bg-white text-neutral-500 border border-neutral-200'}`}>
                                        {p.limit}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-2xl font-black mb-6">Hashtag FAQ</h2>
                    {[
                        {
                            q: 'How many hashtags should I use on TikTok?',
                            a: 'TikTok officially recommends 1–3 "relevant" hashtags, but most creators and A/B tests suggest 3–8 mixed hashtags outperform either extreme. The key is relevance: niche hashtags that accurately describe your content always beat generic viral ones.',
                        },
                        {
                            q: 'Do hashtags still work on TikTok in 2026?',
                            a: 'Yes, but their role has shifted. TikTok\'s algorithm now primarily classifies content through video analysis (visual recognition, audio, captions) rather than hashtags alone. Hashtags still help for initial distribution and for ranking in the TikTok search results page — which has grown significantly in usage.',
                        },
                        {
                            q: 'Should I use the same hashtags every post?',
                            a: 'No. Reusing the exact same hashtag set on every post signals repetitive content to Instagram and TikTok. Rotate between 3–5 different hashtag sets. This also lets you A/B test which combinations drive the most reach.',
                        },
                        {
                            q: 'What is a banned hashtag and how do I avoid them?',
                            a: 'Banned hashtags are tags that Instagram and TikTok have restricted due to spam or policy violations. Using them can shadowban your post. Common banned hashtags include slightly altered versions of innocent words that have been misused. Use only the hashtags shown in our generator — all are manually verified as clean.',
                        },
                        {
                            q: 'Do hashtags help with YouTube Shorts?',
                            a: 'Yes. YouTube Shorts are indexed in both the Shorts feed and regular YouTube search. Adding 3–5 relevant hashtags in your Shorts description improves discoverability in search, which is the primary growth channel for Shorts compared to the algorithm-driven TikTok FYP.',
                        },
                    ].map((item, i) => (
                        <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}>
                            <h4 className="font-black mb-2">{item.q}</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <section className={`p-8 rounded-3xl text-center ${darkMode ? 'bg-gradient-to-br from-pink-500/20 to-orange-500/10 border border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100'}`}>
                    <h2 className="text-2xl font-black mb-3">Make Your Content Pop with Comment Stickers</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mb-6 font-medium">
                        Pair your hashtag strategy with a viral comment overlay hook. Free PNG, transparent background.
                    </p>
                    <button
                        onClick={() => onNavigate('generator')}
                        className="px-8 py-4 bg-pink-500 text-white font-black rounded-2xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-pink-500/20"
                    >
                        Open Free Comment Generator →
                    </button>
                </section>

                <RelatedArticles
                    ids={['guide-tiktok-comment-generator', 'caption-generator', 'engagement-calculator']}
                    onNavigate={onNavigate}
                    darkMode={darkMode}
                />
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
