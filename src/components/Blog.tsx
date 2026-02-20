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
            title: 'How to Add Comment Sticker on TikTok Video (Ultimate Guide 2026)',
            excerpt: "Learn how to natively reply to comments with a video, and discover the best free TikTok comment generator tools to create custom fake TikTok comments.",
            date: 'Feb 19, 2026',
            readTime: '5 min read',
            category: 'Tutorial'
        },
        {
            id: 'guide-instagram',
            title: 'Free Instagram Comment Sticker Generator for Reels',
            excerpt: "Boost your Instagram Reels engagement. Learn how to create a perfect Instagram comment sticker and download it as a transparent PNG.",
            date: 'Feb 19, 2026',
            readTime: '4 min read',
            category: 'Strategy'
        },
        {
            id: 'guide-youtube',
            title: 'Free YouTube Comment Sticker Generator',
            excerpt: "Master the algorithm of YouTube Shorts. Learn how to create a YouTube comment sticker, download it as a PNG, and boost your retention.",
            date: 'Feb 19, 2026',
            readTime: '4 min read',
            category: 'Strategy'
        },
        {
            id: 'guide-comparison',
            title: 'The Best TikTok Comment Generator in 2026: Alternatives compared',
            excerpt: "Looking for the best TokComment alternative? Here is a complete comparison of the top free tools to create fake comment stickers.",
            date: 'Feb 19, 2026',
            readTime: '6 min read',
            category: 'Comparison'
        }
    ];

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
                        <article
                            key={article.id}
                            className={`flex flex-col rounded-3xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
                        >
                            <div className="aspect-video bg-gradient-to-br from-pink-500/20 to-orange-500/20 w-full relative">
                                <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 mb-3">
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h2>
                                <p className="text-sm text-neutral-500 mb-6 line-clamp-3 flex-1">{article.excerpt}</p>
                                <button
                                    onClick={() => onNavigate(article.id)}
                                    className="flex items-center gap-2 text-sm font-bold text-pink-500 hover:gap-3 transition-all mt-auto"
                                >
                                    Read article <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
