import { MessageSquare, Twitter, Linkedin, Send as ShareIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SEOHeaderProps {
    onNavigate: (page: any) => void;
    darkMode: boolean;
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
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                    <div className="w-9 h-9 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500">
                        CommentSticker
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => onNavigate('blog')} className="text-sm font-medium hover:text-pink-500 font-bold transition-colors">Blog & Guides</button>
                    <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-pink-500 transition-colors">Features</button>
                    <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-pink-500 transition-colors">FAQ</button>
                </div>

                <button
                    onClick={() => onNavigate('generator')}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all active:scale-95"
                >
                    Launch App
                </button>
            </div>
        </nav>
    );
}

export function SEOFooter({ onNavigate }: { onNavigate: (page: any) => void }) {
    return (
        <footer className="py-12 px-6 border-t border-neutral-100 dark:border-neutral-900 mt-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-4 col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg">CommentSticker</span>
                    </div>
                    <p className="text-sm font-medium text-neutral-400">Boost your digital presence with our free creative tools.</p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Tools</h4>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => onNavigate('generator')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Sticker Generator</button>
                        <button onClick={() => onNavigate('finder')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Question Finder</button>
                        <button onClick={() => onNavigate('scripts')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Script Generator</button>
                        <button onClick={() => onNavigate('templates')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Templates</button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Resources</h4>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => onNavigate('about')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">About</button>
                        <button onClick={() => onNavigate('blog')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Blog & Guides</button>
                        <button onClick={() => onNavigate('contact')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Contact</button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Legal</h4>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => onNavigate('privacy')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Privacy Policy</button>
                        <button onClick={() => onNavigate('terms')} className="text-sm font-medium hover:text-pink-500 w-fit text-left">Terms of Service</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-12 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    © {new Date().getFullYear()} CommentSticker. Made for Creators.
                </div>

                <div className="flex items-center gap-6 text-neutral-400">
                    <button
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I use CommentSticker for my videos! 🚀")}&url=${encodeURIComponent("https://commentsticker.com")}`, '_blank')}
                        className="hover:text-[#1DA1F2] transition-colors"
                    >
                        <Twitter className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://commentsticker.com")}`, '_blank')}
                        className="hover:text-[#0A66C2] transition-colors"
                    >
                        <Linkedin className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent("https://commentsticker.com")}&text=${encodeURIComponent("The essential tool for creators.")}`, '_blank')}
                        className="hover:text-[#229ED9] transition-colors"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
