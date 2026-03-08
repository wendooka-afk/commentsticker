import { MessageSquare, Twitter, Linkedin, Send as ShareIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PAGE_TO_SLUG } from '../config/routes';

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
        title: 'TikTok Comment Generator: Create Fake TikTok Comments Free',
        excerpt: 'Create realistic TikTok comment stickers as transparent PNGs — no watermark.',
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

export function SEOHeader({ onNavigate, darkMode }: SEOHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4`}>
            <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-300 ${isScrolled
                ? (darkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/80 border-white/50 shadow-lg shadow-black/5') + ' backdrop-blur-xl'
                : 'bg-transparent border-transparent'
                }`}>
                <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500">
                        CommentSticker
                    </span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    <NavLink page="generator" label="Free Tool" onNavigate={onNavigate} className="text-sm font-bold hover:text-pink-500 transition-colors" />
                    <NavLink page="blog" label="Blog & Guides" onNavigate={onNavigate} className="text-sm font-bold hover:text-pink-500 transition-colors" />
                    <NavLink page="about" label="About" onNavigate={onNavigate} />
                </div>

                <a
                    href="/app"
                    onClick={(e) => { e.preventDefault(); onNavigate('generator'); }}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all active:scale-95"
                >
                    Launch App
                </a>
            </div>
        </nav>
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
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg">CommentSticker</span>
                    </a>
                    <p className="text-sm font-medium text-neutral-400">The free comment sticker generator for TikTok, Instagram, YouTube & more.</p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Tools</h4>
                    <div className="flex flex-col gap-2">
                        <NavLink page="generator" label="Sticker Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="finder" label="Question Finder" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="scripts" label="Script Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="templates" label="Templates Library" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-tiktok-comment-picker" label="Comment Picker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="batch" label="Batch Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
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
