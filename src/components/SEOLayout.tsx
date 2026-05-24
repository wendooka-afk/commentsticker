import { Twitter, Linkedin, Send as ShareIcon, Menu, X, Crown, LogIn, ChevronDown, Hash, Type, AlignLeft, BarChart2, Zap, Lightbulb, MessageCircle, User, MousePointer, Layers, Shuffle, Target, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { PAGE_TO_SLUG } from '../config/routes';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface SEOHeaderProps {
    onNavigate: (page: any) => void;
    darkMode: boolean;
}

// Use centralized route registry — single source of truth
const PAGE_SLUGS = PAGE_TO_SLUG as Record<string, string>;

// Metadata for all articles — used by RelatedArticles component
const ARTICLE_META: Record<string, { title: string; excerpt: string; category: string; readTime: string; emoji: string; from: string; to: string }> = {
    guide: {
        title: 'How to Add a Comment Sticker on TikTok (2026)',
        excerpt: 'Learn the native method & how to create custom comment stickers for UGC ads.',
        category: 'Tutorial', readTime: '5 min', emoji: '📱', from: 'from-pink-500', to: 'to-rose-600',
    },
    'guide-instagram': {
        title: 'Free Instagram Comment Sticker Generator for Reels',
        excerpt: 'Create pixel-perfect Instagram comment stickers as transparent PNGs.',
        category: 'Strategy', readTime: '4 min', emoji: '📸', from: 'from-purple-500', to: 'to-pink-500',
    },
    'guide-youtube': {
        title: 'Free YouTube Comment Sticker Generator for Shorts',
        excerpt: 'Generate YouTube comment overlays and boost your Shorts retention.',
        category: 'Strategy', readTime: '4 min', emoji: '▶️', from: 'from-red-500', to: 'to-orange-500',
    },
    'guide-comparison': {
        title: 'Best TikTok Comment Generator in 2026: Alternatives Compared',
        excerpt: 'Full comparison of TokComment alternatives — find the best free tool.',
        category: 'Comparison', readTime: '6 min', emoji: '⚖️', from: 'from-blue-500', to: 'to-cyan-500',
    },
    'guide-tiktok-comment-generator': {
        title: 'TikTok Comment Mockup Generator for UGC Ads',
        excerpt: 'Create pixel-perfect TikTok comment mockup overlays as transparent PNGs — no watermark.',
        category: 'Tool Guide', readTime: '7 min', emoji: '💬', from: 'from-fuchsia-500', to: 'to-pink-600',
    },
    'guide-tiktok-comment-picker': {
        title: 'TikTok Comment Picker: Pick a Random Winner (Free)',
        excerpt: 'Paste your comments, pick a random winner. Free tool + guide.',
        category: 'Free Tools', readTime: '6 min', emoji: '🎯', from: 'from-amber-500', to: 'to-orange-500',
    },
    'guide-tiktok-giveaway-picker': {
        title: 'TikTok Giveaway Picker: Free Random Winner Tool',
        excerpt: 'Run a fair TikTok giveaway and randomly select a winner from comments.',
        category: 'Giveaway', readTime: '8 min', emoji: '🎁', from: 'from-emerald-500', to: 'to-teal-500',
    },
    'hashtag-generator': {
        title: 'Free TikTok Hashtag Generator — Best Hashtags for Your Niche',
        excerpt: 'Generate viral, growth and niche hashtags for TikTok, Instagram and YouTube.',
        category: 'Free Tool', readTime: '3 min', emoji: '#️⃣', from: 'from-violet-500', to: 'to-purple-600',
    },
    'font-generator': {
        title: 'TikTok Font Generator — Copy & Paste Fonts',
        excerpt: '13 Unicode font styles for TikTok bio, captions and usernames.',
        category: 'Free Tool', readTime: '3 min', emoji: '✍️', from: 'from-indigo-500', to: 'to-blue-600',
    },
    'caption-generator': {
        title: 'Free Social Media Caption Generator',
        excerpt: 'Generate captions for TikTok, Instagram, LinkedIn and YouTube instantly.',
        category: 'Free Tool', readTime: '3 min', emoji: '✏️', from: 'from-pink-500', to: 'to-fuchsia-600',
    },
    'engagement-calculator': {
        title: 'Engagement Rate Calculator — All Platforms',
        excerpt: 'Calculate your ER for TikTok, Instagram, YouTube and more with benchmarks.',
        category: 'Free Tool', readTime: '4 min', emoji: '📊', from: 'from-orange-500', to: 'to-amber-500',
    },
    'blog-tiktok-username-ideas': {
        title: '200+ TikTok Username Ideas for 2026',
        excerpt: 'Cute, aesthetic, funny and personal-brand name ideas for girls, boys and more.',
        category: 'Trending', readTime: '8 min', emoji: '✨', from: 'from-pink-500', to: 'to-rose-500',
    },
    'blog-tiktok-giveaway': {
        title: 'How to Run a TikTok Giveaway in 2026: Complete Guide',
        excerpt: 'Step-by-step guide to running a successful TikTok giveaway and picking a fair random winner.',
        category: 'Giveaway', readTime: '10 min', emoji: '🎁', from: 'from-emerald-500', to: 'to-teal-600',
    },
    'blog-ugc-content': {
        title: 'What is UGC Content? Complete 2026 Guide',
        excerpt: 'Learn what UGC content is, why brands pay creators for it, and how to get started.',
        category: 'Creator Guide', readTime: '11 min', emoji: '🎬', from: 'from-violet-500', to: 'to-purple-600',
    },
    'blog-tiktok-algorithm': {
        title: 'How the TikTok Algorithm Works in 2026',
        excerpt: 'Every FYP ranking signal explained — and 10 strategies to get on the For You Page.',
        category: 'Growth', readTime: '12 min', emoji: '🧠', from: 'from-blue-500', to: 'to-cyan-600',
    },
    'blog-tiktok-views': {
        title: 'How to Get More Views on TikTok in 2026',
        excerpt: '15 proven strategies to break out of the algorithm loop and grow your TikTok audience.',
        category: 'Growth Tips', readTime: '10 min', emoji: '📈', from: 'from-orange-500', to: 'to-red-500',
    },
};

function NavLink({ page, label, onNavigate, className }: { page: string; label: string; onNavigate: (p: any) => void; className?: string }) {
    const href = PAGE_SLUGS[page] ?? '/';
    return (
        <a
            href={href}
            onClick={(e) => { e.preventDefault(); onNavigate(page); }}
            className={className ?? 'text-sm font-medium hover:text-pink-500 transition-colors'}
        >
            {label}
        </a>
    );
}

const FREE_TOOLS_STICKER = [
    { page: 'generator', label: 'Sticker Generator', icon: <Target className="w-4 h-4" />, desc: '9 platforms, transparent PNG' },
    { page: 'batch', label: 'Batch Generator', icon: <Layers className="w-4 h-4" />, desc: 'Up to 10 stickers at once' },
    { page: 'guide-tiktok-comment-picker', label: 'Comment Picker', icon: <Shuffle className="w-4 h-4" />, desc: 'Random winner tool' },
    { page: 'guide-tiktok-giveaway-picker', label: 'Giveaway Picker', icon: <MousePointer className="w-4 h-4" />, desc: 'Pick 1–5 winners' },
];
const FREE_TOOLS_CONTENT = [
    { page: 'hashtag-generator', label: 'Hashtag Generator', icon: <Hash className="w-4 h-4" /> },
    { page: 'caption-generator', label: 'Caption Generator', icon: <AlignLeft className="w-4 h-4" /> },
    { page: 'hook-generator', label: 'Hook Generator', icon: <Zap className="w-4 h-4" /> },
    { page: 'video-ideas-generator', label: 'Video Ideas', icon: <Lightbulb className="w-4 h-4" /> },
    { page: 'font-generator', label: 'Font Generator', icon: <Type className="w-4 h-4" /> },
    { page: 'comment-reply-generator', label: 'Comment Reply', icon: <MessageCircle className="w-4 h-4" /> },
    { page: 'bio-generator', label: 'Bio Generator', icon: <User className="w-4 h-4" /> },
    { page: 'cta-generator', label: 'CTA Generator', icon: <MousePointer className="w-4 h-4" /> },
];
const FREE_TOOLS_ANALYTICS = [
    { page: 'engagement-calculator', label: 'Engagement Calculator', icon: <BarChart2 className="w-4 h-4" /> },
    { page: 'finder', label: 'Question Finder', icon: <Search className="w-4 h-4" /> },
];

export function SEOHeader({ onNavigate, darkMode }: SEOHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [freeToolsOpen, setFreeToolsOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const { user, isProUser } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            if (window.scrollY > 20) { setIsMobileMenuOpen(false); setFreeToolsOpen(false); }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setFreeToolsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const nav = (page: string) => { onNavigate(page); setIsMobileMenuOpen(false); setFreeToolsOpen(false); };

    const mobileNavItems = [
        { page: 'free-tools', label: '🛠️  All Free Tools' },
        { page: 'features', label: '✨  Features' },
        { page: 'use-cases', label: '💡  Use Cases' },
        { page: 'pricing', label: '💎  Pricing' },
        { page: 'blog', label: '📖  Blog & Guides' },
    ];

    const dm = darkMode;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-300 ${isScrolled
                ? (dm ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-white/50 shadow-lg shadow-black/5') + ' backdrop-blur-xl'
                : 'bg-transparent border-transparent'
                }`}>

                {/* Logo */}
                <a href="/" onClick={(e) => { e.preventDefault(); nav('home'); }} className="flex items-center gap-2 flex-shrink-0">
                    <img src="/logo-icon.png" alt="CommentSticker" className="w-9 h-9 object-contain" />
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500">
                        CommentSticker
                    </span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-7">

                    {/* Free Tools dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setFreeToolsOpen(v => !v)}
                            className={`flex items-center gap-1 text-sm font-bold transition-colors hover:text-pink-500 ${freeToolsOpen ? 'text-pink-500' : ''}`}
                        >
                            Free Tools <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${freeToolsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {freeToolsOpen && (
                            <div className={`absolute left-0 top-full mt-3 w-[580px] rounded-2xl border shadow-2xl overflow-hidden z-50 ${dm ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                                <div className="p-5 grid grid-cols-2 gap-6">
                                    {/* Sticker Tools */}
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${dm ? 'text-neutral-500' : 'text-neutral-400'}`}>🎨 Sticker Tools</p>
                                        <div className="flex flex-col gap-1">
                                            {FREE_TOOLS_STICKER.map(t => (
                                                <button key={t.page} onClick={() => nav(t.page)}
                                                    className={`flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${dm ? 'hover:bg-neutral-800' : 'hover:bg-neutral-50'}`}>
                                                    <span className={`mt-0.5 ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{t.icon}</span>
                                                    <div>
                                                        <div className="text-sm font-bold leading-tight">{t.label}</div>
                                                        <div className={`text-xs ${dm ? 'text-neutral-500' : 'text-neutral-400'}`}>{t.desc}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 mt-5 ${dm ? 'text-neutral-500' : 'text-neutral-400'}`}>📊 Analytics</p>
                                        <div className="flex flex-col gap-1">
                                            {FREE_TOOLS_ANALYTICS.map(t => (
                                                <button key={t.page} onClick={() => nav(t.page)}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${dm ? 'hover:bg-neutral-800' : 'hover:bg-neutral-50'}`}>
                                                    <span className={`${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{t.icon}</span>
                                                    <span className="text-sm font-bold">{t.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Tools */}
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${dm ? 'text-neutral-500' : 'text-neutral-400'}`}>✏️ Content Tools</p>
                                        <div className="flex flex-col gap-1">
                                            {FREE_TOOLS_CONTENT.map(t => (
                                                <button key={t.page} onClick={() => nav(t.page)}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${dm ? 'hover:bg-neutral-800' : 'hover:bg-neutral-50'}`}>
                                                    <span className={`${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{t.icon}</span>
                                                    <span className="text-sm font-bold">{t.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className={`px-5 py-3 border-t flex items-center justify-between ${dm ? 'border-neutral-800 bg-neutral-950/50' : 'border-neutral-100 bg-neutral-50'}`}>
                                    <span className={`text-xs font-medium ${dm ? 'text-neutral-500' : 'text-neutral-400'}`}>15+ free tools — no login required</span>
                                    <button onClick={() => nav('free-tools')} className="text-xs font-black text-pink-500 hover:text-pink-400 transition-colors">
                                        View all tools →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <NavLink page="features" label="Features" onNavigate={nav} className="text-sm font-bold hover:text-pink-500 transition-colors" />
                    <NavLink page="use-cases" label="Use Cases" onNavigate={nav} className="text-sm font-bold hover:text-pink-500 transition-colors" />
                    <NavLink page="pricing" label="Pricing" onNavigate={nav} className="text-sm font-bold hover:text-pink-500 transition-colors" />
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        className={`md:hidden p-2 rounded-xl transition-colors ${dm ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-100'}`}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {user ? (
                        <>
                            {!isProUser && (
                                <a href="/pricing/" onClick={(e) => { e.preventDefault(); nav('pricing'); }}
                                    className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-pink-500 border border-pink-500/30 hover:bg-pink-500/10 transition-all">
                                    <Crown className="w-3.5 h-3.5" /> Upgrade
                                </a>
                            )}
                            {isProUser && (
                                <span className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-pink-500 bg-pink-500/10">
                                    <Crown className="w-3.5 h-3.5" /> Pro
                                </span>
                            )}
                            <a href="/account/" onClick={(e) => { e.preventDefault(); nav('account'); }}
                                className={`hidden md:flex items-center justify-center w-9 h-9 rounded-xl font-black text-sm transition-colors ${dm ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'}`}
                                title={user.email}>
                                {user.email?.[0].toUpperCase()}
                            </a>
                        </>
                    ) : (
                        <button onClick={() => setShowAuth(true)}
                            className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border transition-all hover:scale-105 ${dm ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}>
                            <LogIn className="w-3.5 h-3.5" /> Log in
                        </button>
                    )}

                    <a href="/app/" onClick={(e) => { e.preventDefault(); nav('generator'); }}
                        className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all active:scale-95 whitespace-nowrap">
                        Launch App
                    </a>
                </div>

                {showAuth && <AuthModal darkMode={darkMode} onClose={() => setShowAuth(false)} />}
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className={`md:hidden mt-2 rounded-2xl border overflow-hidden shadow-xl ${dm ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                    <div className="flex flex-col p-3 gap-1">
                        {mobileNavItems.map(({ page, label }) => (
                            <button key={page} onClick={() => nav(page)}
                                className={`text-left w-full px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${dm ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-neutral-50 text-neutral-700'}`}>
                                {label}
                            </button>
                        ))}
                        {user ? (
                            <button onClick={() => nav('account')}
                                className={`text-left w-full px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${dm ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-neutral-50 text-neutral-700'}`}>
                                👤  My Account
                            </button>
                        ) : (
                            <button onClick={() => { setShowAuth(true); setIsMobileMenuOpen(false); }}
                                className={`text-left w-full px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${dm ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-neutral-50 text-neutral-700'}`}>
                                🔑  Log in
                            </button>
                        )}
                        <button onClick={() => nav('generator')}
                            className="mt-1 w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-black">
                            Launch App →
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

// ── Reusable Related Articles section ────────────────────────────────────────

interface RelatedArticlesProps {
    ids: string[];
    onNavigate: (page: any) => void;
    darkMode: boolean;
}

export function RelatedArticles({ ids, onNavigate, darkMode }: RelatedArticlesProps) {
    const articles = ids
        .map(id => ({ id, ...ARTICLE_META[id] }))
        .filter(a => a.title);

    if (articles.length === 0) return null;

    return (
        <section className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className={`text-2xl font-black mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {articles.map(article => (
                    <a
                        key={article.id}
                        href={PAGE_SLUGS[article.id]}
                        onClick={(e) => { e.preventDefault(); onNavigate(article.id); }}
                        className={`group flex flex-col rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
                    >
                        <div className={`h-20 bg-gradient-to-br ${article.from} ${article.to} flex items-center justify-center relative overflow-hidden`}>
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                            <span className="text-3xl relative z-10">{article.emoji}</span>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                {article.category} · {article.readTime} read
                            </span>
                            <h3 className={`text-sm font-bold mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors ${darkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>
                                {article.title}
                            </h3>
                            <p className={`text-xs leading-relaxed line-clamp-2 mt-auto ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                {article.excerpt}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

export function SEOFooter({ onNavigate }: { onNavigate: (page: any) => void }) {
    return (
        <footer className="py-12 px-6 border-t border-neutral-100 dark:border-neutral-900 mt-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-4 col-span-1 md:col-span-1">
                    <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2">
                        <img src="/logo-icon.png" alt="CommentSticker" className="w-8 h-8 object-contain" />
                        <span className="font-bold text-lg">CommentSticker</span>
                    </a>
                    <p className="text-sm font-medium text-neutral-400">The free comment sticker generator for TikTok, Instagram, YouTube & more.</p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Tools</h4>
                    <div className="flex flex-col gap-2">
                        <NavLink page="free-tools" label="All Free Tools →" onNavigate={onNavigate} className="text-sm font-black hover:text-pink-500 w-fit text-left text-pink-500" />
                        <NavLink page="generator" label="Sticker Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="finder" label="Question Finder" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="scripts" label="Script Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="templates" label="Templates Library" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-tiktok-comment-picker" label="Comment Picker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-tiktok-giveaway-picker" label="Giveaway Picker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="batch" label="Batch Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="hashtag-generator" label="Hashtag Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="font-generator" label="Font Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="caption-generator" label="Caption Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="engagement-calculator" label="Engagement Calculator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Articles</h4>
                    <div className="flex flex-col gap-2">
                        <NavLink page="guide-tiktok-comment-generator" label="TikTok Comment Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide" label="Add Comment Sticker (TikTok)" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-instagram" label="Instagram Comment Sticker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-youtube" label="YouTube Comment Sticker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-tiktok-comment-picker" label="TikTok Comment Picker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-tiktok-giveaway-picker" label="TikTok Giveaway Picker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-comparison" label="Generator Alternatives" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="blog" label="All Guides →" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left text-pink-500" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Company</h4>
                    <div className="flex flex-col gap-2">
                        <NavLink page="features" label="Features" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="use-cases" label="Use Cases" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="pricing" label="Pricing" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="about" label="About" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="contact" label="Contact" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="privacy" label="Privacy Policy" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="terms" label="Terms of Service" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-12 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    © {new Date().getFullYear()} CommentSticker. Made for Creators.
                </div>

                <div className="flex items-center gap-6 text-neutral-400">
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I use CommentSticker for my videos! 🚀")}&url=${encodeURIComponent("https://commentsticker.com")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="hover:text-[#1DA1F2] transition-colors"
                        aria-label="Share on Twitter"
                    >
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://commentsticker.com")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="hover:text-[#0A66C2] transition-colors"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href={`https://t.me/share/url?url=${encodeURIComponent("https://commentsticker.com")}&text=${encodeURIComponent("The essential tool for creators.")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="hover:text-[#229ED9] transition-colors"
                        aria-label="Share on Telegram"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

// Article byline — adds EEAT signals (author role, published/reviewed dates) to each guide.
// Pass any subset of props; falls back to sensible defaults.
interface ArticleBylineProps {
    role?: string;
    published?: string;
    reviewed?: string;
    readTime?: string;
    darkMode: boolean;
    onNavigate?: (page: any) => void;
}

export function ArticleByline({
    role = 'CommentSticker Editorial Team',
    published,
    reviewed,
    readTime,
    darkMode,
    onNavigate,
}: ArticleBylineProps) {
    const subtle = darkMode ? 'text-neutral-500' : 'text-neutral-500';
    const border = darkMode ? 'border-neutral-800' : 'border-neutral-200';
    const bg = darkMode ? 'bg-neutral-900/40' : 'bg-white';
    return (
        <div className={`flex flex-wrap items-center gap-4 p-4 rounded-2xl border ${bg} ${border} mb-8`}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-black text-sm">CS</div>
                <div className="text-sm">
                    <div className="font-black">{role}</div>
                    <div className={`text-xs ${subtle}`}>
                        UGC creator tooling · editorial standards on the {onNavigate ? (
                            <button onClick={() => onNavigate('about')} className="underline hover:text-pink-500 transition-colors">About page</button>
                        ) : (
                            <a href="/about" className="underline hover:text-pink-500 transition-colors">About page</a>
                        )}
                    </div>
                </div>
            </div>
            <div className={`flex flex-wrap items-center gap-3 text-xs font-medium ${subtle} ml-auto`}>
                {published && <span><strong className="text-neutral-700 dark:text-neutral-300">Published:</strong> {published}</span>}
                {reviewed && <span>·</span>}
                {reviewed && <span><strong className="text-neutral-700 dark:text-neutral-300">Last reviewed:</strong> {reviewed}</span>}
                {readTime && <span>·</span>}
                {readTime && <span>{readTime} read</span>}
            </div>
        </div>
    );
}
