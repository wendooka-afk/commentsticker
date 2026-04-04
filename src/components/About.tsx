import { ArrowLeft, Users, Heart, Target, Zap, Star, CheckCircle2, MessageSquare, TrendingUp, Video, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function AboutUs({ darkMode, onNavigate }: LegalPageProps) {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "Is CommentSticker really free?",
            a: "Yes, our core tools — the sticker generator, question finder, templates library, and script generator — are 100% free to use with no sign-up required. We believe every creator should have access to professional tools, regardless of budget."
        },
        {
            q: "Who is CommentSticker designed for?",
            a: "CommentSticker is built for TikTok content creators, UGC (User Generated Content) freelancers, social media managers, performance marketers, and video editors who need pixel-perfect comment overlays for short-form video ads."
        },
        {
            q: "Is it legal to use fake comment stickers?",
            a: "Custom comment stickers are widely used in the advertising industry as creative assets for video ads. They are used to highlight common customer questions, pain points, and reviews. As long as you use them for creative purposes (UGC ads, tutorial hooks, social proof in ads), they are a standard industry practice."
        },
        {
            q: "Which video editors support the generated PNG stickers?",
            a: "Our transparent PNG exports work with any video editing software: CapCut, Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, iMovie, and any other NLE. Simply import the PNG as an overlay track on top of your footage."
        },
        {
            q: "How is CommentSticker different from TokComment or other alternatives?",
            a: "Unlike older tools, CommentSticker supports 9 different social platforms natively (TikTok, Instagram, YouTube, Twitter/X, Facebook, Threads, Snapchat, Discord, LinkedIn). We also provide higher-resolution exports (3x pixel ratio), transparent backgrounds by default, and additional tools like the AI Question Finder, Batch Generator, and Script Generator that are unique to our platform."
        },
        {
            q: "Do you have a roadmap or upcoming features?",
            a: "Yes! We are currently working on animated GIF exports, video overlay templates, and a team collaboration workflow for UGC agencies. Subscribe to our newsletter to be among the first to try new features."
        }
    ];

    const stats = [
        { value: "9", label: "Native Platform UIs", icon: <MessageSquare className="w-6 h-6" /> },
        { value: "10,000+", label: "Stickers Generated", icon: <Star className="w-6 h-6" /> },
        { value: "100%", label: "Free Forever", icon: <Heart className="w-6 h-6" /> },
        { value: "3x", label: "Export Pixel Ratio", icon: <Zap className="w-6 h-6" /> },
    ];

    const useCases = [
        {
            icon: <Video className="w-6 h-6 text-pink-500" />,
            title: "UGC Creators & Freelancers",
            description: "Use custom comment stickers to create more compelling UGC ad creatives. Instead of relying on organic comments, you control the narrative from second zero, highlighting the exact customer pain point or FAQ that converts."
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
            title: "Performance Marketers",
            description: "Running TikTok Ads or Instagram Reels campaigns? Comment stickers make your videos feel native and organic, lowering your Cost Per Acquisition (CPA) by bypassing the user's ad-detection instinct."
        },
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            title: "Content Creators & Influencers",
            description: "Answer your most-asked questions or reply to viral comments in your videos, all with a pixel-perfect overlay. Boost retention by giving viewers immediate context and social proof at the start of your clip."
        },
        {
            icon: <Zap className="w-6 h-6 text-purple-500" />,
            title: "Video Editors",
            description: "Skip the manual Photoshop workflow. Generate a transparent PNG in seconds and drop it directly into CapCut, Premiere Pro, or DaVinci Resolve. Save hours of editing time per project."
        }
    ];

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <nav className="p-6">
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-sm font-bold hover:text-pink-500 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                </button>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">

                {/* --- HERO --- */}
                <header className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
                        Our Story
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        The Free Creative Toolkit<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">Built for Creators.</span>
                    </h1>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-3xl">
                        CommentSticker was born from a simple frustration: creating professional, native-looking social media overlays took way too long. We built the tool we always wished existed — and made it free for everyone.
                    </p>
                </header>

                {/* --- STATS --- */}
                <section className={`grid grid-cols-2 md:grid-cols-4 gap-6`}>
                    {stats.map((stat, i) => (
                        <div key={i} className={`p-6 rounded-3xl border text-center space-y-3 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 flex items-center justify-center text-pink-500">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black">{stat.value}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">{stat.label}</div>
                        </div>
                    ))}
                </section>

                {/* --- MISSION --- */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Target className="w-6 h-6 text-pink-500" />
                            <h2 className="text-3xl font-black">Our Mission</h2>
                        </div>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                            CommentSticker was created with a single mission: to democratize professional content creation tools. We believe that a solo creator or a small UGC agency should have access to the same quality tools as a major media buying firm — without paying thousands of dollars in design software licenses.
                        </p>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                            By providing free, browser-based tools for generating pixel-perfect social comment stickers across 9 platforms, we level the playing field for independent creators who want to build the same high-converting ad creatives as the biggest brands on TikTok, Instagram, and YouTube.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: <Heart className="w-6 h-6 text-pink-500" />, title: "Free & Open", desc: "Our core tools will always be free. No freemium traps." },
                            { icon: <Zap className="w-6 h-6 text-orange-500" />, title: "AI-Powered", desc: "Script & question generators powered by the latest AI models." },
                            { icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, title: "Pixel-Perfect", desc: "Every UI template is designed to exactly match native app interfaces." },
                            { icon: <Users className="w-6 h-6 text-blue-500" />, title: "Creator-First", desc: "Built by video editors, for video editors and content creators." },
                        ].map((card, i) => (
                            <div key={i} className={`p-6 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                {card.icon}
                                <h3 className="font-black mt-3 mb-1">{card.title}</h3>
                                <p className="text-sm text-neutral-500 font-medium">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- WHO IS IT FOR --- */}
                <section className="space-y-10">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl md:text-4xl font-black">Who Uses CommentSticker?</h2>
                        <p className="text-neutral-500 font-medium max-w-2xl mx-auto">
                            Thousands of creators, marketers, and editors use our platform every day to streamline their video production workflow.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((uc, i) => (
                            <div key={i} className={`p-8 rounded-3xl border space-y-4 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                                    {uc.icon}
                                </div>
                                <h3 className="text-xl font-black">{uc.title}</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{uc.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- HOW IT WORKS --- */}
                <section className="space-y-10">
                    <h2 className="text-3xl md:text-4xl font-black">How CommentSticker Works</h2>
                    <div className="space-y-6">
                        {[
                            { step: "01", title: "Choose Your Platform", desc: "Select from 9 natively-designed social media templates: TikTok, Instagram, YouTube, Twitter/X, Facebook, Threads, Snapchat, Discord, or LinkedIn. Each template is an exact pixel-perfect reproduction of the platform's comment UI, updated to reflect the latest app designs." },
                            { step: "02", title: "Customize the Comment", desc: "Enter any username, display name, comment text, number of likes, and timestamp. Upload a custom profile picture or choose from our default avatars. Toggle the verified badge, liked state, or generate a fully random comment with one click." },
                            { step: "03", title: "Download Your Transparent PNG", desc: "Click 'Export PNG' to download your comment sticker at 3x resolution with a transparent background (where applicable). Use it directly in CapCut as an Overlay, or import it into Adobe Premiere Pro, DaVinci Resolve, or Final Cut Pro as a video layer." },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="text-4xl font-black text-pink-500/20 tracking-tighter shrink-0 w-12">{step.step}</div>
                                <div className={`flex-1 p-6 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                                    <h3 className="text-xl font-black mb-2">{step.title}</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- FAQ --- */}
                <section className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black">Frequently Asked Questions</h2>
                        <p className="text-neutral-500 font-medium">Everything you need to know about CommentSticker.</p>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`rounded-2xl border transition-all ${activeFaq === i
                                ? (darkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-white shadow-xl')
                                : (darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm')
                                }`}>
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                                >
                                    <span className="font-bold">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-pink-500' : 'text-neutral-400'}`} />
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-sm font-medium text-neutral-500 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- CTA --- */}
                <section className={`text-center py-16 px-8 rounded-[2.5rem] border ${darkMode ? 'bg-gradient-to-br from-pink-500/10 to-orange-500/10 border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-orange-50 border-pink-100'}`}>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs mb-4">Ready to create?</p>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                        Start generating for free.
                    </h2>
                    <p className="text-neutral-500 font-medium mb-10 max-w-xl mx-auto">
                        Join thousands of creators who use CommentSticker to produce better video ads, faster — with zero design skills required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-500/20 hover:scale-105 transition-all"
                        >
                            Open the Sticker Generator
                        </button>
                        <button
                            onClick={() => onNavigate('blog')}
                            className={`px-8 py-4 rounded-2xl font-black text-lg border transition-all hover:scale-105 ${darkMode ? 'border-neutral-700 text-white hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50'}`}
                        >
                            Read Our Guides
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
}
