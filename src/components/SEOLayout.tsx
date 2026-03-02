import { MessageSquare, Twitter, Linkedin, Send as ShareIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SEOHeaderProps {
    onNavigate: (page: any) => void;
    darkMode: boolean;
}

// Page slug map for real <a href> links
const PAGE_SLUGS: Record<string, string> = {
    home: '/',
    generator: '/app',
    finder: '/question-finder',
    templates: '/templates',
    scripts: '/script-generator',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
    privacy: '/privacy',
    terms: '/terms',
    guide: '/how-to-add-comment-sticker-tiktok',
    'guide-instagram': '/instagram-comment-sticker-generator',
    'guide-youtube': '/youtube-comment-sticker-generator',
    'guide-comparison': '/tiktok-comment-generator-alternatives',
    'guide-tiktok-comment-generator': '/tiktok-comment-generator',
    'guide-tiktok-comment-picker': '/tiktok-comment-picker',
    'guide-tiktok-giveaway-picker': '/tiktok-giveaway-picker',
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
                    <NavLink page="blog" label="Blog & Guides" onNavigate={onNavigate} className="text-sm font-bold hover:text-pink-500 transition-colors" />
                    <NavLink page="home" label="Features" onNavigate={onNavigate} />
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
                        <NavLink page="templates" label="Templates" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Articles</h4>
                    <div className="flex flex-col gap-2">
                        <NavLink page="guide-tiktok-comment-generator" label="TikTok Comment Generator" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-tiktok-comment-picker" label="TikTok Comment Picker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
                        <NavLink page="guide-tiktok-giveaway-picker" label="TikTok Giveaway Picker" onNavigate={onNavigate} className="text-sm font-medium hover:text-pink-500 w-fit text-left" />
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
