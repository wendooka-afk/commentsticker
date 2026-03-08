import { useState } from 'react';
import { TrendingUp, BarChart2, Info, Copy, Check } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';

interface GuideProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

type PlatformId = 'tiktok' | 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'facebook';

interface PlatformConfig {
    label: string;
    emoji: string;
    color: string;
    benchmarks: { low: number; average: number; good: number; excellent: number };
    formula: string;
    tip: string;
}

const PLATFORMS: Record<PlatformId, PlatformConfig> = {
    tiktok: {
        label: 'TikTok',
        emoji: '🎵',
        color: 'from-pink-500 to-rose-600',
        benchmarks: { low: 3, average: 8, good: 15, excellent: 25 },
        formula: '(Likes + Comments + Shares) / Views × 100',
        tip: 'TikTok measures engagement on views, not followers. A 5–15% rate is solid for most niches.',
    },
    instagram: {
        label: 'Instagram',
        emoji: '📸',
        color: 'from-purple-500 to-pink-500',
        benchmarks: { low: 1, average: 3, good: 6, excellent: 10 },
        formula: '(Likes + Comments) / Followers × 100',
        tip: 'Instagram average ER dropped from 6% in 2020 to ~3% in 2026. Above 5% is excellent.',
    },
    youtube: {
        label: 'YouTube',
        emoji: '▶️',
        color: 'from-red-500 to-orange-500',
        benchmarks: { low: 0.5, average: 2, good: 4, excellent: 7 },
        formula: '(Likes + Comments) / Views × 100',
        tip: 'YouTube ER is naturally lower because views are much higher. >2% is strong performance.',
    },
    twitter: {
        label: 'Twitter / X',
        emoji: '🐦',
        color: 'from-sky-500 to-blue-600',
        benchmarks: { low: 0.1, average: 0.5, good: 1, excellent: 2 },
        formula: '(Likes + Retweets + Replies) / Impressions × 100',
        tip: 'Twitter ER is low by default. Focus on reply-to-impressions ratio as a quality signal.',
    },
    linkedin: {
        label: 'LinkedIn',
        emoji: '💼',
        color: 'from-blue-600 to-cyan-500',
        benchmarks: { low: 1, average: 3, good: 6, excellent: 10 },
        formula: '(Reactions + Comments + Shares) / Followers × 100',
        tip: 'LinkedIn B2B content averages 2–5%. Executive thought leaders often see 8–12%.',
    },
    facebook: {
        label: 'Facebook',
        emoji: '👍',
        color: 'from-blue-500 to-indigo-600',
        benchmarks: { low: 0.5, average: 1.5, good: 3, excellent: 5 },
        formula: '(Reactions + Comments + Shares) / Reach × 100',
        tip: 'Facebook organic reach is severely limited. Focus on shares as the highest-value action.',
    },
};

function getRating(er: number, platform: PlatformId): { label: string; color: string; textColor: string; bg: string } {
    const b = PLATFORMS[platform].benchmarks;
    if (er >= b.excellent) return { label: 'Excellent 🏆', color: 'bg-emerald-500', textColor: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (er >= b.good) return { label: 'Good 👍', color: 'bg-blue-500', textColor: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (er >= b.average) return { label: 'Average 📊', color: 'bg-amber-500', textColor: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { label: 'Below Average ⚠️', color: 'bg-red-500', textColor: 'text-red-500', bg: 'bg-red-500/10' };
}

export function EngagementCalculator({ darkMode, onNavigate }: GuideProps) {
    const [platform, setPlatform] = useState<PlatformId>('tiktok');
    const [reactions, setReactions] = useState('');
    const [comments, setComments] = useState('');
    const [shares, setShares] = useState('');
    const [base, setBase] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const cfg = PLATFORMS[platform];

    // Label varies by platform
    const reactionsLabel = platform === 'twitter' ? 'Likes' : platform === 'facebook' || platform === 'linkedin' ? 'Reactions' : 'Likes';
    const sharesLabel = platform === 'tiktok' ? 'Shares' : platform === 'twitter' ? 'Retweets' : platform === 'linkedin' ? 'Shares' : platform === 'facebook' ? 'Shares' : null;
    const baseLabel = platform === 'tiktok' || platform === 'youtube' ? 'Total Views' : platform === 'twitter' ? 'Impressions' : platform === 'facebook' ? 'Reach' : 'Followers';

    const calculate = () => {
        const r = parseFloat(reactions.replace(/[^0-9.]/g, '')) || 0;
        const c = parseFloat(comments.replace(/[^0-9.]/g, '')) || 0;
        const s = parseFloat(shares.replace(/[^0-9.]/g, '')) || 0;
        const b = parseFloat(base.replace(/[^0-9.]/g, '')) || 0;
        if (b === 0) return;
        const er = ((r + c + (sharesLabel ? s : 0)) / b) * 100;
        setResult(Math.round(er * 100) / 100);
    };

    const reset = () => {
        setReactions(''); setComments(''); setShares(''); setBase(''); setResult(null);
    };

    const copyResult = () => {
        if (result === null) return;
        const rating = getRating(result, platform);
        navigator.clipboard.writeText(`${cfg.label} Engagement Rate: ${result}% (${rating.label})`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const rating = result !== null ? getRating(result, platform) : null;
    const b = cfg.benchmarks;

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                {/* Hero */}
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
                        Free Analytics Tool
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        Engagement Rate Calculator
                    </h1>
                    <p className="text-xl text-neutral-500 font-medium">
                        Calculate your <span className="font-bold text-neutral-900 dark:text-white">social media engagement rate</span> for TikTok, Instagram, YouTube, Twitter, LinkedIn and Facebook — with industry benchmarks.
                    </p>
                </div>

                {/* Calculator Card */}
                <div className={`rounded-3xl border p-8 mb-10 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'}`}>
                    {/* Platform Selector */}
                    <div className="mb-8">
                        <label className="block text-sm font-black uppercase tracking-widest text-neutral-500 mb-3">Platform</label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {(Object.keys(PLATFORMS) as PlatformId[]).map(p => (
                                <button
                                    key={p}
                                    onClick={() => { setPlatform(p); reset(); }}
                                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-bold transition-all ${platform === p
                                        ? `bg-gradient-to-br ${PLATFORMS[p].color} text-white border-transparent shadow-lg`
                                        : darkMode
                                            ? 'bg-neutral-800 border-neutral-700 hover:border-pink-500/50 text-neutral-300'
                                            : 'bg-neutral-50 border-neutral-200 hover:border-pink-400 text-neutral-600'
                                        }`}
                                >
                                    <span className="text-xl">{PLATFORMS[p].emoji}</span>
                                    <span>{PLATFORMS[p].label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Formula hint */}
                    <div className={`flex items-start gap-2.5 p-4 rounded-2xl mb-6 text-sm ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                        <Info className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                        <span className="font-medium text-neutral-500">{cfg.formula}</span>
                    </div>

                    {/* Input Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-1.5">{reactionsLabel}</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="e.g. 12500"
                                value={reactions}
                                onChange={e => setReactions(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-1.5">Comments</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="e.g. 340"
                                value={comments}
                                onChange={e => setComments(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`}
                            />
                        </div>
                        {sharesLabel && (
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-1.5">{sharesLabel}</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 89"
                                    value={shares}
                                    onChange={e => setShares(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`}
                                />
                            </div>
                        )}
                        <div className={sharesLabel ? '' : 'sm:col-span-2'}>
                            <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-1.5">{baseLabel}</label>
                            <input
                                type="number"
                                min="1"
                                placeholder="e.g. 150000"
                                value={base}
                                onChange={e => setBase(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`}
                            />
                        </div>
                    </div>

                    <button
                        onClick={calculate}
                        className={`w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r ${cfg.color} hover:opacity-90 active:scale-[0.99] transition-all shadow-lg text-lg`}
                    >
                        <TrendingUp className="inline w-5 h-5 mr-2 mb-0.5" />
                        Calculate Engagement Rate
                    </button>

                    {/* Result */}
                    {result !== null && rating && (
                        <div className={`mt-6 p-6 rounded-2xl border ${rating.bg} ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-bold text-neutral-500 mb-1">Your {cfg.label} Engagement Rate</p>
                                    <p className={`text-5xl font-black ${rating.textColor}`}>{result}%</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                    <span className={`px-4 py-2 rounded-full text-sm font-black ${rating.color} text-white`}>{rating.label}</span>
                                    <button
                                        onClick={copyResult}
                                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${darkMode ? 'border-neutral-700 hover:border-pink-500 text-neutral-400' : 'border-neutral-200 hover:border-pink-400 text-neutral-500'}`}
                                    >
                                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>

                            {/* Benchmark bar */}
                            <div className="mt-4">
                                <p className="text-xs font-bold text-neutral-500 mb-2 uppercase tracking-widest">Industry Benchmarks — {cfg.label}</p>
                                <div className={`relative h-3 rounded-full overflow-hidden ${darkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
                                    {/* segments */}
                                    <div className="absolute inset-0 flex">
                                        <div className="h-full bg-red-400" style={{ width: `${(b.average / b.excellent) * 40}%` }} />
                                        <div className="h-full bg-amber-400" style={{ width: `${((b.good - b.average) / b.excellent) * 40}%` }} />
                                        <div className="h-full bg-blue-400" style={{ width: `${((b.excellent - b.good) / b.excellent) * 40}%` }} />
                                        <div className="h-full bg-emerald-400 flex-1" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-neutral-500 mt-1">
                                    <span>0%</span>
                                    <span className="text-amber-500">{b.average}% avg</span>
                                    <span className="text-blue-500">{b.good}% good</span>
                                    <span className="text-emerald-500">{b.excellent}%+ excellent</span>
                                </div>
                            </div>

                            {/* Tip */}
                            <p className="text-sm font-medium text-neutral-500 mt-4 leading-relaxed">{cfg.tip}</p>
                        </div>
                    )}
                </div>

                {/* Benchmarks Table */}
                <div className={`rounded-3xl border p-8 mb-10 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                    <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                        <BarChart2 className="w-6 h-6 text-pink-500" />
                        Engagement Rate Benchmarks by Platform (2026)
                    </h2>
                    <p className="text-neutral-500 mb-6 font-medium text-sm">Average engagement rates across all industries and account sizes.</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`text-left ${darkMode ? 'border-neutral-700' : 'border-neutral-200'} border-b`}>
                                    <th className="pb-3 font-black text-neutral-500 uppercase tracking-widest text-xs">Platform</th>
                                    <th className="pb-3 font-black text-red-500 uppercase tracking-widest text-xs text-right">Low</th>
                                    <th className="pb-3 font-black text-amber-500 uppercase tracking-widest text-xs text-right">Average</th>
                                    <th className="pb-3 font-black text-blue-500 uppercase tracking-widest text-xs text-right">Good</th>
                                    <th className="pb-3 font-black text-emerald-500 uppercase tracking-widest text-xs text-right">Excellent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(Object.entries(PLATFORMS) as [PlatformId, PlatformConfig][]).map(([id, p]) => (
                                    <tr key={id} className={`border-b last:border-0 ${darkMode ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                        <td className="py-3 font-bold">{p.emoji} {p.label}</td>
                                        <td className="py-3 text-right text-red-500 font-bold">&lt;{p.benchmarks.average}%</td>
                                        <td className="py-3 text-right text-amber-500 font-bold">{p.benchmarks.average}%</td>
                                        <td className="py-3 text-right text-blue-500 font-bold">{p.benchmarks.good}%</td>
                                        <td className="py-3 text-right text-emerald-500 font-bold">&gt;{p.benchmarks.excellent}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-neutral-400 mt-4 font-medium">Sources: Rival IQ Social Media Industry Report 2026, HubSpot Benchmark Report 2026, Socialinsider Q1 2026.</p>
                </div>

                {/* AdSense */}
                <div className="my-10 w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center overflow-hidden">
                    <AdSense adSlot="5566778899" />
                </div>

                {/* How to Improve */}
                <div className={`rounded-3xl border p-8 mb-10 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                    <h2 className="text-2xl font-black mb-6">How to Improve Your Engagement Rate</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: '💬', title: 'Ask Questions in Every Post', desc: 'Posts with a direct question in the caption receive 3× more comments. End with "Drop your answer below 👇" or a simple poll.' },
                            { icon: '⏰', title: 'Post at Peak Times', desc: 'Analyze when your specific audience is most active. For most niches this is 6–9 PM local time, Tuesday–Thursday.' },
                            { icon: '↩️', title: 'Reply to Every Comment', desc: 'Comment replies count as your own engagement and signal to algorithms that your content sparks genuine conversation.' },
                            { icon: '🎯', title: 'Use Comment Stickers as Hooks', desc: 'Overlay a viral comment as a video hook. Viewers who recognise the format engage more. Generate one free at CommentSticker.' },
                            { icon: '🔄', title: 'Repurpose High-ER Content', desc: 'When a post achieves >2× your average ER, repurpose it as a Reel, a Story, a thread, and a newsletter snippet.' },
                            { icon: '📊', title: 'Audit Monthly', desc: 'Track your rolling 30-day average ER per platform. A 5% drop signals algorithm changes or audience fatigue — pivot your content mix early.' },
                        ].map((tip, i) => (
                            <div key={i} className={`p-4 rounded-2xl border ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                                <div className="text-2xl mb-2">{tip.icon}</div>
                                <h3 className="font-black text-sm mb-1">{tip.title}</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-2xl font-black mb-6">Frequently Asked Questions</h2>
                    {[
                        {
                            q: 'What is a good engagement rate on social media?',
                            a: 'It depends on the platform: TikTok averages 8–15%, Instagram 2–5%, YouTube 1–3%, Twitter 0.3–1%, LinkedIn 2–5%, Facebook 1–2%. Generally, anything above average for your platform and niche is "good". Micro-influencers (1K–100K followers) consistently outperform macro-influencers in ER.',
                        },
                        {
                            q: 'Why is my TikTok engagement rate higher than Instagram?',
                            a: 'TikTok\'s For You Page distributes content to non-followers, meaning a single viral video can get millions of views — dramatically increasing your engagement rate temporarily. Instagram limits organic reach to existing followers, making ER structurally lower.',
                        },
                        {
                            q: 'How do brands calculate influencer engagement rate for sponsorships?',
                            a: 'Most brands use: (Total Likes + Comments) / Followers × 100. For TikTok they often use views instead of followers. A rate above 3% on Instagram or 5% on TikTok is typically required for premium sponsorships. Some brands also calculate "save rate" (saves/reach) as a stronger quality signal.',
                        },
                        {
                            q: 'Does engagement rate affect reach on TikTok and Instagram?',
                            a: 'Yes, significantly. Both algorithms prioritise content that generates engagement within the first 30–60 minutes of posting. High ER signals high-quality, relevant content — triggering wider distribution to new audiences. This creates a compounding effect: more reach → more engagement → even more reach.',
                        },
                        {
                            q: 'How do I calculate engagement rate without impressions data?',
                            a: 'Use followers as the denominator instead: ER = (Likes + Comments) / Followers × 100. This is the standard "follower-based ER" formula. It\'s less accurate than impression-based ER but universally available — making it useful for comparing accounts across platforms and niches.',
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
                    <h2 className="text-2xl font-black mb-3">Boost Engagement with Comment Sticker Overlays</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mb-6 font-medium">
                        Add a viral comment sticker to your next video hook. Free PNG, no watermark, transparent background.
                    </p>
                    <button
                        onClick={() => onNavigate('generator')}
                        className="px-8 py-4 bg-pink-500 text-white font-black rounded-2xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-pink-500/20"
                    >
                        Open Free Comment Generator →
                    </button>
                </section>

                <RelatedArticles
                    ids={['guide-tiktok-comment-picker', 'guide-tiktok-giveaway-picker', 'guide-tiktok-comment-generator']}
                    onNavigate={onNavigate}
                    darkMode={darkMode}
                />
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
