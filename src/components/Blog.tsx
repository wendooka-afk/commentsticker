import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface BlogProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function Blog({ darkMode, onNavigate }: BlogProps) {
    const articles = [
        {
            id: 'guide',
            slug: '/how-to-add-comment-sticker-tiktok',
            title: 'How to Add Comment Sticker on TikTok Video (Ultimate Guide 2026)',
            excerpt: "Learn how to natively reply to comments with a video, and discover the best free TikTok comment generator tools to create custom fake TikTok comments.",
            date: 'Feb 19, 2026',
            ts: 20260219,
            readTime: '5 min read',
            category: 'Tutorial',
            thumb: { from: 'from-pink-500', to: 'to-rose-600', emoji: '📱', label: 'TikTok Guide' }
        },
        {
            id: 'guide-instagram',
            slug: '/instagram-comment-sticker-generator',
            title: 'Free Instagram Comment Sticker Generator for Reels',
            excerpt: "Boost your Instagram Reels engagement. Learn how to create a perfect Instagram comment sticker and download it as a transparent PNG.",
            date: 'Feb 19, 2026',
            ts: 20260219,
            readTime: '4 min read',
            category: 'Strategy',
            thumb: { from: 'from-purple-500', to: 'to-pink-500', emoji: '📸', label: 'Instagram' }
        },
        {
            id: 'guide-youtube',
            slug: '/youtube-comment-sticker-generator',
            title: 'Free YouTube Comment Sticker Generator',
            excerpt: "Master the algorithm of YouTube Shorts. Learn how to create a YouTube comment sticker, download it as a PNG, and boost your retention.",
            date: 'Feb 19, 2026',
            ts: 20260219,
            readTime: '4 min read',
            category: 'Strategy',
            thumb: { from: 'from-red-500', to: 'to-orange-500', emoji: '▶️', label: 'YouTube' }
        },
        {
            id: 'guide-comparison',
            slug: '/tiktok-comment-generator-alternatives',
            title: 'The Best TikTok Comment Generator in 2026: Alternatives compared',
            excerpt: "Looking for the best TokComment alternative? Here is a complete comparison of the top free tools to create fake comment stickers.",
            date: 'Feb 19, 2026',
            ts: 20260219,
            readTime: '6 min read',
            category: 'Comparison',
            thumb: { from: 'from-blue-500', to: 'to-cyan-500', emoji: '⚖️', label: 'Compare' }
        },
        {
            id: 'guide-tiktok-comment-generator',
            slug: '/tiktok-comment-generator',
            title: 'TikTok Comment Generator: Create Fake TikTok Comments Free (2026)',
            excerpt: "Learn how to use a free TikTok comment generator to create realistic, transparent PNG comment stickers for UGC ads — no watermark, instant download.",
            date: 'Mar 2, 2026',
            ts: 20260302,
            readTime: '7 min read',
            category: 'Tool Guide',
            thumb: { from: 'from-fuchsia-500', to: 'to-pink-600', emoji: '💬', label: 'Generator' }
        },
        {
            id: 'guide-tiktok-comment-picker',
            slug: '/tiktok-comment-picker',
            title: 'TikTok Comment Picker: Pick a Random Comment Winner (Free)',
            excerpt: "Looking for a free random TikTok comment picker? This guide covers the best free tools to fairly pick a winner from your TikTok video comments.",
            date: 'Mar 2, 2026',
            ts: 20260302,
            readTime: '6 min read',
            category: 'Free Tools',
            thumb: { from: 'from-amber-500', to: 'to-orange-500', emoji: '🎯', label: 'Picker' }
        },
        {
            id: 'guide-tiktok-giveaway-picker',
            slug: '/tiktok-giveaway-picker',
            title: 'TikTok Giveaway Picker: Free Tool to Pick a Random Winner',
            excerpt: "Running a TikTok giveaway? Use a free TikTok giveaway picker to randomly select a winner from your comments or followers — step-by-step guide.",
            date: 'Mar 2, 2026',
            ts: 20260302,
            readTime: '8 min read',
            category: 'Giveaway',
            thumb: { from: 'from-emerald-500', to: 'to-teal-500', emoji: '🎁', label: 'Giveaway' }
        },
        {
            id: 'blog-tiktok-giveaway',
            slug: '/tiktok-giveaway-guide',
            title: 'How to Run a TikTok Giveaway in 2026: Complete Step-by-Step Guide',
            excerpt: "Everything you need to know to run a successful TikTok giveaway — rules, promotion, winner selection, and mistakes to avoid.",
            date: 'Apr 14, 2026',
            ts: 20260414,
            readTime: '10 min read',
            category: 'Giveaway',
            thumb: { from: 'from-emerald-500', to: 'to-teal-600', emoji: '🎁', label: 'Giveaway' }
        },
        {
            id: 'blog-ugc-content',
            slug: '/what-is-ugc-content',
            title: 'What is UGC Content? The Complete 2026 Guide for Creators and Brands',
            excerpt: "UGC has become one of the most powerful marketing formats. Learn what it is, why brands pay creators for it, and how to get started — no following required.",
            date: 'Apr 14, 2026',
            ts: 20260414,
            readTime: '11 min read',
            category: 'Creator Guide',
            thumb: { from: 'from-violet-500', to: 'to-purple-600', emoji: '🎬', label: 'UGC Guide' }
        },
        {
            id: 'blog-tiktok-algorithm',
            slug: '/tiktok-algorithm-guide',
            title: 'How the TikTok Algorithm Works in 2026: Complete For You Page Guide',
            excerpt: "Understanding the TikTok algorithm is the most important skill for any creator. This guide breaks down every ranking signal and how to get on the FYP.",
            date: 'Apr 14, 2026',
            ts: 20260414,
            readTime: '12 min read',
            category: 'Growth',
            thumb: { from: 'from-blue-500', to: 'to-cyan-600', emoji: '🧠', label: 'Algorithm' }
        },
        {
            id: 'blog-tiktok-views',
            slug: '/how-to-get-more-views-tiktok',
            title: 'How to Get More Views on TikTok in 2026: 15 Proven Strategies',
            excerpt: "Struggling to get views on TikTok? These 15 data-backed strategies will help you break out of the algorithm loop and consistently grow your audience.",
            date: 'Apr 14, 2026',
            ts: 20260414,
            readTime: '10 min read',
            category: 'Growth Tips',
            thumb: { from: 'from-orange-500', to: 'to-red-500', emoji: '📈', label: 'Views' }
        },
    ].sort((a, b) => b.ts - a.ts); // newest first


    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Blog & Articles</h1>
                        <p className="text-neutral-500 mt-2 font-medium">Guides, tutorials, and tips for UGC content creators.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <React.Fragment key={article.id}>
                            <article
                                className={`flex flex-col rounded-3xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
                            >
                                <a
                                    href={article.slug}
                                    onClick={(e) => { e.preventDefault(); onNavigate(article.id as any); }}
                                    className={`aspect-video bg-gradient-to-br ${article.thumb.from} ${article.thumb.to} w-full relative flex flex-col items-center justify-center gap-3 block`}
                                >
                                    {/* Decorative circles */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
                                        <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-black/10 rounded-full" />
                                    </div>
                                    <span className="text-5xl relative z-10 drop-shadow-lg">{article.thumb.emoji}</span>
                                    <span className="relative z-10 text-white/90 text-xs font-black uppercase tracking-widest">{article.thumb.label}</span>
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 z-10">
                                        {article.category}
                                    </span>
                                </a>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 mb-3">
                                        <span>{article.date}</span>
                                        <span>•</span>
                                        <span>{article.readTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h2>
                                    <p className="text-sm text-neutral-500 mb-6 line-clamp-3 flex-1">{article.excerpt}</p>
                                    <a
                                        href={article.slug}
                                        onClick={(e) => { e.preventDefault(); onNavigate(article.id as any); }}
                                        className="flex items-center gap-2 text-sm font-bold text-pink-500 hover:gap-3 transition-all mt-auto"
                                    >
                                        Read article <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </article>
                        </React.Fragment>
                    ))}
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
