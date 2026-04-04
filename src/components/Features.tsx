import { SEOHeader, SEOFooter } from './SEOLayout';
import { CheckCircle2, Download, Layers, Zap, Image, Clock, RefreshCw, Sparkles, LayoutGrid, Wand2 } from 'lucide-react';
import { AdSense } from './AdSense';

interface FeaturesProps { darkMode: boolean; onNavigate: (page: any) => void; }

const PLATFORMS = [
    { name: 'TikTok', emoji: '🎵', color: 'from-black to-neutral-800' },
    { name: 'Instagram', emoji: '📸', color: 'from-purple-600 to-pink-500' },
    { name: 'YouTube', emoji: '▶️', color: 'from-red-600 to-red-500' },
    { name: 'Twitter / X', emoji: '𝕏', color: 'from-neutral-900 to-neutral-700' },
    { name: 'Facebook', emoji: '👍', color: 'from-blue-700 to-blue-500' },
    { name: 'Threads', emoji: '🧵', color: 'from-neutral-800 to-neutral-600' },
    { name: 'Snapchat', emoji: '👻', color: 'from-yellow-400 to-yellow-300' },
    { name: 'Discord', emoji: '🎮', color: 'from-indigo-600 to-indigo-400' },
    { name: 'LinkedIn', emoji: '💼', color: 'from-blue-600 to-blue-400' },
];

const FEATURES = [
    {
        icon: <Image className="w-6 h-6" />,
        title: 'Pixel-perfect comment stickers',
        desc: 'Every comment is rendered natively for each platform — exact fonts, spacing, colors and UI elements. Not a screenshot. Not a template.',
        color: 'from-pink-500 to-rose-500',
    },
    {
        icon: <Download className="w-6 h-6" />,
        title: 'Transparent PNG & JPEG export',
        desc: 'Download at 3× pixel ratio for crisp display at any size. PNG keeps full transparency. JPEG uses a solid platform background. No watermark, no login.',
        color: 'from-orange-500 to-amber-500',
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: 'Batch generator',
        desc: 'Generate up to 10 comment stickers at once and download them all with one click. Perfect for ad agencies running multiple creatives.',
        color: 'from-violet-500 to-purple-500',
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: 'History (last 8 exports)',
        desc: 'Your recent exports are automatically saved locally. Revisit, re-download or tweak any of your last 8 stickers without starting over.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: <RefreshCw className="w-6 h-6" />,
        title: 'Random usernames & avatars',
        desc: 'One click to randomize the username and avatar from a curated list. Great for creating realistic-looking test comments quickly.',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: 'Emoji picker',
        desc: 'Built-in emoji picker with 40 popular emojis. Click to insert anywhere in your comment text — no copy-pasting from other apps.',
        color: 'from-yellow-500 to-orange-400',
    },
    {
        icon: <LayoutGrid className="w-6 h-6" />,
        title: '15+ free creator tools',
        desc: 'Beyond stickers: hashtag generator, caption generator, hook generator, bio generator, CTA generator, font generator, engagement calculator and more.',
        color: 'from-pink-500 to-fuchsia-500',
    },
    {
        icon: <Wand2 className="w-6 h-6" />,
        title: 'Comment & giveaway picker',
        desc: 'Paste comments from any platform, apply keyword filters, remove duplicates and pick a random winner with a dramatic spin animation.',
        color: 'from-teal-500 to-cyan-400',
    },
    {
        icon: <Sparkles className="w-6 h-6" />,
        title: 'No account required',
        desc: 'Every free feature works instantly in your browser. No sign-up, no email, no credit card. Just open the tool and start creating.',
        color: 'from-rose-500 to-pink-400',
    },
];

const FREE_VS_PRO = [
    { feature: 'Comment sticker generator', free: true, pro: true },
    { feature: 'PNG & JPEG export', free: true, pro: true },
    { feature: 'All 15+ free tools', free: true, pro: true },
    { feature: 'No watermark', free: true, pro: true },
    { feature: 'Platforms (free)', free: '3', pro: '9 ✓ All' },
    { feature: 'Daily exports', free: '3/day', pro: 'Unlimited' },
    { feature: 'Batch generator', free: false, pro: true },
    { feature: 'Export history', free: false, pro: true },
    { feature: 'Priority support', free: false, pro: true },
    { feature: 'No ads', free: false, pro: true },
];

export function Features({ darkMode, onNavigate }: FeaturesProps) {
    const card = darkMode
        ? 'bg-neutral-900 border-neutral-800'
        : 'bg-white border-neutral-200';

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-5xl mx-auto px-6 py-32">

                {/* Hero */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="w-3 h-3" />
                        Everything included — free
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Built for creators who<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">move fast.</span>
                    </h1>
                    <p className={`max-w-2xl mx-auto text-lg font-medium ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        CommentSticker gives you pixel-perfect comment stickers, 15+ creator tools, and a batch exporter — all free, no login required.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all"
                        >
                            Try the Generator →
                        </button>
                        <button
                            onClick={() => onNavigate('free-tools')}
                            className={`px-6 py-3 rounded-xl text-sm font-bold border hover:scale-105 transition-all ${darkMode ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 hover:bg-white'}`}
                        >
                            All Free Tools
                        </button>
                    </div>
                </div>

                {/* 9 Platforms */}
                <section className="mb-24">
                    <h2 className="text-2xl font-black mb-2">9 platforms. One tool.</h2>
                    <p className={`text-sm font-medium mb-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        Every comment is rendered natively — exact colors, fonts, and layout for each platform.
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
                        {PLATFORMS.map(p => (
                            <button
                                key={p.name}
                                onClick={() => onNavigate('generator')}
                                className={`rounded-2xl border p-3 flex flex-col items-center gap-2 text-center transition-all hover:-translate-y-1 hover:shadow-lg ${card}`}
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-lg`}>
                                    {p.emoji}
                                </div>
                                <span className="text-[10px] font-bold leading-tight">{p.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Features grid */}
                <section className="mb-24">
                    <h2 className="text-2xl font-black mb-2">Features</h2>
                    <p className={`text-sm font-medium mb-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        Everything you need to create, export, and manage comment stickers at scale.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FEATURES.map(f => (
                            <div key={f.title} className={`rounded-2xl border p-6 ${card}`}>
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4`}>
                                    {f.icon}
                                </div>
                                <h3 className="font-black mb-2">{f.title}</h3>
                                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <AdSense adSlot="7788990011" />

                {/* Free vs Pro comparison */}
                <section className="mb-24 mt-16">
                    <h2 className="text-2xl font-black mb-2">Free vs Pro</h2>
                    <p className={`text-sm font-medium mb-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        The free plan covers everything for most creators. Pro unlocks unlimited exports.
                    </p>
                    <div className={`rounded-3xl border overflow-hidden ${card}`}>
                        <div className={`grid grid-cols-3 px-6 py-4 text-xs font-black uppercase tracking-widest ${darkMode ? 'bg-neutral-800/50 text-neutral-400' : 'bg-neutral-50 text-neutral-400'}`}>
                            <span>Feature</span>
                            <span className="text-center">Free</span>
                            <span className="text-center text-pink-500">Pro</span>
                        </div>
                        {FREE_VS_PRO.map((row, i) => (
                            <div key={row.feature} className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? (darkMode ? 'bg-neutral-900/50' : 'bg-neutral-50/50') : ''} ${i < FREE_VS_PRO.length - 1 ? 'border-b ' + (darkMode ? 'border-neutral-800' : 'border-neutral-100') : ''}`}>
                                <span className="font-medium">{row.feature}</span>
                                <span className="text-center">
                                    {row.free === true ? <CheckCircle2 className="w-4 h-4 text-green-500 inline" /> : row.free === false ? <span className="text-neutral-400">—</span> : <span className="font-bold">{row.free}</span>}
                                </span>
                                <span className="text-center">
                                    {row.pro === true ? <CheckCircle2 className="w-4 h-4 text-pink-500 inline" /> : row.pro === false ? <span className="text-neutral-400">—</span> : <span className="font-bold text-pink-500">{row.pro}</span>}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button
                            onClick={() => onNavigate('pricing')}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all"
                        >
                            View Pricing →
                        </button>
                    </div>
                </section>

            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
