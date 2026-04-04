import { SEOHeader, SEOFooter } from './SEOLayout';
import { Play, TrendingUp, Star, Gift, ShoppingBag, BookOpen, Megaphone, Users, ChevronRight } from 'lucide-react';
import { AdSense } from './AdSense';

interface UseCasesProps { darkMode: boolean; onNavigate: (page: any) => void; }

const USE_CASES = [
    {
        icon: <Play className="w-7 h-7" />,
        color: 'from-pink-500 to-rose-500',
        title: 'UGC Ads',
        label: 'Most popular',
        desc: 'Add a comment sticker at the top of your TikTok or Instagram Reel ad to instantly create social proof. A question like "Does this really work?" or a reaction like "I can\'t believe the results" hooks viewers in the first second.',
        steps: [
            'Pick the platform (TikTok, Instagram, YouTube…)',
            'Write a comment that matches a real customer question or reaction',
            'Export as transparent PNG and drop it into CapCut or Premiere',
        ],
        cta: { label: 'Create your sticker', page: 'generator' },
    },
    {
        icon: <TrendingUp className="w-7 h-7" />,
        color: 'from-orange-500 to-amber-400',
        title: 'Short-form content creation',
        label: 'TikTok & Reels',
        desc: 'Reply to a comment natively on TikTok — or create a custom comment sticker to highlight a specific reaction without depending on actual comments. Perfect for "comment said I couldn\'t do it" hooks.',
        steps: [
            'Find a comment angle that fits your hook idea',
            'Generate a custom comment sticker with any username',
            'Overlay it on your video in the first 2 seconds',
        ],
        cta: { label: 'Generate comment', page: 'generator' },
    },
    {
        icon: <ShoppingBag className="w-7 h-7" />,
        color: 'from-violet-500 to-purple-500',
        title: 'E-commerce & dropshipping',
        label: 'Product ads',
        desc: 'Simulate customer questions about shipping, results, or sizing in a realistic comment format. Show social proof before the product is even on screen. Used by top e-com brands to boost ROAS on Meta and TikTok Ads.',
        steps: [
            'Research common customer questions for your product',
            'Create a comment sticker for each objection',
            'Use them as hooks in your ad creatives',
        ],
        cta: { label: 'Make ad stickers', page: 'generator' },
    },
    {
        icon: <Gift className="w-7 h-7" />,
        color: 'from-emerald-500 to-teal-400',
        title: 'Giveaways & contests',
        label: 'TikTok giveaways',
        desc: 'Run a transparent giveaway by pasting all comment entries into the free comment or giveaway picker. Pick 1–5 random winners with a keyword filter and duplicate removal. Record your screen for full transparency.',
        steps: [
            'Copy all entries from your giveaway post',
            'Paste into the Giveaway Picker tool',
            'Pick 1–5 winners with one click',
        ],
        cta: { label: 'Try the picker', page: 'guide-tiktok-giveaway-picker' },
    },
    {
        icon: <Star className="w-7 h-7" />,
        color: 'from-yellow-500 to-orange-400',
        title: 'Brand social proof',
        label: 'Influencer & brand',
        desc: 'Showcase glowing comments from customers or fans as a visual overlay in your brand content. Works for product launches, brand deals, and influencer collabs where you want to surface key audience reactions.',
        steps: [
            'Screenshot or recreate top comments from your best posts',
            'Export as high-res transparent PNG',
            'Add to your brand video or story template',
        ],
        cta: { label: 'Build social proof', page: 'generator' },
    },
    {
        icon: <BookOpen className="w-7 h-7" />,
        color: 'from-blue-500 to-cyan-400',
        title: 'Educational content',
        label: 'Tutorials & guides',
        desc: 'Teaching something on TikTok or YouTube? Use a question comment sticker as the hook: "How do I do this without spending money?" sets up your tutorial before you say a word.',
        steps: [
            'Identify the most common beginner question in your niche',
            'Create a comment sticker framing that question',
            'Open your tutorial video with that hook',
        ],
        cta: { label: 'Make a question sticker', page: 'generator' },
    },
    {
        icon: <Megaphone className="w-7 h-7" />,
        color: 'from-rose-500 to-pink-500',
        title: 'Content agencies & freelancers',
        label: 'Batch production',
        desc: 'Managing multiple clients or running bulk creative campaigns? Use the Batch Generator to produce up to 10 comment stickers in one session and download all as a ZIP. Save hours per week vs manual production.',
        steps: [
            'Open the Batch Generator',
            'Set up 10 unique comments across platforms',
            'Click Download All and get a ZIP of PNGs',
        ],
        cta: { label: 'Open batch generator', page: 'batch' },
    },
    {
        icon: <Users className="w-7 h-7" />,
        color: 'from-indigo-500 to-blue-400',
        title: 'Community management',
        label: 'Engagement strategy',
        desc: 'Use the Hashtag Generator and Engagement Rate Calculator to refine your strategy. Track what\'s working, find the best hashtags per niche, and generate reply templates for your top comments.',
        steps: [
            'Run the Engagement Calculator to benchmark your performance',
            'Generate hashtags for your next post',
            'Use Comment Reply Generator for fast community responses',
        ],
        cta: { label: 'View all tools', page: 'free-tools' },
    },
];

export function UseCases({ darkMode, onNavigate }: UseCasesProps) {
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
                        8 use cases
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        How creators use<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">CommentSticker.</span>
                    </h1>
                    <p className={`max-w-2xl mx-auto text-lg font-medium ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        From UGC ads and giveaways to batch production and community management — here's how real creators are using the tools.
                    </p>
                </div>

                {/* Use cases */}
                <div className="flex flex-col gap-12">
                    {USE_CASES.map((uc, i) => (
                        <div key={uc.title} className={`rounded-3xl border p-8 ${card}`}>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-shrink-0">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${uc.color} flex items-center justify-center text-white`}>
                                        {uc.icon}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${darkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-500'}`}>
                                            {uc.label}
                                        </span>
                                        {i === 0 && (
                                            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-500">
                                                Most popular
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-black mb-3">{uc.title}</h2>
                                    <p className={`text-sm font-medium leading-relaxed mb-6 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{uc.desc}</p>
                                    <div className="flex flex-col gap-2 mb-6">
                                        {uc.steps.map((step, j) => (
                                            <div key={j} className="flex items-start gap-3">
                                                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${uc.color} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5`}>
                                                    {j + 1}
                                                </div>
                                                <span className="text-sm font-medium">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => onNavigate(uc.cta.page)}
                                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r ${uc.color} text-white hover:scale-105 transition-all shadow-lg shadow-pink-500/10`}
                                    >
                                        {uc.cta.label} <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <AdSense adSlot="8899001133" />

                {/* CTA */}
                <section className={`mt-20 text-center p-12 rounded-3xl border ${darkMode ? 'bg-gradient-to-br from-pink-500/10 to-orange-500/5 border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-orange-50 border-pink-100'}`}>
                    <h2 className="text-2xl font-black mb-4">Ready to start?</h2>
                    <p className={`text-sm font-medium mb-8 max-w-md mx-auto ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        All tools are 100% free. No account required. Just open the generator and start creating.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all"
                        >
                            Launch App →
                        </button>
                        <button
                            onClick={() => onNavigate('free-tools')}
                            className={`px-8 py-3 rounded-xl text-sm font-bold border hover:scale-105 transition-all ${darkMode ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-300 text-neutral-700 hover:bg-white'}`}
                        >
                            All Free Tools
                        </button>
                    </div>
                </section>

            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
